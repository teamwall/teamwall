(ns server.teamwall.t-handler
  (:use midje.sweet
        [midje.util :only [testable-privates]])
  (:require [cheshire.core :refer :all]
            [ring.mock.request :as req]
            [teamwall.api :as api]
            [teamwall.db :as db]
            [teamwall.handler :refer :all]))

(defn- mock
  ([verb uri] (req/request verb uri))
  ([verb uri params] (assoc (req/request verb uri params) :params params)))

;; (testable-privates teamwall.handler valid-token?)

(facts "About routes"
  (fact "Undefined routes returns a 403"
    (let [response (app-routes (mock :get "/invalid"))]
      response => (contains {:status 403})))

  (fact "Login returns a 500 for unknown user"
    (let [response (app-routes (mock :get "/login" {:email    "email@email.com"
                                                    :password "password"}))]
      response => (contains {:status 500})))

  (fact "Login returns a 200 and a JSON object for known user"
    (against-background
     ...email...                      =contains=> ""
     ...password...                   =contains=> ""
     (db/retrieve-user ...email...
                       ...password...
                       anything)      => {:user :user})
    (let [response (app-routes (mock :get "/login" {:email    ...email...
                                                    :password ...password...}))
          body     (parse-string (:body response) true)]
      response    => (contains {:status 200})
      (keys body) => '(:token :ttl)))

  (fact "team-members returns a 403 if wrong token is provided"
    (against-background
     ...token...                                   =contains=> "wrong token"
     (#'teamwall.handler/valid-token? anything
                                      ...token...) => false)
    (let [response (app-routes (mock :get "/team-members" {:token ...token...}))]
      response => (contains {:status 403})))

  (fact "team-members returns a 200 and a JSON object if correct token is provided"
    (against-background
     ...pattern...                                   =contains=> ""
     ...token...                                     =contains=> "correct token"
     (#'teamwall.api/extract-email-pattern anything) => ...pattern...
     (db/get-users-for-email ...pattern...)          => [{:username "John Doe"
                                                        :email    "john@doe.com"
                                                        :hash     "Please do not leak me"}]
     (#'teamwall.handler/valid-token? anything
                                      ...token...)   => true)
    (let [response (app-routes (mock :get "/team-members" {:token ...token...}))
          body     (parse-string (:body response) true)]
      response => (contains {:status 200})
      body     => [{:username "John Doe"
                    :email    "john@doe.com"}]))

  (fact "team-members returns a 403 if wrong token is provided"
    (against-background
     ...token...                                   =contains=> "wrong token"
     (#'teamwall.handler/valid-token? anything
                                      ...token...) => false)
    (let [response (app-routes (mock :post "/new-photo" {:token ...token...}))]
      response => (contains {:status 403})))

  (fact "new-photo returns a 400 if there is no `photo` param and a correct token"
    (against-background
     ...token...                                     =contains=> "correct token"
     (#'teamwall.handler/valid-token? anything
                                      ...token...)   => true)
    (let [response (app-routes (mock :post "/new-photo" {:token ...token...}))]
      response => (contains {:status 400})))

  (fact "new-photo returns a 200 if there is a `photo` param and a correct token"
    (against-background
     ...token...                                     =contains=> "correct token"
     ...photo...                                     =contains=> {:tempfile "file"
                                                                  :size 256
                                                                  :filename "picture"}
     (slurp "file")                                  => ...content...
     (#'teamwall.api/as-absolute-path "file")        => ...path...
     (db/add-photo anything
                   "picture"
                   256
                   ...path...
                   ...content...)                    => ...body...
     (#'teamwall.handler/valid-token? anything
                                      ...token...)   => true)
    (let [response (app-routes (mock :post "/new-photo" {:token ...token...
                                                         :photo ...photo...}))]
      response => (contains {:status 200})))

  (fact "last-photo returns a 403 if wrong token is provided"
    (against-background
     ...token...                                   =contains=> "wrong token"
     (#'teamwall.handler/valid-token? anything
                                      ...token...) => false)
    (let [response (app-routes (mock :get "/john@doe.com/last-photo" {:token ...token...}))]
      response => (contains {:status 403})))

  (fact "last-photo returns a 400 if the email provided does not match the user email domain"
    (against-background
     ...token...                                         =contains=> "correct token"
     (#'teamwall.handler/get-user-for-token ...token...) => {:email "wrong pattern"}
     (#'teamwall.handler/valid-token? anything
                                      ...token...)       => true)
    (let [response (app-routes (mock :get "/john@doe.com/last-photo" {:token ...token...}))]
      response => (contains {:status 400})))

  (fact "last-photo returns a 404 if there is no picture available"
    (against-background
     ...token...                                         =contains=> "correct token"
     (#'teamwall.handler/get-user-for-token ...token...) => {:email "bob@doe.com"}
     (db/get-last-photo "john@doe.com")                   => nil
     (#'teamwall.handler/valid-token? anything
                                      ...token...)       => true)
    (let [response (app-routes (mock :get "/john@doe.com/last-photo" {:token ...token...}))]
      response => (contains {:status 404}))))

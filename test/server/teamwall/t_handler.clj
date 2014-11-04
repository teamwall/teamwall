(ns server.teamwall.t-handler
  (:use midje.sweet)
  (:require [cheshire.core :refer :all]
            [ring.mock.request :as req]
            [teamwall.db :as db]
            [teamwall.handler :refer :all]))

(defn- mock
  ([verb uri] (req/request verb uri))
  ([verb uri params] (assoc (req/request verb uri params) :params params)))

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
     ...email... =contains=> ""
     ...password... =contains=> ""
     (db/retrieve-user ...email...
                       ...password...
                       anything) => {:user :user})
        (let [response (app-routes (mock :get "/login" {:email    ...email...
                                                        :password ...password...}))
              body     (parse-string (:body response) true)]
          response    => (contains {:status 200})
          (keys body) => '(:token :ttl))))

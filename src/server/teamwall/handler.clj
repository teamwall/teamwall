(ns teamwall.handler
  (:use [slingshot.slingshot :only [throw+ try+]])
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [compojure.core :refer :all]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [crypto.random :as random]
            [ring.middleware.multipart-params :refer [wrap-multipart-params]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.util.response :as response]
            [teamwall.api :as api]
            [teamwall.db :as db]
            [teamwall.serializer :as serializer]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^{:private true} default-ttl
  "Default value for a token Time-To-Live. Default is one hour"
  3600000)
(def ^{:private true} setting-file-name
  "Name of the setting file"
  "settings.tw")
(def ^{:private true} tokens
  "Atom storing all the active tokens"
  (atom {}))

(def ^{:private true} register-token
  "Random token used to check the registration form"
  (atom ""))


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defn- default-settings
  "Generates a new default setting map"
  []
  {:salt (str (java.util.UUID/randomUUID))
   :port 3000})

(defn- ensure-settings
  "Checks the existence of a setting file"
  []
  (def ^{:private true} settings
    "Content of the setting file"
    (if (.exists (io/as-file setting-file-name))
      (serializer/read-from-file setting-file-name)
      (serializer/write-in-file (default-settings) setting-file-name))))

(defn- generate-api-token
  "Generates a new API token"
  []
  (random/url-part 32))

(defn- token-valid?
  "Checks that the provided token exists and is still alive"
  [tokens token]
  (if (contains? tokens token)
    (let [data (get tokens token)
          ttl (:ttl data)
          creation-time (:creation-time data)
          now (java.util.Date.)]
      (< (- (.getTime now) (.getTime creation-time)) ttl))
    false))

(defn- login!
  "Checks if the user info are correct and generates an API token for the user"
  [session email password salt]
  (try+
   (let [user (db/retrieve-user email
                                password
                                salt)
         token (generate-api-token)]
     (swap! tokens assoc token {:user          user
                                :ttl           default-ttl
                                :creation-time (java.util.Date.)})

     {:status  200
      :session (assoc session :uid token)
      :headers {"Content-Type" "application/json"}
      :body    (generate-string
                {:token token
                 :ttl default-ttl}
                {:pretty true})})
   (catch [:type :teamwall.db/login-failed] {:keys [email valid-password?]}
     {:status 403})
   (catch  Exception e
     (.printStackTrace e)
     {:status 500})))

(defn- secure-routing
  "Encapsulate the check of token validity"
  [token fun]
  (let [valid (token-valid? @tokens token)]
    (if valid
      (try+
       (fun (:user (get @tokens token)))
       (catch [:type ::request-error] {:keys [status]}
         {:status status})
       (catch Exception e
         (.printStackTrace e)
         {:status 500}))
      {:status 403})))

(defn- secure-routing-json
  "Encapsulate the check of token validity and wraps the result in JSON"
  [token fun]
  (secure-routing token
                  (fn [user]
                    (let [result (fun (:user (get @tokens token)))]
                      (if-not (nil? result)
                        {:status  200
                         :headers {"Content-Type" "application/json"}
                         :body    (generate-string
                                   result
                                   {:pretty true})}
                        {:status  200
                         :headers {"Content-Type" "application/json"}})))))


(defmacro client-route
  "Expands all the routes covered by the client side router"
  [route]
  `(GET ~route
        {}
        (response/resource-response "index.html"
                                    {:root "public"})))


;;    /==================\
;;    |                  |
;;    |      ROUTES      |
;;    |                  |
;;    \==================/


(defroutes app-routes
  "Defines the server routes"
;;   (GET "/"
;;        {}
;;        (response/resource-response "index.html"
;;                                    {:root "public"}))
  (client-route "/")
  (client-route "/wall")

  (GET "/register"
       {}
       (do
         (reset! register-token (generate-api-token))
         (str "<form name=\"input\" action=\"register\" method=\"post\">
              Username: <input type=\"text\" name=\"username\"><br>
              Email: <input type=\"email\" name=\"email\"><br>
              Password: <input type=\"password\" name=\"password\"><br>
              Confirm Password: <input type=\"password\" name=\"cfm-pwd\"><br>
              <input type=\"hidden\" name=\"token\" value="
              @register-token
              ">
              <input type=\"submit\" value=\"Register\">
              </form>")))
  (POST "/register"
        {params :params}
        (let [get-token @register-token]
          (reset! register-token (generate-api-token))
          (when (= get-token (:token params))
            (db/register-user
             (:username params)
             (:password params)
             (:email params)
             (:salt settings))
            "User successfully created")))

  (GET "/login"
       req
       (let [{:keys [session params]} req]
         (login! session
                 (:email params)
                 (:password params)
                 (:salt settings))))

  (GET "/team-members"
       {params :params}
       (secure-routing-json (:token params)
                            api/get-team-members))

  (wrap-multipart-params
   (POST "/new-photo"
         {params :params}
         (secure-routing-json (:token params)
                              (fn [user]
                                (if (:photo params)
                                  (api/set-new-photo user
                                                     (:photo params))
                                  (throw+ {:type ::request-error
                                           :status 400}))))))

  (GET "/:email/last-photo"
       {params :params}
       (secure-routing (:token params)
                       (fn [user]
                         (api/last-photo user
                                         (:email params)))))

  (GET "/test"
       {params :params}
       (secure-routing-json (:token params)
                            #({:user %1})))

  (route/resources "/")
  (ANY "/*" [] {:status 403}))

(def app
  "main function used as hook from compojure"
  (site app-routes))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn- main
  "Initialization of the server"
  []
  (check-settings))

(main)
  (ensure-settings)

(ns teamwall.handler
  (:use [slingshot.slingshot :only [throw+ try+]])
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [compojure.core :refer :all]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [crypto.random :as random]
            [teamwall.api :as api]
            [teamwall.db :as db]
            [teamwall.serializer :as serializer]
            [teamwall.settings :as settings]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^{:private true} default-ttl 3600000) ;; one hour
(def ^{:private true} setting-file-name "settings.tw")
(def ^{:private true} tokens (atom {}))
(def ^{:private true} register-token (atom ""))


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defn- default-settings
  "Generates a new default setting map"
  []
  {:salt (str (java.util.UUID/randomUUID))})

(defn- check-settings
  "Checks the existence of a setting file"
  []
  (let [file-exists? (.exists (io/as-file setting-file-name))]
    (if file-exists?
      (def ^{:private true} settings (serializer/read-from-file setting-file-name))
      (do
        (def ^{:private true} settings (default-settings))
        (serializer/write-in-file settings setting-file-name)))))

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

(defn- login
  "Checks if the user info are correct and generates an API token for the user"
  [email password salt]
  (try+
   (let [user (db/retrieve-user email
                                password
                                salt)
         token (generate-api-token)]
     (swap! tokens assoc token {:user          user
                                :ttl           default-ttl
                                :creation-time (java.util.Date.)})

     {:status  200
      :headers {"Content-Type" "application/json"}
      :body    (generate-string
                {:token token
                 :ttl default-ttl}
                {:pretty true})})
   (catch [:type :teamwall.db/login-failed] {:keys [email valid-password?]}
     (println (str "Email \""
                   email
                   "\" not found or password incorrect"
                   valid-password?)))))

(defmacro secure-routing
  "Encapsulate the check of token validity"
  [token & body]
  `(let [valid# (token-valid? @tokens ~token)]
     (if valid#
       (do ~@body)
       {:status 404})))

;;    /==================\
;;    |                  |
;;    |      ROUTES      |
;;    |                  |
;;    \==================/

(defroutes app-routes
  (GET "/register"
       {}
       (do
         (reset! register-token (generate-api-token))
         (str "<form name=\"input\" action=\"register\" method=\"post\">
              Username: <input type=\"text\" name=\"username\"><br>
              Email: <input type=\"email\" name=\"email\"><br>
              Password: <input type=\"password\" name=\"password\"><br>
              Confirm Password: <input type=\"password\" name=\"confirm-password\"><br>
              <input type=\"hidden\" name=\"token\" value="
              @register-token
              ">
              <input type=\"submit\" value=\"Register\">
              </form>")))
  (POST "/register"
        {params :params}
        (let [get-token @register-token]
          (reset! register-token (generate-api-token))
          (if (= get-token (:token params))
            (do
              (println (:password params))
              (db/register-user (:username params)
                                (:password params)
                                (:email params)
                                (:salt settings))
              "User successfully created"))))
  (GET "/login"
       {params :params}
       (login (:email params)
              (:password params)
              (:salt settings)))

  (GET "/test"
       {params :params}
       (secure-routing
        (:token params)
        "200"))

  (route/resources "/")
  (route/not-found {:status 404}))

(def app
  (site app-routes))

;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/

(defn- main
  "Initialiization of the server"
  []
  (check-settings))

(main)

(comment
  (macroexpand '(secure-routing 123 (+ 1 2) (- 4 3)))
  )

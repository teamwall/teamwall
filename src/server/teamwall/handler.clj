(ns teamwall.handler
  (:use org.httpkit.server
        [slingshot.slingshot :only [throw+ try+]])
  (:import com.mongodb.MongoServerSelectionException)
  (:require [cheshire.core :refer :all]
            [clojure.core.async
             :as async
             :refer (<! <!! >! >!! put! chan go go-loop)]
            [clojure.data :as data]
            [clojure.java.io :as io]
            [compojure.core :refer :all]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [crypto.random :as random]
            [ring.middleware.cookies :only [wrap-cookies]]
            [ring.middleware.multipart-params :refer [wrap-multipart-params]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.util.response :as response]
            [taoensso.sente :as sente]
            [teamwall.api :as api]
            [teamwall.db :as db])
   (:gen-class))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^:private default-ttl
  "Default value for a token Time-To-Live. Default is one year"
  (* 365 24 60 60 1000))

(def ^:private tokens
  "Atom storing all the active tokens"
  (atom {}))

(def ^:private settings
  "Content of the setting file"
  (atom {}))

(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn
              connected-uids]}
      (sente/make-channel-socket! {})]
  (def ^:private ring-ajax-post
    "Sente: post for handshake"
    ajax-post-fn)
  (def ^:private ring-ajax-get-or-ws-handshake
    "Sente: get for handshake"
    ajax-get-or-ws-handshake-fn)
  (def ^:private ch-chsk
    "Sente: Income channel"
    ch-recv)
  (def ^:private chsk-send!
    "Sente: send function"
    send-fn)
  (def ^:private connected-uids
    "Sente: open connections"
    connected-uids))


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defn- get-user-for-token
  "Return the user corresponding to the provided token"
  [token]
  (:user (get @tokens token)))

(defn- load-settings!
  "Load the server settings"
  []
  (reset! settings (let [db-settings (db/load-settings)
                         new-salt    (str (java.util.UUID/randomUUID))]
                     (if-not (nil? db-settings)
                       db-settings
                       (db/store-settings {:salt new-salt
                                           :port 3000})))))

(defn- stub-user
  "Return a sub map of user to protect sensitive data"
  [user]
  (select-keys user [:username :email :status]))

(defn- generate-api-token
  "Generate a new API token"
  []
  (random/url-part 32))

(defn- now
  "Return the current time"
  []
  (java.util.Date.))

(defn- milliseconds-between
  "Return the number of milliseconds between
  the two dates provided as arguments.
  It is supposed here that the second argument is later in time that the first"
  [first-date second-date]
  (- (.getTime second-date) (.getTime first-date)))

(defn- valid-token?
  "Check that the provided token exists and is still alive"
  [tokens token]
  (if (contains? tokens token)
    (let [data (get tokens token)
          ttl (:ttl data)
          creation-time (:creation-time data)]
      (< (milliseconds-between (now) creation-time)
         ttl))
    false))

(defn- notify-all
  "Notify all the clients"
  [event-type options]
  (doseq [uid (:any @connected-uids)]
    (chsk-send! uid
                [(keyword "teamwall" event-type)
                 options])))

(defn- notify-team
  "Notify all the members of the USER's team"
  [user event-type & [options]]
  (doseq [uid (:any @connected-uids)]
    (let [user-email (:email user)
          mate-email (:email (get-user-for-token uid))]
      (when (and user-email
                 mate-email
                 (= (api/extract-email-pattern user-email)
                    (api/extract-email-pattern mate-email)))
        (chsk-send! uid
                    [(keyword "teamwall" event-type)
                     (merge {:user user} options)])))))

(defn- login!
  "Check if the user info are correct and generate an API token for the user"
  [session email password salt]
  (try+
   (let [user (db/retrieve-user email
                                password
                                salt)
         user (assoc user :status :online)
         token (generate-api-token)]
     (db/update-status user :online)
     (swap! tokens assoc token {:user          user
                                :ttl           default-ttl
                                :creation-time (java.util.Date.)})
     (notify-team user
                  "status-changed")
     {:status  200
      :cookies {"tw-token" {:value token}}
      :session (assoc session :uid token)
      :headers {"Content-Type" "application/json"}
      :body    (generate-string
                {:token token
                 :user (stub-user user)
                 :ttl default-ttl}
                {:pretty true})})
   (catch [:type :teamwall.db/login-failed] {:keys [email valid-password?]}
     {:status 403})
   (catch  Exception e
;;      (.printStackTrace e)
     {:status 500})))

(defn- secure-routing
  "Encapsulate the check of token validity"
  [token fun]
  (let [valid (valid-token? @tokens token)]
    (if valid
      (try+
       (fun (get-user-for-token token))
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
                    (let [result (fun user)]
                      (if-not (nil? result)
                        {:status  200
                         :headers {"Content-Type" "application/json"}
                         :body    (generate-string result
                                                   {:pretty true})}
                        {:status  200
                         :headers {"Content-Type" "application/json"}})))))

(defmacro client-route
  "Expand all the routes covered by the client side router"
  [route]
  `(GET ~route
        {}
        (response/resource-response "index.html"
                                    {:root "public"})))

(defn- connections-watcher
  "Watcher over the sconnexion atom to set users offline"
  [_key _ref old-value new-value]
  (let [[removed added _] (data/diff (:any old-value) (:any new-value))]
    (doseq [uid removed]
      (when-not (nil? uid)
        (let [user (get-user-for-token uid)]
          (when-not (nil? user)
            (swap! tokens dissoc uid)
            (db/update-status user :offline)
            (notify-team (assoc user :status :offline)
                         "status-changed")))))))

(defn- add-connections-watcher
  "Add a watcher for the connections"
  []
  (add-watch connected-uids :connected-uids connections-watcher))


;;    /==================\
;;    |                  |
;;    |      ROUTES      |
;;    |                  |
;;    \==================/


(defroutes app-routes
  "Defines the server routes"

  (client-route "/")
  (client-route "/wall")
  (client-route "/register")

  (POST "/register"
        {body :body}
        (let [params         (parse-string (slurp body) true)
              email          (:email params)
              already-exists (db/user-exists email)]
          (if already-exists
            {:status 403
             :body "Email already used"}
            (let [user         (db/register-user (:username params)
                                                 (:password params)
                                                 (:email params)
                                                 (:salt @settings))
                  stubbed-user (stub-user user)]
              (notify-team stubbed-user
                           "new-user")
              {:status 200}))))

  (GET  "/notifications" req (ring-ajax-get-or-ws-handshake req))
  (POST "/notifications" req (ring-ajax-post req))

  (GET "/login"
       req
       (let [{:keys [session params]} req]
         (login! session
                 (:email params)
                 (:password params)
                 (:salt @settings))))

  (GET "/current-user"
       {params :params}
       (secure-routing-json (:token params)
                            (fn [user]
                              (db/update-status user :online)
                              (notify-team user
                                           "status-changed")
                              (stub-user (assoc user :status :online)))))

  (GET "/team-members"
       {params :params}
       (secure-routing-json (:token params)
                            #(map stub-user (api/get-team-members %))))

  (wrap-multipart-params
   (POST "/new-photo"
         {params :params}
         (secure-routing-json (:token params)
                              (fn [user]
                                (if (:photo params)
                                  (do
                                    (api/set-new-photo user
                                                       (:photo params))
                                    (notify-team (stub-user user)
                                                 "new-photo"))
                                  (throw+ {:type   ::request-error
                                           :status 400}))))))

  (GET "/:email/last-photo"
       {params :params}
       (secure-routing (:token params)
                       (fn [user]
                         (api/last-photo user
                                         (:email params)))))

  (route/resources "/")
  (ANY "/*" [] {:status 403}))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn -main
  "Initialization of the server"
  [& args]
  (try+
   (load-settings!)
   (catch com.mongodb.MongoServerSelectionException e
     (println "Mongo database not found."
              "Are you sure you have an instance running?")
     (java.lang.System/exit 1)))
  (run-server (site app-routes)
              {:port (:port @settings)})
  (add-connections-watcher)
  (println (str "Server started on port " (:port @settings))))

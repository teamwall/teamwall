(ns teamwall.handler
  "Handle clients requests. This is the entry point of the application"
  (:use [org.httpkit.server]
        [slingshot.slingshot :only [throw+ try+]])
  (:import com.mongodb.MongoServerSelectionException)
  (:require [cheshire.core :refer :all]
            [clojure.core.async
             :as async
             :refer (<! <!! >! >!! put! close! chan go go-loop)]
            [clojure.core.match :refer [match]]
            [clojure.data :as data]
            [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.tools.cli :refer [parse-opts]]
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


(def ^:private signaling-channels
  "List of currently open signaling channels"
  (atom '()))

(def ^:private default-ttl
  "Default value for a token Time-To-Live. Default is one year"
  (* 365 24 60 60 1000))

(def ^:private tokens
  "Atom storing all the active tokens"
  (atom {}))

(def ^:private default-settings
  "Default values for the server-side settings"
  {:salt (str (java.util.UUID/randomUUID))
   :port 3000})

(def ^:private default-db-settings
  "Default values for the database settings"
  {:db-port 27017
   :db-host "localhost"})

(def ^:private settings
  "Content of the setting file"
  (atom {}))

(def ^:private db-settings
  "Content of the setting file"
  (atom default-db-settings))

(def ^:private cli-options
  "CLI options to handle optional arguments"
  [[nil  "--db-host URL" "Set the URL to reach the Mongo database"
    :default "localhost"]
   [nil  "--db-port PORT" "Set the port to reach the Mongo database"
    :default 27017
    :parse-fn #(Integer/parseInt %)]
   [nil  "--db-username STRING" "Set username to login to the Mongo database"]
   [nil  "--db-password STRING" "Set password to login to the Mongo database"]
   ["-h" "--help" "Display this message"]])

(def ^:private cli-configure-options
  "CLI options for the `configure` command"
  [["-p" "--port PORT" "Set the server port"
    :parse-fn #(Integer/parseInt %)
    :default 3000
    :validate [#(< 1024 % 0x10000) "Must be a number between 1024 and 65536"]]
   ["-h" "--help" "Display this message"]])


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defmulti event-received
  "Dispatch function invoked when a new event is received
  via the communication channel"
  :event-id)

(defmethod event-received :teamwall/open-room [data]
  (api/update-room! (:room-id data)
                    (:user data)
                    :open? true
                    :moderator (:email (:user data))))

(defmethod event-received :teamwall/create-room [data]
  (api/create-room (:user data)
                   (:room-id data)
                   :?name (:name data)))

(defn- event-handler
  "Dispatch the events based on the event type"
  [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
  (match [id ?data]
         [:chsk/uidport-open _] true
         [:chsk/uidport-close _] true
         [:chsk/ws-ping _] true
         [:chsk/state _] true
         [:chsk/recv _] (event-received ?data)
         :else (println "Unmatched event:" ev-msg)))

(defn- open-notification-channel
  "Open the notification channel with the server.
  Keep a WebSocket open"
  []
  (let [channel (sente/make-channel-socket! {})
        {:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn
              connected-uids]} channel]
    (def ring-ajax-post ajax-post-fn)
    (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)
    (def ch-chsk ch-recv)
    (def chsk-send! send-fn)
    (def connected-uids connected-uids))

  (defonce chsk-router (sente/start-chsk-router! ch-chsk event-handler)))

(defn- as-integer
  "Convert the provided String or Integer to Integer"
  [arg]
  (Integer. arg))

(defn- get-user-for-token
  "Return the user corresponding to the provided token"
  [token]
  (:user (get @tokens token)))

(defn- load-settings!
  "Load the server settings"
  []
  (reset! settings (let [new-settings (db/load-settings @db-settings)]
                     (if new-settings
                       new-settings
                       (db/store-settings default-settings @db-settings)))))

(defn- stub-user
  "Return a sub map of user to protect sensitive data"
  [user]
  (select-keys user [:username :email :status :settings]))

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
                                salt
                                @db-settings)
         user (assoc user :status :online)
         token (generate-api-token)]
     (db/update-status user :online @db-settings)
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

(defn- update-status
  "Update the user status"
  [user status]
  (let [updated-user (assoc user :status status)]
    (db/update-status user status @db-settings)
    (notify-team updated-user
                 "status-changed")
    updated-user))

(defn- connections-watcher
  "Watcher over the connections atom to set users offline"
  [_key _ref old-value new-value]
  (let [[removed added _] (data/diff (:any old-value) (:any new-value))]
    (doseq [uid removed]
      (when-not (nil? uid)
        (let [user (get-user-for-token uid)]
          (when-not (nil? user)
            (swap! tokens dissoc uid)
            (update-status user
                           :offline)))))))

(defn- add-connections-watcher
  "Add a watcher for the connections"
  []
  (add-watch connected-uids :connected-uids connections-watcher))

(defn- error-msg
  "Build an error message for the provided ERRORS"
  [errors]
  (str "The following errors occurred while parsing your command:\n\t- "
       (string/join "\n\t- " errors)))

(defn- exit
  "Exit the application and displays a message"
  [status msg]
  (println msg)
  (java.lang.System/exit status))

(defn usage
  "Display the full hepl text with usages"
  [options-summary]
  (string/join \newline
               ["Build a wall of picture for your team"
                ""
                "Options:"
                options-summary
                ""
                "Sub commands:"
                "  config    Set server-side settings"]))

(defn- set-settings
  "Store the server side settings"
  [{:keys [options arguments errors summary]}]
  (cond
   (:help options) (exit 0 summary)
   errors (exit 1 (error-msg errors)))
  (let [old-settings (try+
                      (db/load-settings @db-settings)
                      (catch com.mongodb.MongoServerSelectionException e
                        default-settings))
        new-settings (merge (or old-settings default-settings) options)]
    (when-not old-settings
      (println "Note that a new salt has been generated for the database"))
    (reset! settings new-settings)
    (db/store-settings new-settings @db-settings))
  (exit 0 "Settings updated"))


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
  (client-route "/settings")
  (client-route "/chat")

  (GET "/exp"
       {}
       (response/resource-response "chat.html"
                                   {:root "public"}))

  (POST "/register"
        {body :body}
        (let [params         (parse-string (slurp body) true)
              email          (:email params)
              already-exists (db/user-exists email @db-settings)]
          (if already-exists
            {:status 403
             :body "Email already used"}
            (let [user         (db/register-user (:username params)
                                                 (:password params)
                                                 (:email params)
                                                 (:salt @settings)
                                                 @db-settings)
                  stubbed-user (stub-user user)]
              (notify-team stubbed-user
                           "new-user")
              {:status 200}))))

  (POST "/settings"
        {body :body}
        (let [params   (parse-string (slurp body) true)
              settings (:settings params)
              token    (:token params)
              data     (get @tokens token)]
          (secure-routing-json token
                               (fn [user]
                                 (let [new-user (assoc user :settings settings)
                                       new-data (assoc data :user new-user)]
                                   (db/update-settings! new-user
                                                        @db-settings)
                                   (swap! tokens assoc
                                          token  new-data)
                                   (stub-user new-user))))))

  (GET  "/notifications" req (ring-ajax-get-or-ws-handshake req))
  (POST "/notifications" req (ring-ajax-post req))

  (GET  "/signaling"
        request
        (with-channel request channel
          (swap! signaling-channels conj channel)
          (on-close channel (fn [status]
                              (reset! signaling-channels
                                      (remove #(-> %
                                                   open?
                                                   not)
                                              @signaling-channels))))
          (on-receive channel (fn [data]
                                (doseq [chan @signaling-channels]
                                  (send! chan data))))))

  (GET "/login"
       req
       (let [{:keys [session params]} req]
         (login! session
                 (:email params)
                 (:password params)
                 (:salt @settings))))

  (GET "/current-user"
       req
       (let [{:keys [session params]} req
             token                    (:token params)]
         (secure-routing token
                         (fn [user]
                           (let [updated-user (update-status user
                                                             :online)
                                 stubbed-user (stub-user updated-user)
                                 body         (generate-string stubbed-user
                                                               {:pretty true})]
                             {:status  200
                              :cookies {"tw-token" {:value token}}
                              :headers {"Content-Type" "application/json"}
                              :session (assoc session :uid token)
                              :body    body})))))

  (GET "/team-members"
       {params :params}
       (secure-routing-json (:token params)
                            #(map stub-user
                                  (api/get-team-members %
                                                        @db-settings))))

  (GET "/rooms"
       {params :params}
       (secure-routing-json (:token params)
                            (fn [user]
                              (api/get-all-rooms user))))

  (wrap-multipart-params
   (POST "/new-photo"
         {params :params}
         (secure-routing-json (:token params)
                              (fn [user]
                                (if (:photo params)
                                  (do
                                    (api/set-new-photo user
                                                       (:photo params)
                                                       @db-settings)
                                    (notify-team (stub-user user)
                                                 "new-photo"))
                                  (throw+ {:type   ::request-error
                                           :status 400}))))))

  (GET "/:email/last-photo"
       {params :params}
       (secure-routing (:token params)
                       (fn [user]
                         (api/last-photo user
                                         (:email params)
                                         @db-settings))))

  (route/resources "/")
  (ANY "/*" [] {:status 403}))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn- run-app
  "Start the server on port precised in the settings"
  []
  (try+
   (load-settings!)
   (catch com.mongodb.MongoServerSelectionException e
     (exit 1
           (str `"Mongo database not found. "
                "Are you sure you have an instance running?")))
   (catch com.mongodb.MongoTimeoutException e
     (exit 1
           (str `"Mongo database not found. "
                "Are you sure you have an instance running?"))))
  (run-server (site app-routes)
              {:port (as-integer (:port @settings))})
  (add-connections-watcher)
  (println (str "Server started on port " (:port @settings))))

(defn -main
  "Initialization of the server"
  [& args]
  (let [{:keys [options arguments errors summary]} (parse-opts args
                                                               cli-options
                                                               :in-order true)]
    (cond
     (:help options) (exit 0 (usage summary))
     errors (exit 1 (error-msg errors)))

    (swap! db-settings merge options)
    (case (first arguments)
      "config" (set-settings (parse-opts (rest arguments)
                                         cli-configure-options))
      nil      (do
                 (open-notification-channel)
                 (run-app))
      (exit 1 (str "Unknown command '"
                   (first arguments)
                   "'")))))

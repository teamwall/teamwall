(ns teamwall.handler
  (:use org.httpkit.server
        [slingshot.slingshot :only [throw+ try+]])
  (:require [cheshire.core :refer :all]
            [clojure.core.async
             :as async
             :refer (<! <!! >! >!! put! chan go go-loop)]
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
            [teamwall.db :as db]
            [teamwall.serializer :as serializer]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^:private default-ttl
  "Default value for a token Time-To-Live. Default is one year"
  (* 365 24 60 60 1000))

(def ^:private setting-file-name
  "Name of the setting file"
  "settings.tw")

(def ^:private tokens
  "Atom storing all the active tokens"
  (atom {}))

(def ^:private register-token
  "Random token used to check the registration form"
  (atom ""))

(def ^:private settings
  "Content of the setting file"
  (if (.exists (io/as-file setting-file-name))
    (serializer/read-from-file setting-file-name)
    (serializer/write-in-file {:salt (str (java.util.UUID/randomUUID))
                               :port 3000}
                              setting-file-name)))

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


(defn- stub-user
  "Return a sub map of user to protect sensitive data"
  [user]
  (select-keys user [:username :email]))

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

(defn- login!
  "Check if the user info are correct and generate an API token for the user"
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

(defn- get-user-for-token
  "Return the user corresponding to the provided token"
  [token]
  (:user (get @tokens token)))

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
    (when (= (api/extract-email-pattern (:email user))
             (api/extract-email-pattern (:email (get-user-for-token uid))))
      (chsk-send! uid
                  [(keyword "teamwall" event-type)
                   (merge {:user user} options)]))))


;;    /==================\
;;    |                  |
;;    |      ROUTES      |
;;    |                  |
;;    \==================/


(defroutes app-routes
  "Defines the server routes"

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
            (let [user         (db/register-user (:username params)
                                                 (:password params)
                                                 (:email params)
                                                 (:salt settings))
                  stubbed-user (stub-user user)]
              (notify-team stubbed-user
                           "new-user"))
            "User successfully created")))

  (GET  "/notifications" req (ring-ajax-get-or-ws-handshake req))
  (POST "/notifications" req (ring-ajax-post req))

  (GET "/login"
       req
       (let [{:keys [session params]} req]
         (login! session
                 (:email params)
                 (:password params)
                 (:salt settings))))

  (GET "/current-user"
       {params :params}
       (secure-routing-json (:token params)
                            stub-user))

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
                                  (do
                                    (api/set-new-photo user
                                                       (:photo params))
                                    (notify-all "new-photo"
                                                {:user (stub-user user)}))
                                  (throw+ {:type   ::request-error
                                           :status 400}))))))

  (GET "/:email/last-photo"
       {params :params}
       (secure-routing (:token params)
                       (fn [user]
                         (api/last-photo user
                                         (:email params)))))

  (GET "/ping"
       {params :params}
       (doseq [uid (:any @connected-uids)]
         (chsk-send! uid
                     [:teamwall/ping {:data "plip"}])))

  (route/resources "/")
  (ANY "/*" [] {:status 403}))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn start-broadcaster!
  "Debug: Used to ping clients every 10s"
  []
  (go-loop [i 0]
           (<! (async/timeout 10000))
           (println (format "Broadcasting server>user: %s" @connected-uids))
           (doseq [uid (:any @connected-uids)]
             (chsk-send! uid
                         [:teamwall/test
                          {:what-is-this "A broadcast pushed from server"
                           :how-often    "Every 10 seconds"
                           :to-whom uid
                           :i i}]))
           (recur (inc i))))

(defn -main
  "Initialization of the server"
  [& args]
  (run-server (site app-routes)
              ;;               {:port (:port settings)}
              {:port 3000}
              )
  (println (str "Server started on port " (:port settings)))
  (start-broadcaster!))

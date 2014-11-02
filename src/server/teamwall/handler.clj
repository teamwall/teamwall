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

(def ^{:private true} settings
  "Content of the setting file"
  (if (.exists (io/as-file setting-file-name))
    (serializer/read-from-file setting-file-name)
    (serializer/write-in-file {:salt (str (java.util.UUID/randomUUID))
                               :port 3000}
                              setting-file-name)))

(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn
              connected-uids]}
      (sente/make-channel-socket! {})]
  (def ^{:private true} ring-ajax-post
    "Sente: post for handshake"
    ajax-post-fn)
  (def ^{:private true} ring-ajax-get-or-ws-handshake
    "Sente: get for handshake"
    ajax-get-or-ws-handshake-fn)
  (def ^{:private true} ch-chsk
    "Sente: Income channel"
    ch-recv)
  (def ^{:private true} chsk-send!
    "Sente: send function"
    send-fn)
  (def ^{:private true} connected-uids
    "Sente: open connections"
    connected-uids))


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


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

  (GET  "/notifications" req (ring-ajax-get-or-ws-handshake req))
  (POST "/notifications" req (ring-ajax-post                req))

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

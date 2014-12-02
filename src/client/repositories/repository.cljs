(ns repositories.repository
  (:require-macros [cljs.core.async.macros :as asyncm :refer [go go-loop]]
                   [cljs.core.match.macros :refer (match)])
  (:require [ajax.core :refer [GET POST]]
            [cemerick.url :refer [url url-encode]]
            [cljs.core.async :as async  :refer [<! >! put! chan]]
            [cljs.core.match]
            [cognitect.transit :as transit]
            [goog.string :as gstring]
            [goog.string.format :as gformat]
            [taoensso.sente :as sente :refer [cb-success?]]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^:private login-url
  "URL for the login route"
  "/login")

(def ^:private get-team-members-url
  "URL for the team members route"
  "/team-members")

(def ^:private get-current-user-url
  "URL for the current user route"
  "/current-user")


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defmulti event-received
  "Dispatch function invoked when a new event is received
  via the communication channel"
  first)

(defmethod event-received :teamwall/ping [[_ data]]
  (js/console.log "PONG: " (:data data)))

(defmethod event-received :teamwall/test [[_ data]]
  (js/console.log "TEST: " (:what-is-this data)))

(defmethod event-received :default [& rest]
  (js/console.log "OPPPS " rest))

(defn- async-get-json
  "Do an async GET call and consider the response as JSON"
  [& {:keys [handler url error params]}]
  (let [options (atom {:handler handler
                       :response-format :json
                       :keywords? true})]
    (if-not (nil? error)
      (swap! options assoc :error-handler error))
    (if-not (nil? params)
      (swap! options assoc :params params))
    (GET url @options)))

(defn- connection-established
  "Notify that the notification channel is opened"
  []
  (js/console.log "Channel socket successfully established!"))

(defn- state-changed
  "Notify that the notification channel state has changed"
  [state]
  (js/console.log "Channel socket state change: %s" state))



(defn- event-handler
  "Dispatch the events based on the event type"
  [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
  (match [id ?data]
         [:chsk/state {:first-open? true}] (connection-established)
         [:chsk/state _] (state-changed ?data)
         [:chsk/recv _] (event-received ?data)
         :else (js/console.log "Unmatched event:" ev-msg)))

(defn- build-form-data
  "Build a form data object using the array provided as argument"
  [?options]
  (let [form (js/FormData.)]
    (doseq [[value data ?name] ?options]
      (if ?name
        (.append form value data ?name)
        (.append form value data)))
    form))

(defn- now
  "Return a string representing now"
  []
  (str (js/Date.)))


;;    /==================\
;;    |                  |
;;    |      PUBLIC      |
;;    |                  |
;;    \==================/


(defn login
  "Do a request over the login REST API"
  [email password callback]
  (async-get-json :handler callback
                  :url     login-url
                  :params  {:email    email
                            :password password}))

(defn open-notification-channel
  "Open the notification channel with the server.
  Keep a WebSocket open"
  [token]
  (let [channel (sente/make-channel-socket! "/notifications" {:type :auto})
        {:keys [chsk ch-recv send-fn state]} channel]
    (def chsk       chsk)
    (def ch-chsk    ch-recv)
    (def chsk-send! send-fn)
    (def chsk-state state))

  (defonce chsk-router (sente/start-chsk-router! ch-chsk event-handler)))

(defn send-blob-picture
  "Send a blob object as a form data to the server"
  [blob token]
  (let [form-data (build-form-data [["token"
                                     token]
                                    ["photo"
                                     blob
                                     (str "snapshot-" (now) ".png")]])]
    (POST "/new-photo" {:params form-data})))

(defn get-current-user
  "Get the current user"
  [token callback on-error]
  (async-get-json :handler callback
                  :error   on-error
                  :url     get-current-user-url
                  :params  {:token token}))

(defn get-team-members
  "Get the team members for the current user"
  [token callback]
  (async-get-json :handler callback
                  :url     get-team-members-url
                  :params  {:token token}))

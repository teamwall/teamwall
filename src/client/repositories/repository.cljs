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


(def ^{:private :true} login-url
  "URL for the login route"
  "/login")


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defn- async-get-json
  [& {:keys [handler url error params]}]
  (let [options (atom {:handler handler
                       :response-format :json
                       :keywords? true})]
    (if-not (nil? error)
      (swap! options assoc :error-handler error))
    (if-not (nil? params)
      (swap! options assoc :params params))
    (GET url @options)))

(defn event-handler
  ""
  [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
  (match [id ?data]
         [:chsk/state {:first-open? true}] (js/console.log "Channel socket successfully established!")
         [:chsk/state _]                   (js/console.log "Channel socket state change: %s" ?data)
         ;;
         [:chsk/recv  [:teamwall/ping data]] (js/console.log "PONG: " (:data data))
         [:chsk/recv  [:teamwall/test data]] (js/console.log "TEST: " (:what-is-this data))
         [:chsk/recv  [& rest]] (js/console.log "Received: " rest)
         ;;
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
  "Returns a string representing now"
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
                  :url login-url
                  :params {:email    email
                           :password password}))

(defn open-notification-channel
  "Opens the notification channel with the server.
  Keeps a WebSocket open"
  [token]

  (let [{:keys [chsk ch-recv send-fn state]}
        (sente/make-channel-socket! "/notifications" {:type :auto})]
    (def chsk       chsk)
    (def ch-chsk    ch-recv)
    (def chsk-send! send-fn)
    (def chsk-state state))

  (defonce chsk-router (sente/start-chsk-router! ch-chsk event-handler)))

(defn send-blob-picture
  "TODO:DOC"
  [blob token]
  (let [form-data (build-form-data [["token" token]
                                    ["photo" blob (str "snapshot-" (now) ".png")]])]
    (POST "/new-photo" {:params form-data})))
;;                         {:photo form-data
;;                                  :token token}})))

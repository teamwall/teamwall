(ns teamwall.client
  (:require [cljs.core.async :as async
             :refer [<! timeout]]
            [dommy.core :as dommy :refer-macros [sel sel1]]
            [goog.events :as events]
            [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]
            [secretary.core :as secretary :refer-macros [defroute]]
            [teamwall.login :as login]
            [teamwall.states :as states]
            [teamwall.wall :as wall]
            [webrtc.core :as webrtc])
  (:require-macros [cljs.core.async.macros :as m :refer [go]])
  (:import goog.History
           goog.History.EventType))

(declare on-login)
(declare dispatch)
(declare login-route)


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(def ^:private snapshot-sleep-time
  "Time between two snapshots in milliseconds"
  (atom 1000))


;;    /==================\
;;    |                  |
;;    |     RENDERING    |
;;    |                  |
;;    \==================/


(defn- render-content
  "Render the whole application embedding the provided document"
  [document]
  [:div.appContainer
   document])

(defn- append-content
  "Append the whole document to body"
  [current-document]
  (reagent/render-component (fn [] [render-content current-document])
                            (sel1 :body)))

(defn- redirect
  "Redirect to the URL provided as argument
  making sure the history state is correct"
  [uri]
  (.pushState js/history {} "" uri)
  (dispatch uri))


;;    /==================\
;;    |                  |
;;    |      ROUTES      |
;;    |                  |
;;    \==================/


(defroute wall-route "/wall"
  {:as params}
  (if (nil? (states/get-token))
    (redirect (login-route))
    (do
      (append-content (wall/render-content)))))

(defroute login-route "/"
  {:as params}
  (append-content (login/render-content on-login)))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- snapshot-loop
  "Runs an infinite loop of snapshot"
  [token]
  (go
   (loop []
     (webrtc/take-picture (fn [blob]
                            (repository/send-blob-picture blob
                                                          token)))
     (<! (timeout @snapshot-sleep-time))
     (recur))))

(defn- on-login
  "Callback function invoked after the user successfully logged in"
  [data]
  (states/set-token (:token data))
  (states/set-user (:user data))
  (repository/open-notification-channel (:token data))
  (repository/get-team-members (:token data)
                               (fn [members]
                                 (wall/set-team members)
                                 (redirect (wall-route))))

  ;test
  (snapshot-loop (:token data)))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn ^:export dispatch
  "Dispatch the current URI"
  [uri]
  (secretary/dispatch! uri))

(webrtc/start-video-stream!)

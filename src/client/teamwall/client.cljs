(ns teamwall.client
  "Render the client. Entry point for the client side"
  (:require [cljs.core.async :as async
             :refer [<! timeout]]
            [dommy.core :as dommy :refer-macros [sel sel1]]
            [goog.events :as events]
            [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]
            [secretary.core :as secretary :refer-macros [defroute]]
            [teamwall.helper :as helper]
            [teamwall.login :as login]
            [teamwall.register :as register]
            [teamwall.settings :as settings]
            [teamwall.states :as states]
            [teamwall.wall :as wall]
            [webrtc.core :as webrtc])
  (:require-macros [cljs.core.async.macros :as m :refer [go]])
  (:import goog.History
           goog.History.EventType))

(declare on-login)
(declare dispatch)
(declare wall-route)


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
  [current-document css-class]
  (let [body (sel1 :body)]
    (dommy/set-class! body "")
    (dommy/add-class! body css-class)
    (reagent/render-component (fn []
                                [render-content current-document])
                              body)))

(defn- redirect
  "Redirect to the URL provided as argument
  making sure the history state is correct"
  [uri]
  (.pushState js/history {} "" uri)
  (dispatch uri))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- snapshot-loop
  "Run an infinite loop of snapshot"
  [token]
  (go
   (loop []
     (webrtc/take-picture (fn [blob]
                            (when blob
                              (repository/send-blob-picture blob
                                                            token))))
     (<! (timeout (* 1000 (-> (states/get-user)
                              :settings
                              :sleep-time))))
     (recur))))

(defn- setup-wall
  "Setup the environment variables and render the wall"
  [data]
  (states/set-token (:token data))
  (states/set-user (:user data))
  (repository/open-notification-channel (:token data))
  (repository/get-team-members (:token data)
                               (fn [members]
                                 (wall/set-team members)
                                 (append-content (wall/render-content)
                                                 "wall")))
  (snapshot-loop (:token data)))

(defn- setup-settings
  "Setup the settings page"
  [data]
  (states/set-token (:token data))
  (states/set-user (:user data))
  (repository/open-notification-channel (:token data))
  (append-content (settings/render-content)
                  "settings"))

(defn set-token-from-cookie!
  "Set the state token from the document cookie. If the cookie is
  absent, set it to `nil`"
  []
  (states/set-token (helper/get-cookie :tw-token)))

(defn- get-token
  "Get the session token from the cookie or the state"
  []
  (when (nil? (states/get-token))
    (set-token-from-cookie!))
  (states/get-token))


;;    /==================\
;;    |                  |
;;    |      ROUTES      |
;;    |                  |
;;    \==================/


(defroute ^:no-doc wall-route "/"
  {:as params}
  (let [token          (get-token)
        login-document (login/render-content (fn []
                                               (dispatch (wall-route))))
        on-success     (fn [user]
                         (setup-wall {:user user
                                      :token token}))
        on-error       (fn [err]
                         (states/reset-token!)
                         (append-content login-document
                                         "login"))]
    (repository/get-current-user token
                                 on-success
                                 on-error)))

(defroute ^:no-doc register-route "/register"
  {:as params}
  (let [document (register/render-content)]
    (append-content document
                    "register")))

(defroute ^:no-doc settings-route "/settings"
  {:as params}
  (let [token      (get-token)
        document   (settings/render-content)
        on-success (fn [user]
                     (setup-settings {:user user
                                      :token token}))
        on-error   (fn [err]
                     (states/reset-token!)
                     (redirect (wall-route)))]
    (repository/get-current-user token
                                 on-success
                                 on-error)))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn ^:export dispatch
  "Dispatch the current URI"
  [uri]
  (secretary/dispatch! uri))

(defn ^:export initialize
  "Initialize the client"
  []
  (webrtc/start-video-stream!))

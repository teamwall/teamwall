(ns teamwall.client
  (:require [dommy.core :as dommy :refer-macros [sel sel1]]
            [reagent.core :as reagent :refer [atom]]
            [goog.events :as events]
            [repositories.repository :as repository]
            [secretary.core :as secretary :refer-macros [defroute]]
            [teamwall.wall :as wall]
            [teamwall.login :as login])
  (:import goog.History
           goog.History.EventType))

(def ^:private token (atom nil))

(declare on-login)
(declare dispatch)
(declare login-route)


;;    /==================\
;;    |                  |
;;    |     RENDERING    |
;;    |                  |
;;    \==================/


(defn- render-content
  ""
  [document]
  [:div.appContainer
   document])

(defn- append-content
  ""
  [current-document]
  (reagent/render-component (fn [] [render-content current-document])
                            (sel1 :body)))

(defn- redirect
  ""
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
  (if (nil? @token)
    (redirect (login-route))
    (do
      (append-content
       (wall/render-content)))))

(defroute login-route "/"
  {:as params}
  (append-content (login/render-content on-login)))


(defn- on-login
  ""
  [data]
  (reset! token (:token data))
  (redirect (wall-route)))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn ^:export dispatch
  "Dispatch the current URI"
  [uri]
  (secretary/dispatch! uri))

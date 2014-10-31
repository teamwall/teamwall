(ns client
  (:require [dommy.core :as dommy :refer-macros [sel sel1]]
            [reagent.core :as reagent :refer [atom]]
            [goog.events :as events]
            [login]
            [secretary.core :as secretary :refer-macros [defroute]]
            [wall])
  (:import goog.History
           goog.History.EventType))

(def ^:private token (atom nil))

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


;;    /==================\
;;    |                  |
;;    |      ROUTES      |
;;    |                  |
;;    \==================/

(defroute login-route "*"
  {:as params}
  (append-content (login/render-content)))

(defroute "/wall"
  {:as params}
  (if (nil? @token)
    (append-content
     (wall/render-content)
     )
    (login-route)))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn ^:export dispatch
  "Dispatch the current URI"
  [uri]
  (secretary/dispatch! uri))

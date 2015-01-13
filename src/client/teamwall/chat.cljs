(ns teamwall.chat
  (:require [dommy.core :as dommy :refer-macros [sel sel1]]
            [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]
            [teamwall.states :as states]
            [webrtc.conference :as conference]))

;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function"
  []
  [:div
   [:h1 "Chat"]
   [:img {:src "http://thecatapi.com/api/images/get?format=src&type=gif"}]])

(ns teamwall.wall
  (:require [reagent.core :as reagent :refer [atom]]))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- get-tiles
  "Return all teammate tiles."
  []
  ["img/1.jpg" "img/2.jpg"])

(defn- build-content
  "Build the wall of mate tiles"
  []
  (let [imgs (map (fn [tile]
                    [:li.mate [:img {:src tile}]])
                  (get-tiles))]
    [:ul.mates imgs]))

(defn- build-title
  "Return a title DOM element."
  []
  [:h1.title "Teamwall"])


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function."
  []
  [:div.wall
   [build-title]
   [build-content]])

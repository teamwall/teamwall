(ns client
  (:require [reagent.core :as reagent :refer [atom]]
            [dommy.core :as dommy :refer-macros [sel sel1]]))

(defn- get-tiles
  "Return all teammate tiles."
  []
  ["img/1.jpg" "img/2.jpg"])

(defn- build-content
  ""
  []
  (let [imgs (map (fn [tile]
                    [:li.mate [:img {:src tile}]])
                  (get-tiles))]
    [:ul.mates imgs]))

(defn- build-title
  "Return a title DOM element."
  []
  [:h1.title "Teamwall"])

(defn- build
  "Build the whole page"
  []
  [:div.container
   [build-title]
   [build-content]])

(defn ^:export run
  "Main rendering function."
  []
  (reagent/render-component (fn [] [build])
                            (sel1 :body)))

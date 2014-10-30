(ns client
  (:use-macros [crate.def-macros :only [defpartial]])
  (:require [crate.core :as crate]
            [dommy.core :as dommy
                        :refer-macros [sel sel1]]))

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
    (crate/html [:ul.mates imgs])))

(defn- build-title
  "Return a title DOM element."
  []
  (crate/html [:h1.title "Teamwall"]))

(defn- build
  "Main rendering function."
  []
  (let [body (sel1 :body)]
    (dommy/append! body
                   (build-title) (build-content))))

(build)

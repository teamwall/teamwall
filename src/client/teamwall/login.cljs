(ns login
  (:require [reagent.core :as reagent :refer [atom]]))




;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function."
  []
  [:div.login
   [:h1 "Login"]])

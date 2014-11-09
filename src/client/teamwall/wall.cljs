(ns teamwall.wall
  (:require [cemerick.url :refer [url url-encode]]
            [reagent.core :as reagent :refer [atom]]
            [teamwall.states :as states]))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- now
  "Returns the current time as a string"
  []
  (str (.now js/Date)))

(defn- get-team-members
  "Returns the list of all the team members of the current user"
  []
  [{:email "b@b.b"
    :username "Bob"}
   ;;    {:email "c@b.b"
   ;;     :username "Conan"}
   ])

(defn- get-img-url-for-user
  "Returns the image url for the provided user"
  [user]
  (str "/"
       (url-encode   (:email user))
       "/last-photo?token="
       (states/get-token)
       "&time="
       (now)))

(defn- get-tiles
  "Return all teammate tiles."
  []
  (let [team (get-team-members)]
    (map (fn [user]
           (get-img-url-for-user user))
         team)))

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

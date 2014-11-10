(ns teamwall.wall
  (:require [cemerick.url :refer [url url-encode]]
            [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]
            [teamwall.states :as states]))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(def sources (atom {}))

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

(defn- update-img-url-for-user
  "Returns the image url for the provided user"
  [user]
  (let [existing-atom (get @sources (:email user))
        atom-to-use (or existing-atom (atom ""))
        source (str "/"
                    (url-encode   (:email user))
                    "/last-photo?token="
                    (states/get-token)
                    "&time="
                    (now))]

    (when-not existing-atom
      (swap! sources assoc (:email user) atom-to-use))

    (reset! atom-to-use source)
    atom-to-use))

(defn- get-tiles
  "Return all teammate tiles."
  []
  (let [team (get-team-members)]
    (map (fn [user]
           (update-img-url-for-user user))
         team)))

(defn- tile [src]
  [:img {:src @src}])

(defn- build-content
  "Build the wall of mate tiles"
  []
  (let [imgs (map (fn [src]
                    [:li.mate [tile src]])
                  (get-tiles))]
    [:ul.mates imgs]))

(defn- build-title
  "Return a title DOM element."
  []
  [:h1.title "Teamwall"])


(defmethod repository/event-received :teamwall/new-photo [[_ data]]
  (update-img-url-for-user (:user data)))


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

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


(def sources
  "Maps of all the sources containing the users
  as well as the src path for their picture"
  (atom {}))
(def members (atom []))

(defn- now
  "Returns the current time as a string"
  []
  (str (.now js/Date)))

(defn- get-team-members
  "Returns the list of all the team members of the current user"
  []
  @members)

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

(defn- tile
  "Build a snapshot tile for the given SRC"
  [src]
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


;;    /==================\
;;    |                  |
;;    |    EXTENSIONS    |
;;    |                  |
;;    \==================/


(defmethod repository/event-received :teamwall/new-photo [[_ data]]
  (update-img-url-for-user (:user data)))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn set-team
  "Set the members with the server data"
  [new-members]
  (reset! members new-members))

(defn render-content
  "Main rendering function."
  []
  [:div.wall
   [build-title]
   [build-content]])

(ns teamwall.wall
  (:require [cemerick.url :refer [url url-encode]]
            [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]
            [teamwall.states :as states]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def sources
  "Map of all the sources containing the users
  as well as the src path for their picture"
  (atom {}))

(def members
  "List of all the team members"
  (atom []))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- now-as-milliseconds
  "Return the current time as a string"
  []
  (str (.now js/Date)))

(defn- timestamp-now
  "Return the current time as a timestamp string"
  []
  (let [date (js/Date.)]
    (first (.split (.toTimeString date) " "))))

(defn- update-img-url-for-user!
  "Return the image url for the provided user"
  [user]
  (let [existing-atom (get @sources (:email user))
        atom-to-use   (or existing-atom
                          (atom ""))
        source        (str "/"
                           (url-encode   (:email user))
                           "/last-photo?token="
                           (states/get-token)
                           "&time="
                           (now-as-milliseconds))]
    (when-not existing-atom
      (swap! sources assoc (:email user) atom-to-use))
    (reset! atom-to-use source)
    atom-to-use))

(defn- add-new-user!
  "Add a new user to the local cache as a new user
  registered to the server"
  [user]
  (swap! members conj user)
  (update-img-url-for-user! user))

(defn- status-changed!
  "Updates the status of the user provided as argument"
  [user]
  (let [status (:status user)
        email  (:email user)
        index  (first (first (filter #(= (:email (second %)) email)
                                     (map-indexed vector @members))))]
    (swap! members assoc index user)))

(defn- get-tiles
  "Return all teammate tiles."
  []
  (map (fn [user]
         {:src  (update-img-url-for-user! user)
          :user user})
       @members))

(defn- tile
  "Build a snapshot tile for the given SRC"
  [src user]
   (if (= (name (:status user)) "online")
     [:div
      [:img {:src @src}]
      [:span.timestamp (timestamp-now)]]
     [:div
      [:img.offline {:src @src}]
      [:span.timestamp "OFFLINE"]]))

(defn- build-title
  "Return a title DOM element"
  []
  [:h1.title "Teamwall"])

(defn- build-settings-button
  "Build the settings button as a cog icon"
  []
  [:a.link.glyphicon.glyphicon-cog])

(defn- build-user-link
  "Build the user anchor"
  []
  [:a.link {:href "/settings"}
   [:span.glyphicon.glyphicon-user]
   (:username (states/get-user))])

(defn- build-navbar
  "Build the main navbar of the page"
  []
  [:div.navbar.navbar-fixed
   [:div.container-fluid
    [build-title]
    [:ul.nav.navbar-nav.navbar-right
     [:li [build-user-link]]]]])

(defn- build-content
  "Build the wall of mate tiles"
  []
  (let [imgs (map (fn [src]
                    [:div.col-xs-12.col-sm-6.col-md-4.col-lg-4.mate
                     [tile (:src src)
                           (:user src)]])
                  (get-tiles))]
    [:div.container-fluid
     [:div.row.mates imgs]]))


;;    /==================\
;;    |                  |
;;    |    EXTENSIONS    |
;;    |                  |
;;    \==================/


(defmethod repository/event-received :teamwall/new-photo [[_ data]]
  (update-img-url-for-user! (:user data)))

(defmethod repository/event-received :teamwall/new-user [[_ data]]
  (add-new-user! (:user data)))

(defmethod repository/event-received :teamwall/status-changed [[_ data]]
  (status-changed! (:user data)))


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
  "Main rendering function"
  []
  [:div
   [build-navbar]
   [:div.wall
    [build-content]]])

(ns teamwall.wall
  "Render the wall page and the pictures"
  (:require [cemerick.url :refer [url url-encode]]
            [cljs-hash.md5 :as md5]
            [dommy.core :as dommy :refer-macros [sel sel1]]
            [reagent.core :as reagent :refer [atom]]
            [reagent-modals.modals :as rm]
            [repositories.repository :as repository]
            [secretary.core :as secretary]
            [teamwall.helper :as helper]
            [teamwall.states :as states]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^:private sources
  "Map of all the sources containing the users
  as well as the src path for their picture"
  (atom {}))

(def ^:private members
  "List of all the team members"
  (atom []))

(def ^:private rooms
  "List of all the team members"
  (atom []))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- redirect-to-settings
  "Redirect the current page to settings"
  [event]
  (.preventDefault event)
  (.pushState js/history {} "" "/settings")
  (secretary/dispatch! "/settings"))

(defn- logout
  "Logout the current user"
  [event]
  (.preventDefault event)
  (helper/remove-cookie! :tw-token)
  (set! (.-location js/window) "/"))

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
    (when (and index
               (< index (count @members)))
      (swap! members assoc index user))))

(defn- toggle-sidebar
  "Toggle the left-hand side sidebar"
  []
  (let [body (sel1 "body")]
    (dommy/toggle-class! body "sidebar-closed")))

(defn- get-tiles
  "Return all teammate tiles."
  []
  (map (fn [user]
         {:src  (update-img-url-for-user! user)
          :user user})
       @members))

(defn- build-avatar-src
  "Build the avatar path for the provided user"
  [user]
  (str "https://www.gravatar.com/avatar/"
       (md5/md5 (:email user))
       "?s=32&d=retro"))

(defn- open-chat-popup
  "Open a chat popup window"
  [room]
  (js/window.open (str "/chat/" (:room-id room))
                  (or (:?name room)
                      "Chat")
                  "mywindow","status=1"))

(defn- create-room
  "Create a new meeting room"
  [room-name public? users]
  (let [user (states/get-user)
        room {:room-id   (now-as-milliseconds)
              :?name     room-name
              :private?  (not public?)
              :moderator (:email user)
              :users     users}]
    (repository/notify-server "create-room"
                              (assoc room :user user)
                              1000)))


;;    /==================\
;;    |                  |
;;    |     RENDERING    |
;;    |                  |
;;    \==================/


(defn- render-form
  "Render state dependent part of the room creation form"
  [room-name public?]
  [:div
   [:div.form-group
    [:div.col-sm-offset-3.col-sm-9
     [:div.checkbox
      [:label
       [:input {:type "checkbox"
                :checked @public?
                :on-change #(swap! public? not)}
        "Public room"]]]]]

   [:div.form-group
    [:label {:for "room-name-input"
             :class (if @public?
                      "col-sm-3 control-label"
                      "col-sm-3 control-label disabled")}
     "Room name"]
    [:div.col-sm-9
     [:input {:type "text"
              :id "room-name-input"
              :disabled (not @public?)
              :placeholder "Discussion about new feature X"
              :class "form-control"
              :value @room-name
              :on-change #(reset! room-name (-> %
                                                .-target
                                                .-value))}]]]])

(defn- render-modal
  "Render the room creation modal"
  [room-name public?]
  [:div
   [:div.modal-header
    [:button.close {:type "button"
                    :data-dismiss "modal"
                    :aria-label "Close"}
     [:span {:aria-hidden true}]]
    [:h4.modal-title
     "Create new meeting"]]
   [:div.modal-body
    [:form.form-horizontal.room-creation-form
     {:on-submit (fn [event]
                   (let [modal  (js/jQuery "#reagent-modal")
                         picker (js/jQuery ".selectpicker")
                         mates  (js->clj (.val picker))]
                     (.modal modal "hide")
                     (create-room @room-name
                                  @public?
                                  mates))
                   false)}
     [render-form room-name public?]
     [:div.form-group
      [:label.col-sm-3.control-label {:for "mates-input"}
       "Mates"]
      [:div.col-sm-9
       [(with-meta (fn []
                     [:select.selectpicker.form-control {:multiple true
                                                         :id "mates-input"}
                      (map (fn [member]
                             [:option {:value (:email member)}
                              (:username member)])
                           (remove #(= % (states/get-user))
                                   @members))])
          {:component-did-mount (fn []
                                  (let [pickers (js/jQuery ".selectpicker")]
                                    (.selectpicker pickers)))})]]]]]
   [:div.modal-footer
    [:button.btn.btn-default {:type "button"
                              :data-dismiss "modal"}
     "Close"]
    [:button {:type "button"
              :class "btn btn-primary"
              :on-click (fn []
                          (let [picker (js/jQuery ".selectpicker")
                                mates  (js->clj (.val picker))]
                            (create-room @room-name
                                         @public?
                                         mates)))
              :data-dismiss "modal"}
     "Create"]]])

(defn- open-chat
  "Opens a dialog window to set new room data"
  []
  (let [room-name (atom "")
        public?   (atom true)]
    (rm/modal! [render-modal room-name public?]
               {:shown (fn []
                         (let [input (js/jQuery "#room-name-input")]
                           (.focus input)))})))

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

(defn- build-user-settings
  "Build the settings item"
  []
  [:a.menu-item.settings
   {:on-click redirect-to-settings}
   [:span.item
    [:span.glyphicon.glyphicon-cog]
    "Settings"]])

(defn- build-user-logout
  "Build the logout item"
  []
  [:a.menu-item.logout
   {:on-click logout}
   [:span.item
    [:span.glyphicon.glyphicon-log-out]
    "Logout"]])

(defn- build-user-link
  "Build the user anchor"
  []
  [:a.link.user
   [:span.glyphicon.glyphicon-user]
   (:username (states/get-user))])

(defn- build-sidebar-toggler
  "Build the left-hand side toggler"
  []
  [:i.fa.fa-bars.sidebar-toggler {:on-click toggle-sidebar}])

(defn- build-navbar
  "Build the main navbar of the page"
  []
  [:div.navbar.navbar-fixed
   [build-sidebar-toggler]
   [:div.container-fluid
    [build-title]
    [:ul.nav.navbar-nav.navbar-right
     [:li.menu [build-user-link]
      [:ul
       [:li [build-user-settings]]
       [:li [build-user-logout]]]]]]])

(defn- build-list-of-users
  "Build the list of users"
  []
  (let [items (map (fn [user]
                     [:li {:class (if (= (name (:status user)) "online")
                                    "user"
                                    "user offline")}
                      [:img.gravatar {:src (build-avatar-src user)}]
                      (:username user)])
                   @members)]
    [:ul.users items]))

(defn- build-list-of-rooms
  "Build the list of current public rooms"
  []
  (let [items (map (fn [room]
                     [:li.room
                      [:a.open-room
                       {:on-click (fn []
                                    (open-chat-popup room))}
                       [:span
                        [:i.fa.fa-video-camera]
                        (:?name room)]]])
                   @rooms)]
    [:div.rooms
     [:ul.list-rooms items]]))

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

(defmethod repository/event-received :teamwall/room-created [[_ data]]
  (let [room (:room data)]
    (when-not (:private? room)
      (swap! rooms conj room))
    (when (= (:moderator room)
             (:email (states/get-user)))
      (open-chat-popup room))))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn set-team!
  "Set the members with the server data"
  [new-members]
  (reset! members new-members))

(defn set-rooms!
  "Set the rooms with the server data"
  [new-rooms]
  (reset! rooms new-rooms))

(defn render-content
  "Main rendering function"
  []
  [:div
   [rm/modal-window]
   [build-navbar]
   [:div.viewport
    [:div.sidebar
     [:h2 "Mates"]
     [build-list-of-users]
     [:h2 "Meetings"
      [:span.add-room
       {:on-click open-chat}
       [:i.fa.fa-plus-circle]]]
     [build-list-of-rooms]]
    [:div.wall
     [build-content]]]])

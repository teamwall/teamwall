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


(defn connect-to-room!
  "Join the room corresponding to ID"
  [id]
  (let [rmc (conference/setup-chat (:email (states/get-user)))]
    (conference/set-body! rmc
                          (sel1 "#video-container"))
    (conference/connect-to-room! rmc
                                 id)))

(defn create-room!
  "Join the room corresponding to ID"
  [id]
  (let [rmc (conference/setup-chat (:email (states/get-user)))]
    (conference/set-body! rmc
                          (sel1 "#video-container"))
    (repository/notify-server :open-room
                              {:room-id id
                               :user    (states/get-user)}
                              1000
                              (fn []
                                (conference/create-room! rmc
                                                         id)))))

(defn render-content
  "Main rendering function"
  []
  [:div
   [:h1 "Chat"]
   [:img {:src "http://thecatapi.com/api/images/get?format=src&type=gif"}]
   [:div#video-container]])


;;    /==================\
;;    |                  |
;;    |       NOTE       |
;;    |                  |
;;    \==================/


;;; Structure of a room
;;;
;;; {:?name optional name of the room
;;;  :open? is the room already open or not
;;;  :moderator user id of the room creator
;;;  :users list of user in the room excluding the moderator
;;;  :private? is the room private or not?
;;;  :room-id unique identifier (nanoseconds of instantiation)}

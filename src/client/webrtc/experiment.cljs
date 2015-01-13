(ns webrtc.experiment
  (:require [dommy.core :as dommy :refer-macros [sel sel1]]
            [webrtc.conference :as conference]))

(defn ^export init
  []
  (let [[rmc websocket] (conference/setup-chat)
        node (sel1 "#videos-container")]
    (conference/set-body! rmc
                          node)
    (dommy/listen! (sel1 "#openRoom")
                   :click
                   (fn [event]
                     (conference/create-room! rmc
                                              "123456789")))
    (dommy/listen! (sel1 "#joinRoom")
                   :click
                   (fn [event]
                     (conference/connect-to-room! rmc
                                                  "123456789")))
    (dommy/listen! (sel1 "#shareScreen")
                   :click
                   (fn [event]
                     (conference/add-stream! rmc
                                             {:screen true
                                              :oneway true})))))

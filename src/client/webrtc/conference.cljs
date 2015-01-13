(ns webrtc.conference)


(declare create-websocket)
(declare build-relative-ws-path)


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- build-relative-ws-path
  "Build a websocket url based on the local url and the FRAGMENT provided"
  [fragment]
  (let [location (.-location js/window)
        new-uri  (if (= (.-protocol location)
                        "https:")
                   "wss:"
                   "ws:")
        new-uri  (str new-uri
                      "//"
                      (.-host location))
        new-uri  (if (= (first fragment)
                        "/")
                   (str new-uri
                        fragment)
                   (str new-uri
                        (.-pathname location)
                        fragment))]
    new-uri))

(defn- create-websocket
  "Create a new websocket usr the URL provided"
  [url]
  (js/WebSocket. url))


(defn- on-message-callback
  "Inoked each time a new message is received via the signaling websocket"
  [json rmc message-callbacks]
  (let [data     (js/JSON.parse json)
        channel  (.-channel data)
        message  (.-message data)
        sender   (.-sender data)
        callback (get message-callbacks channel)]
    (when (and (not= sender
                     (.-userid rmc))
               callback)
      (callback message))))

(defn- open-signaling-channel
  "Open a new websocket channel for signaling"
  [config websocket rmc message-callbacks]
  (this-as this
           (let [channel    (or (.-channel config)
                                (.-channel this))
                 user-id    (.-userid rmc)
                 on-message (.-onmessage config)
                 on-open    (.-onopen config)]
             (swap! message-callbacks assoc channel on-message)
             (when on-open
               (js/setTimeout on-open
                              1000))
             (clj->js {:channel channel
                       :send (fn [message]
                               (let [json (clj->js {:sender user-id
                                                    :channel channel
                                                    :message message})]
                                 (.send websocket
                                        (js/JSON.stringify json))))}))))



;;    /==================\
;;    |                  |
;;    |      PUBLIC      |
;;    |                  |
;;    \==================/


(defn set-body!
  "Set the RMC body"
  [rmc node]
  (set! (.-body rmc)
        node))

(defn add-stream!
  "Add a stream to the provided communication"
  [rmc config]
  (.addStream rmc
              (clj->js config)))

(defn on-media-captured!
  "Set the callback invoked when a new media is captured"
  [rmc callback]
  (set! (.-onMediaCaptured rmc)
        callback))

(defn create-room!
  "Create a new chat room"
  [rmc id]
  (.open rmc
         id))

(defn connect-to-room!
  "Connect to an existing chat room"
  [rmc id]
  (.connect rmc
            id))

(defn ^export setup-chat
  "Setup the whole chat application. Must be the first function invoked"
  [& [user-id]]
  (let [message-callbacks (atom {})
        uri       (build-relative-ws-path "/signaling")
        websocket (create-websocket uri)
        rmc       (js/RTCMultiConnection.)]

    (set! (.-onmessage websocket)
          (fn [event]
            (on-message-callback (.-data event)
                                 rmc
                                 @message-callbacks)))
    (set! (.-openSignalingChannel rmc)
          (fn [config]
            (open-signaling-channel config
                                    websocket
                                    rmc
                                    message-callbacks)))
    (set! (.-getExternalIceServers rmc)
          false)
    (when user-id
      (set! (.-userid rmc)
            user-id))
    rmc))

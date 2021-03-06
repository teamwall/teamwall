(ns webrtc.core
  "A clojureScript wrapper for webrtc.
  It provides support for taking a snapshot using the webcam")


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(defn- create-dom-node
  "Create a DOM element without appending it"
  [tag-name]
  (.createElement js/document tag-name))

(def ^:private running
  "A boolean telling if the webcam is running"
  (atom false))

(def ^:private video-node
  "A video DOM node to play the webcam stream"
  (create-dom-node "video"))
(def ^:private canvas-node
  "A canvas DOM node to snapshot the video stream"
  (create-dom-node "canvas"))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- setup-dom-objects
  "Setup the video and canvas arguments width and height"
  [video canvas]
  (let [width  640
        height 480]
   (.setAttribute video "width" width)
   (.setAttribute video "height" height)
   (.setAttribute canvas "width" height)
   (.setAttribute canvas "height" height)
   (set! (.-width canvas) height)
   (set! (.-height canvas) height)))

(setup-dom-objects video-node canvas-node)

(defn- navigator
  "Wrap `window.navigator`"
  []
  (.-navigator js/window))

(defn- get-user-media
  "Wrap `navigator.getUserMedia()`"
  [navigator]
  (.-getUserMedia navigator))

(defn- webkit-get-user-media
  "Wrap `navigator.webkitGetUserMedia()`"
  [navigator]
  (.-webkitGetUserMedia navigator))

(defn- moz-get-user-media
  "Wrap `navigator.mozGetUserMedia()`"
  [navigator]
  (.-mozGetUserMedia navigator))

(defn- ms-get-user-media
  "Wrap `navigator.msGetUserMedia()`"
  [navigator]
  (.-msGetUserMedia navigator))

(defn- set-video-src!
  "Set the source of the video node provided as argument"
  [video src]
  (set! (.-src video) src))

(defn- set-moz-video-src-object!
  "Set the property `mozSrcObject` of the video node provided as argument"
  [video src]
  (set! (.-mozSrcObject video) src))

(defn- play-video
  "Play the stream for the video node provided as argument"
  [video]
  (.play video))

(defn- create-object-url
  "Wrap `url.createObjectURL(stream)`"
  [url stream]
  (.createObjectURL url stream))

(defn- url
  "Wrap `window.URL || window.webkitURL`"
  []
  (or (.-URL js/window)
      (.-webkitURL js/window)))

(def ^:private navigator-get-media
  "Return the proper user media function to use based on the current navigator"
  (or (get-user-media (navigator))
      (webkit-get-user-media (navigator))
      (moz-get-user-media (navigator))
      (ms-get-user-media (navigator))))

(defn- get-media
  "Wrap calls using `navigator-get-media`"
  [options on-success on-error]
  (.apply navigator-get-media
          js/navigator
          #js [(clj->js options)
               on-success
               on-error]))

(defn start-video-stream!
  "Start the video stream for the video node created internally"
  []
  (get-media {:video true
              :audio false}
             (fn [stream]
               (reset! running true)
               (if (nil? (moz-get-user-media (navigator)))
                 (set-video-src! video-node (create-object-url (url) stream))
                 (set-moz-video-src-object! video-node stream))
               (play-video video-node))
             (fn [err]
               (js/console.log "Stream failed to initialize."
                               "Is the webcam allowed to stream?"))))

(defn take-picture
  "Take a picture using the stream open when calling `start-video-stream`.
  Return a Blob object"
  [callback]
  (if @running
    (do
      (.drawImage (.getContext canvas-node "2d") video-node -80 0 640 480)
      (.toBlob canvas-node (fn [blob]
                             (callback blob))))
    nil))

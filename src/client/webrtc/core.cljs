(ns webrtc.core)

(defn- create-dom-node
  "TODO:DOC"
  [tag-name]
  (.createElement js/document tag-name))

(defn- setup-dom-objects
  "TODO:DOC"
  [video canvas]
  (let [width  640
        height 480]
   (.setAttribute video "width" width)
   (.setAttribute video "height" height)
   (.setAttribute canvas "width" width)
   (.setAttribute canvas "height" height)
   (set! (.-width canvas) width)
   (set! (.-height canvas) height)))

(def ^:private video-node (create-dom-node "video"))
(def ^:private canvas-node (create-dom-node "canvas"))

(setup-dom-objects video-node canvas-node)

(defn- navigator []
  (.-navigator js/window))

(defn- get-user-media [navigator]
  (.-getUserMedia navigator))

(defn- webkit-get-user-media [navigator]
  (.-webkitGetUserMedia navigator))

(defn- moz-get-user-media [navigator]
  (.-mozGetUserMedia navigator))

(defn- ms-get-user-media [navigator]
  (.-msGetUserMedia navigator))

(defn- set-video-src!
  "TODO:DOC"
  [video src]
  (set! (.-src video) src))

(defn- set-moz-video-src-object!
  "TODO:DOC"
  [video src]
  (set! (.-mozSrcObject video) src))

(defn- play-video
  "TODO:DOC"
  [video]
  (.play video))

(defn- create-object-url
  "TODO:DOC"
  [url stream]
  (.createObjectURL (url) stream))

(defn- url
  "TODO:DOC"
  []
  (or (.-URL js/window)
      (.-webkitURL js/window)))

(def ^:private navigator-get-media
  (or (get-user-media (navigator))
      (webkit-get-user-media (navigator))
      (moz-get-user-media (navigator))
      (ms-get-user-media (navigator))))

(defn get-media
  "TODO:DOC"
  [options on-success on-error]
  (.apply navigator-get-media 
          js/navigator
          #js [(clj->js options)
               on-success
               on-error]))

(defn start-video-stream
  "TODO:DOC"
  []
  (get-media {:video true
              :audio false}
             (fn [stream]
               (if (nil? (moz-get-user-media (navigator)))
                 (set-video-src! video-node (create-object-url url stream))
                 (set-moz-video-src-object! video-node stream)))
             (fn [err]
               (.log js/console "OOOOOPS"))))

(defn take-picture
  "TODO:DOC"
  [callback]
  (.drawImage (.getContext canvas-node "2d") video-node 0 0 640 400)
  (.toBlob canvas-node (fn [blob]
                         (callback blob))))

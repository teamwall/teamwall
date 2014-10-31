(ns repository
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cemerick.url :refer (url url-encode)]
            [cljs.core.async :as async :refer [<! >! put! chan close!]]
            [cognitect.transit :as transit]
            [goog.net.XhrIo :as xhr]
            [goog.string :as gstring]
            [goog.string.format :as gformat]
            [chord.client :as chord]))


(def ^{:private :true} login-url
  "URL for the login route"
  "/login")


(defn- GET [url]
  (let [ch (chan 1)]
    (xhr/send url
              (fn [event]
                (let [res (-> event .-target .getResponseText)]
                  (go (>! ch res)
                      (close! ch)))))
    ch))

(defn- convert-result [data]
  (let [reader (transit/reader :json)]
    (js->clj (transit/read reader
                           data)
             :keywordize-keys true)))

(defn- async-get-json [fn url]
  (go
   (fn (convert-result (<! (GET url))))))


(defn- build-login-url
  "Builds the correct URL based on the
  provided email and password"
  [email password]
  (let [full-url (str login-url "?email=%s&password=%s")]
    (gstring/format full-url
            (url-encode email)
            (url-encode password))))

(defn ^:export login
  "Do a request over the login REST API"
  [email password callback]
  (async-get-json callback
                  (build-login-url email
                                   password)))

(ns repositories.repository
  (:require [ajax.core :refer [GET POST]]
            [cemerick.url :refer (url url-encode)]
            [cognitect.transit :as transit]
            [goog.string :as gstring]
            [goog.string.format :as gformat]))


(def ^{:private :true} login-url
  "URL for the login route"
  "/login")

(defn- async-get-json
  [& {:keys [handler url error params]}]
  (let [options (atom {:handler handler
                       :response-format :json
                       :keywords? true})]
    (if-not (nil? error)
      (swap! options assoc :error-handler error))
    (if-not (nil? params)
      (swap! options assoc :params params))
    (GET url @options)))

(defn login
  "Do a request over the login REST API"
  [email password callback]
  (async-get-json :handler callback
                  :url login-url
                  :params {:email    email
                           :password password}))

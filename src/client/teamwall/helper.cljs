(ns teamwall.helper
  "Various helper functions for teamwall
  that don't belong to a specific namespace"
  (:require [goog.net.cookies :as gcookies]
            [cljs.reader :as reader]))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn get-cookie
  "Return the document cookie named COOKIE-NAME.
  Return nil if no cookie is found"
  [cookie-name]
  (or (.get goog.net.cookies (name cookie-name))
      nil))

(defn remove-cookie!
  "Remove the document cookie named COOKIE-NAME"
  [cookie-name]
  (.remove goog.net.cookies (name cookie-name)))

(ns teamwall.states
  "Store some shared states through the client application")


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^:private token (atom nil))
(def ^:private user (atom nil))

(def default-sleep-time
  "Default time between two snapshots in seconds"
  60)

(def default-timelaps
  "Default timelaps options value"
  false)


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn get-token
  "Return the value of TOKEN"
  []
  @token)

(defn set-token
  "Set the value of TOKEN"
  [value]
  (reset! token value))

(defn reset-token!
  "Set the token to nil"
  []
  (set-token nil))

(defn get-user
  "Return the value of USER"
  []
  @user)

(defn set-user
  "Set the value of USER"
  [value]
  (reset! user value))

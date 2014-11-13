(ns teamwall.states)

(def ^:private token (atom nil))
(def ^:private user (atom nil))

(defn get-token
  "Returns the value of TOKEN"
  []
  @token)

(defn set-token
  "Set the value of TOKEN"
  [value]
  (reset! token value))

(defn get-user
  "Returns the value of USER"
  []
  @user)

(defn set-user
  "Set the value of USER"
  [value]
  (reset! user value))

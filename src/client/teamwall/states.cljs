(ns teamwall.states)

(def ^:private token (atom nil))
(def ^:private user (atom nil))

(defn get-token
  []
  @token)

(defn set-token
  [value]
  (reset! token value))

(defn get-user
  []
  @user)

(defn set-user
  [value]
  (reset! user value))

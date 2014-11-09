(ns teamwall.states)

(def ^:private token (atom nil))

(defn get-token
  []
  @token)

(defn set-token
  [value]
  (reset! token value))

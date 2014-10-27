(ns teamwall.api
  (:require [clojure.string :as string]
            [teamwall.db :as db]))


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defn- extract-email-pattern
  "Extract the email pattern from an email address"
  [email]
  (let [splitted (string/split email #"@")
        domain   (last splitted)]
    (str "[^@]+@" domain)))


;;    /==================\
;;    |                  |
;;    |      PUBLIC      |
;;    |                  |
;;    \==================/


(defn get-team-members
  "Retrieve informations about the other person of the same team"
  [user]
  (let [email         (:email user)
        email-pattern (extract-email-pattern email)
        users         (db/get-users-for-email email-pattern)]
    (map (fn [user]
           {:username (:username user)
            :email    (:email user)})
         users)))

(defn set-new-photo
  "Set a new photo for the user provided as argument"
  [user photo]
  (let [tmp-file (:tempfile photo)
        size     (:size photo)
        filename (:filename photo)]
    (db/add-photo user
                  filename
                  size
                  (.getAbsolutePath tmp-file)
                  (slurp tmp-file))))

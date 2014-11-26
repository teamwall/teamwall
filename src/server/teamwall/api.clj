(ns teamwall.api
  (:require [clojure.java.io :as io]
            [clojure.string :as string]
            [pantomime.mime :as mime]
            [teamwall.db :as db])
  (:use [slingshot.slingshot :only [throw+ try+]]))


;;    /==================\
;;    |                  |
;;    |     PRIVATES     |
;;    |                  |
;;    \==================/


(defn- as-absolute-path
  "Return the absolate path of the file named FILE"
  [file]
  (.getAbsolutePath file))


;;    /==================\
;;    |                  |
;;    |      PUBLIC      |
;;    |                  |
;;    \==================/


(defn extract-email-pattern
  "Extract the email pattern from an email address"
  [email]
  (let [splitted (string/split email #"@")
        domain   (last splitted)]
    (str "[^@]+@" domain)))

(defn get-team-members
  "Return the other persons of the same team"
  [user]
  (let [email         (:email user)
        email-pattern (extract-email-pattern email)
        users         (db/get-users-for-email email-pattern)]
         users))

(defn set-new-photo
  "Set a new photo for the user provided as argument"
  [user photo]
  (let [tmp-file (:tempfile photo)
        size     (:size photo)
        filename (:filename photo)]
    (db/add-photo! user
                  filename
                  size
                  (as-absolute-path tmp-file)
                  (slurp tmp-file))))

(defn last-photo
  "Return the last photo for the user provided as argument"
  [user email]
  (let [user-pattern  (extract-email-pattern (:email user))
        email-pattern (extract-email-pattern email)]
    (if (= user-pattern email-pattern)
      (let [photo    (db/get-last-photo email)
            tempfile (:tempfile photo)
            filename (:filename photo)
            size     (:size     photo)]
        (if-not (nil? photo)
          {:status  200
           :headers {"Content-Type"   (mime/mime-type-of filename)
                     "Content-Length" (str size)}
           :body    (io/as-file tempfile)}
          (throw+ {:type   :teamwall.handler/request-error
                   :status 404})))
      (throw+ {:type   :teamwall.handler/request-error
               :status 400}))))

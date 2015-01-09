(ns teamwall.api
  "Compute client requests and eventually reverberate request to the database"
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

(defn- slurp-bytes
  "Slurp the bytes from a slurpable thing"
  [path]
  (with-open [out (java.io.ByteArrayOutputStream.)]
    (clojure.java.io/copy (clojure.java.io/input-stream path) out)
    (.toByteArray out)))


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
  [user db-settings]
  (let [email         (:email user)
        email-pattern (extract-email-pattern email)
        users         (db/get-users-for-email email-pattern
                                              db-settings)]
    users))

(defn set-new-photo
  "Set a new photo for the user provided as argument"
  [user photo db-settings]
  (let [tempfile (:tempfile photo)
        size     (:size photo)
        filename (:filename photo)
        tmp-path (as-absolute-path tempfile)]
    (db/add-photo! user
                   filename
                   size
                   (slurp-bytes tmp-path)
                   db-settings)))

(defn last-photo
  "Return the last photo for the user provided as argument"
  [user email db-settings]
  (let [user-pattern  (extract-email-pattern (:email user))
        email-pattern (extract-email-pattern email)]
    (if (= user-pattern email-pattern)
      (let [photo    (db/get-last-photo email
                                        db-settings)
            filename (:filename photo)
            content  (:content photo)
            size     (:size photo)
            resource (io/resource "public/img/user.png")]
        (if-not (nil? photo)
          {:status  200
           :headers {"Content-Type"   (mime/mime-type-of filename)
                     "Content-Length" (str size)}
           :body    (new java.io.ByteArrayInputStream content)}
          {:status  200
           :headers {"Content-Type" "image/png"}
           :body    (io/input-stream resource)}))
      (throw+ {:type   :teamwall.handler/request-error
               :status 400}))))

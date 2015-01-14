(ns teamwall.api
  "Compute client requests and eventually reverberate request to the database"
  (:require [clojure.java.io :as io]
            [clojure.string :as string]
            [pantomime.mime :as mime]
            [teamwall.db :as db])
  (:use [slingshot.slingshot :only [throw+ try+]]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/

;;; Structure of a room
;;;
;;; {:?name optional name of the room
;;;  :open? is the room already open or not
;;;  :moderator user id of the room creator
;;;  :users list of user in the room excluding the moderator
;;;  :private? is the room private or not?
;;;  :room-id unique identifier (nanoseconds of instantiation)}

;;; Structure of rooms
;;;
;;; {:@foo.com {:room-id1 room1
;;;             :room-id2 room2}
;;; {:@bar.com {:room-id3 room3
;;;             :room-id4 room4}}

(def ^:private rooms
  "Currently open rooms"
  (atom {}))


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

(defn- get-rooms-atom-for-domain
  "Retrieve the existing atom for the provided DOMAIN"
  [domain]
  (get @rooms domain))


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

(defn get-all-rooms
  "Return the list of all the existing rooms"
  [user]
  @(get-rooms-atom-for-domain (extract-email-pattern (:email user))))

(defn update-room!
  "Update the room corresponding to ID with new values"
  [user id & {:keys [?name open? users private?]}]
  (let [domain (extract-email-pattern (:email user))
        rooms (get-rooms-atom-for-domain domain)
        room (get @rooms id)
        new-room (assoc rooms
                   :?name    (if (nil? ?name)
                               (:?name room)
                               ?name)
                   :open?    (if (nil? open?)
                               (:open? room)
                               open?)
                   :users    (if (nil? users)
                               (:users room)
                               users)
                   :private? (if (nil? private?)
                               (:private? room)
                               private?))]
    (when room
      (swap! (get-rooms-atom-for-domain domain) assoc id new-room))))

(defn remove-room!
  "Remove the room corresponding to ID"
  [domain id]
  (swap! (get-rooms-atom-for-domain domain) dissoc id))

(defn create-room
  "Update the room corresponding to ID with new values"
  [user id & {:keys [?name open? users private?]}]
  (let [domain (extract-email-pattern (:email user))
        domain-rooms (get @rooms domain)
        room         {:room-id   id
                      :?name     (or ?name "")
                      :open?     (boolean open?)
                      :moderator (:email user)
                      :users     (or users [])
                      :private?  (boolean private?)}]
    (if domain-rooms
      (swap! domain-rooms assoc id room)
      (swap! rooms assoc domain {id room}))
    (println "Room" ?name "created")
    room))

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

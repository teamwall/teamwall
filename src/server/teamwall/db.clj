(ns teamwall.db
  (:require [clojurewerkz.scrypt.core :as scrypt]
            [monger.collection :as mc]
            [monger.core :as mg]
            [monger.json]
            [monger.query :as mq])
  (:use [slingshot.slingshot :only [throw+ try+]])
  (:import [com.mongodb MongoOptions ServerAddress]
           [org.bson.types ObjectId]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^:private db-name
  "Private: name of the mongo db to use"
  "teamwall")
(def ^:private db-users
  "Private: name of the user mongo collection"
  "teamwallUsers")
(def ^:private db-photos
  "Private: name of the photo mongo collection"
  "teamwallPhotos")


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- connect-to-mongo
  "Connects to the mongoDB instance"
  []
  (mg/connect))

(defn- hashed-password
  "Generates a hashed password using Scrypt
  (https://www.tarsnap.com/scrypt/scrypt.pdf)"
  [password salt]
  (scrypt/encrypt (str password salt)
                  16384
                  8
                  1))

(defn- valid-password?
  "Checks if the provided password matches the provided hash"
  [password salt pw-hash]
  (if (nil? pw-hash)
    false
    (scrypt/verify (str password salt)
                   pw-hash)))


;;    /==================\
;;    |                  |
;;    |      PUBLIC      |
;;    |                  |
;;    \==================/


(defn register-user
  "Adds a new user to the user database"
  [username password email salt]
  (let [conn (connect-to-mongo)
        db   (mg/get-db conn db-name)
        user {:_id      email
              :username username
              :email    email
              :status   :offline
              :hash     (hashed-password password salt)}]
    (mc/insert db
               db-users
               user)
    (mg/disconnect conn)
    user))

(defn retrieve-user
  "Retrieves a user from the database using its email and password"
  [email password salt]
  (let [conn (connect-to-mongo)
        db   (mg/get-db conn db-name)
        user (mc/find-one-as-map db
                                 db-users
                                 {:email email})
        valid-password? (valid-password? password
                                         salt
                                         (:hash user))
        valid-user?     (and
                         (not (nil? user))
                         valid-password?)]
    (mg/disconnect conn)
    (if valid-user?
      user
      (throw+ {:type            ::login-failed
               :email           email
               :valid-password? valid-password?}))))

(defn update-status
  "Update the status of the provided USER to the new VALUE"
  [user value]
  (let [conn (connect-to-mongo)
        db   (mg/get-db conn db-name)]
    (mc/update-by-id db
               db-users
               (:email user)
               {:status value})
    (mg/disconnect conn)))

(defn get-users-for-email
  "Retrieve all the users whose email match the pattern provided"
  [pattern]
  (let [conn  (connect-to-mongo)
        db    (mg/get-db conn db-name)
        users (mc/find-maps db
                            db-users
                            {:email (re-pattern pattern)})]
    users))

(defn add-photo
  "Stores a new photo for the provided user.
  If timelaps is false, erase first all the other photos"
  [user filename size tempfile photo]
  (let [conn     (connect-to-mongo)
        db       (mg/get-db conn db-name)
        timelaps (:timelaps user)]
    (if-not timelaps
      (mc/remove db
                 db-photos
                 {:user-id (:email user)}))
    (mc/insert db
               db-photos
               {:_id      (ObjectId.)
                :user-id  (:email user)
                :filename filename
                :size     size
                :tempfile tempfile
                :content  photo})
    (mg/disconnect conn)))

(defn get-last-photo
  "Returns the last photo of the user provided as argument"
  [email]
  (let [conn   (connect-to-mongo)
        db     (mg/get-db conn db-name)
        photo  (mq/with-collection db db-photos
                 (mq/find {:user-id email})
                 (mq/sort (array-map :_id -1))
                 (mq/limit 1))
        result (first photo)]
    (mg/disconnect conn)
    result))

;;    /==================\
;;    |                  |
;;    |       TEST       |
;;    |                  |
;;    \==================/


(comment
  (try+
   (register-user "Bob"
                  "password"
                  "email@email.com"
                  "salt")
   (println (retrieve-user "email@email.com"
                           "password"
                           "salt"))
   (println (retrieve-user "email2@email.com"
                           "password"
                           "salt"))
   (catch [:type :teamwall.db/login-failed] {:keys [email]}
     (println (str "Email \""
                   email
                   "\" not found or password incorrect"))))
  )

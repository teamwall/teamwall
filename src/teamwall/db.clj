(ns teamwall.db
  (:require [clojurewerkz.scrypt.core :as scrypt]
            [monger.collection :as mc]
            [monger.core :as mg])
  (:use [slingshot.slingshot :only [throw+ try+]])
  (:import [com.mongodb MongoOptions ServerAddress]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^{:private true} db-name "teamwall")
(def ^{:private true} db-users "teamwallUsers")


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
  "Generates a hashed password using Scrypt (https://www.tarsnap.com/scrypt/scrypt.pdf)"
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
        db   (mg/get-db conn db-name)]
    (mc/insert-and-return db
                          db-users
                          {:_id      email
                           :username username
                           :email    email
                           :hash     (hashed-password password salt)})
    (mg/disconnect conn)))

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
                         (not (nil? user ))
                         valid-password?)]
    (mg/disconnect conn)
    (if valid-user?
      user
      (throw+ {:type ::login-failed
               :email email
               :valid-password? valid-password?
               }))))


(defn get-users-for-email
  "Retrieve all the users whose email match the pattern provided"
  [pattern]
  (let [conn  (connect-to-mongo)
        db    (mg/get-db conn db-name)
        users (mc/find-maps db
                            db-users
                            {:email (re-pattern pattern)})]
    users))

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

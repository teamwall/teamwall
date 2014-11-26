(ns teamwall.serializer
  (:use [clojure.java.io])
  (:import [java.io File]))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- serialize
  "Serialize value, returns a byte array"
  [v]
  (let [buff (java.io.ByteArrayOutputStream. 1024)]
    (with-open [dos (java.io.ObjectOutputStream. buff)]
      (.writeObject dos v))
    (.toByteArray buff)))

(defn- deserialize
  "Accept a byte array, returns deserialized value"
  [bytes]
  (with-open [dis (java.io.ObjectInputStream.
                   (java.io.ByteArrayInputStream. bytes))]
    (.readObject dis)))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn serializable?
  "Check if V is serializale"
  [v]
  (instance? java.io.Serializable v))

(defn write-in-file
  "Write the object O into the file PATH via a ByteArray"
  [o path]
  (if-not (.exists (as-file path))
    (.createNewFile (new File path)))
  (let [buffer (serialize o)]
    (with-open [stream (output-stream path)]
      (.write stream buffer)))
  o)

(defn read-from-file
  "Read the file PATH via a ByteArray"
  [path]
  (with-open [out (java.io.ByteArrayOutputStream.)]
    (clojure.java.io/copy (clojure.java.io/input-stream path) out)
    (deserialize (.toByteArray out))))

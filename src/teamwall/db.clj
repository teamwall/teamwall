(ns teamwall.db
  (:require [monger.collection :as mc]
            [monger.core :as mg]
            [test.test_data :as td]
            [clojure.data.json :as json])
  ;;   (:gen-class
  ;;    :exposes-methods {render-app render-app})
  (:import [com.mongodb MongoOptions ServerAddress]))

(defn- fetch-all-projects []
  [ (td/empty-project) (td/project-with-task)])

(defn all-projects[]
  (json/write-str (fetch-all-projects)))

(defn log-user [email password salt]

  )

;;
;; Test
;;

(comment
  (fetch-all-projects)
  )

(ns teamwall.handler
  (:require [clojure.java.io :as io]
            [compojure.core :refer :all]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [teamwall.login :as login]
            [teamwall.serializer :as serializer]
            [teamwall.settings :as settings]))


(def ^{:private true} setting-file-name "settings.tw")

(defn- default-settings
  "Generates a new default setting map"
  []
  {:salt (str (java.util.UUID/randomUUID))})


(defn- check-settings
"Checks the existence of a setting file"
  []
  (let [file-exists? (.exists (io/as-file setting-file-name))]
    (if file-exists?
      (def ^{:private true} settings (serializer/read-from-file setting-file-name))
      (do
        (def ^{:private true} settings (default-settings))
        (serializer/write-in-file settings setting-file-name)))))



(defroutes app-routes

  (POST "/login"
        {params :params}
        (login/login (:email params)
                     (:password params)))

  (route/resources "/")
  (route/not-found "Not Found Yet"))

;; (def app
;;   (wrap-defaults app-routes site-defaults))

(def app
   (site app-routes))

;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/

(defn- main
  "Initialiization of the server"
  []
  (check-settings))

(main)

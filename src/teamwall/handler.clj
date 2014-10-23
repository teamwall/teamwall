(ns teamwall.handler
  (:require [cheshire.core :refer :all]
            [compojure.core :refer :all]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [ring.middleware.anti-forgery :refer :all]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.session.cookie :refer (cookie-store)]
            [teamwall.login :as login]))


;;             [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(defroutes app-routes

  (POST "/login"
        {params :params}
        (login/login (:email params)
                     (:password params)))
  (GET "/get-cookie"
       []
       (generate-string {:csrf-token
                         *anti-forgery-token*}))
  (route/resources "/")
  (route/not-found "Not Found Yet"))

;; (def app
;;   (wrap-defaults app-routes site-defaults))

(def app
  (->
   (site app-routes)
   (wrap-anti-forgery)
   (wrap-session {:cookie-attrs {:max-age 3600}
                  :store (cookie-store {:key "ahY9poQuaghahc7I"})})))

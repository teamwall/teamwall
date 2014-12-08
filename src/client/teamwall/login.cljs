(ns teamwall.login
  (:require [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def error-message (atom ""))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- on-error
  "Display the error message in the form"
  [error]
  (reset! error-message "Email or password incorrect"))

(defn- submit-action
  "Submit the login info to the server"
  [event email password on-login]
  (.preventDefault event)
  (reset! error-message nil)
  (repository/login email
                    password
                    on-login
                    on-error))

(defn- render-form
  "Render the login form"
  [on-login]
  (let [email    (reagent/atom "")
        password (reagent/atom "")]
    [:form {:name       "login-form"}
     "Email: "
     [:input {:type      "email"
              :on-change #(reset! email (-> % .-target .-value))
              :name      "email"}]
     "Password: "
     [:input {:type      "password"
              :on-change #(reset! password (-> % .-target .-value))
              :name      "password"}]
     [:input {:type      "submit"
              :on-click  (fn [event] (submit-action event
                                                   @email
                                                   @password
                                                   on-login))
              :value    "Log in"}]]))

(defn- render-error
  "Render the login error"
  []
  [:div.error.login-error @error-message])


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function"
  [on-login]
  [:div.login
   [:h1 "Login"]
   [render-form on-login]
   [render-error]])

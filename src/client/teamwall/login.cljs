(ns teamwall.login
  (:require [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]))


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- submit-action
  "Callback invoked when the user submit the login form"
  [event email password on-login]
  (.preventDefault event)
  (repository/login email
                    password
                    on-login))

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
   [render-form on-login]])

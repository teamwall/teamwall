(ns teamwall.login
  (:require [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def error-message (atom nil))


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

(defn- render-email-input
  "Render the email input"
  [data]
  [:input {:type        "email"
                :class       "form-control"
                :placeholder "Email address"
                :on-change   #(reset! data (-> % .-target .-value))
                :id          "email"}])

(defn- render-form
  "Render the login form"
  [on-login]
  (let [email    (reagent/atom "")
        password (reagent/atom "")]
    [:div.login-form
     [:form {:name "login-form"
             :role "form"}
      [:div.form-group
       [:label {:for "email"}"Email: "]
       [(with-meta render-email-input
          {:component-did-mount #(.focus (reagent/dom-node %))}) email]]

      [:div.form-group
       [:label {:for "password"}"Password:"]
       [:input {:type        "password"
                :class       "form-control"
                :on-change   #(reset! password (-> % .-target .-value))
                :placeholder "Password"
                :id          "password"}]]

      [:button {:type      "submit"
                :class     "btn btn-default pull-right"
                :on-click  (fn [event]
                             (submit-action event
                                            @email
                                            @password
                                            on-login))}
       "Log in"]]]))

(defn- render-error
  "Render the login error"
  []
  (if (nil? @error-message)
    [:div.hidden.alert.alert-danger @error-message]
    [:div.alert.alert-danger @error-message]))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function"
  [on-login]
  [:div.login.col-sm-4.col-sm-offset-4
   [:h1
    "Login"
    [:i.fa.fa-unlock-alt]]
   [render-form on-login]
   [render-error]])

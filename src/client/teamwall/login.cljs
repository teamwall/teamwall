(ns teamwall.login
  "Render the login page and handle the login request"
  (:require [crate.core :as crate]
            [dommy.core :as dommy :refer-macros [sel sel1]]
            [formidable.core :as f]
            [formidable.dom :as fd]
            [reagent.core :as reagent :refer [atom]]
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
  [info on-login]
  (reset! error-message nil)
  (repository/login (:email info)
                    (:password info)
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

(def settings-form
  "Settings form specification"
  {:renderer :bootstrap3-stacked
   :fields [{:name :email :type :email}
            {:name :password :type :password}]
   :validations [[:required [:email :password]]]})

(defn- render-link-to-register
  "Render the link to register page"
  []
  [:div.register-link
   [:a {:href "/register"} "Register a new mate"]])

(defn- render-error
  "Render the login error"
  []
  (if (nil? @error-message)
    [:div.hidden.alert.alert-danger.error-message @error-message]
    [:div.alert.alert-danger.error-message @error-message]))

(defn- render-settings-form
  "Render the settings form"
  []
  (f/render-form settings-form))

(defn- render-form-container
  "Render the registration form container"
  []
  [:div#login-form-container.clearfix])

(defn- when-form-container-mounted
  "Callback performed when the form container is successfully mounted"
  [node on-login]
  (when-let [container (sel1 "#login-form-container")]
    (dommy/append! container
                   (crate/html (render-settings-form)))
    (fd/handle-submit settings-form
                      container
                      (fn [info]
                        (submit-action info
                                       on-login)))))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function"
  [on-login]
  [:div.login.clearfix.col-sm-4.col-sm-offset-4
   [:h1
    "Login"
    [:i.fa.fa-unlock-alt]]
   [render-error]
   [(with-meta render-form-container
      {:component-did-mount (fn [node]
                              (when-form-container-mounted node
                                                           on-login))})]
   [render-link-to-register]])

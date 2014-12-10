(ns teamwall.register
  (:require [crate.core :as crate]
            [dommy.core :as dommy :refer-macros [sel sel1]]
            [formative.core :as f]
            [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]
            [teamwall.formative :as fd]))


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

(defn- on-register
  "Display the LOGIN message in the form"
  [error]
  (reset! error-message "Email or password incorrect"))

(defn- submit-action
  "Submit the login info to the server"
  [event email password]
  (.preventDefault event)
  (reset! error-message nil)
  (repository/register ""
                       email
                       password
                       on-register
                       on-error))

(def register-form
  "Register form specification"
  {:renderer :bootstrap3-stacked
   :fields [{:name :full-name}
            {:name "user[email]" :type :email}
            {:name :password :type :password}
            {:name :password-confirm :type :password}]
   :validations [[:required [:full-name "user[email]" :password]]
                 [:min-length 8 :password]
                 [:equal [:password :password-confirm]]]})

(defn- render-error
  "Render the login error"
  []
  (if (nil? @error-message)
    [:div.hidden.alert.alert-danger @error-message]
    [:div.alert.alert-danger @error-message]))

(defn- render-register-form
  "Render the register form"
  []
  (f/render-form register-form))

(defn- render-form-container
  "Render the registration form container"
  []
  [:div#register-form-container.clearfix])

(defn- when-form-container-mounted
  "Callback performed when the form container is successfully mounted"
  [node]
  (js/console.log "Rendering")
  (when-let [container (sel1 "#register-form-container")]
    (dommy/append! container
                   (crate/html (render-register-form)))
    (fd/handle-submit register-form
                      container
                      (fn [params]
                        (js/alert (pr-str params)))
                      )))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function"
  []
  [:div.register.clearfix.col-sm-4.col-sm-offset-4
   [:h1
    "Register a new teammate"
    [:i.fa.fa-user]]
   [(with-meta render-form-container
      {:component-did-mount when-form-container-mounted})]
   [render-error]])

(ns teamwall.register
  (:require [crate.core :as crate]
            [dommy.core :as dommy :refer-macros [sel sel1]]
            [formidable.core :as f]
            [reagent.core :as reagent :refer [atom]]
            [repositories.repository :as repository]
            [secretary.core :as secretary]
            [formidable.dom :as fd]))


;;    /==================\
;;    |                  |
;;    |       VARS       |
;;    |                  |
;;    \==================/


(def ^:private error-message
  "Error message state holder"
  (atom nil))

(def ^:private lowercase-error-message
  "Error message when no lowercase letter"
  "must contain at least one lowercase letter")

(def ^:private uppercase-error-message
  "Error message when no uppercase letter"
  "must contain at least one uppercase letter")

(def ^:private number-error-message
  "Error message when no number"
  "must contain at least one number")

(def ^:private special-error-message
  "Error message when no special character"
  "must contain at least special character among: !?@#$%'\"`~&*+=-_()[]{}<>")

(def ^:private special-regex
  "Regex for special characters"
  #".*[!?@#$%'\"`~&*+=-_\(\)\[\]\{\}\<\>].*")


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn- on-error
  "Display the error message in the form"
  [error]
  (reset! error-message "Email already used"))

(defn- on-register
  "Callback invoked when the register is successful"
  []
  (.pushState js/history {} "" "/")
  (secretary/dispatch! "/"))

(defn- submit-action
  "Submit the login info to the server"
  [info]
  (reset! error-message nil)
  (repository/register (:username info)
                       (:email info)
                       (:password info)
                       on-register
                       on-error))

(def register-form
  "Register form specification"
  {:renderer :bootstrap3-stacked
   :fields [{:name :username}
            {:name :email :type :email}
            {:name :password :type :password}
            {:name :password-confirm :type :password}]
   :validations [[:required [:username :email :password]]
                 [:email :email]
                 [:min-length 8 :password]
                 [:max-length 128 :password]
                 [:matches #".*[a-z].*" :password lowercase-error-message]
                 [:matches #".*[A-Z].*" :password uppercase-error-message]
                 [:matches #".*[0-9].*" :password number-error-message]
                 [:matches special-regex :password special-error-message]
                 [:equal [:password :password-confirm]]]})

(defn- render-error
  "Render the login error"
  []
  (if (nil? @error-message)
    [:div.hidden.alert.alert-danger.error-message @error-message]
    [:div.alert.alert-danger.error-message @error-message]))

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
  (when-let [container (sel1 "#register-form-container")]
    (dommy/append! container
                   (crate/html (render-register-form)))
    (fd/handle-submit register-form
                      container
                      submit-action)))


;;    /==================\
;;    |                  |
;;    |       MAIN       |
;;    |                  |
;;    \==================/


(defn render-content
  "Main rendering function"
  []
  [:div.register.clearfix.col-md-4.col-md-offset-4
   [:h1
    "Register a new teammate"
    [:i.fa.fa-user]]
   [(with-meta render-form-container
      {:component-did-mount when-form-container-mounted})]
   [render-error]])

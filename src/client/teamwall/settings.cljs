(ns teamwall.settings
  (:require  [crate.core :as crate]
             [dommy.core :as dommy :refer-macros [sel sel1]]
             [formidable.core :as f]
             [formidable.dom :as fd]
             [reagent.core :as reagent :refer [atom]]
             [repositories.repository :as repository]
             [secretary.core :as secretary]
             [teamwall.states :as states]))


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


(defn- sleep-time-validator [values]
  (let [sleep-time (:sleep-time values)
        error (js/isNaN (:sleep-time values))]
    (when error
      {:keys [:sleep-time] :msg "Sleep time must be an integer"})))

(defn- on-error
  "Display the error message in the form"
  [error]
  (reset! error-message (str (:status error) " - " (:status-text error))))

(defn- on-save-settings
  "Callback invoked when the settings is successfully saved"
  [user]
  (states/set-user user)
  (.pushState js/history {} "" "/")
  (secretary/dispatch! "/"))

(defn- submit-action
  "Submit the login info to the server"
  [info]
  (reset! error-message nil)
  (repository/save-settings (states/get-token)
                            (states/get-user)
                            info
                            on-save-settings
                            on-error))

(def settings-form
  "Settings form specification"
  {:renderer :bootstrap3-stacked
   :cancel-href "/"
   :fields [{:name :h1 :type :heading :text "App settings"}
            {:name :sleep-time :placeholder "60" :label "Sleep time (in seconds)" }
            {:name :timelaps :type :checkbox :label "Store daily pictures to make a animated timelaps"}]
   :validations [[:required [:sleep-time]]]
   :validator sleep-time-validator})

(defn- render-error
  "Render the login error"
  []
  (if (nil? @error-message)
    [:div.hidden.alert.alert-danger.error-message @error-message]
    [:div.alert.alert-danger.error-message @error-message]))

(defn- render-settings-form
  "Render the settings form"
  []
  (let [sleep-time (-> (states/get-user)
                       :settings
                       :sleep-time)
        sleep-time (or sleep-time
                       (/ states/default-snapshot-sleep-time 1000))]
    (f/render-form (assoc settings-form
                     :values {:sleep-time sleep-time}))))

(defn- render-form-container
  "Render the registration form container"
  []
  [:div#settings-form-container.clearfix])

(defn- when-form-container-mounted
  "Callback performed when the form container is successfully mounted"
  [node]
  (when-let [container (sel1 "#settings-form-container")]
    (dommy/append! container
                   (crate/html (render-settings-form)))
    (fd/handle-submit settings-form
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
  [:div.settings.clearfix.col-md-4.col-md-offset-4
   [:h1
    "Settings"
    [:i.fa.fa-user]]
   [render-error]
   [(with-meta render-form-container
      {:component-did-mount when-form-container-mounted})]])

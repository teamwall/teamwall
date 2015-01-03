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


;;    /==================\
;;    |                  |
;;    |      PRIVATE     |
;;    |                  |
;;    \==================/


(defn ^{:export  true
        :private true} redirect-to-wall
  "Redirect the current page to the wall"
  []
  (.pushState js/history {} "" "/")
  (secretary/dispatch! "/"))

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
  (redirect-to-wall))

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
   :cancel-options {:onclick "teamwall.settings.redirect_to_wall()"}
   :fields [{:name :h1
             :type :heading
             :text "App settings"}
            {:name :sleep-time
             :placeholder "60"
             :label "Sleep time (in seconds)" }
            {:name :timelaps
             :type :checkbox
             :label "Store daily pictures to make a animated timelaps"}]
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
  (let [user       (states/get-user)
        sleep-time (-> user
                       :settings
                       :sleep-time)
        sleep-time (or sleep-time
                       states/default-sleep-time)
        timelaps   (-> user
                       :settings
                       :timelaps)
        timelaps   (or timelaps
                       states/default-timelaps)]
    (f/render-form (assoc settings-form
                     :values {:sleep-time sleep-time
                              :timelaps   timelaps}))))

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
   [:h1 "Settings"]
   [render-error]
   [(with-meta render-form-container
      {:component-did-mount when-form-container-mounted})]])

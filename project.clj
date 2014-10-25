(defproject teamwall "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[cheshire "5.2.0"]
                 [clojurewerkz/scrypt "1.2.0"]
                 [com.novemberain/monger "2.0.0"]
                 [compojure "1.2.0"]
                 [org.clojure/clojure "1.6.0"]
                 [ring-anti-forgery "0.3.0"]
                 [ring/ring-defaults "0.1.2"]
                 [slingshot "0.12.1"]]
  :plugins [[lein-ring "0.8.13"]]
  :ring {:handler teamwall.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})

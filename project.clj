(defproject teamwall "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[cljs-ajax "0.3.3"]
                 [cheshire "5.3.1"]
                 [clj-http "1.0.1"]
                 [cljs-http "0.1.19"]
                 [clojurewerkz/scrypt "1.2.0"]
                 [com.cemerick/url "0.1.1"]
                 [com.cognitect/transit-cljs "0.8.188"]
                 [com.novemberain/monger "2.0.0"]
                 [com.novemberain/pantomime "2.3.0"]
                 [com.taoensso/sente "1.2.0"]
                 [compojure "1.2.1"]
                 [crypto-random "1.2.0"]
                 [http-kit "2.1.19"]
                 [org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2371"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [org.clojure/core.match "0.2.2"]
                 [prismatic/dommy "1.0.0"]
                 [secretary "1.2.1"]
                 [reagent "0.4.3"]
                 [ring "1.3.1"]
                 [slingshot "0.12.1"]]
  :plugins [[codox "0.8.10"]
            [lein-bikeshed "0.2.0"]
            [lein-cljsbuild "1.0.3"]
            [lein-kibit "0.0.8"]
            [lein-ring "0.8.13"]]
  :main teamwall.handler
  :source-paths ["src/server"]
  :cljsbuild {
    :builds {
      :main {
        :source-paths ["src/client"]
        :compiler {:output-to "resources/public/js/cljs.js"
                   :output-dir "resources/public/js/"
                   :optimizations :simple
                   :source-map "resources/public/js/cljs.js.map"
                   :pretty-print true}
        :jar true}}}
  :profiles {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                  [midje "1.6.3"]
                                  [ring/ring-codec "1.0.0"]
                                  [ring-mock "0.1.5"]]
                   :plugins [[lein-midje "3.1.3"]]}
             :doc-cljs {:codox {:language :clojurescript
                                :include [repositories.repository
                                          teamwall.client
                                          teamwall.helper
                                          teamwall.login
                                          teamwall.states
                                          teamwall.wall
                                          webrtc.core]
                                :defaults {:doc "**FIXME: write docs**"
                                           :doc/format :markdown}
                                :sources ["src/client"]
                                :output-dir "doc/client"
                                :src-dir-uri "https://github.com/teamwall/teamwall/blob/master/"
                                :src-linenum-anchor-prefix "L"}}
             :doc-clj {:codox {:defaults {:doc "**FIXME: write docs**"
                                          :doc/format :markdown}
                               :sources ["src/server"]
                               :output-dir "doc/server"
                               :src-dir-uri "https://github.com/teamwall/teamwall/blob/master/"
                               :src-linenum-anchor-prefix "L"}}}
  :aliases {"doc" ["do"
                   ["with-profile" "doc-cljs" "doc"]
                   ["with-profile" "doc-clj" "doc"]]})

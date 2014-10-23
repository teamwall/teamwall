(ns test.test_data)

;;
;; Task
;;

(defn task []
  {:id 0
   :indentation 0
   :name "Task"
   :parent nil
   :project 0
   :sub-tasks []
   :type "task"})

;;
;; Project
;;

(defn empty-project []
  {:id 0
   :indentation 0
   :name "Empty Project"
   :progression "sequential"
   :sub-projects []
   :tasks []
   :type "project"})

(defn project-with-task []
  {:id 1
   :indentation 0
   :name "Project with task"
   :progression "sequential"
   :sub-projects []
   :tasks [(task)]
   :type "project"})

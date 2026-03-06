package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"backend/services"
)



func CreateTaskHandler(w http.ResponseWriter, r *http.Request,Models.task) {

	var task Task

	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	service.CreateTask(task)
}


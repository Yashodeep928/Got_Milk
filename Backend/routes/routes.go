package routes

import (
	"net/http"
	"backend/handlers"
)

func RegisterRoutes() {

	http.HandleFunc("/task/post", handlers.CreateTaskHandler)

}
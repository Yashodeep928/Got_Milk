package routes

import (
	"net/http"
	//  "github.com/Yashodeep/Got_Milk/backend/handlers"
)

func RegisterRoutes() {

	http.HandleFunc("/task/post", taskHandler.CreateTaskHandler)

}
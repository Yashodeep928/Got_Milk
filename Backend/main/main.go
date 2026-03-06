package main

import (
	"log"
	"net/http"
	"backend/config"
	"backend/routes"
)

func main() {

	db := config.DbConnect()

	defer db.Close()
	router := routes.RegisterRoutes()

	log.Println("Server running")

	http.ListenAndServe(":8080", nil)
}
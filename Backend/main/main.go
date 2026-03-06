package main

import (
	"log"
	"backend/config"
)

func main() {

	db := config.DbConnect()

	defer db.Close()

	log.Println("Server running")
}
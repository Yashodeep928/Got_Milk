package main

import (
	"log"
	"net/http"

	"backend/config"
	"backend/routes"
)


func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {

	db := config.DbConnect()
	defer db.Close()

	router := routes.RegisterRoutes(db)
	handler := withCORS(router)

	log.Println("Server running on port 8080")

	err := http.ListenAndServe(":8080", handler)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}
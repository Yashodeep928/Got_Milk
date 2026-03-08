package routes

import (
	"net/http"

	"backend/handlers"
	"github.com/jackc/pgx/v5/pgxpool"
)

func RegisterRoutes(db *pgxpool.Pool) *http.ServeMux {

	router := http.NewServeMux()

	router.HandleFunc("/tasks/post", handlers.CreateTaskHandler(db))

	return router
}
package repository

import (
	"context"

	"backend/models"
	"github.com/jackc/pgx/v5/pgxpool"
)

func CreateTask(db *pgxpool.Pool, task models.Task) error {

	query := `
	INSERT INTO tasks(title, frequency, day_of_month)
	VALUES($1,$2,$3)
	`

	_, err := db.Exec(
		context.Background(),
		query,
		task.Title,
		task.Frequency,
		task.DayOfMonth,
	)

	if err != nil {
		return err
	}

	return nil
}
package services

import (
	"errors"

	"backend/models"
	"backend/repository"
	"github.com/jackc/pgx/v5/pgxpool"
)

func CreateTask(db *pgxpool.Pool, task models.Task) error {
	if task.Frequency == "Monthly" && task.DayOfMonth == 0 {
		return errors.New("day_of_month is required for monthly tasks")
	}

	if err := repository.CreateTask(db, task); err != nil {
		return err
	}

	return nil
}
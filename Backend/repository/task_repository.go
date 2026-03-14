package repository

import (
	"context"
	"time"

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


func GetAllTasks(db *pgxpool.Pool, task models.Task) ([]models.Task, error) {

	query := `SELECT * FROM tasks WHERE title=$1 AND frequency=$2`
      
	rows, err := db.Query(
	context.Background(),
	query,
	task.Title,
    task.Frequency,
)

if err != nil {
	return nil, err
}

defer rows.Close()

var tasks []models.Task

for rows.Next(){
	var task models.Task

	err := rows.Scan(
		task.ID,
		task.Title,
		task.Frequency,
		task.DayOfMonth,
	)
	if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks,nil

}



func GetTodayTasks(db *pgxpool.Pool) ([]models.Task, error) {
	today := time.Now().Day()

	query := `
		SELECT id, title, frequency, day_of_month, created_at
		FROM tasks
		WHERE frequency = 'daily'
		   OR (frequency = 'monthly' AND day_of_month = $1)
	`

	rows, err := db.Query(
		context.Background(),
		query,
		today,
	)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	tasks := []models.Task{} 

	for rows.Next() {
		var task models.Task

		err := rows.Scan(
			&task.ID,
			&task.Title,
			&task.Frequency,
			&task.DayOfMonth,
			&task.CreatedAt,
		)
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return tasks, nil
}

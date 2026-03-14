package models

import "time"

type Task struct {
	ID         int       `json:"id"`
	Title      string    `json:"title"`
	Frequency  string    `json:"frequency"`
	DayOfMonth *int      `json:"day_of_month"`
	CreatedAt  time.Time `json:"created_at"`
}
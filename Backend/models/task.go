package models

type Task struct {
	Title      string `json:"title"`
	Frequency  string `json:"frequency"`
	DayOfMonth int    `json:"day_of_month"`
}
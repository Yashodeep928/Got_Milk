package models

type Task struct {
	ID          int `json:"Id"`
	Title      string `json:"title"`
	Frequency  string `json:"frequency"`
	DayOfMonth int    `json:"day_of_month"`
}
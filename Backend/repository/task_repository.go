package repository
import(
	"backend/models"
)

func CreateTask(task models.Task) {

    query := `
        INSERT INTO tasks(title, frequency, day_of_month)
        VALUES($1,$2,$3)
    `

    db.Exec(query, task.Title, task.Frequency, task.DayOfMonth)

}
package services
import(
	"backend/models"
)

func CreateTask(task models.Task) {

    if task.Frequency == "monthly" && task.DayOfMonth == 0 {
        return error
    }

    repository.CreateTask(task)

}
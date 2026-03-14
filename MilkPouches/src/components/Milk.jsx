import './Milk.css'
import { useEffect, useState } from 'react'

function Milk() {
  const d = new Date()
  const formated = d.toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    frequency: 'daily',
    day_of_month: null
  })

  const openTaskModal = () => {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks/today")

        if (!response.ok) {
          throw new Error("Failed to fetch tasks")
        }

        const data = await response.json()

        const tasksWithStatus = data.map(task => ({
          ...task,
          status: null
        }))

        setTasks(tasksWithStatus)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchTodayTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) return

 
    if (
      formData.frequency === "monthly" &&
      (!formData.day_of_month || formData.day_of_month < 1 || formData.day_of_month > 31)
    ) {
      alert("Please enter a valid date between 1 and 31")
      return
    }

    const taskData = {
      title: formData.title,
      frequency: formData.frequency,
      day_of_month: formData.frequency === "monthly" ? formData.day_of_month : null
    }

    try {
      const response = await fetch("http://localhost:8080/tasks/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      const data = await response.json()
      console.log("Created task:", data)

      // Only add instantly if it should appear today
      const today = new Date().getDate()

      const shouldAppearToday =
        data.frequency === "daily" ||
        (data.frequency === "monthly" && Number(data.day_of_month) === today)

      if (shouldAppearToday) {
        setTasks(prev => [
          ...prev,
          {
            ...data,
            status: null
          }
        ])
      }

      setFormData({
        title: '',
        frequency: 'daily',
        day_of_month: null
      })

      setShowModal(false)
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]:
        name === "day_of_month"
          ? (value === '' ? null : Number(value))
          : value
    }))
  }

  const madeYes = (index) => {
    setTasks(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, status: 'yes' } : task
      )
    )
  }

  const madeNo = (index) => {
    setTasks(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, status: 'no' } : task
      )
    )
  }

  return (
    <div className="container">
      <div className="date">
        {formated}
      </div>

      <button onClick={openTaskModal} className='task-btn'>
        Add task
      </button>

      <div className="milk-box">
        {tasks.length === 0 && (
          <p>No tasks for today</p>
        )}

        <ul className='list-of-items'>
          {tasks.map((task, index) => (
            <li key={task.id || index} className='items'>
              <div className="item">
                <p>{task.title}</p>
                <small>
                  {task.frequency === "daily" ? "Everyday" : `Monthly (${task.day_of_month})`}
                </small>
              </div>

              <div className="btn-group">
                <button
                  disabled={task.status === 'no'}
                  onClick={() => madeYes(index)}
                  className='btn one'
                >
                  Yes
                </button>

                <button
                  disabled={task.status === 'yes'}
                  onClick={() => madeNo(index)}
                  className='btn second'
                >
                  No
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={() => setShowModal(false)}
        className={`overlay ${showModal ? "show" : ""}`}
      >
        <form
          onSubmit={handleSubmit}
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="write your task here"
          />

          <label htmlFor="frequency">Frequency</label>
          <select
            value={formData.frequency}
            name="frequency"
            id="frequency"
            onChange={handleChange}
          >
            <option value="daily">Everyday</option>
            <option value="monthly">Monthly</option>
          </select>

          {formData.frequency === "monthly" && (
            <div className="day-of-month">
              <label htmlFor="day_of_month">Select date</label>

              <input
                type="number"
                name="day_of_month"
                id="day_of_month"
                min="1"
                max="31"
                value={formData.day_of_month ?? ''}
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Milk

import './Milk.css'
import { useState } from 'react'

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
    frequency: 'Everyday',
    day_of_month: 0
  })

  const openTaskModal = () => {
    setShowModal(prev => !prev)
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!formData.title.trim()) return

  const taskData = {
    ...formData,
    status: null
  }

  setTasks(prev => [...prev, taskData])

  try {
    const response = await fetch("http://localhost:8080/tasks/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskData)
    })

    const data = await response.json()
    console.log(data)
   


  } catch (error) {
    console.error("Error:", error)
  }

  setFormData({
    title: '',
    frequency: 'Everyday',
    day_of_month: 0
  })

  setShowModal(false)
}

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
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
console.log(formData.frequency)
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
          <p>No tasks yet</p>
        )}

        <ul className='list-of-items'>
          {tasks.map((task, index) => (
            <li key={index} className='items'>

              <div className="item">
                <p>{task.title}</p>
                <small>{task.frequency}</small>
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
            <option value="Everyday">Everyday</option>
            <option value="Monthly">Monthly</option>
          </select>

          {formData.frequency === "Monthly" && (
            <div className="day-of-month ">
              <label htmlFor="day_of_month">Select date</label>

              <input
                type="number"
                name="day_of_month"
                id="day_of_month"
                min="1"
                max="31"
                value={formData.day_of_month}
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


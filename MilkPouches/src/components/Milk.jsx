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
  const [showCalendar,setShowCalendar] = useState(false)
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    frequency: 'Everyday'
  })

  const openTaskModal = () => {
    setShowModal(prev => !prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim()) return

    setTasks(prev => [
      ...prev,
      {
        ...formData,
        status: null   
      }
    ])

    setFormData({
      title: '',
      frequency: 'Everyday'
    })

    setShowModal(false)
  }

  const handleChange = (e) => {
  const { name, value } = e.target

  setFormData(prev => ({
    ...prev,
    [name]: value
  }))

  if (name === "frequency") {
    if (value === "Monthly") {
      setShowCalendar(true)
    } else {
      setShowCalendar(false)
    }
  }
}

  const madeYes = (index) => {
    setTasks(prev => prev.map((task,i)=> i===index ? {...task,status:'yes'} :task ))
  }

  const madeNo = (index) => {
    setTasks(prev =>
      prev.map((task, i) =>
        i === index
          ? { ...task, status: 'no' }
          : task
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

           {showCalendar && (
          <input className='calendar' type='date'/>
        )}

          <button type="submit">Submit</button>

         

        </form>

        
      </div>

    </div>
  )
}

export default Milk

// asus lenovo dell
// ryzen7 or 5 processor intel i5 

// 4gb graphichs card
// ram 16 gb or 32 gb

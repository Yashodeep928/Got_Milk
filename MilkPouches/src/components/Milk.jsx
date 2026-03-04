import './Milk.css'
import { useState } from 'react'
function Milk() {
    const[yes,setYes] = useState(false)
    const[no,setNo] = useState(false)
    const [selected, setSelected] = useState(null);
    const[showModal,setShowModal] = useState(false)
    const d = new Date()
    const formated = d.toLocaleString("en-IN",
    {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
    }
    )

    const madeYes = ()=>{
        setYes(prev => !prev)
        setSelected('yes')
    }

    const madeNo = ()=>{
         setNo(prev => !prev)
         setSelected('no')
    }

    const openTaskModal = () =>{
      setShowModal(prev => !prev)
    }
  return (
       <>
       <div className="container">
           <div className="date">
            {formated}
          </div>
          <button onClick={openTaskModal} className='task-btn'>Add task</button>
        <div className="milk-box">
      
         {/* <header className='header'>
        <h2>Have You Got your Milk Bag today?</h2>
         </header> */}


         <ul className='list-of-items'>
          <li className='items'> 

          <div className="item">
            <p>Got Milk ?</p>
          </div>

      <div className="btn-group">
         <button disabled={selected === 'no'} onClick={madeYes}className='btn one'>Yes</button>
         <button disabled={selected === 'yes'} onClick={madeNo} className='btn second'>No</button>
     </div>
               
         </li>


         <li className='items'> 

          <div className="item">
            <p>Got Milk ?</p>
          </div>

      <div className="btn-group">
         <button disabled={selected === 'no'} onClick={madeYes}className='btn one'>Yes</button>
         <button disabled={selected === 'yes'} onClick={madeNo} className='btn second'>No</button>
     </div>
               
         </li>
         </ul>
        
        
       </div>

        
       
  <div onClick={()=>setShowModal(prev => !prev)} className={`overlay ${showModal ? "show":""}`}>
    <form className="modal">
      <label htmlFor="task">Task</label>
      <input
        type="text"
        name="task"
        id="task"
        placeholder="write your task here"
      />

      <label htmlFor="frequency">Frequency</label>
      <select name="frequency" id="frequency">
        <option>Everyday</option>
        <option>Monthly</option>
      </select>
    </form>
  </div>




 <table className="custom-table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Bought?</th>
    </tr>
  </thead>

  <tbody>
    {yes && (
      <tr>
        <td>{formated}</td>
        <td>Yes</td>
      </tr>
    )}

    {no && (
      <tr>
        <td>{formated}</td>
        <td>No</td>
      </tr>
    )}
  </tbody>
</table>

</div>
       
       
</>
  )
}

export default Milk
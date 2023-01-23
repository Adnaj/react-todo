import React from 'react';
import './App.css';
import { useState } from 'react';

const App = () => {

  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editid,seteditid] = useState(0);

  const handlesubmit = (e) => {
    e.preventDefault()

    if (editid){
      const edittodo = todos.find((i)=>i.id === editid);
      const updatedtodos = todos.map((t)=>t.id === edittodo.id ? (t={id:t.id,todo}):{id:t.id,todo:t.todo});
      settodos(updatedtodos);
      seteditid(0)
      settodo("")
      return
    }

    if (todo !== "") {
      settodos([{ id: `${todo}-${Date.now()}`,todo }, ...todos]);
      settodo("")
      
    }
  };
  const handledelete =(id)=>{
    const deltodo=todos.filter((to)=>to.id !== id);
    settodos([...deltodo])
  };
  const handleedit =(id)=>{
    const edittodo=todos.find((i)=>i.id ===id);
    settodo(edittodo.todo)
    seteditid(id)
  };


  return (
    <div className='App'>
      <div className='container'>
        <h1>TODO APP</h1>

        <form className='todoform' onSubmit={handlesubmit}>
          <input value={todo} onChange={(e) => settodo(e.target.value)} type="text" />
          <button type='submit'>{editid? "Edit" : "Add"}</button>
        </form>

        <ul className='alltodos'>

          {
            todos.map((t) => (
              <li className='singletodo'>
                <span key={t.id} className='todotext'>{t.todo}</span>
                <button onClick={()=>handleedit(t.id)}>Edit</button>
                <button onClick={()=>handledelete(t.id)}>Delete</button>
              </li>

            ))
          }

          <li className='singletodo'>
            <span className='todotext'>Sample static</span>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App


import React, { useState, useReducer } from 'react';
import './App.css'


const App = () => {
  //für das inputfeld useState

  const [task, setTask] = useState('');
  

  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat({
          task: action.task,
          id: action.id,
          complete: false,
        });
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.id)
      case "COMPLETE_TODO":
        return state.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, complete: !todo.complete };
          } else {
            return todo;
          }
        });
      default:
        throw new Error("invalid action");
    }

  };
  const initialTodos = [

  ];
  
// da sich der state der todos auf verschiedene Art und Weisen ändern kann (delete / mark complete und add können wir
// den reducer nutzen, um übersichtlich alle verschiedenen Änderungen, welche unseren todos state betreffen,
// auf einen Blick zu haben)
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);


  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  //beim setzen der neuen Werte, übergeben wir über dispatch dem reducer ein objekt, mit der state Änderung sowie dem type
  //der Veränderung - damit im switch der richtige case ausgewählt werden kann und der state dementsprechend 
  //geupdated wird

  const handleSubmit = event => {
    if (task) {
      dispatchTodos({ type: 'ADD_TODO', task, id: Math.floor(Math.random()*50)});
    }
    setTask('');
    event.preventDefault();
  };

  const handleDelete = (id) => {
    dispatchTodos({type:'DELETE_TODO', id:id})
  }

  const markComplete = (id) => {
    dispatchTodos({type:'COMPLETE_TODO', id:id})
  }

  return (
    <div className="App">
      <div className="todo-pre">
        <pre>{JSON.stringify(todos, undefined, 2)}</pre>
      </div>
      <div className="input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
        </form>
       
    <ul>
        {todos.map(todo => (
        <div className="todo">
        <li key={todo.id} style={{textDecoration: todo.complete? "line-through":""}}>
          {todo.task}
        </li>
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
        <button onClick={()=>markComplete(todo.id)}>Completed</button> 
        </div>
      ))}
    </ul>
    </div>
  </div>
  )

}
  
export default App;

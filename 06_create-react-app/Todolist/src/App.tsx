import React, { useState } from 'react';
import './index.css';

interface Todo {
  description: string;
  date: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  function addTodo() {
    const newTodo: Todo = { description, date };
    setTodos([...todos, newTodo]);
    setDescription('');
    setDate('');
  }

  

  return (
    <div>
      <h1>Simple Todolist</h1>
      
        <input className="todo-input"
          type="text"
          placeholder="Todo description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input className="todo-input"
          type="date"
          placeholder="dd/mm/yyyy"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button type="button" onClick={addTodo}>
          Add Todo
        </button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.date}</td>
                <td>{todo.description}</td>
                <td>
              
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          
    </div>
  );
}

export default App;

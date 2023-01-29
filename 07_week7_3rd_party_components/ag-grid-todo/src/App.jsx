import React, { useState, useRef } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


function App() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef('https://reactjs.org/docs/hooks-reference.html#useref');

  const columns = [
    { field: "description", sortable: true, filter: true , floatingFilter: true, suppressMenu: true,},
    { field: "date", sortable: true, filter: true , floatingFilter: true, suppressMenu: true,},
    { field: "priority", sortable: true, filter: true , floatingFilter: true, suppressMenu: true
    ,cellStyle: params =>
    params.value === 'High' ? { color: '#D08770' } : { color: 'black' },
  },
    {
      headerName: "",
      field: "delete",
      cellRenderer: (params) => {
        return <button onClick={() => handleDelete(params.rowIndex)}>Delete</button>; 
      }
    }
  ]

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', priority:''}); 
  }

  const handleDelete = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) 
    {
      setTodos(todos.filter((todo, index) =>      
        index !== gridRef.current.getSelectedNodes()[0].childIndex))  
    }
    else {   
      alert('Select row first');  
    }
  }
  

  

   

  return (
    <div>
      <h1>Todo list</h1>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div className="ag-theme-material" style={{height: '500px', width: '800px'}}>

      <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          enableSorting={true}
          enableFilter={true}
          >
      </AgGridReact>

      </div>

    </div>
  );

}

export default App;

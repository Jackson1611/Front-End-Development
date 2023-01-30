import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';

function App() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const currentDate = dayjs(new Date()).format('YYYY-MM-DD');
  const gridRef = useRef('https://reactjs.org/docs/hooks-reference.html#useref');
  const [value, setValue] = useState(dayjs(currentDate));

  let dateString = dayjs(value).format('DD.MM.YYYY');

  const columns = [
    { 
    field: "description", 
    sortable: true, 
    filter: true , 
    floatingFilter: true, 
    suppressMenu: true},

    { 
    field: "date", 
    sortable: true, 
    filter: true , 
    floatingFilter: true, 
    suppressMenu: true},

    {
    field: "priority", 
    sortable: true, 
    filter: true , 
    floatingFilter: true, 
    suppressMenu: true
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

  
  const addTodo = (event) => {
    event.preventDefault();
    if (
      todo.description !== '' &&
      todo.date !== '' &&
      todo.priority !== ''
    ) {
      setTodos([...todos, todo]);
      setTodo({description: '', date: '', priority:''}); 
    }
  };
  

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

  const handleChange = (newValue) => {
    setValue(newValue);
    setTodo({ ...todo, date: dateString })
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }


  return (
    <div>

      <h1>Todo list</h1>

      <div class="input-container">
        <input
					type='text'
					name='description'
					placeholder='description?'
					value={todo.description}
					onChange={inputChanged}
				/>
				
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label='Date'
						inputFormat='DD.MM.YYYY'
						value={value}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>

				
				<input
					type='text'
					name='priority'
					placeholder='priority'
					value={todo.priority}
					onChange={inputChanged}
				/>
    
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      </div>

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

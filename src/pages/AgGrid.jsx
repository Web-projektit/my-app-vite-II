import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const aggridLoader = async () => {
  console.log('AgGrid loader executed');
  return 'AgGrid loader executed';
  }

const AgGrid = () => {
  const [todo, setTodo] = useState({description: '', date: new Date().toLocaleDateString('fi-FI'),
    status: ''});
  const [todos, setTodos] = useState([]);

  const fetchItems = () => {
    fetch('https://web-2401-todo-default-rtdb.europe-west1.firebasedatabase.app/items/.json')
    .then(response => response.json())
    .then(data => setTodos(Object.values(data)))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchItems();
    }, [])

    

  // Column definitions for ag-grid
  const columnDefs = [
    { field: 'description',headerClass: 'ag-header-cell-label', filter: true, checkboxSelection: true },
    { field: 'date', 
      headerClass: 'ag-header-cell-label', 
      filter: 'agDateColumnFilter',    
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('fi-FI');
        }},
    { field: 'status' }
  ]

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', status: ''});
  }

  return (
    <>
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" type="date" name="date" value={todo.date} onChange={inputChanged}/>
      <input placeholder="Status" name="status" value={todo.status} onChange={inputChanged}/>
      <Button variant="contained" onClick={addTodo}>Add</Button>
      <div className="ag-theme-material" style={{height: 400, width: 600}}>
         <AgGridReact
            rowData={todos}
            columnDefs={columnDefs}
         />
      </div>
    </>
  );
}

export {AgGrid, aggridLoader};
import { useState, useEffect } from 'react';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Error } from '../Form.style';
import { CircularProgress } from '@mui/material';
import { FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { firebaseDatabaseUrl } from '../components/constants';
import { firebaseDatabaseUrlItem } from '../components/constants';
import { useForm } from 'react-hook-form';

import '../App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const tyhjaTodo = { description: '', date: '', status: '' };

export const aggridLoader = async () => {
    try {
      const response = await axios.get(firebaseDatabaseUrl);
      const data = response.data;
      return Object.keys(data).map(key => ({ ...data[key], id: key }));
    } catch (error) {
      console.error("Virhe haettaessa tietoja Firebase:stä", error);
      return [];
    }
  };
  

export const AgGrid = () => {
  const todos = useLoaderData()
  const revalidate = useRevalidator().revalidate

  const { register, handleSubmit, reset, setError,formState: { errors }} = useForm();

  const [todo, setTodo] = useState({
    description: '', 
    date: new Date().toLocaleDateString('fi-FI'),
    status: ''});
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("Rendering AgGrid component");

  const fetchItems = () => {
    fetch(firebaseDatabaseUrl)
    .then(response => response.json())
    .then(data => setTodos(Object.values(data)))
    .catch(err => console.error(err))
  }

  const handleChange = e => {
    const { name, value } = e.target
    setTodo(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = (data) => {
    if (editMode) {
      handleSaveEdit(data);
    } else {
      handleAddRow(data);
    }
  };

  const handleAddRow = (data) => {
    setLoading(true);
    axios.post(firebaseDatabaseUrl, data)
      .then((response) => {
        console.log("Lisätty rivi Firebaseen", response.data);
        setTodo(tyhjaTodo);
        reset({ ...tyhjaTodo, date: new Date().toLocaleDateString('fi-FI') });
        revalidate();
      })
      .catch((error) => {
        console.error("Virhe lisättäessä riviä Firebaseen", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = data => {
    console.log("Muokataan riviä:", data);
    const date = new Date(data.date);
    date.setDate(date.getDate() + 1); // Correct the date by adding one day
    const oldTodo = { 
      description: data.description, 
      date: date.toISOString().split('T')[0], // Format date correctly
      status: data.status 
    }; 
    reset(oldTodo);
    setEditMode(true);
    setCurrentId(data.id);
  };

  const handleSaveEdit = (data) => {
    setLoading(true);
    axios.put(`${firebaseDatabaseUrlItem}/${currentId}.json`, data)
      .then(() => {
        //setTodo(tyhjaTodo);
        reset({ ...tyhjaTodo});
        setEditMode(false);
        setCurrentId(null);
        revalidate();
      })
      .catch((error) => {
        console.error("Virhe muokattaessa riviä Firebaseen", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (data) => {
    if (window.confirm('Oletko varma, että haluat poistaa tämän rivin?')) {
      setLoading(true);
      axios.delete(`${firebaseDatabaseUrlItem}/${data.id}.json`)
        .then(() => {
          revalidate(); // Päivitetään data
        })
        .catch((error) => {
          console.error("Virhe poistettaessa riviä Firebase:stä", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const gridOptions = {
    rowSelection: 'multiple', // Enable multiple row selection
    onSelectionChanged: (event) => {
      const selectedRows = event.api.getSelectedRows();
      console.log('Selected rows:', selectedRows);
    },
    pagination: true,
    paginationPageSize: 25,
    domLayout: 'autoHeight',
    paginationControls: {
      previous: <FaChevronLeft />,
      next: <FaChevronRight />
    }
  };
    // Column definitions for ag-grid
  const columnDefs = [
    { field: 'description',
      headerClass: 'ag-header-cell-label', 
      cellStyle: { textAlign: 'left' }, // Align text to the left
      filter: true, 
      checkboxSelection: true, 
      width: 300 },
    { field: 'date', 
      headerClass: 'ag-header-cell-label', 
      cellStyle: { textAlign: 'right' }, 
      filter: 'agDateColumnFilter',    
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('fi-FI');
        },
      width: 120
    },
    { field: 'status', width: 100 },
    {
      headerName: 'Toiminnot',
      field: 'actions',
      cellRenderer: (params) => (
        <div>
          <FaEdit
            style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }}
            onClick={() => handleEdit(params.node.data)}
          />
          <FaTrashAlt
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(params.node.data)}
          />
        </div>
      ),
      width: 150,
    },
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
      <h2>Todolist</h2>
       <div className="ag-theme-material" style={{minHeight: 300, width: 700}}>
         <AgGridReact
            rowData={todos}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            pagination={true}
            paginationPageSize={25}
            domLayout="autoHeight"
         />
      </div>
      {/* Lomake rivin lisäämiseen / muokkaamiseen */}
      <div>
      <form style={{ 
        width: '600px',
        display: 'flex', 
        flexDirection: 'column',
        justifyItems: 'flex-start', 
        marginTop: '20px' }} 
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Description"
          {...register('description', { required: true })}
          fullWidth
        />
        {errors.description && <Error>Description on pakollinen</Error>}
        <TextField
          type="date"
          {...register('date', { required: true })}
          fullWidth
          style={{ marginTop: '10px' }}
        />
        {errors.date && <Error>Date on pakollinen</Error>}

        <TextField
          placeholder="Status"
          {...register('status', { required: true })}
          fullWidth
          style={{ marginTop: '10px' }}
        />
        {errors.status && <Error>Status on pakollinen</Error>}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ 
            marginTop: '20px', 
            marginLeft: 'auto',
            marginRight: '2rem',
            width: '200px' }}
        >
          {editMode ? 'Tallenna Muokkaus' : 'Lisää Rivi'}
        </Button>
      </form>
      </div>
    </>
  );
}


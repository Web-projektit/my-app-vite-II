import { useState } from 'react'
import { Button, CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Anekdootti, random } from './anekdootit'
import axios from 'axios'
import './App.css'
import { useLoaderData, useRevalidator } from 'react-router-dom'

const url = 'http://localhost:3001/notes'

const anecdotesLoader = async () => {
  try {
    console.log('Anecdotes loader executed')
    const response = await axios.get(url)
    // throw new Error("Tiedon hakeminen epäonnistui");
    return response.data
  } 
  catch (error) {
    console.error('Virhe:', error)
    throw error
    }
}


const poista = async (id, revalidate) => {
  console.log('Poista:', id)
  try {
    const response = await axios.delete(`${url}/${id}`)
    console.log('Poisto onnistui:', response)
    revalidate() // Refresh the data
    } 
  catch (error) {
    console.error('Poisto epäonnistui', error)
    }
}

const Hello = ({ name,age }) => {
  console.log('Hello executed')
  return (
  <p>Hello {name}, age: {age}</p>
  )
}

const Form = ({ name,setName,age,setAge }) => {
  console.log('Form executed')

  const handleSubmit = event => {
    event.preventDefault()
    console.log('Name:', props.name)
    console.log('Age:', props.age)
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        Age: <input value={age} onChange={e => setAge(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )

}

const TitleForm = ({ title, setTitle }) => {
  const handleSubmit = event => {
    event.preventDefault()
    console.log('Title:', title)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title: <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

const NoteList = ({ notes,revalidate }) => {
  return (
    <div>
    <h2>Notes</h2>
    <List sx={{ listStyle: "decimal", pl: 4 }}>
      {notes.map((note, index) => (
        <ListItem sx={{ display: "list-item" }} key={index}>
          <ListItemText primary={<>{note.content} <Button color="primary" onClick={() => poista(note.id, revalidate)}>Poista</Button></>}>
          </ListItemText>
          <ListItemText secondary={note.important ? "Important" : ""}/>
        </ListItem>
      ))}
    </List>

    </div>
  )
}

const Anecdotes = () => {
  const notes = useLoaderData()
  const revalidate = useRevalidator().revalidate

  const [name, setName] = useState('John')
  const [age, setAge] = useState(20)
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('Vite-sovellus')
  const [selected, setSelected] = useState(random())
  
  console.log('App executed')
  if (!notes) {
    return <div>Error: Data not found</div>
  }


  return (
    <>
      <h1>{title}</h1>
      {notes.length ? <NoteList notes={notes} revalidate={revalidate} /> : <CircularProgress />}
 
      <Hello nimi={name} auto='Ford' age={age}/>
      <Anekdootti/>
      <Form name={name} setName={setName} age={age} setAge={setAge} />
      {/*<TitleForm title={title} setTitle={setTitle} />*/}
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </>
  )
}

export { Anecdotes, anecdotesLoader }

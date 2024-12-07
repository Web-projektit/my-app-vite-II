import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
//import { Button } from 'reactstrap';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios'

const url = 'http://localhost:3002/principles'
const title = 'Principles of Software Engineering'

const poista = (id,notes,setNotes) => {
  console.log('Poista:', id)
  axios.delete(`${url}/${id}`)
  .then(response => {
    console.log('Poisto onnistui:',response)
    setNotes(notes.filter(n => n.id !== id))
    })
  .catch (error => {
    console.error('Poisto epäonnistui',error)
    })
  }


const NoteList = ({ notes,setNotes }) => {
  return (
    <div>
    <h2>Notes</h2>
    <List sx={{ listStyle: "decimal", pl: 4 }}>
      {notes.map((note, index) => (
        <ListItem sx={{ display: "list-item" }} key={index}>
          <ListItemText primary={<>{note.name} <Button color="primary" onClick={() => poista(note.id,notes,setNotes)}>Poista</Button></>}>
          </ListItemText>
          <ListItemText secondary={note.description}/>
        </ListItem>
      ))}
    </List>
    </div>
  )
}

const Principles = () => {
  const [notes, setNotes] = useState([])
  console.log('Principles executed')

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log('promise fulfilled:', response.data)
        setNotes(response.data)
        })
      .catch(error => {
        console.error('Error fetching notes:', error)
        })
      }, [])
  
  return (
    <>
      <h1>{title}</h1>
      <NoteList notes={notes} setNotes={setNotes}/>
    </>
  )
}

export { Principles }

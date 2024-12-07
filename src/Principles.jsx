import { Button, CircularProgress } from '@mui/material';
//import { Button } from 'reactstrap';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios'
import { useLoaderData, useRevalidator } from 'react-router-dom'

const url = 'http://localhost:3002/principles'
const title = 'Principles of Software Engineering'

const principlesLoader = async () => {
  
    const response = await axios.get('http://localhost:3002/principles')
    //throw new Error("Invalid JSON format in response");
    return response.data
  
}

const poista = async (id, revalidate) => {
  console.log('Poista:', id)
  try {
    const response = await axios.delete(`${url}/${id}`)
    console.log('Poisto onnistui:', response)
    revalidate() // Refresh the data
  } catch (error) {
    console.error('Poisto epäonnistui', error)
  }
}

const NoteList = ({ notes, revalidate }) => {
  return (
    <div>
    <h2>Notes</h2>
    <List sx={{ listStyle: "decimal", pl: 4 }}>
      {notes.map((note, index) => (
        <ListItem sx={{ display: "list-item" }} key={index}>
          <ListItemText primary={<>{note.name} <Button color="primary" onClick={() => poista(note.id, revalidate)}>Poista</Button></>}>
          </ListItemText>
          <ListItemText secondary={note.description}/>
        </ListItem>
      ))}
    </List>
    </div>
  )
}

const Principles = () => {
  const notes = useLoaderData()
  const revalidate = useRevalidator().revalidate
  console.log('Principles executed')
  
  if (!notes) {
    return <div>Error: Data not found</div>
  }

  console.log("notes:", notes)
  return (
    <>
      <h1>{title}</h1>
      {notes.length ? <NoteList notes={notes} revalidate={revalidate} /> : <CircularProgress />}
    </>
  )
}

export { Principles, principlesLoader }

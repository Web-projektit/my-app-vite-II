import { useEffect, useState } from 'react'
import { Anekdootti,random } from './anekdootit'
import axios from 'axios'
import './App.css'

//const name = 'Kauko'
//const age = 25
const poista = (id,notes,setNotes) => {
  console.log('Poista:', id)
  axios.delete(`http://localhost:3001/notes/${id}`)
  .then(response => {
    console.log('Poisto onnistui:',response)
    setNotes(notes.filter(n => n.id !== id))
    })
  .catch (error => {
    console.error('Poisto epäonnistui',error)
    })
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

const NoteList = ({ notes,setNotes }) => {
  return (
    <div>
    <h2>Notes</h2>
    <ul>
      {notes.map((note, index) => (
        <li key={index}>{note.content} <button onClick={() => poista(note.id,notes,setNotes)}>Poista</button></li>
      ))}
    </ul>
    </div>
  )
}

const Anecdotes = () => {
  const [name, setName] = useState('John')
  const [age, setAge] = useState(20)
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('Vite-sovellus')
  const [selected, setSelected] = useState(random())
  const [notes, setNotes] = useState([])

  console.log('App executed')

    
     
  useEffect(() => {
    axios.get('http://localhost:3001/notes')
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
      <Hello nimi={name} auto='Ford' age={age}/>
      <NoteList notes={notes} setNotes={setNotes}/>
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

export { Anecdotes }

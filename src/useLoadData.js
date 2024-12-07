
import { useEffect } from 'react'
import axios from 'axios'

const useLoadData = (setNotes) => {
  useEffect(() => {
    axios.get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled:', response.data)
        setNotes(response.data)
      })
      .catch(error => {
        console.error('Error fetching notes:', error)
      })
  }, [setNotes])
}

export { useLoadData }
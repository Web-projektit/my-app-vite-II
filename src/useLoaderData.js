import { useEffect } from 'react'
import axios from 'axios'

const useLoaderData = (setNotes) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notes')
        console.log('promise fulfilled:', response.data)
        setNotes(response.data)
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
    fetchData()
  }, [setNotes])
}

export { useLoaderData }
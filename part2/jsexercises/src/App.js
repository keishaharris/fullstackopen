import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from 'axios';
import noteService from "./services/notes"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setnewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll()
    .then(data => {
      setNotes(data)
    })
    // console.log('effect')
    // axios
    //   .get('http://localhost:3001/notes')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setNotes(response.data)
    //   .catch(error => 
    //     console.log("api error", error))
    //   })
  }, [])
  console.log('render', notes.length, 'notes')

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setnewNote(e.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    noteService.create(noteObject)
    .then(res => {
      setNotes(notes.concat(res.data))
      setnewNote('')
    })
    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(res => {
    //     console.log(res)
    //   })
    // setNotes(notes.concat(noteObject))
    // console.log(noteObject)
    // setnewNote('')
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
         </button>
      </div>
      <ul>{notesToShow.map(note=> <Note key={note.id} notes={notes} /> 
      )}
      </ul>
        <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;

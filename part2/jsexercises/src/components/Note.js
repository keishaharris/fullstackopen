import React from 'react'

const Note = ({notes}) => {
    return (
      <ul>
            {notes.map(note => 
            <li key={note.id}>
              {note.content}
              </li>
            )}
      </ul>
    )
    }

export default Note

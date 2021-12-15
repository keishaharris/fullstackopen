import React from 'react'

const NewPerson = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addName}>
            <div>
              Name: <input value={newName}
              onChange={handleNameChange}/>
            </div>
            <div>
              <h2> Numbers </h2>
              Number: <input value={newNumber}
              onChange={handleNumberChange} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewPerson

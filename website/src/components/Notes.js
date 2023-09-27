import { useState } from "react"
const dummyNotes = [
    'hello world',
    'testing',
    'first project on my own!'
]

const Notes = () => {
    const[notes, setNotes] = useState(dummyNotes)

    const addNote = (event) => {
        event.preventDefault()
        const addedNote = event.target.addedNote.value
        event.target.addedNote.value = ''
        console.log("notes after button push ", notes)
        notes.push(addedNote)
        const newNoteList = [...notes]
        console.log("newNoteList: ", newNoteList)
        setNotes(newNoteList)
    
    }

    console.log('notes at start: ', notes)

    return(
        <div>
            <form onSubmit = {addNote}>
                <div>
                    <input name = "addedNote"/>
                </div>
                <button>
                    create
                </button>
            </form>
            <div>
                {notes.map((note,index) =>
        
                    <li key = {index}>
                            {note}
                            <Button index = {index} notes = {notes} setNotes = {setNotes} />
                    </li>
                    
                )}
            </div>
        </div>
     
    )
}

const Button = (props) => {

    const deleteNote = () => {
        
        props.notes.splice(props.index, 1)
        props.setNotes([...props.notes])
    }
    return(
            <button onClick={deleteNote}> delete </button>
    )
}

export default Notes
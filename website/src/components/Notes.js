import { useState, useRef } from "react"
const dummyNotes = [
    'hello world',
    'testing',
    'first project on my own!'
]

const Notes = () => {

    const dragItem = useRef()
    const dragOverItem = useRef()

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
    const dragStart = (e, index) => {
        dragItem.current = index
        console.log(e.target.innerHTML)
    }
    const dragEnter = (e, index) => {
        dragOverItem.current = index
        console.log(e.target.innerHTML)
    }
    const drop = (e) => {
        const notesCopy = [...notes]
        //console.log('drag item current :', dragItem)
        const dragItemContent = notesCopy[dragItem.current]
        //console.log('drag item content :', dragItemContent)
        notesCopy.splice(dragItem.current,1)
        notesCopy.splice(dragOverItem.current,0,dragItemContent)
        dragItem.current = null
        dragOverItem.current = null
        setNotes(notesCopy)

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
            <div style = {{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'left', fontSize:'24px'}}>
                {notes.map((note,index) =>
        
                    <ol key = {index} onDragStart={(e) => dragStart(e, index)} onDragEnter={ (e) => dragEnter(e, index) } onDragEnd={drop} draggable>
                            {note}
                            <Button index = {index} notes = {notes} setNotes = {setNotes} />
                    </ol>
                    
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
import { useState, useRef } from "react"
const dummyNotes = [
    [
        'hello world',
        'testing',
        'first project on my own!'
    ],
    [
        'finished column',
        'gay sex is gay',
        'I\'m going to get a sale'
    ]
]
 

const Notes = () => {

    const dragItem = useRef()
    const dragOverItem = useRef()
    const dragOverItemColumn = useRef()

    const[notes, setNotes] = useState(dummyNotes)
    

    const addNote = (event) => {
        event.preventDefault()
        const addedNote = event.target.addedNote.value
        event.target.addedNote.value = ''
        console.log("notes after button push ", notes)
        notes[0].push(addedNote)
        const newNoteList = [...notes]
        console.log("newNoteList: ", newNoteList)
        setNotes(newNoteList)
    
    }
    const dragStart = (e, index, column) => {
        dragItem.current = index
        console.log('drag item index: ', dragItem.current)
        //console.log(e.target.innerHTML)
    }
    const dragEnter = (e, index, column) => {
        dragOverItem.current = index
        dragOverItemColumn.current = column
        //console.log(e.target.innerHTML)
    }
    const drop = (e, column) => {
        const notesCopy = [...notes]
        //console.log('drag item current :', dragItem)
        const dragItemContent = notesCopy[column][dragItem.current]
        console.log('drag item content :', dragItemContent)
        notesCopy[column].splice(dragItem.current,1)
        console.log("drag over column: ", dragOverItemColumn)
        notesCopy[dragOverItemColumn.current].splice(dragOverItem.current,0 , dragItemContent)
        console.log("notes copy: ", notesCopy)
        dragItem.current = null
        dragOverItem.current = null
        dragOverItemColumn.current = null
        setNotes(notesCopy)

    }
    const backDrop = (e, column) => {


    }
    const dragBackEnter = (e, column) => {

        
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
            <div style = {{display: 'flex'}}>
                <div onDragEnter={ (e) => dragBackEnter(e,0) } onDragEnd={(e) => backDrop(e, 0)}droppable style = {{backgroundColor:'lightblue',  textAlign:'left', fontSize:'24px' ,flex: '50%'}}>
                    {notes[0].map((note,index) =>
                    
                        <ol key = {index} onDragStart={(e) => dragStart(e, index, 0)} onDragEnter={ (e) => dragEnter(e, index,0) } onDragEnd={(e) => drop(e, 0)} draggable style = {{border: "solid",display: 'flex'}}>
                                <div style = {{flex: '50%'}}>
                                    {note}
                                </div>
                                <div style = {{alignSelf: 'right', padding: '10px'}}>
                                    <Button index = {index} notes = {notes} setNotes = {setNotes} />
                                </div>
                        </ol>
                        
                    )}
                </div>
                <div style = {{backgroundColor:'darkblue', textAlign:'left', fontSize:'24px', flex: '50%'}}>
                    {notes[1].map((note,index) =>
                        
                        <ol key = {index} onDragStart={(e) => dragStart(e, index,1)} onDragEnter={ (e) => dragEnter(e, index,1) } onDragEnd={(e) => drop(e,1)} draggable style = {{border: "solid",display: 'flex'}}>
                                <div style = {{flex: '50%'}}>
                                    {note}
                                </div>
                                <div style = {{alignSelf: 'right', padding: '10px'}}>
                                    <Button index = {index} notes = {notes} setNotes = {setNotes} />
                                </div>
                        </ol>
                    )}        
                </div>
            </div>
        </div>
     
    )
}

const Button = (props) => {

    const deleteNote = () => {
        const notesCopy = [...props.notes]
        notesCopy.splice(props.index, 1)
        props.setNotes([notesCopy])
    }
    return(
            <button style = {{display: 'inline'}}onClick={deleteNote}> delete </button>
    )
}

export default Notes
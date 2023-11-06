import { useState, useRef, useEffect } from "react"
import axios from "axios"
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

    useEffect = (() => {
        //load data
        

    }, [])

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

    }
    const dragEnter = (e, index, column) => {
        dragOverItem.current = index
        console.log("drag over: ", dragOverItem)
        dragOverItemColumn.current = column

    }
    const drop = (e, column) => {
        const notesCopy = [...notes]

        const dragItemContent = notesCopy[column][dragItem.current]
        if(notesCopy[dragOverItemColumn.current] === undefined){
            return
        }

        console.log("drag over item: ", dragOverItem)
        if(notesCopy[column].length === 0 ){
            notesCopy[column].splice(dragItem.current,1)
            console.log("notescopy array: ", notesCopy[dragOverItemColumn.current])
            notesCopy[dragOverItemColumn.current].splice(0,0 , dragItemContent)
            
        } else {
            notesCopy[column].splice(dragItem.current,1)
            
            console.log("notescopy array: ", notesCopy[dragOverItemColumn.current])
            notesCopy[dragOverItemColumn.current].splice(dragOverItem.current,0 , dragItemContent)

        }

        dragItem.current = null
        dragOverItem.current = null
        dragOverItemColumn.current = null
        setNotes(notesCopy)

    }
    const dragBackEnter = (e, column) => {

            dragOverItemColumn.current = column
        
    }
    const deleteNote = (index, column) => {
        const notesCopy = [...notes]
        notesCopy[column].splice(index,1)
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
            <div style = {{display:'flex',alignItems: 'center', justifyContent: 'center', }}><h2 style = {{textAlign: 'center', flex: '50%'}}>To Do</h2><h2 style = {{textAlign: 'center', flex: '50%'}}>Done</h2></div>
            <div style = {{display: 'flex'}}>
                
                <div onDragEnter={ (e) => dragBackEnter(e,0) } onDragEnd={(e) => drop(e, 0)}droppable = "true" style = {{backgroundColor:'lightblue',  textAlign:'left', fontSize:'24px' ,flex: '50%'}}>
                    {notes[0].map((note,index) =>
                    
                        <ol key = {index} onDragStart={(e) => dragStart(e, index, 0)} onDragEnter={ (e) => dragEnter(e, index,0) } onDragEnd={(e) => drop(e, 0)} draggable style = {{border: "solid",display: 'flex'}}>
                                <div style = {{flex: '50%'}}>
                                    {note}
                                </div>
                                <div style = {{alignSelf: 'right', padding: '10px'}}>
                                    <button style = {{display: 'inline'}} onClick = {() => deleteNote(index,0)}> delete </button>
                                </div>
                        </ol>
                        
                    )}
                </div>
                <div onDragEnter={ (e) => dragBackEnter(e,1) } onDragEnd={(e) => drop(e, 1)}droppable = "true" style = {{backgroundColor:'darkblue', textAlign:'left', fontSize:'24px', flex: '50%'}}>
                    {notes[1].map((note,index) =>
                        
                        <ol key = {index} onDragStart={(e) => dragStart(e, index,1)} onDragEnter={ (e) => dragEnter(e, index,1) } onDragEnd={(e) => drop(e,1)} draggable style = {{border: "solid",display: 'flex'}}>
                                <div style = {{flex: '50%'}}>
                                    {note}
                                </div>
                                <div style = {{alignSelf: 'right', padding: '10px'}}>
                                    <button style = {{display: 'inline'}} onClick = {() => deleteNote(index,1)}> delete </button>
                                </div>
                        </ol>
                    )}        
                </div>
            </div>
        </div>
     
    )
}

// const Button = (props) => {

//     const deleteNote = () => {
//         const notesCopy = [...props.notes]
//         notesCopy.splice(props.index, 1)
//         props.setNotes([notesCopy])
//     }
//     return(
//             <button style = {{display: 'inline'}}onClick={deleteNote}> delete </button>
//     )
// }

export default Notes
import { NoteItem } from "./NoteItem"
import { useSelector } from "react-redux"

export function Notes() {
    const todoNotes = useSelector(state => state.todo.notes)
    const notes = []
    todoNotes.forEach((item, index) => {
        notes.push(
                <NoteItem key={index} data={item}/>
            )
        })
    return(
        <div className='notes-container'>
            {notes}
        </div>
    )
}
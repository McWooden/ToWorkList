import { useSelector } from "react-redux"
import { CardImages } from "../Image/CardImages"
import { Notes } from "../Note/Notes"
import { NoteEditor } from "../Note/NoteEditor"

export function DetailCard() {
    const todo = useSelector(state => state.todo)
    return(
        <>
        <div className='detail-desc d-flex'>
            <div className="color" style={{backgroundColor: todo.details.color}}></div>
            <div className='detail-desc-context'>
                <p>{todo.details.desc}</p>
                <CardImages/>
            </div>
        </div>
        <NoteEditor/>
        <Notes/>
        </>
    )
}
import { useSelector } from "react-redux"
import { CardImages } from "../Image/CardImages"
import Notes from "../Note/Notes"
import { NoteEditor } from "../Note/NoteEditor"

export function DetailCard() {
    const todo = useSelector(state => state.todo)
    return(
        <>
        <div className='detail-desc d-flex bg-primary-dark-50 text-zinc-300 mb-1 flex-col'>
            <div className="w-full h-[.75rem] rounded" style={{backgroundColor: todo.details.color}}></div>
            <div className='detail-desc-context flex flex-col w-full'>
                <div className="overflow-auto">
                    <p className="mb-2">{todo.details.desc}</p>
                </div>
                <CardImages/>
            </div>
        </div>
        <NoteEditor/>
        <Notes/>
        </>
    )
}
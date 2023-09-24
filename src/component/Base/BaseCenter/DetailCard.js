import { useSelector } from "react-redux"
import { CardImages } from "../Image/CardImages"
import Notes from "../Note/Notes"
import { NoteEditor } from "../Note/NoteEditor"

export function DetailCard() {
    const todo = useSelector(state => state.todo)
    return(
        <>
        <div className='detail-desc d-flex bg-primary-dark-50 text-zinc-300 mb-1'>
            <div className="h-full w-[10px] rounded-[3px]" style={{backgroundColor: todo.details.color}}></div>
            <div className='detail-desc-context flex flex-col w-full'>
                <div className="overflow-auto">
                    <p>{todo.details.desc}</p>
                </div>
            </div>
        </div>
        <div className='detail-desc d-flex bg-primary-dark-50 text-zinc-300 mb-1 flex-col'>
            <CardImages/>
        </div>
        <NoteEditor/>
        <Notes/>
        </>
    )
}
import { useSelector } from "react-redux"

export function Contributor() {
    const todo = useSelector(state => state.todo)
    const box = []
    const nicknames = []
    todo.notes.forEach((note, index) => {
        if (nicknames.includes(note.by)) return
        box.push(<p key={index} >{note.by}</p>)
        nicknames.push(note.by)
    })
    return (
        <div className="contributor-container text-zinc-400">
            <p className="text-whitesmoke">Contributor</p>
            <div className="contributor of-auto bg-zinc-900">
                {box}
            </div>
        </div>
    )
}
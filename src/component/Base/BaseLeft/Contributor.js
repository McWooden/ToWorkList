import { useSelector } from "react-redux"

export function Contributor() {
    const todo = useSelector(state => state.todo)
    const box = []
    const nicknames = []
    todo.notes.forEach((note, index) => {
        if (nicknames.includes(note.by.nickname)) return
        box.push(<p key={index} >{note.by.nickname}</p>)
        nicknames.push(note.by.nickname)
    })
    return (
        <div className="contributor-container text-zinc-400">
            <p className="text-whitesmoke">Contributor</p>
            <div className="contributor of-auto bg-primary-dark-50">
                {box}
            </div>
        </div>
    )
}
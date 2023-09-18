import { faCheck, faNoteSticky, faImage, faMessage} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import InfoMenu from './InfoMenu'
import { Contributor } from './Contributor'
import format from 'date-fns/format'
import id from 'date-fns/locale/id'

export function MoreInfoCard() {
    const todo = useSelector(state => state.todo)
    return (
        <>
        <div className='todo-card d-flex fd-row  jc-space-between bg-primary-dark-50'>
            <div className="todo-left d-flex fd-row p-relative">
                <div className="card-color" style={{backgroundColor: todo.details.color}}></div>
                <div className="card-text d-flex fd-column jc-center">
                    <div className="card-title">{todo.details.item_title}</div>
                    <div className="card-deadline">{format(todo.details.deadline, 'iiii, dd LLL yyyy', {locale: id})}</div>
                </div>
            </div>
        </div>
        <div className='info-menu d-flex of-auto'>
            <InfoMenu icon={faCheck} count={todo.dones.length}/>
            <InfoMenu icon={faNoteSticky} count={todo.notes.length}/>
            <InfoMenu icon={faImage} count={todo.images.length}/>
            <InfoMenu icon={faMessage} count={todo.chat.length}/>
        </div>
        <Contributor/>
        </>
    )
}
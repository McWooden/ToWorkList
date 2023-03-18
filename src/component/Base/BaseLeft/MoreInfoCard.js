import { faCheck, faNoteSticky, faImage, faMessage} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { InfoMenu } from './InfoMenu'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { Contributor } from './Contributor'


export function MoreInfoCard() {
    const todo = useSelector(state => state.todo)
    return (
        <>
        <div className='todo-card'>
            <div className="todo-left">
                <div className="card-color" style={{backgroundColor: todo.details.color}}></div>
                <div className="card-text">
                    <div className="card-title">{todo.details.item_title}</div>
                    <div className="card-deadline">{convertDateToString(todo.details.deadline)}</div>
                </div>
            </div>
        </div>
        <div className='info-menu'>
            <InfoMenu icon={faCheck} count={todo.dones.length}/>
            <InfoMenu icon={faNoteSticky} count={todo.notes.length}/>
            <InfoMenu icon={faImage} count={todo.images.length}/>
            <InfoMenu icon={faMessage} count={todo.chat.length}/>
        </div>
        <Contributor/>
        </>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faNoteSticky, faImage, faMessage, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import {convertDateToString} from '../utils/convertDateFormat'
import { ItemData } from '../pages/App';

export function MoreInfoCard() {
    const {item} = useContext(ItemData)
    return (
        <>
        <div className='todo-card'>
            <div className="todo-left">
                <div className="card-color" style={{backgroundColor: item.color}}></div>
                <div className="card-text">
                    <div className="card-title">{item.title}</div>
                    <div className="card-deadline">{convertDateToString(item.deadline)}</div>
                </div>
            </div>
        </div>
        <div className='info-menu'>
            <InfoMenu icon={faCheck} count={item.chat.length}/>
            <InfoMenu icon={faNoteSticky} count={item.notes.length}/>
            <InfoMenu icon={faImage} count={item.images.length}/>
            <InfoMenu icon={faMessage} count={item.chat.length}/>
        </div>
        <Contributor/>
        </>
    )
}

function InfoMenu({icon, count}) {
    return (
        <div className="info-menu-box">
            <FontAwesomeIcon icon={icon} className='info-menu-box-icon'/>
            <div className='info-menu-box-count'>{count}</div>
        </div>
    )
}

export function Contributor() {
    const {item} = useContext(ItemData)
    const box = []
    const nicknames = []
    item.notes.forEach((note, index) => {
        if (nicknames.includes(note.by)) return
        box.push(<p key={index}>{note.by}</p>)
        nicknames.push(note.by)
    })
    return (
        <div className="contributor-container">
            <p>Contributor</p>
            <div className="contributor">
                {box}
            </div>
        </div>
    )
}

export function DetailLeftAction() {
    return (
        <div className='detail-Left-action'>
            <FontAwesomeIcon icon={faTrash} className='action-left action-trash-left'/>
            <FontAwesomeIcon icon={faPenToSquare} className='action-left action-edit-left'/>
        </div>
    )
}
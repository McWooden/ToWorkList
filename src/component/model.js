import {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { ItemData } from './TodoApp';
import { useContext } from 'react';
import { myAccount } from '../utils/dataJSON';
import { convertDateToString } from '../utils/convertDateFormat';


export function TodoModel({item}) {
    const myNickname = myAccount.profile.nickname
    const [done, setDone] = useState(item.done)
    const [dropDown, setDropDown] = useState(false)
    let menuRef = useRef()
    const {handleItem} = useContext(ItemData)
    function reverse() {
        if (done.includes(myNickname)) {
            setDone(done.filter(e => e !== myNickname));
        } else {
            setDone([...done, myNickname]);
        }
    }
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!menuRef.current.contains(e.target)) {
                    setDropDown(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
    })
    return (
        <div className="todo-card">
            <div className="todo-left">
            <div className="card-color" style={{backgroundColor: item.color}}></div>
            <div className="card-text pointer" onClick={() => handleItem(item)}>
                <div className="card-title">{item.title}</div>
                <div className="card-description">{item.desc}</div>
            </div>
            </div>
            <div className="todo-right">
                <div className={`card-finish pointer ${done.includes(myNickname)?'finish-on':'finish-off'}`} onClick={reverse}>
                    <div className="card-finish-value"></div>
                </div>
                <div className="card-more">
                    <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn pointer' onClick={() => setDropDown(!dropDown)}/>
                </div>
                <div className={`card-drop-down ${dropDown?'active':'inactive'}`} ref={menuRef}>
                    <ul>
                        <li className='pointer'>
                            <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn'/>
                            <span>edit</span>
                        </li>
                        <li className='pointer'>
                            <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                            <span>delete</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export function ChatModel({item}) {
    const [dropDown, setDropDown] = useState(false)
    const itsMe = item.nickname === myAccount.profile.nickname
    let cardRef = useRef()
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!cardRef.current.contains(e.target)) {
                    setDropDown(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
    })
    return (
        <div className={`${itsMe&&'my'} chat-card`} ref={cardRef}>
            <div className={`${itsMe&&'my'} chat-card-message ${dropDown?'active':'inactive'}`}>{item.msg}</div>
            <div className={`${itsMe&&'my'} chat-card-time pointer`} onClick={() => setDropDown(!dropDown)}>{item.time}</div>
            <div className={`chat-dropdown ${dropDown?'active':'inactive'}`}>
                <ul>
                    <li className='pointer'>
                        <FontAwesomeIcon icon={faTrash}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export function Notes() {
    const {item} = useContext(ItemData)
    const notes = []
    item.notes.forEach((item, index) => {
        notes.push(
                <div className='note' key={index}>
                    <div className='note-head'>
                        <div className="note-color" style={{backgroundColor: item.color}}></div>
                        <div className="note-btn">
                            <FontAwesomeIcon icon={faTrash}/>
                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </div>
                    </div>
                    <div className='note-body'>
                        <pre>
                            {item.context}
                        </pre>
                        <span className='note-info'>{`${item.by} ${convertDateToString(item.date)}`}</span>
                    </div>
                </div>
            )
        })
    return(
        <div className='notes-container'>
            {notes}
        </div>
    )
}
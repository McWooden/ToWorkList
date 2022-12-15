import {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { ItemData } from './TodoApp';
import { useContext } from 'react';


export function TodoModel({item}) {
    const [on, setOn] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    let menuRef = useRef()
    const {handleItem} = useContext(ItemData)
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
            <div className="card-text">
                <div className="card-title">{item.title}</div>
                <div className="card-description pointer" onClick={() => handleItem(item)}>{item.desc}</div>
            </div>
            </div>
            <div className="todo-right">
                <div className={`card-finish pointer ${on?'finish-on':'finish-off'}`} onClick={() => setOn(!on)}>
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
        <div className='chat-card' ref={cardRef}>
            <div className={`chat-card-message ${dropDown?'active':'inactive'}`}>{item.msg}</div>
            <div className='chat-card-time pointer' onClick={() => setDropDown(!dropDown)}>{item.time}</div>
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
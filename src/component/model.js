import {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { myAccount } from '../utils/dataJSON';
import { ItemData } from '../pages/App';


export function TodoModel({item, indexItem, reverseDone}) {
    const myNickname = myAccount.profile.nickname
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
            <div className="card-text pointer" onClick={() => handleItem(indexItem)}>
                <div className="card-title">{item.title}</div>
                <div className="card-description">{item.desc}</div>
            </div>
            </div>
            <div className="todo-right">
                <div className={`card-finish pointer ${item.dones.includes(myNickname)?'finish-on':'finish-off'}`} onClick={() => reverseDone(indexItem)}>
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
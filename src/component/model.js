import {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
// import { useContext } from 'react';
import { myAccount } from '../utils/dataJSON';
// import { ItemData } from '../pages/App';
import { Confirm } from './Modal';
// import { GuildContext } from '../pages/App';
import { editToast, deleteToast, checkToast } from '../utils/notif';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTodo } from '../redux/todo';
import axios from 'axios';

const API = process.env.REACT_APP_API

// export function TodoModel({item, indexItem}) {
//     const { reverseDone } = useContext(GuildContext)
//     const myNickname = myAccount.profile.nickname
//     const [dropDown, setDropDown] = useState(false)
//     let menuRef = useRef()
//     let btnRef = useRef()
//     const {handleItem} = useContext(ItemData)
//     const [deleteOpen, setDeleteOpen] = useState(false)

//     useEffect(() => {
//         let handler = (e) => {
//             try {
//                 if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) {
//                     return
//                 } else {
//                     setDropDown(false)
//                 }
//             } catch (error) {
                
//             }
//         }
//         document.addEventListener('mousedown', handler)
//     })

//     return (
//         <>
//         <div className="todo-card">
//             <div className="todo-left">
//             <div className="card-color" style={{backgroundColor: item.color}}></div>
//             <div className="card-text pointer" onClick={() => handleItem(indexItem)}>
//                 <div className="card-title">{item.title}</div>
//                 <div className="card-description">{item.desc}</div>
//             </div>
//             </div>
//             <div className="todo-right">
//                 <div className={`card-finish pointer ${item.dones.includes(myNickname)?'finish-on':'finish-off'}`} onClick={() => reverseDone(indexItem)}>
//                     <div className="card-finish-value"></div>
//                 </div>
//                 <div className="card-more" ref={btnRef}>
//                     {dropDown? 
//                     <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn pointer' onClick={() => setDropDown(false)}/>
//                     :
//                     <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn pointer' onClick={() => setDropDown(true)}/>
//                     }
//                 </div>
//                 <div className={`card-drop-down ${dropDown?'active':'inactive'}`} ref={menuRef}>
//                     <ul>
//                         <li className='pointer' onClick={() => editToast()}>
//                             <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn' />
//                             <span>edit</span>
//                         </li>
//                         <li className='pointer' onClick={() => setDeleteOpen(true)}>
//                             <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
//                             <span>delete</span>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={item.title} metode='delete' color={item.color} callback={deleteToast}/>
//         </>
//     )
// }
export function TodoModel({item}) {
    const profile = useSelector(state => state.source.profile)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const [dones, setDones] = useState(item.dones)
    const dispatch = useDispatch()
    const myNickname = profile.nickname
    const [dropDown, setDropDown] = useState(false)
    let menuRef = useRef()
    let btnRef = useRef()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const title = item.details.item_title
    useEffect(() => {
        let handler = (e) => {
            try {
                if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) {
                    return
                } else {
                    setDropDown(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener("mousedown", handler)
    })
    function handleTextClick() {
        dispatch(setAllTodo(item))
    }
    async function handleReverse() {
        const method = dones.includes(myNickname) ? 'uncheck' : 'checkTodo'
        try {
            await axios.get(`${API}/source/${method}/${idPageOfBook}/${item._id}/${myNickname}`)
            .then((res) => {
                checkToast({title: item.details.item_title, color: item.details.color})
                if (method === 'checkTodo') {
                    setDones([...dones, myNickname])
                } else {
                    setDones(dones.filter((item) => item !== myNickname))
                }
            })
            .catch(err => {
                checkToast({title: item.details.item_title, color: 'var(--danger)'})
            }) 
        } catch(err) {

        }
    }
    return (
        <>
        <div className="todo-card">
            <div className="todo-left">
            <div className="card-color" style={{backgroundColor: item.details.color}}></div>
            <div className="card-text pointer" onClick={handleTextClick}>
                <div className="card-title">{title}</div>
                <div className="card-description">{item.details.desc}</div>
            </div>
            </div>
            <div className="todo-right">
                <div className={`card-finish pointer ${dones.includes(myNickname)?'finish-on':'finish-off'}`} onClick={handleReverse}>
                    <div className="card-finish-value"></div>
                </div>
                <div className="card-more" ref={btnRef}>
                    {dropDown? 
                        <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn pointer' onClick={() => setDropDown(false)}/>
                        :
                        <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn pointer' onClick={() => setDropDown(true)}/>
                    }
                </div>
                <div className={`card-drop-down ${dropDown?'active':'inactive'}`} ref={menuRef}>
                    <ul>
                        <li className='pointer' onClick={() => editToast()}>
                            <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn' />
                            <span>edit</span>
                        </li>
                        <li className='pointer' onClick={() => setDeleteOpen(true)}>
                            <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                            <span>delete</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color={item.details.color} callback={deleteToast}/>
        </>
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
    function handleDelete() {
        setDropDown(false)
        deleteToast('menghapus chat')
    }
    return (
        <div className={`${itsMe&&'my'} chat-card`} ref={cardRef}>
            <div className={`${itsMe&&'my'} chat-card-message ${dropDown?'active':'inactive'}`}>{item.msg}</div>
            <div className={`${itsMe&&'my'} chat-card-time pointer`} onClick={() => setDropDown(!dropDown)}>{item.time}</div>
            <div className={`chat-dropdown ${dropDown?'active':'inactive'}`}>
                <ul>
                    <li className='pointer' onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
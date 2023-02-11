import {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
// import { useContext } from 'react';
import { myAccount } from '../utils/dataJSON';
// import { ItemData } from '../pages/App';
import { Confirm } from './Modal';
// import { GuildContext } from '../pages/App';
import { deleteToast, checkToast } from '../utils/notif';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTodo, setTodo } from '../redux/todo';
import axios from 'axios';
import { setSource } from '../redux/sourceSlice';
import { Modal } from './Modal';
import { convertDateToString } from '../utils/convertDateFormat';
import { noteToast } from '../utils/notif';
import Calendar from 'react-calendar';

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
    const [editModal, setEditModal] = useState(false)
    const dispatch = useDispatch()
    const myNickname = profile.nickname
    const [dropDown, setDropDown] = useState(false)
    let menuRef = useRef()
    let btnRef = useRef()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const title = item.details.item_title

    const colors = ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow']
    const [currentColor, setCurrentColor] = useState(item.details.color)
    const borderStyle = {border: `1px solid ${currentColor}`}
    const formRef = useRef()

    const [inputTitle, setInputTitle] = useState(item.details.item_title)
    const [inputDesc, setInputDesc] = useState(item.details.desc)
    

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
    async function deleteTodo() {
        try {
            await axios.delete(`${API}/source/addTodo/${idPageOfBook}/${item._id}`)
            .then((res) => {
                deleteToast('berhasil dihapus')
                dispatch(setSource(res.data))
            })
            .catch(err => {
                deleteToast('gagal terhapus')
            })
        } catch(err) {

        }
    }
    async function handleReverse() {
        const method = dones.includes(myNickname) ? 'uncheck' : 'checkTodo'
        try {
            await axios.get(`${API}/source/${method}/${idPageOfBook}/${item._id}/${myNickname}`)
            .then((res) => {
                checkToast({title: item.details.item_title, color: item.details.color})
                dispatch(setSource(res.data))
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
    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function handleTitleChange(e) {
        setInputTitle(e.target.value)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const date = colorsTileSource[0].details.deadline
        const dataToSend = {
            color: e.target.color.value,
            desc: e.target.desc.value,
            deadline: (date === item.details.deadline ? date : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`),
            item_title: e.target.title.value
        }
        try {
            await axios.put(`${API}/source/addTodo/${idPageOfBook}/${item._id}`, dataToSend)
            .then((res) => {
                noteToast(dataToSend)
                dispatch(setSource(res.data))
                setEditModal(false)
            })
            .catch(err => {
                noteToast({color : 'var(--danger)'})
            }) 
        } catch(err) {

        }
    }
    const [colorsTileSource, setColorsTileSource] = useState([item])
    const colorsTile = colorsTileSource.map(item => ({
        date: new Date(item.details.deadline),
        color: item.details.color,
        title: item.details.item_title,
    }))
    function dayTileClick(x) {
        const date = new Date(x)
        // const newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        const newDate = {
            details: {
                deadline: date,
                color: 'var(--purple-2)',
                item_title: item.details.item_title,
            }
        }
        setColorsTileSource([newDate, item])
    }
    return (
        <>
        <div className="todo-card">
            <div className="todo-left">
            <div className="card-color" style={{backgroundColor: item.details.color}}></div>
            <div className="card-text pointer" onClick={handleTextClick}>
                <div className="card-title">{title}</div>
                <div className="card-description">{item.details.desc.slice(0, 103)}</div>
            </div>
            </div>
            <div className="todo-right">
                <div className={`card-finish pointer ${dones.includes(myNickname)?'finish-on':'finish-off'}`} onClick={handleReverse}>
                    <div className="card-finish-value"></div>
                </div>
                <div className="card-more" ref={btnRef}>
                    <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn pointer' onClick={() => setDropDown(!dropDown)}/>
                </div>
                <div className={`card-drop-down ${dropDown?'active':'inactive'}`} ref={menuRef}>
                    <ul>
                        <li className='pointer' onClick={() => setEditModal(true)}>
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
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color={item.details.color} callback={deleteTodo}/>
        <Modal open={editModal} close={() => setEditModal(false)}>
            <div className="edit_card_modal">
                <div className="general-modal">
                    <Calendar 
                        onClickDay={dayTileClick}
                        className="calendar-dark" 
                        locale='id-ID'
                        format='mm/dd/yyyy'
                        next2Label={null}
                        prev2Label={null}
                        tileContent={({ date, view }) => {
                            const color = colorsTile.find((c) => c.date.getTime() === date.getTime())
                            if (color) {
                                return (
                                    <div className='repalace' style={{ border: `1px solid ${color.color}`, borderRadius: '50px' }} title={color.title}>
                                    {date.getDate()}
                                    </div>
                                )
                            }
                        }}
                    />
                </div>
                <form className="form-modal" ref={formRef} onSubmit={handleSubmit} id='addTask'>
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{title}</h3>
                        <p className="date">{convertDateToString(item.details.deadline)}</p>
                    </div>
                    <div className="input-left">
                    <input name='title' type="text" placeholder='Judul' style={borderStyle} required autoComplete='off' value={inputTitle} onChange={handleTitleChange}/>
                        <select style={borderStyle} onChange={handleColor} name='color'>
                            <option key='default' value={item.details.color}>
                                {item.details.color}
                            </option>
                            {colors.filter(c => c !== item.details.color).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>
                    <textarea placeholder={item.details.desc} rows="10" style={borderStyle} name='desc' value={inputDesc} onChange={x => setInputDesc(x.target.value)}/>
                    <button type='submit' className='task-submit' form='addTask'>Simpan</button>
                </form>
            </div>
        </Modal>
        </>
    )
}

export function ChatModel({item}) {
    const [dropDown, setDropDown] = useState(false)
    const dispatch = useDispatch()
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const itsMe = item.nickname === myAccount.profile.nickname
    let cardRef = useRef()
    const disable = item.msg === 'Pesan ini telah dihapus'
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
    function handleDropDown() {
        if (disable) return
        setDropDown(!dropDown)
    }
    async function handleDelete() {
        setDropDown(false)
        deleteToast('menghapus chat')
        try {
            await axios.put(`${API}/chat/${idPageOfBook}/${todoId}/${item._id}`)
            .then((res) => {
                deleteToast('chat berhasil dihapus')
                dispatch(setTodo(res.data.data))
            })
            .catch(err => {
                deleteToast('chat gagal dihapus')
            }) 
        } catch(err) {

        }
    }
    return (
        <div className={`${itsMe&&'my'} chat-card ${dropDown?'active':'inactive'}`} ref={cardRef}>
            <div className={`${itsMe&&'my'} chat-card-message ${disable&&'disable'}`}>{item.msg}</div>
            <div className={`${itsMe&&'my'} chat-card-time pointer`} onClick={handleDropDown}>{item.time}</div>
            <div className={`chat-dropdown ${itsMe&&'my'} ${dropDown?'active':'inactive'}`}>
                <ul>
                    <li className='pointer' onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faNoteSticky, faImage, faMessage, faPenToSquare, faTrash, faChevronRight, faGear} from '@fortawesome/free-solid-svg-icons'
import {convertDateToString} from '../utils/convertDateFormat'
import { deleteToast, editToast } from '../utils/notif';
import { useState, useRef } from 'react';
import { Modal, FileDrop, Confirm } from './Modal';
import { imageToast } from '../utils/notif';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import axios from 'axios';
import { clearTodo, setTodo } from '../redux/todo';
import { setSource } from '../redux/sourceSlice';

const API = process.env.REACT_APP_API

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

function InfoMenu({icon, count}) {
    return (
        <div className="info-menu-box">
            <FontAwesomeIcon icon={icon} className='info-menu-box-icon'/>
            <div className='info-menu-box-count'>{count}</div>
        </div>
    )
}

export function Contributor() {
    const todo = useSelector(state => state.todo)
    const box = []
    const nicknames = []
    todo.notes.forEach((note, index) => {
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
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const item = useSelector(state => state.todo)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()
    const title = item.details.item_title
    const colors = ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow']
    const [currentColor, setCurrentColor] = useState(item.details.color)
    const borderStyle = {border: `1px solid ${currentColor}`}
    const formRef = useRef()
    const [inputTitle, setInputTitle] = useState(item.details.item_title)
    const [inputDesc, setInputDesc] = useState(item.details.desc)
    async function deleteTodo() {
        try {
            await axios.delete(`${API}/source/addTodo/${idPageOfBook}/${item.id}`)
            .then((res) => {
                deleteToast('berhasil dihapus')
                dispatch(clearTodo())
            })
            .catch(err => {
                deleteToast('gagal terhapus')
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
            item_title: e.target.title.value,
        }
        try {
            await axios.put(`${API}/source/addTodo/${idPageOfBook}/${item.id}`, dataToSend)
            .then((res) => {
                editToast('berhasil disimpan')
                dispatch(setTodo(res.data))
                setEditModal(false)
            })
            .catch(err => {
                editToast('gagal disimpan')
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
        <div className='detail-Left-action'>
            <FontAwesomeIcon icon={faTrash} className='action-left action-trash-left' onClick={() => setDeleteOpen(true)}/>
            <FontAwesomeIcon icon={faPenToSquare} className='action-left action-edit-left' onClick={() => setEditModal(true)}/>
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

// export function JadwalRoom() {
//     const { room } = useContext(GuildContext)
//     const [full, setFull] = useState(false)
//     const [modalOpen, setModalOpen] = useState(false)
//     const date = convertDateToString(new Date().toLocaleDateString())
//     // file drop
//     const fileInput = useRef(null)
//     const[image, setImage] = useState(null)
//     const[previewUrl, setPreviewUrl] = useState('')
//     const handleFile = file => {
//         setImage(file)
//         setPreviewUrl(URL.createObjectURL(file))
//     }
//     const handleOndragOver = event => {
//         event.preventDefault()
//     }
//     const handleOndrop = event => {
//         event.preventDefault()
//         event.stopPropagation()
//         let imageFile = event.dataTransfer.files[0]
//         handleFile(imageFile)
//     }
//     // form
//     const formRef = useRef()
//     function handleSubmit(e) {
//         e.preventDefault()
//         const data = {
//             image: image,
//         }
//         imageToast('jadwal diperbarui')
//         console.log(data)
//         setModalOpen(false)
//         formRef.current.reset()
//         setImage(null)
//         setPreviewUrl('')
//     }
//     return (
//         <div className="jadwal">
//             <div className='preview' style={{background: `url(${room.jadwal})`}}>
//                 <div className="setting pointer" onClick={() => setModalOpen(true)}>
//                     <FontAwesomeIcon icon={faGear} className='setting-btn'/>
//                 </div>
//             </div>
//             <div className="open-jadwal pointer" onClick={() => setFull(true)}>
//                 <p>Jadwal</p>
//                 <FontAwesomeIcon icon={faChevronRight} className='jadwal-arrow'/>
//             </div>
//             <FileDrop open={modalOpen} close={() => setModalOpen(false)}>
//                 <form ref={formRef} className='file-drop jadwal-form' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
//                     <div className="img-view" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
//                     { previewUrl ? 
//                         <img src={previewUrl} alt={image.name} /> 
//                     :
//                         <div className="drop-zone">
//                             <FontAwesomeIcon icon={faImage} className='drop-icon'/>
//                             <p className='drop-text'>click atau drop disini</p>
//                             <input 
//                                 type="file" 
//                                 accept='image/*' 
//                                 ref={fileInput} hidden 
//                                 onChange={e => handleFile(e.target.files[0])}
//                             />
//                         </div>
//                     }
//                     </div>
//                     <div className="img-form">
//                         <div className="general-info">
//                             <h3>Memperbarui jadwal</h3>
//                             <p className='date'>{date}</p>
//                         </div>
//                         <span className='url-image'>{previewUrl? previewUrl : 'Url Image'}/-</span>
//                         <button className='task-submit' onClick={() => formRef.current.submit}>Tambah</button>
//                     </div>
//                 </form>
//             </FileDrop>
//             <Modal open={full} close={() => setFull(false)}>
//                 <div className="jadwal-image" onClick={() => setFull(false)}>
//                     <img src={room.jadwal} alt="jadwal room" />
//                 </div>
//             </Modal>
//         </div>
//     )
// }
export function JadwalRoom() {
    const idBook = useSelector(state => state.fetch.idBook)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const pageDetails = useSelector(state => state.source.source.details)
    const [full, setFull] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const date = convertDateToString(new Date().toLocaleDateString())
    const url = 'https://zjzkllljdilfnsjxjrxa.supabase.co/storage/v1/object/public/book'
    // file drop
    const fileInput = useRef(null)
    const[image, setImage] = useState(null)
    const[previewUrl, setPreviewUrl] = useState('')
    const handleFile = file => {
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
    }
    const handleOndragOver = event => {
        event.preventDefault()
    }
    const handleOndrop = event => {
        event.preventDefault()
        event.stopPropagation()
        let imageFile = event.dataTransfer.files[0]
        handleFile(imageFile)
    }
    // form
    const formRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('jadwal_url', pageDetails.jadwal_url)
        try {
            startInterval()
            await axios.post(`${API}/image/jadwal/${idBook}/${idPageOfBook}`, formData)
            .then(res => {
                setSource(res.data)
                imageToast('jadwal diperbarui')
                setModalOpen(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
            }).catch(err => {
                imageToast('jadwal gagal diperbarui')
            }).finally(() => {
                stopInterval()
            })
        } catch (error) {
            stopInterval()
        }
    }
    const [intervalId, setIntervalId] = useState(null)
    const [count, setCount] = useState(0)
    const startInterval = () => {
        const intervalId = setInterval(() => {
            setCount((count) => count + 1)
        }, 1000)
        setIntervalId(intervalId)
    }
    const stopInterval = () => {
        clearInterval(intervalId)
        setCount(0)
        setIntervalId(null)
    }
    return (
        <div className="jadwal">
            <div className='preview' style={{background: `url(${url}/${pageDetails.jadwal_url})`}}>
                <div className="setting pointer" onClick={() => setModalOpen(true)}>
                    <FontAwesomeIcon icon={faGear} className='setting-btn'/>
                </div>
            </div>
            <div className="open-jadwal pointer" onClick={() => setFull(true)}>
                <p>Jadwal</p>
                <FontAwesomeIcon icon={faChevronRight} className='jadwal-arrow'/>
            </div>
            <FileDrop open={modalOpen} close={() => setModalOpen(false)}>
                <form ref={formRef} className='file-drop jadwal-form' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                    <div className="img-view" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                    { previewUrl ? 
                        <img src={previewUrl} alt={image.name} /> 
                    :
                        <div className="drop-zone">
                            <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                            <p className='drop-text'>click atau drop disini</p>
                            <input 
                                type="file" 
                                accept='image/*' 
                                ref={fileInput} hidden 
                                onChange={e => handleFile(e.target.files[0])}
                            />
                        </div>
                    }
                    </div>
                    <div className="img-form">
                        <div className="general-info">
                            <h3>Memperbarui jadwal</h3>
                            <p className='date'>{date}</p>
                        </div>
                        <span className='url-image'>{previewUrl? previewUrl : 'Url Image'}/-</span>
                        {count?
                        <button className='task-submit'>Loading...{count}</button>
                        :
                        <button className='task-submit' onClick={() => formRef.current.submit}>Perbarui</button>
                        }
                    </div>
                </form>
            </FileDrop>
            <Modal open={full} close={() => setFull(false)}>
                <div className="jadwal-image" onClick={() => setFull(false)}>
                    <img src={`${url}/${pageDetails.jadwal_url}`} alt="jadwal room" />
                </div>
            </Modal>
        </div>
    )
}
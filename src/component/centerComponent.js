import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faNoteSticky, faCheck, faPlus, faTrash, faPenToSquare, faImage, faStickyNote, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {convertDateToString} from '../utils/convertDateFormat'
import { useState } from 'react';
import { FileDrop, Modal, ModalNoteEditor, Confirm } from './Modal'
// import { ItemData } from '../pages/App';
import { toast } from 'react-toastify'
import { TodoModel } from './model';
import { useRef } from 'react';
import { deleteToast, editToast, imageToast, noteToast, noteToastSecond, todoToast, loadingToast } from '../utils/notif';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setNoteEditor, setSource } from '../redux/sourceSlice';
import { clearTodo, setTodo } from '../redux/todo';
import { useEffect } from 'react';
import Calendar from 'react-calendar';

const API = process.env.REACT_APP_API



export function CardImages() {
    const nickname = useSelector(state => state.source.profile.nickname)
    const idBook = useSelector(state => state.fetch.idBook)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todo = useSelector(state => state.todo)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const box = []
    todo.images.forEach((data, index) => {
        box.push(
            <Image key={index} data={data}/>
        )
    })
    const date = convertDateToString(new Date().toLocaleDateString())
    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
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
        formData.append('nickname', nickname)
        formData.append('image', image)
        formData.append('desc', e.target.desc.value)
        const promise = loadingToast('Mengunggah gambar')
        setIsFetching(true)
        try {
            await axios.post(`${API}/image/${idBook}/${idPageOfBook}/${todo.id}`, formData)
            .then(res => {
                imageToast()
                setModalOpen(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
                dispatch(setTodo(res.data))
            })
            .catch(err => {
                imageToast('gambar gagal ditambahkan')
            }).finally(() => {
                toast.dismiss(promise)
                setIsFetching(false)
            })
        } catch(err) {
            toast.dismiss(promise)
            setIsFetching(false)
        }
    }
    const [isFetching, setIsFetching] = useState(false)
    return (
        <div className='images-container'>
            <div className='images-list'>
                {box}
            </div>
            <FontAwesomeIcon icon={faPlus} className='add-image' onClick={handleModalOpen}/>
            <FileDrop open={modalOpen} close={handleModalClose}>
                <form ref={formRef} className='file-drop' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
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
                            <h3>Menambah foto</h3>
                            <p className='date'>{date}</p>
                        </div>
                        <span className='url-image'>{previewUrl? previewUrl : 'Url Image'}/-</span>
                        <textarea placeholder='deskripsi' rows="10"name='desc'/>
                        {isFetching?
                            <button className='task-submit'>Loading...</button>
                            :
                            <button className='task-submit' onClick={() => formRef.current.submit}>Tambah</button>
                        }
                    </div>
                </form>
            </FileDrop>
        </div>
    )
}
function Image({data}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const dispatch = useDispatch()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const url = 'https://zjzkllljdilfnsjxjrxa.supabase.co/storage/v1/object/public/book'
    const pathSplit = data.pic.split('/')
    const [full, setFull] = useState(false)
    function handleFull() {
        setFull(!full)
    }
    async function deleteImage() {
        try {
            await axios.delete(`${API}/image/${idPageOfBook}/${todoId}/${data._id}`, {path: data.pic})
            .then((res) => {
                deleteToast('berhasil dihapus')
                dispatch(setTodo(res.data))
            })
            .catch(err => {
                deleteToast('gagal terhapus')
            })
        } catch(err) {

        }
    }
    return (
        <>
        <div className='card-img'>
            <img alt={data.by} className={`card-img-pic ${full&&'full'}`} src={`${url}/${data.pic}`} onClick={handleFull}/>
            <div className='card-img-context'>
                <div className='card-img-context-deep'>
                    <div className="card-img-by">{data.by}</div>
                    <p className="card-img-desc">{data.desc}</p>
                </div>
                <div className="card-img-date" onClick={() => setDeleteOpen(true)}>{convertDateToString(data.date)}</div>
            </div>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={pathSplit[pathSplit.length - 1]} metode='delete' color={'var(--danger)'} callback={deleteImage}/>
        </>
    )
}
export function Notes() {
    const todoNotes = useSelector(state => state.todo.notes)
    const notes = []
    todoNotes.forEach((item, index) => {
        notes.push(
                <NoteItem key={index} data={item}/>
            )
        })
    return(
        <div className='notes-container'>
            {notes}
        </div>
    )
}
function NoteItem({data}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const dispatch = useDispatch()
    async function handleDelete() {
        try {
            await axios.delete(`${API}/notes/${idPageOfBook}/${todoId}/${data._id}`)
            .then((res) => {
                deleteToast('catatan berhasil dihapus')
                dispatch(setTodo(res.data))
            })
            .catch(err => {
                deleteToast('catatan gagal dihapus')
            }) 
        } catch(err) {
            
        }
    }
    function confirmToDelete() {
        setConfirmOpen(true)
    }
    function handleEdit() {
        editToast('mengedit catatan')
        dispatch(setNoteEditor(data))
    }
    return (
        <>
        <div className='note'>
            <div className='note-head'>
                <FontAwesomeIcon icon={faNoteSticky} style={{color: data.color}} className='note-color'/>
                <div className="note-btn">
                    <FontAwesomeIcon icon={faTrash} className='pointer' onClick={confirmToDelete}/>
                    <FontAwesomeIcon icon={faPenToSquare} className='pointer' onClick={handleEdit}/>
                </div>
            </div>
            <div className='note-body'>
                <pre>
                    {data.context}
                </pre>
                <span className='note-info'>{`${data.by}, ${convertDateToString(data.date)}`}</span>
            </div>
        </div>
        <Confirm open={confirmOpen} close={() => setConfirmOpen(false)} target={`${data.by}, ${convertDateToString(data.date)}`} metode='delete' color={data.color} callback={handleDelete}/>
        </>
    )
}
export function NoteEditor() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const data = useSelector(state => state.source.noteEditor)
    const [noteVal, setNoteVal] = useState(null)
    const [discard, setDiscard] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (data) {
            setNoteVal(data.context)
        }
    }, [data])
    if (!data) return null
    function confirmToClose() {
        if (noteVal !== data.context) {
            setDiscard(true)
        } else {
            modalClose()
        }
    }
    function modalClose() {
        dispatch(setNoteEditor(null))
    }
    function handleChange(data) {
        setNoteVal(data.target.value)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const dataToSend = {
            context: noteVal
        }
        try {
            await axios.put(`${API}/notes/${idPageOfBook}/${todoId}/${data._id}`, dataToSend)
            .then(res => {
                noteToastSecond({text: 'catatan berhasil diperbarui', color: data.color})
                dispatch(setTodo(res.data))
                modalClose()
                console.log(res)
            })
            .catch(err => {
                noteToastSecond({text: 'catatan gagal diperbarui', color: 'var(--danger)'})
                console.log(err)
            })
        } catch (err) {
            
        }
    }
    return (
        <>
        <ModalNoteEditor open={true} close={confirmToClose}>
            <form className='note note-editor' onSubmit={handleSubmit}>
                <div className='note-head'>
                    <FontAwesomeIcon 
                    icon={faNoteSticky} 
                    style={{color: data.color}} 
                    className='note-color'/>
                    <button type='submit' className='note-btn-simpan'>Simpan</button>
                </div>
                <div className='note-body'>
                    <textarea
                        className='note_editor-textarea'
                        placeholder={data.context}
                        value={noteVal || ''}
                        onChange={handleChange}
                    />
                    <span className='note-info'>
                        {`${data.by}, ${convertDateToString(data.date)}`}
                    </span>
                </div>
            </form>
        </ModalNoteEditor>
        <Confirm open={discard} close={() => setDiscard(false)} target={`${data.by}, ${convertDateToString(data.date)}`} metode='discard' color={data.color} callback={modalClose}/>
        </>
    )
}

export function CenterActionButton({handleModalOpen}) {
    const todoId = useSelector(state => state.todo.id)
    function handleClick() {
        dispatch(clearTodo())
    }
    const dispatch = useDispatch()
    return (
        <div className='center-action-btn'>
                {todoId && (
                <div className='detail-back pointer' onClick={handleClick}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <span>Back</span>
                </div>
                )}
                <div className="action-add">
                    <FontAwesomeIcon icon={todoId?faStickyNote:faCheck} className='add-btn pointer' onClick={handleModalOpen}/>
                </div>
        </div>
    )
}

export function AddTaskModal({modalOpen, handleModalClose, title}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const colors = ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow']
    const [currentColor, setCurrentColor] = useState(colors[Math.floor(Math.random() * 5)])
    const borderStyle = {border: `1px solid ${currentColor}`}
    const date = convertDateToString(new Date().toLocaleDateString())
    const formRef = useRef()
    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function colorDefault() {
        setCurrentColor(colors[Math.floor(Math.random() * 5)])
    }
    const dispatch = useDispatch()
    async function handleSubmit(e) {
        e.preventDefault()
        const dataToSend = {
            item_title: e.target.title.value,
            desc: e.target.desc.value,
            color: e.target.color.value,
            deadline: +new Date(deadlineValue[0].details.deadline)
        }
        const promise = loadingToast('Membuat daftar baru')
        try {
            await axios.post(`${API}/source/addTodo/${idPageOfBook}`, dataToSend)
            .then((res) => {
                todoToast(dataToSend)
                dispatch(setSource(res.data))
            })
            .catch(err => {
                todoToast('data gagal dikirim')
            }).finally(() => {
                toast.dismiss(promise)
            })
        } catch(err) {
            toast.dismiss(promise)
        }
        handleModalClose()
        setDeadlineValue([])
        colorDefault()
    }
    function modalClose() {
        handleModalClose()
        colorDefault()
    }
    const [deadlineValue, setDeadlineValue] = useState([])
    const colorsTile = deadlineValue.map(item => ({
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
                item_title: formRef.current.title.value,
            }
        }
        setDeadlineValue([newDate])
    }
    return (
        <Modal open={modalOpen} close={modalClose}>
            <div className="add-modal">
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
                        <p className="date">{date}</p>
                    </div>
                    <div className="input-left">
                        <input name='title' type="text" placeholder='Judul' style={borderStyle} required autoComplete='off'/>
                        <select style={borderStyle} onChange={handleColor} name='color' value={currentColor}>
                            <option value="grey">grey</option>
                            <option value="tomato">tomato</option>
                            <option value="royalblue">royalblue</option>
                            <option value="goldenrod">goldenrod</option>
                            <option value="greenyellow">greenyellow</option>
                        </select>
                    </div>
                    <textarea placeholder='deskripsi' rows="10" style={borderStyle} name='desc'/>
                    <button type='submit' className='task-submit' form='addTask'>Tambah</button>
                </form>
            </div>
        </Modal>
    )
}

export function AddNoteModal({modalOpen, handleModalClose, title}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const profile = useSelector(state => state.source.profile)
    const dispatch = useDispatch()
    const colors = ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow']
    const [currentColor, setCurrentColor] = useState(colors[Math.floor(Math.random() * 5)])
    const borderStyle = {border: `1px solid ${currentColor}`}
    const date = convertDateToString(new Date().toLocaleDateString())
    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function colorDefault() {
        setCurrentColor(colors[Math.floor(Math.random() * 5)])
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const dataToSend = {
            by: profile.nickname,
            color: e.target.color.value,
            context: e.target.desc.value
        }
        try {
            await axios.post(`${API}/notes/${idPageOfBook}/${todoId}`, dataToSend)
            .then((res) => {
                noteToast(dataToSend)
                dispatch(setTodo(res.data))
            })
            .catch(err => {
                noteToast({color : 'var(--danger)'})
            }) 
        } catch(err) {

        }
        handleModalClose()
        colorDefault()
    }
    function modalClose() {
        handleModalClose()
        colorDefault()
    }
    return (
        <Modal open={modalOpen} close={modalClose}>
            <div className='add-modal'>
                <div className="general-modal">
                    <FontAwesomeIcon icon={faNoteSticky} className="icon-modal" style={{color: currentColor}}/>
                </div>
                <form className="form-modal" onSubmit={handleSubmit}>
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{title}</h3>
                        <p className="date">{date}</p>
                    </div>
                    <div className="input-left">
                        <select style={borderStyle} onChange={handleColor} name='color' value={currentColor}>
                            <option value="grey">grey</option>
                            <option value="tomato">tomato</option>
                            <option value="royalblue">royalblue</option>
                            <option value="goldenrod">goldenrod</option>
                            <option value="greenyellow">greenyellow</option>
                        </select>
                    </div>
                    <textarea placeholder='deskripsi' rows="10" style={borderStyle} name='desc'/>
                    <button className='task-submit'>Tambah</button>
                </form>
            </div>
        </Modal>
    )
}

export function CardContainer() {
    const source = useSelector(state => state.source.source)
    let box = []
    const list = source.list
    try {
        list.forEach((data, index) => box.push(<TodoModel key={index} item={data}/>))
    } catch (error) {
        
    }
    return box
}
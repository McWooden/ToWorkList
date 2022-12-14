import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faNoteSticky, faCheck, faPlus, faTrash, faPenToSquare, faImage} from '@fortawesome/free-solid-svg-icons'
import {convertDateToString} from '../utils/convertDateFormat'
import { useContext, useState } from 'react';
import { FileDrop, Modal } from './Modal'
import { ItemData } from '../pages/App';
import { TodoModel } from './model';
import { useRef } from 'react';
import { deleteToast, editToast, imageToast, noteToast, todoToast } from '../utils/notif';




export function CardImages() {
    const {item} = useContext(ItemData)
    const [modalOpen, setModalOpen] = useState(false)
    const box = []
    item.images.forEach((data, index) => {
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
    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            image: image,
            desc: e.target.desc.value
        }
        imageToast()
        console.log(data)
        setModalOpen(false)
        formRef.current.reset()
        setImage(null)
        setPreviewUrl('')
    }
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
                        <button className='task-submit' onClick={() => formRef.current.submit}>Tambah</button>
                    </div>
                </form>
            </FileDrop>
        </div>
    )
}
function Image({data}) {
    const [full, setFull] = useState(false)
    function handleFull() {
        setFull(!full)
    }
    return (
        <div className='card-img'>
            <img alt={data.by} className={`card-img-pic ${full&&'full'}`} src={data.pic} onClick={handleFull}/>
            <div className='card-img-context'>
                <div className='card-img-context-deep'>
                    <div className="card-img-by">{data.by}</div>
                    <p className="card-img-desc">{data.desc}</p>
                </div>
                <div className="card-img-date">{convertDateToString(data.date)}</div>
            </div>
        </div>
    )
}
export function Notes() {
    const {item} = useContext(ItemData)
    const notes = []
    item.notes.forEach((item, index) => {
        function handleDelete() {
            deleteToast('menghapus catatan')
        }
        function handleEdit() {
            editToast('mengedit catatan')
        }
        notes.push(
                <div className='note' key={index}>
                    <div className='note-head'>
                        <FontAwesomeIcon icon={faNoteSticky} style={{color: item.color}} className='note-color'/>
                        <div className="note-btn">
                            <FontAwesomeIcon icon={faTrash} className='pointer' onClick={handleDelete}/>
                            <FontAwesomeIcon icon={faPenToSquare} className='pointer' onClick={handleEdit}/>
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
export function CenterActionButton({handleModalOpen}) {
    const {item} = useContext(ItemData)
    return (
        <div className='center-action-btn'>
            <div className="action-add">
                <FontAwesomeIcon icon={item ? faNoteSticky : faCheck} className='add-btn pointer' onClick={handleModalOpen}/>
            </div>
        </div>
    )
}

export function AddTaskModal({modalOpen, handleModalClose, title}) {
    const [currentColor, setCurrentColor] = useState('grey')
    const borderStyle = {border: `1px solid ${currentColor}`}
    const date = convertDateToString(new Date().toLocaleDateString())
    const formRef = useRef()
    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function colorDefault() {
        setCurrentColor('grey')
    }
    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            title: e.target.title.value,
            color: e.target.color.value,
            desc: e.target.desc.value
        }
        todoToast(data)
        handleModalClose()
        colorDefault()
    }
    function modalClose() {
        handleModalClose()
        colorDefault()
    }
    return (
        <Modal open={modalOpen} close={modalClose}>
            <div className="add-modal">
                <div className="general-modal">
                    <FontAwesomeIcon icon={faCheck} className="icon-modal" style={{color: currentColor}}/>
                </div>
                <form className="form-modal" ref={formRef} onSubmit={handleSubmit} id='addTask'>
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{title}</h3>
                        <p className="date">{date}</p>
                    </div>
                    <div className="input-left">
                        <input name='title' type="text" placeholder='Judul' style={borderStyle} required/>
                        <select style={borderStyle} onChange={handleColor} name='color'>
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
    const [currentColor, setCurrentColor] = useState('grey')
    const borderStyle = {border: `1px solid ${currentColor}`}
    const date = convertDateToString(new Date().toLocaleDateString())
    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function colorDefault() {
        setCurrentColor('grey')
    }
    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            color: e.target.color.value,
            desc: e.target.desc.value
        }
        noteToast(data)
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
                        <select style={borderStyle} onChange={handleColor} name='color'>
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

export function CardContainer({items}) {

    let box = []
    items.forEach((data, index) => box.push(<TodoModel key={index} item={data} indexItem={index}/>))
    return (
        <>
        {box}
        </>
    )
}
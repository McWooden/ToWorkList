import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faNoteSticky, faImage, faMessage, faPenToSquare, faTrash, faChevronRight, faGear} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import {convertDateToString} from '../utils/convertDateFormat'
import { GuildContext, ItemData } from '../pages/App';
import { deleteToast, editToast } from '../utils/notif';
import { useState, useRef } from 'react';
import { Modal, FileDrop } from './Modal';
import { imageToast } from '../utils/notif';

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
    function handleEdit() {
        editToast('mengedit tugas')
    }
    function handleDelete() {
        deleteToast('menghapus tugas')
    }
    return (
        <div className='detail-Left-action'>
            <FontAwesomeIcon icon={faTrash} className='action-left action-trash-left' onClick={handleDelete}/>
            <FontAwesomeIcon icon={faPenToSquare} className='action-left action-edit-left' onClick={handleEdit}/>
        </div>
    )
}

export function JadwalRoom() {
    const { room } = useContext(GuildContext)
    const [full, setFull] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const date = convertDateToString(new Date().toLocaleDateString())
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
        }
        imageToast('jadwal diperbarui')
        console.log(data)
        setModalOpen(false)
        formRef.current.reset()
        setImage(null)
        setPreviewUrl('')
    }
    return (
        <div className="jadwal">
            <div className='preview' style={{background: `url(${room.jadwal})`, backgroundPosition: 'center', backgroundSize: 'contain'}}>
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
                        <button className='task-submit' onClick={() => formRef.current.submit}>Tambah</button>
                    </div>
                </form>
            </FileDrop>
            <Modal open={full} close={() => setFull(false)}>
                <div className="jadwal-image" onClick={() => setFull(false)}>
                    <img src={room.jadwal} alt="jadwal room" />
                </div>
            </Modal>
        </div>
    )
}
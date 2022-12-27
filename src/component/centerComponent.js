import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faNoteSticky, faCheck, faPlus, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {convertDateToString} from '../utils/convertDateFormat'
import { useContext, useState } from 'react';
import { Modal } from './Modal'
import { ItemData } from '../pages/App';
import { TodoModel } from './model';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/notif.css'



export function CardImages() {
    const {item} = useContext(ItemData)
    const box = []
    item.images.forEach((data, index) => {
        box.push(
            <Image key={index} data={data}/>
        )
    })
    return (
        <div className='images-container'>
            <div className='images-list'>
                {box}
            </div>
            <FontAwesomeIcon icon={faPlus} className='add-image'/>
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
        notes.push(
                <div className='note' key={index}>
                    <div className='note-head'>
                        <FontAwesomeIcon icon={faNoteSticky} style={{color: item.color}} className='note-color'/>
                        <div className="note-btn">
                            <FontAwesomeIcon icon={faTrash} className='pointer'/>
                            <FontAwesomeIcon icon={faPenToSquare} className='pointer'/>
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
    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function colorDefault() {
        setCurrentColor('grey')
    }
    return (
        <Modal open={modalOpen} close={handleModalClose} colorDefault={colorDefault}>
            <div className="add-modal">
                <div className="general-modal">
                    <FontAwesomeIcon icon={faCheck} className="icon-modal" style={{color: currentColor}}/>
                </div>
                <form className="form-modal">
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{title}</h3>
                        <p className="date">{date}</p>
                    </div>
                    <div className="input-left">
                        <input type="text" placeholder='Judul' style={borderStyle} required/>
                        <select style={borderStyle} onChange={handleColor}>
                            <option value="grey">grey</option>
                            <option value="tomato">tomato</option>
                            <option value="royalblue">royalblue</option>
                            <option value="goldenrod">goldenrod</option>
                            <option value="greenyellow">greenyellow</option>
                        </select>
                    </div>
                    <textarea placeholder='deskripsi' rows="10" style={borderStyle}/>
                    <div className='task-submit'>Tambah</div>
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
    return (
        <Modal open={modalOpen} close={handleModalClose} colorDefault={colorDefault}>
            <div className='add-modal'>
                <div className="general-modal">
                    <FontAwesomeIcon icon={faNoteSticky} className="icon-modal" style={{color: currentColor}}/>
                </div>
                <form className="form-modal">
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{title}</h3>
                        <p className="date">{date}</p>
                    </div>
                    <div className="input-left">
                        <select style={borderStyle} onChange={handleColor}>
                            <option value="grey">grey</option>
                            <option value="tomato">tomato</option>
                            <option value="royalblue">royalblue</option>
                            <option value="goldenrod">goldenrod</option>
                            <option value="greenyellow">greenyellow</option>
                        </select>
                    </div>
                    <textarea placeholder='deskripsi' rows="10" style={borderStyle}/>
                    <div className='task-submit'>Tambah</div>
                </form>
            </div>
        </Modal>
    )
}

export function CardContainer({items, reverseDone}) {
    function editToast() {
        toast(
        <div className="myToast myToast-edit">
            <div className="icon">
                <FontAwesomeIcon icon={faPenToSquare}/>
            </div>
            <p>Edit</p>
        </div>, {
            closeButton: false
        })
    }
    function deleteToast() {
        toast(
        <div className="myToast myToast-delete">
            <div className="icon">
                <FontAwesomeIcon icon={faTrash}/>
            </div>
            <p>Terhapus</p>
        </div>, {
            closeButton: false
        })
    }
    let box = []
    items.forEach((data, index) => box.push(<TodoModel key={index} item={data} indexItem={index} reverseDone={reverseDone} deleteToast={deleteToast} editToast={editToast}/>))
    return (
        <>
        {box}
        <ToastContainer
                pauseOnFocusLoss={false}
                theme="colored"
                autoClose={3000}
            />
        </>
    )
}
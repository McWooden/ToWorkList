import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { deleteToast, editToast } from '../../../utils/notif';
import { useState, useRef } from 'react';
import { Modal } from '../../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import axios from 'axios';
import { clearTodo, setTodo } from '../../../redux/todo';
import { Confirm } from '../../Modal/Confirm';

import { API } from '../../../utils/variableGlobal'

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
        const dataToSend = {
            color: e.target.color.value,
            desc: e.target.desc.value,
            deadline: +new Date(colorsTileSource[0].details.deadline),
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
    const colorsTile = colorsTileSource.map(item => {
        const date = new Date(item.details.deadline)
        return {
            date: isNaN(date) ? new Date(Number(item.details.deadline)) : date,
            color: item.details.color,
            title: item.details.item_title,
        }
    })
    function dayTileClick(x) {
        const date = +new Date(x)
        console.log(date)
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
        <div className='detail-Left-action d-flex'>
            <FontAwesomeIcon icon={faTrash} className='action-left action-trash-left' onClick={() => setDeleteOpen(true)}/>
            <FontAwesomeIcon icon={faPenToSquare} className='action-left action-edit-left' onClick={() => setEditModal(true)}/>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color={item.details.color} callback={deleteTodo}/>
        <Modal open={editModal} close={() => setEditModal(false)}>
            <div className="edit_card_modal d-flex">
                <div className="general-modal d-flex fd-column ai-center jc-center">
                    <Calendar 
                        onClickDay={dayTileClick}
                        className="calendar-dark" 
                        locale='id-ID'
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
                    <div className="input-left d-flex fd-row">
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
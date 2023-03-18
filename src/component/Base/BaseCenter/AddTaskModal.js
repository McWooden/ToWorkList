import Calendar from 'react-calendar';
import { toast } from 'react-toastify'
import { useRef } from 'react';
import { setSource } from '../../../redux/sourceSlice';
import { todoToast, loadingToast } from '../../../utils/notif';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../Modal/Modal';
import { useState } from 'react';
import { API } from '../../../utils/variableGlobal';
import { convertDateToString } from '../../../utils/convertDateFormat';
import axios from 'axios';

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
    const [deadlineValue, setDeadlineValue] = useState([{
        details: {
            deadline: new Date(),
            color: 'var(--purple-1)',
            item_title: 'Hari ini',
        }
    }])
    const colorsTile = deadlineValue.map(item => ({
        date: new Date(item.details.deadline.toLocaleDateString()),
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

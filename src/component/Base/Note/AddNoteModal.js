import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { useState } from 'react'
import { Modal } from '../../Modal/Modal'
import { noteToast } from '../../../utils/notif'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setTodo } from '../../../redux/todo'
import { API } from '../../../utils/variableGlobal'


export function AddNoteModal({modalOpen, handleModalClose, title}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const profile = useSelector(state => state.source.profile)
    const dispatch = useDispatch()
    const colors = ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow']
    const [currentColor, setCurrentColor] = useState(colors[Math.floor(Math.random() * 5)])
    const borderStyle = {border: `1px solid ${currentColor}`}
    const date = convertDateToString(new Date().toLocaleDateString())
    const nickname = useSelector(state => state.source.profile.nickname)
    const channelTodoDetail = useSelector(state => state.channel.todoDetail)
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
                channelTodoDetail.send({
                    type: 'broadcast',
                    event: 'shouldUpdate',
                    payload: `${nickname} menambah catatan`,
                })
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
            <div className='add-modal d-flex'>
                <div className="general-modal d-flex fd-column ai-center jc-center">
                    <FontAwesomeIcon icon={faNoteSticky} className="icon-modal" style={{color: currentColor}}/>
                </div>
                <form className="form-modal d-flex fd-column" onSubmit={handleSubmit}>
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{title}</h3>
                        <p className="date">{date}</p>
                    </div>
                    <div className="input-left d-flex fd-row">
                        <select style={borderStyle} onChange={handleColor} name='color' value={currentColor}>
                            <option value="grey">grey</option>
                            <option value="tomato">tomato</option>
                            <option value="royalblue">royalblue</option>
                            <option value="goldenrod">goldenrod</option>
                            <option value="greenyellow">greenyellow</option>
                        </select>
                    </div>
                    <textarea placeholder='deskripsi' rows="10" style={borderStyle} name='desc'/>
                    <button className='task-submit d-grid pi-center pointer'>Tambah</button>
                </form>
            </div>
        </Modal>
    )
}
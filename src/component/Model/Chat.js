import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setTodo } from '../../redux/todo'
import axios from 'axios'
import { API } from '../../utils/variableGlobal'
import { deleteToast } from '../../utils/notif'
import { useEffect, useRef, useState } from 'react'

export function ChatModel({item}) {
    const [dropDown, setDropDown] = useState(false)
    const dispatch = useDispatch()
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const myAccount = useSelector(state => state.source.profile)
    const itsMe = item.nickname === myAccount.nickname
    let cardRef = useRef()
    const disable = item.msg === 'Pesan ini telah dihapus'
    const time = item.time || new Date(Number(item.date)).toLocaleTimeString('id-ID', {hour24: true, hour: '2-digit', minute: '2-digit'}).replace(':', '.')
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
        <div className={`${itsMe&&'my'} chat-card d-flex p-relative ${dropDown?'active':'inactive'}`} ref={cardRef}>
            <div className={`${itsMe&&'my'} chat-card-message ${disable&&'disable'}`}>{item.msg}</div>
            <div className={`${itsMe&&'my'} chat-card-time pointer as-flex-end`} onClick={handleDropDown}>{time}</div>
            <div className={`chat-dropdown p-absolute jc-center d-flex ${itsMe&&'my'} ${dropDown?'active':'inactive'}`}>
                <ul>
                    <li className='pointer' onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
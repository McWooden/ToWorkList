import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather} from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { sendToast } from '../utils/notif'
import { ChatModel } from './model'
import { useDispatch, useSelector } from 'react-redux'
import { convertDateToString } from '../utils/convertDateFormat'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { addChat } from '../redux/sourceSlice'
const API = process.env.REACT_APP_API
const socket = io.connect(API)

export function SidebarRightChat() {
    const chat = useSelector(state => state.source.chat)
    const profile = useSelector(state => state.source.profile)
    const myNickname = profile.nickname
    const dispatch = useDispatch()
    let box = []
    let lastDate = null
    let lastNickname = null
    chat.forEach((item, index) => {
        if (item.date !== lastDate) {
            box.push(
                <div key={`${index}-${item.date}`} className='chat-card-date'>{convertDateToString(item.date)}</div>
            )
            lastDate = item.date
            lastNickname = null
        }
        if (item.nickname !== lastNickname) {
            item.nickname !== myNickname &&
            box.push(
                <div key={`${index}-${item.nickname}`} className='chat-card-nickname'>{item.nickname}</div>
            )
            lastNickname = item.nickname
        }
        box.push(
            <ChatModel key={index} item={item}/>
        )
    })
    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (!data) return
            dispatch(addChat(data))
        })
    }, [dispatch])
    return (
        <div className="base-right">
            <div className="sidebar-right">
                {box}
            </div>
            <FormBaseRight/>
        </div>
    )
}
export function FormBaseRight() {
    const profile = useSelector(state => state.source.profile)
    const myNickname = profile.nickname
    const todo = useSelector(state => state.source.todo)
    const id = todo._id
    const [isConnected,] = useState(socket.connected)
    const [msg, setMsg] = useState('')
    const textarea = useRef()
    const dispatch = useDispatch()
    function handleSubmit(e) {
        e.preventDefault()
        textarea.current.style.height = '15px'
        sendToast(msg)
        const data = {
            nickname: myNickname,
            msg,
        }
        socket.emit("send_message", { data, id })
        dispatch(addChat({
            ...data,
            time: `${new Date().getHours().toString().padStart(2, '0')}.${new Date().getMinutes().toString().padStart(2, '0')}`,
            date: `${new Date().getMonth().toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/${new Date().getFullYear().toString().slice(-2)}`
        }))
        setMsg('')
    }
    function handleInput(e) {
        setMsg(e.target.value)
        textarea.current.style.height = '15px'
        let height = textarea.current.scrollHeight
        textarea.current.style.height = height + 'px'
    }
    useEffect(() => {
        if (id !== "" && isConnected) {
            socket.emit("join_room", id)
        }
    }, [isConnected, id])
    return (
        <form className='base-right-form' onSubmit={handleSubmit}>
            <div className="textarea-container">
                <textarea id="myTextarea" rows="1" placeholder='messege main todo' name='msg' onChange={handleInput} value={msg} ref={textarea} style={{height: '15px'}}/>
            </div>
            {
                msg ? 
                    <button className='pointer btn-on' title='send'>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                :
                    <button className='btn-off' title='write text first'>
                        <FontAwesomeIcon icon={faFeather}/>
                    </button>
            }
        </form>
    )
}
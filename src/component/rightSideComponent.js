import { faChevronDown, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect } from 'react'
import { sendToast } from '../utils/notif'
import { ChatModel } from './model'
import { useDispatch, useSelector } from 'react-redux'
import { convertDateToString } from '../utils/convertDateFormat'
import axios from 'axios'
import { useContext } from 'react'
import { HideBase } from './TodoApp'
import { setTodo } from '../redux/todo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const API = process.env.REACT_APP_API

export function SidebarRightChat() {
    const chat = useSelector(state => state.todo.chat)
    const profile = useSelector(state => state.source.profile)
    const { hideRightBase } = useContext(HideBase)
    const myNickname = profile.nickname
    let box = []
    let lastDate = null
    let lastNickname = null

    const chatRef = useRef(null)
    const [scrollToBottom, setScrollToBottom] = useState(true)

    useEffect(() => {
        if (scrollToBottom) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [chat, scrollToBottom])

    const handleScroll = () => {
        if (chatRef.current.scrollTop + chatRef.current.clientHeight !== chatRef.current.scrollHeight) {
            setScrollToBottom(false)
        } else {
            setScrollToBottom(true)
        }
    }

    
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
    return (
        <div className={`base-right ${hideRightBase?'base-right-hide':'base-right-show'}`}>
            <div className="sidebar-right" ref={chatRef} onScroll={handleScroll}>
            <FontAwesomeIcon icon={faChevronDown} onClick={() => setScrollToBottom(true)} className={`scrollToBottom ${scrollToBottom?'':'active'}`}/>
                {box}
            </div>
            <FormBaseRight/>
        </div>
    )
}
export function FormBaseRight() {
    const profile = useSelector(state => state.source.profile)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const dispatch = useDispatch()

    const myNickname = profile.nickname
    const [msg, setMsg] = useState('')
    const textarea = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        textarea.current.style.height = '15px'
        sendToast(msg)
        const dataToSend = {
            nickname: myNickname,
            msg,
        }
        try {
            await axios.post(`${API}/source/chat/${idPageOfBook}/${todoId}`, dataToSend)
            .then((res) => {
                sendToast('data berhasil dikirim')
                dispatch(setTodo(res.data.data))
                setMsg('')
            })
            .catch(err => {
                sendToast('data gagal dikirim')
                console.log(err)
            }) 
        } catch(err) {

        }
    }
    function handleInput(e) {
        setMsg(e.target.value)
        textarea.current.style.height = '15px'
        let height = textarea.current.scrollHeight
        textarea.current.style.height = height + 'px'
    }
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
                    null
            }
        </form>
    )
}
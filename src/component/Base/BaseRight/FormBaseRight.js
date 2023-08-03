import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { sendToast } from '../../../utils/notif'
import { setChat } from '../../../redux/todo'

export function FormBaseRight() {
    const channel = useSelector(state => state.channel.book)
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
            await axios.post(`${API}/chat/${idPageOfBook}/${todoId}`, dataToSend)
            .then(async (res) => {
                dispatch(setChat(res.data.chat))
                channel.send({
                    type: 'broadcast',
                    event: `${idPageOfBook}/${todoId}:newMessage`,
                    payload: res.data.chat,
                });
                setMsg('');
        
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
        <form className='base-right-form zi-1 of-auto d-flex ai-flex-end' onSubmit={handleSubmit}>
            <div className="textarea-container d-flex ai-center of-auto bg-primary shadow-lg">
                <textarea id="myTextarea" rows="1" placeholder='messege main todo' name='msg' onChange={handleInput} value={msg} ref={textarea} style={{height: '15px'}} className='d-flex bg-inherit ai-center of-auto text-white placeholder:text-zinc-400'/>
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
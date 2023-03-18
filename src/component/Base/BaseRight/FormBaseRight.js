import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { sendToast } from '../../../utils/notif'
import { setTodo } from '../../../redux/todo'

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
            await axios.post(`${API}/chat/${idPageOfBook}/${todoId}`, dataToSend)
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
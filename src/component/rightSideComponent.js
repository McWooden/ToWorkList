import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather} from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { sendToast } from '../utils/notif'

export function FormBaseRight() {
    const [msg, setMsg] = useState('')
    const textarea = useRef()
    function handleSubmit(e) {
        e.preventDefault()
        setMsg('')
        textarea.current.style.height = '15px'
        sendToast()
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
                    <button className='btn-off' title='write text first'>
                        <FontAwesomeIcon icon={faFeather}/>
                    </button>
            }
        </form>
    )
}
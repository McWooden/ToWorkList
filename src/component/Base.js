import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather} from '@fortawesome/free-solid-svg-icons'
import './style/base.css'

export function Base() {
    return (
        <div className='base'>
            <BaseLeft/>
            <BaseCenter/>
            <BaseRight/>
        </div>
    )
}
function BaseLeft() {
    return (
        <div className="base-left base-left-hide">
            <div className="sidebar-left">
                <div className="progress">
                    <div className="progress-bar">
                        <div className="progress-value undone"></div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-value done"></div>
                    </div>
                </div>
            </div>
        </div>
    )

}
function BaseCenter() {
    return (
        <div className="base-center">
            <div className="center">
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
            </div>
        </div>
    )
}
const chatData = [
    {
        nickname: 'McWooden',
        msg: 'Yo wassap',
        time: '20.00',
        date: '12/2/2022'
    },
    {
        nickname: 'McWooden',
        msg: 'am here',
        time: '20.00',
        date: '12/2/2022'
    },
    {
        nickname: 'Putra',
        msg: 'heyyy',
        time: '20.04',
        date: '12/2/2022'
    },
    {
        nickname: 'Putra',
        msg: 'am here too',
        time: '20.04',
        date: '12/2/2022'
    },
    {
        nickname: 'Putra',
        msg: 'you guys using this app to talk about daily task?',
        time: '20.05',
        date: '12/3/2022'
    },
    {
        nickname: 'Hudin',
        msg: 'Hai',
        time: '20.20',
        date: '12/3/2022'
    },
    {
        nickname: 'Frank',
        msg: 'wow new member Hi!',
        time: '20.23',
        date: '12/3/2022'
    },
    {
        nickname: 'Frank',
        msg: 'welcome! hope you enjoy',
        time: '20.24',
        date: '12/3/2022'
    },
    {
        nickname: 'McWooden',
        msg: 'ini adalah data chat dummy. Huddin akan menyelesaikan frontEnd dan bermain database segera :D',
        time: '20.24',
        date: '12/3/2022'
    },
]
function BaseRight() {
    let chatBox = []
    let lastDate = null
    let lastNickname = null

    chatData.forEach((item, index) => {
        if (item.date !== lastDate) {
            chatBox.push(
                <div key={`${index}-${item.date}`} className='chat-card-date'>{item.date}</div>
            )
            lastDate = item.date
            lastNickname = null
        }
        if (item.nickname !== lastNickname) {
            chatBox.push(
                <div key={`${index}-${item.nickname}`} className='chat-card-nickname'>{item.nickname}</div>
            )
            lastNickname = item.nickname
        }
        chatBox.push(
            <div key={index} className='chat-card'>
                <div className='chat-card-message'>{item.msg}</div>
                <div className='chat-card-time'>{item.time}</div>
            </div>
        )
    })

    return (
        <div className="base-right base-right-hide">
            <div className="sidebar-right">
                {chatBox}
            </div>
            <FormBaseRight/>
        </div>
    )
}

function FormBaseRight() {
    const [msg, setMsg] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        setMsg('')
        console.log(msg)
    }
    function handleInput(e) {
        setMsg(e.target.value)
    }
    return (
        <form className='base-right-form' onSubmit={handleSubmit}>
            <input type="text" placeholder='messege main todo' name='msg' autoComplete='off' value={msg} onChange={handleInput}/>
            {
                msg ? 
                    <button className='pointer btn-on'>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                :
                    <button className='btn-off'>
                        <FontAwesomeIcon icon={faFeather}/>
                    </button>
            }
        </form>
    )
}

export default Base
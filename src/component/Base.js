import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather} from '@fortawesome/free-solid-svg-icons'
import './style/base.css'
import {ChatModel, TodoModel} from './model'
import {todoData, chatData} from './dataJSON'

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
    let box = []
    todoData.forEach((item, index) => box.push(<TodoModel key={index} item={item}/>))
    return (
        <div className="base-center">
            <div className="center">
                {box}
            </div>
        </div>
    )
}
function BaseRight() {
    let box = []
    let lastDate = null
    let lastNickname = null

    chatData.forEach((item, index) => {
        if (item.date !== lastDate) {
            box.push(
                <div key={`${index}-${item.date}`} className='chat-card-date'>{item.date}</div>
            )
            lastDate = item.date
            lastNickname = null
        }
        if (item.nickname !== lastNickname) {
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
        <div className="base-right base-right-hide">
            <div className="sidebar-right">
                {box}
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
            <input type='text' placeholder='messege main todo' name='msg' value={msg} onChange={handleInput}/>
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
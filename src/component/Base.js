import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather} from '@fortawesome/free-solid-svg-icons'
import './style/base.css'
import {ChatModel, TodoModel} from './model'
import { chatData } from '../utils/dataJSON'
import { useContext } from 'react';
import { ItemData, HideBase } from './TodoApp';
import { GuildContext } from '../pages/App';

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
    const { hideLeftBase } = useContext(HideBase)
    const {item} = useContext(ItemData)
    let box = null
    item ?
        box = <p>its detail about card</p>
    :
        box = (
            <div className="progress">
                <div className="progress-bar">
                    <div className="progress-value undone"></div>
                </div>
                <div className="progress-bar">
                    <div className="progress-value done"></div>
                </div>
            </div>
        )
    return (
        <div className={`base-left ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
            <div className="sidebar-left">
                {box}
            </div>
        </div>
    )
}
function BaseCenter() {
    const {room} = useContext(GuildContext)
    const {item} = useContext(ItemData)
    let box = []
    item ?
        box.push('its card notes')
    :
        room.item.forEach((data, index) => box.push(<TodoModel key={index} item={data}/>))
    return (
        <>
        <div className="base-center">
            <div className="center">
                {box}
            </div>
        </div>
        </>
    )
}
function BaseRight() {
    const { hideRightBase } = useContext(HideBase)
    const {item} = useContext(ItemData)
    let box = []
    let lastDate = null
    let lastNickname = null
    item ? 
        box.push('wadafak its a chat') 
    :
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
        <div className={`base-right ${hideRightBase?'base-right-hide':'base-right-show'}`}>
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
            <input type='text' placeholder='messege main todo' name='msg' value={msg} onChange={handleInput} autoComplete='off'/>
            {
                msg ? 
                    <button className='pointer btn-on' title='write text first'>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                :
                    <button className='btn-off' title='send'>
                        <FontAwesomeIcon icon={faFeather}/>
                    </button>
            }
        </form>
    )
}

export default Base
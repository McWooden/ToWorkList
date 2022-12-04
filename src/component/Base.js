import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
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
const todoData = [
    {
        title: 'Informatika',
        desc: 'Ini kisi-kisi ulangan hehe',
        color: 'tomato'
    },
    {
        title: 'todoV3',
        desc: 'versi ketiga dari project sebelumnya',
        color: 'goldenrod'
    },
    {
        title: 'Camp',
        desc: 'saya gasuka kemah :)',
        color: 'royalblue'
    },
    {
        title: 'ulangan',
        desc: 'masih ulangan sampe rabu',
        color: 'yellowgreen'
    },
]
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
function TodoModel({item}) {
    const [on, setOn] = useState(false)
    function handleClick() {
        setOn(!on)
    }
    return (
        <div className="todo-card">
            <div className="todo-left">
            <div className="card-color" style={{backgroundColor: item.color}}></div>
            <div className="card-text">
                <div className="card-title">{item.title}</div>
                <div className="card-description">{item.desc}</div>
            </div>
            </div>
            <div className="todo-right">
                <div className={`card-finish ${on === true && 'finish-on'}`} onClick={handleClick}>
                    <div className="card-finish-value"></div>
                </div>
                <div className="card-more">
                    <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn pointer'/>
                </div>
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
    {
        nickname: 'McWooden',
        msg: 'dan ini versi ke 3 dari project sebelumnya https://mcwooden.github.io/todo/x6',
        time: '20.24',
        date: '12/3/2022'
    },
]
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
            <div key={index} className='chat-card'>
                <div className='chat-card-message'>{item.msg}</div>
                <div className='chat-card-time'>{item.time}</div>
            </div>
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
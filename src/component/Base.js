import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import './style/base.css'
import {ChatModel, TodoModel, Notes, CardImages} from './model'
import { useContext } from 'react';
import { ItemData, HideBase } from './TodoApp';
import { GuildContext } from '../pages/App';
import { myAccount } from '../utils/dataJSON';
import {convertDateToString} from '../utils/convertDateFormat'

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
        box = <MoreInfoCard/>
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
    !item && room.item.forEach((data, index) => box.push(<TodoModel key={index} item={data}/>))
    return (
        <>
        <div className="base-center">
            <div className="center">
                {item ? <DetailCard/>:box}
            </div>
        </div>
        </>
    )
}
function BaseRight() {
    const {users} = useContext(GuildContext)
    const { hideRightBase } = useContext(HideBase)
    const {item} = useContext(ItemData)
    let box = []
    let lastDate = null
    let lastNickname = null
    item ? 
        item.chat.forEach((item, index) => {
            if (item.date !== lastDate) {
                box.push(
                    <div key={`${index}-${item.date}`} className='chat-card-date'>{convertDateToString(item.date)}</div>
                )
                lastDate = item.date
                lastNickname = null
            }
            if (item.nickname !== lastNickname && item.nickname !== myAccount.profile.nickname) {
                box.push(
                    <div key={`${index}-${item.nickname}`} className='chat-card-nickname'>{item.nickname}</div>
                )
                lastNickname = item.nickname
            }
            box.push(
                <ChatModel key={index} item={item}/>
            )
        })
    :
    Object.keys(users).forEach((propertyName) => {
        box.push(
            <p className='users-group' key={propertyName}>{propertyName}</p>
        )
        let container = []
        users[propertyName].user.forEach((user, index) => {
            container.push(
                <div className='group-user pointer' key={`${user.name}-${index}`}>
                    <img src={user.pic} alt={user.name} />
                    <p style={{color: users[propertyName].color}} >{user.name}</p>
                </div>
            )
        })
        box.push(<div key={`${propertyName}-container`} className='group-user-container'>{container}</div>)
    })

    return (
        <div className={`base-right ${hideRightBase?'base-right-hide':'base-right-show'}`}>
            <div className="sidebar-right">
                {box}
            </div>
            {item? <FormBaseRight/>:''}
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

function DetailCard() {
    const {item, handleItem} = useContext(ItemData)
    return(
        <>
        <div className='detail-back pointer' onClick={() => handleItem()}>
            <FontAwesomeIcon icon={faArrowLeft}/>
            <span>Back</span>
        </div>
        <div className='detail-desc'>
            <div className="color" style={{backgroundColor: item.color}}></div>
            <div className='detail-desc-context'>
                <p>{item.desc}</p>
                <CardImages/>
            </div>
        </div>
        <Notes/>
        </>
    )
}
function MoreInfoCard() {
    const {item} = useContext(ItemData)
    return (
        <>
        <div className='todo-card'>
            <div className="todo-left">
                <div className="card-color" style={{backgroundColor: item.color}}></div>
                <div className="card-text">
                    <div className="card-title">{item.title}</div>
                    <div className="card-deadline">{convertDateToString(item.deadline)}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Base
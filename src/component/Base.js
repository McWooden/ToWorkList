import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import './style/base.css'
import './style/Modal.css'
import { ChatModel } from './model'
import { useContext } from 'react';
import { HideBase } from './TodoApp';
import { ItemData, GuildContext } from '../pages/App';
import { myAccount } from '../utils/dataJSON';
import { convertDateToString } from '../utils/convertDateFormat'
import { MoreInfoCard, DetailLeftAction } from './leftSideComponent';
import { FormBaseRight } from './rightSideComponent'
import { Notes, CardImages, CenterActionButton, AddTaskModal, AddNoteModal, CardContainer} from './centerComponent';
import { useState } from 'react'
import { RoomProggress } from '../utils/progress'
import { Greeting } from '../utils/greeting'
import Calendar from 'react-calendar';
import './style/kalender.css'

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
    const { item } = useContext(ItemData)
    const { room } = useContext(GuildContext)

    const colors = room.items.map(item => ({
        date: new Date(item.deadline),
        color: item.color,
        title: item.title,
    }))
    return (
        <>
        <div className={`base-left ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
            <div className="sidebar-left">
                {item?
                <MoreInfoCard/>
                :
                <>
                <Greeting/>
                <Calendar 
                    className="calendar-dark" 
                    locale='id-ID'
                    format='mm/dd/yyyy'
                    next2Label={null}
                    prev2Label={null}

                    tileContent={({ date, view }) => {
                        const color = colors.find((c) => c.date.getTime() === date.getTime());
                        if (color) {
                            return (
                                <div className='repalace' style={{ border: `1px solid ${color.color}`, borderRadius: '50px' }} title={color.title}>
                                {date.getDate()}
                                </div>
                            )
                        }
                    }}
                />
                <RoomProggress/>
                <div className="left-menu-box">
                    <FontAwesomeIcon icon={faMoneyCheck} className="left-menu-box-icon"/>
                    <p className="left-menu-box-count">{room.items.length}</p>
                </div>
                </>
                }
            </div>
            {item? <DetailLeftAction/>:''}
        </div>
        </>
    )
}
function BaseCenter() {
    const { room, currentRoom } = useContext(GuildContext)
    const { item } = useContext(ItemData)
    const [modalOpen, setModalOpen] = useState(false)
    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
    return (
        <>
        <div className="base-center">
            <div className="center">
                {item? <AddNoteModal modalOpen={modalOpen} title={item.title} handleModalClose={handleModalClose}/>:<AddTaskModal modalOpen={modalOpen} title={currentRoom} handleModalClose={handleModalClose}/>}
                {item ? <DetailCard/>:<CardContainer items={room.items}/>}
                <CenterActionButton handleModalOpen={handleModalOpen}/>
            </div>

        </div>
        </>
    )
}
function BaseRight() {
    const { users } = useContext(GuildContext)
    const { hideRightBase } = useContext(HideBase)
    const { item } = useContext(ItemData)
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
            if (item.nickname !== lastNickname) {
                item.nickname !== myAccount.profile.nickname &&
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
                    <div className="user-context">
                        <p style={{color: users[propertyName].color}} >{user.name}</p>
                        <p className='user-status'>{user.status}</p>
                    </div>
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
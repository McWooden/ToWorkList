import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import './style/base.css'
import './style/Modal.css'
// import { ChatModel } from './model'
import { useContext, useEffect } from 'react';
import { HideBase } from './TodoApp';
// import { ItemData, GuildContext } from '../pages/App';
// import { myAccount } from '../utils/dataJSON';
// import { convertDateToString } from '../utils/convertDateFormat'
import { MoreInfoCard, DetailLeftAction, JadwalRoom } from './leftSideComponent';
import { SidebarRightChat } from './rightSideComponent'
import { Notes, CardImages, CenterActionButton, CardContainer, AddTaskModal, AddNoteModal, NoteEditor} from './centerComponent';
import { useState } from 'react'
import { PageProggress } from '../utils/progress'
import { Greeting } from '../utils/greeting'
import Calendar from 'react-calendar';
import './style/kalender.css'
import { useDispatch, useSelector } from 'react-redux'
import {Welcome} from './page'
import axios from 'axios'
import { setMembers, setSource } from '../redux/sourceSlice'
import { setTodo } from '../redux/todo';

const API = process.env.REACT_APP_API

export function Base() {
    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)
    if (todoId) return (
        <div className="base">
            <TodoDetail/>
        </div>
    )
    return (
        <div className='base'>
            {pageType === 'welcome' && <Welcome/>}
            {pageType === 'faCheck' && <TodoPage/>}
            <BaseRight/>
        </div>
    )
}
function TodoDetail() {
    const todoId = useSelector(state => state.todo.id)
    const todoDetails = useSelector(state => state.todo.details)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()
    const { hideLeftBase } = useContext(HideBase)
    // const [isLoading, setIsLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`${API}/source/list/${idPageOfBook}/${todoId}`)
            dispatch(setTodo(data))
            // setIsLoading(false)
        }
        fetchData()
        const interval = setInterval(fetchData, 20000)
        return () => clearInterval(interval)
    }, [idPageOfBook, todoId, dispatch])
    return (
        <>
        {/* left */}
            <div className={`base-left ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
                <div className="sidebar-left">
                    <MoreInfoCard/>
                    <DetailLeftAction/>
                </div>
            </div>
        {/* center */}
            <div className='base-center'>
                <div className='center'>
                    <DetailCard/>                    
                    <AddNoteModal modalOpen={modalOpen} title={todoDetails.item_title} handleModalClose={handleModalClose}/>
                    <CenterActionButton handleModalOpen={handleModalOpen}/>
                </div>
            </div>
        {/* right */}
            <SidebarRightChat/>
        </>
    )
}
function TodoPage() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const source = useSelector(state => state.source.source)
    const dispatch = useDispatch()
    const { hideLeftBase } = useContext(HideBase)
    useEffect(() => {
        let intervalId = null
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/source/page/${idPageOfBook}`)
                dispatch(setSource(response.data))
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
        intervalId = setInterval(fetchData, 30000)
        return () => clearInterval(intervalId)
    }, [idPageOfBook, dispatch])

    if (!source) return (
        <>
        <div className={`base-left ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
            <div className="sidebar-left">
                <div className='sidebar_left_loading loading'/>
            </div>
        </div>
        <div className="base-center">
            <div className="center">
                <div className="loading center_loading"/>
            </div>
        </div>
        </>
    )
    return (
        <>
        <BaseLeft/>
        <BaseCenter/>
        </>
    )
}

// function BaseLeft() {
//     const { hideLeftBase } = useContext(HideBase)
//     const { item } = useContext(ItemData)
//     const { room } = useContext(GuildContext)

//     const colors = room.items.map(item => ({
//         date: new Date(item.deadline),
//         color: item.color,
//         title: item.title,
//     }))

//     return (
//         <>
//         <div className={`base-left ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
//             <div className="sidebar-left">
//                 {item?
//                 <MoreInfoCard/>
//                 :
//                 <>
//                 <Greeting/>
//                 <JadwalRoom/>
//                 <Calendar 
//                     className="calendar-dark" 
//                     locale='id-ID'
//                     format='mm/dd/yyyy'
//                     next2Label={null}
//                     prev2Label={null}

//                     tileContent={({ date, view }) => {
//                         const color = colors.find((c) => c.date.getTime() === date.getTime());
//                         if (color) {
//                             return (
//                                 <div className='repalace' style={{ border: `1px solid ${color.color}`, borderRadius: '50px' }} title={color.title}>
//                                 {date.getDate()}
//                                 </div>
//                             )
//                         }
//                     }}
//                 />
//                 <RoomProggress/>
//                 <div className="left-menu-box">
//                     <FontAwesomeIcon icon={faMoneyCheck} className="left-menu-box-icon"/>
//                     <p className="left-menu-box-count">{room.items.length}</p>
//                 </div>
//                 </>
//                 }
//             </div>
//             {item? <DetailLeftAction/>:''}
//         </div>
//         </>
//     )
// }
function BaseLeft() {
    const source = useSelector(state => state.source.source)
    const { hideLeftBase } = useContext(HideBase)
    let colors = null
    try {
        colors = source.list.map(item => ({
            date: new Date(item.details.deadline),
            color: item.details.color,
            title: item.details.item_title,
        }))
    } catch (error) {
        console.log(source)
    }
    return (
        <div className={`base-left ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
            <div className="sidebar-left">
                <Greeting/>
                <JadwalRoom/>
                <Calendar 
                className="calendar-dark" 
                locale='id-ID'
                format='mm/dd/yyyy'
                next2Label={null}
                prev2Label={null}
                tileContent={({ date, view }) => {
                    if (!colors) {
                    return null;
                    }
                    const color = colors.find((c) => c.date.getTime() === date.getTime());
                    if (color) {
                    return (
                        <div className='repalace' style={{ border: `1px solid ${color.color}`, borderRadius: '50px' }} title={color.title}>
                        {date.getDate()}
                        </div>
                    );
                    }
                }}
                />
                <PageProggress/>
                <div className="left-menu-box">
                    <FontAwesomeIcon icon={faMoneyCheck} className="left-menu-box-icon"/>
                    <p className="left-menu-box-count">{source.list ? source.list.length : ''}</p>
                </div>
            </div>
        </div>
    )
}
// function BaseCenter() {
//     const { room, currentRoom } = useContext(GuildContext)
//     const { item } = useContext(ItemData)
//     const [modalOpen, setModalOpen] = useState(false)
//     function handleModalOpen() {
//         setModalOpen(true)
//     }
//     function handleModalClose() {
//         setModalOpen(false)
//     }
//     return (
//         <>
//         <div className="base-center">
//             <div className="center">
//                 {item? <AddNoteModal modalOpen={modalOpen} title={item.title} handleModalClose={handleModalClose}/>:<AddTaskModal modalOpen={modalOpen} title={currentRoom} handleModalClose={handleModalClose}/>}
//                 {item ? <DetailCard/>:<CardContainer items={room.items}/>}
//                 <CenterActionButton handleModalOpen={handleModalOpen}/>
//             </div>
//         </div>
//         </>
//     )
// }
function BaseCenter() {
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const [modalOpen, setModalOpen] = useState(false)
    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
    return (
        <div className="base-center">
            <div className="center">
                <CardContainer/>
                <AddTaskModal modalOpen={modalOpen} title={pathPageOfBook} handleModalClose={handleModalClose}/>
                <CenterActionButton handleModalOpen={handleModalOpen}/>
            </div>
        </div>
    )
}
// function BaseRight() {
//     const { users } = useContext(GuildContext)
//     const { hideRightBase } = useContext(HideBase)
//     const { item } = useContext(ItemData)
//     let box = []
//     let lastDate = null
//     let lastNickname = null
//     item ? 
//         item.chat.forEach((item, index) => {
//             if (item.date !== lastDate) {
//                 box.push(
//                     <div key={`${index}-${item.date}`} className='chat-card-date'>{convertDateToString(item.date)}</div>
//                 )
//                 lastDate = item.date
//                 lastNickname = null
//             }
//             if (item.nickname !== lastNickname) {
//                 item.nickname !== myAccount.profile.nickname &&
//                 box.push(
//                     <div key={`${index}-${item.nickname}`} className='chat-card-nickname'>{item.nickname}</div>
//                 )
//                 lastNickname = item.nickname
//             }
//             box.push(
//                 <ChatModel key={index} item={item}/>
//             )
//         })
//     :
//     Object.keys(users).forEach((propertyName) => {
//         box.push(
//             <p className='users-group' key={propertyName}>{propertyName}</p>
//         )
//         let container = []
//         users[propertyName].user.forEach((user, index) => {
//             container.push(
//                 <div className='group-user pointer' key={`${user.name}-${index}`}>
//                     <img src={user.pic} alt={user.name} />
//                     <div className="user-context">
//                         <p style={{color: users[propertyName].color}} >{user.name}</p>
//                         <p className='user-status'>{user.status}</p>
//                     </div>
//                 </div>
//             )
//         })
//         box.push(<div key={`${propertyName}-container`} className='group-user-container'>{container}</div>)
//     })

//     return (
//         <div className={`base-right ${hideRightBase?'base-right-hide':'base-right-show'}`}>
//             <div className="sidebar-right">
//                 {box}
//             </div>
//             {item? <FormBaseRight/>:''}
//         </div>
//     )
// }
// <div className="base-right">
//     <div className="sidebar-right">
//         <div className="loading sidebar_right_loading">Empty</div>
//     </div>
// </div>
function BaseRight() {
    const [isLoading, setIsLoading] = useState(false)
    const { hideRightBase } = useContext(HideBase)
    const idBook = useSelector(state => state.fetch.idBook)
    const members = useSelector(state => state.source.members)
    const dispatch = useDispatch()
    const [box, setBox] = useState([])
    function handleEmpety() {
        setIsLoading(false)
        setBox('Empety')
    }
    function dataToBox(data) {
        let sessionBox = []
        data.forEach((user, index) => {
            sessionBox.push(
                <div className='group-user pointer' key={`${user.nickname}-${index}`}>
                    <img src={user.avatar} alt={user.nickname} />
                    <div className="user-context">
                        <p>{user.nickname}</p>
                        <p className='user-status'>{user.status}</p>
                    </div>
                </div>
            )
        })
        setBox(sessionBox)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`${API}/book/${idBook}/get/users`)
                dispatch(setMembers(data.users))
            } catch (err) {
                handleEmpety()
            }
        }
        if (!members) {
            if (idBook === '@me') return handleEmpety()
            setIsLoading(true)
            fetchData()
            setIsLoading(false)
        } else {
            try {
                dataToBox(members)
            } catch (error) {
                console.log(members)
                console.log(error)
            }
        }
        const interval = setInterval(() => {
            if (idBook === '@me') return handleEmpety()
            fetchData()
        }, 60000)
        return () => clearInterval(interval)
    }, [idBook, members, dispatch])
    if (isLoading) return (
        <div className="base-right">
            <div className="sidebar-right">
                <div className="loading sidebar_right_loading"/>
            </div>
        </div>
    )
    return (
        <div className={`base-right ${hideRightBase?'base-right-hide':'base-right-show'}`}>
            <div className="sidebar-right">
                {box}
            </div>
        </div>
    )
}
// function BaseRight() {
//     const [isLoading, setIsLoading] = useState(false)
//     const { hideRightBase } = useContext(HideBase)
//     const idBook = useSelector(state => state.fetch.idBook)
//     const members = useSelector(state => state.source.members)
//     const dispatch = useDispatch()
//     const [box, setBox] = useState([])
//     function handleEmpety() {
//         setIsLoading(false)
//         setBox('Empety')
//     }
//     function dataToBox(data) {
//         let sessionBox = []
//         data.users.forEach((group, index) => {
//             sessionBox.push(
//                 <p className='users-group' key={index}>{group.details.role}</p>
//             )
//             let container = []
//             group.member.forEach((user, userIndex) => {
//                 container.push(
//                     <div className='group-user pointer' key={`${user.nickname}-${userIndex}`}>
//                         <img src={user.avatar} alt={user.nickname} />
//                         <div className="user-context">
//                             <p style={{color: group.details.role_color}} >{user.nickname}</p>
//                             <p className='user-status'>{user.status}</p>
//                         </div>
//                     </div>
//                 )
//             })
//             sessionBox.push(<div key={`${group.details.role}-container`} className='group-user-container'>{container}</div>)
//         })
//         setBox(sessionBox)
//     }
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const {data} = await axios.get(`${API}/book/${idBook}/get/users`)
//                 dispatch(setMembers(data))
//             } catch (err) {
//                 handleEmpety()
//             }
//         }
//         if (!members) {
//             if (idBook === '@me') return handleEmpety()
//             setIsLoading(true)
//             fetchData()
//             setIsLoading(false)
//         } else {
//             dataToBox(members)
//         }
//         const interval = setInterval(() => {
//             if (idBook === '@me') return handleEmpety()
//             fetchData()
//         }, 60000)
//         return () => clearInterval(interval)
//     }, [idBook, members, dispatch])
//     if (isLoading) return (
//         <div className="base-right">
//             <div className="sidebar-right">
//                 <div className="loading sidebar_right_loading"/>
//             </div>
//         </div>
//     )
//     return (
//         <div className={`base-right ${hideRightBase?'base-right-hide':'base-right-show'}`}>
//             <div className="sidebar-right">
//                 {box}
//             </div>
//         </div>
//     )
// }

function DetailCard() {
    const todo = useSelector(state => state.todo)
    return(
        <>
        <div className='detail-desc'>
            <div className="color" style={{backgroundColor: todo.details.color}}></div>
            <div className='detail-desc-context'>
                <p>{todo.details.desc}</p>
                <CardImages/>
            </div>
        </div>
        <NoteEditor/>
        <Notes/>
        </>
    )
}
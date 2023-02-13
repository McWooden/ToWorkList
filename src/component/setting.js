import './style/setting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMap, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { GuildContext } from '../pages/App'
import { convertDateToString } from '../utils/convertDateFormat'
import { deleteToast, leaveToast, editToast } from '../utils/notif'
import { PageListItem } from './Navbar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setMembers } from '../redux/sourceSlice'

const API = process.env.REACT_APP_API


export function GuildSetting({open, close}) {
    const [select, setSelect] = useState('profile')
    const pathBook = useSelector(state => state.fetch.pathBook)
    if (!open) return
    function handleSelectOnChange(newSelect) {
        setSelect(newSelect)
    }
    return ReactDOM.createPortal(
        <div className="setting_full">
            <div className="setting_full_nav">
                <ul>
                    <li className={`setting_full_nav_list ${select === 'profile' && 'active'}`} onClick={() => handleSelectOnChange('profile')}>
                        <FontAwesomeIcon icon={faPencil} className='setting_full_nav_list_icon'/>
                        <p>{pathBook}</p>
                    </li>
                    <li className={`setting_full_nav_list ${select === 'room' && 'active'}`} onClick={() => handleSelectOnChange('room')}>
                        <FontAwesomeIcon icon={faMap} className='setting_full_nav_list_icon'/>
                        <p>ruangan</p>
                    </li>
                    <li className={`setting_full_nav_list ${select === 'member' && 'active'}`} onClick={() => handleSelectOnChange('member')}>
                        <FontAwesomeIcon icon={faUserGroup} className='setting_full_nav_list_icon'/>
                        <p>orang</p>
                    </li>
                </ul>
            </div>
            <div className="setting_full_body">
                <section>
                    {select === 'profile' && <GuildSettingProfile/>}
                    {select === 'room' && <GuildSettingRoom/>}
                    {select === 'member' && <GuildSettingMember/>}
                </section>
                <GuildSettingClose callback={close}/>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
function GuildSettingClose({callback}) {
    return (
        <div className="setting_full_close pointer" onClick={callback}>
            <FontAwesomeIcon icon={faXmark} className='x_mark'/>
            <p>esc</p>
        </div>
    )
}

// function GuildSettingProfile() {
//     const { guild } = useContext(GuildContext)
//     return (
//         <>
//         <div className="setting_header">
//             <h3>Profil</h3>
//         </div>
//         <div className="setting_full_profile_view">
//             <div className="setting_full_profile_view_header">
//                 <img src={guild.profile.pic || guild.profile.src} alt={guild.profile.name} className='setting_full_pp_guild'/>
//                 <p className='setting_full_name_guild'>{guild.profile.name || guild.profile.guildName}{guild.profile.nickname? <span>#{guild.profile.id || '0000'}</span> : null}</p>

//             </div>
//             <div className="setting_full_profile_view_body">
//                 <h5>Dibuat pada</h5>
//                 <p className='setting_profile_date'>{convertDateToString(guild.profile.created_at)} {guild.profile.by? `oleh ${guild.profile.by}`: null}</p>
//                 <p className='setting_keluar_btn edit_btn' onClick={() => editToast('mengedit profile')}>Edit Profil</p>
//             </div>
//         </div>
//         <div className="setting_keluar">
//             {guild.profile.nickname? 
//             <>
//             <p>Akun</p>
//             <div className="setting_keluar-action">
//                 <span className="setting_keluar_btn delete_btn" onClick={() => deleteToast('akun terhapus')}>hapus akun</span>
//                 <span className="setting_keluar_btn keluar_btn" onClick={() => leaveToast(`bye ${myAccount.profile.nickname}`)}>Keluar</span>
//             </div>
//             </>
//             :
//             <>
//             <p>Guild</p>
//             <div className="setting_keluar-action">
//                 <span className="setting_keluar_btn delete_btn"  onClick={() => deleteToast('guild terhapus')}>hapus guild</span>
//                 <span className="setting_keluar_btn keluar_btn" onClick={() => leaveToast(`bye everyone in the room ${guild.profile.guildName}`)}>Keluar guild</span>
//             </div>
//             </>
//             }
//         </div>
//         </>
//     )
// }
function GuildSettingProfile() {
    const profile = useSelector(state => state.source.guildProfile)
    return (
        <>
        <div className="setting_header">
            <h3>Profil</h3>
        </div>
        <div className="setting_full_profile_view">
            <div className="setting_full_profile_view_header">
                <img src={profile.avatar_url} alt={profile.book_title} className='setting_full_pp_guild'/>
                <p className='setting_full_name_guild'>{profile.book_title}</p>
            </div>
            <div className="setting_full_profile_view_body">
                <h5>Dibuat pada</h5>
                <p className='setting_profile_date'>{convertDateToString(profile.created_at)} oleh {profile.author.nickname}#{profile.author.tag}</p>
                <p className='setting_keluar_btn edit_btn' onClick={() => editToast('mengedit profile')}>Edit Profil</p>
            </div>
        </div>
        <div className="setting_keluar">
            <p>Guild</p>
            <div className="setting_keluar-action">
                <span className="setting_keluar_btn delete_btn"  onClick={() => deleteToast('guild terhapus')}>hapus guild</span>
                <span className="setting_keluar_btn keluar_btn" onClick={() => leaveToast(`bye everyone in the room ${profile.book_title}`)}>Keluar guild</span>
            </div>
        </div>
        </>
    )
}
// function GuildSettingRoom() {
//     const {guildRooms, handleRoom, currentRoom} = useContext(GuildContext)
//     const lists = []
//     guildRooms.forEach((room, index) => {
//         lists.push(
//             <div key={index} className={`room setting_room ${currentRoom === room.roomName?'active':''}`} onClick={() => handleRoom(index)}>
//                 <FontAwesomeIcon icon={fontawesome.faCheck} className={`room-icon ${currentRoom === room.roomName?'active':''}`}/>
//                 <span className={`setting_room_list_name ${currentRoom === room.roomName?'active':''}`}>{room.roomName}</span>
//                 <div className="room_action">
//                     <div className="info-menu-box">
//                         <FontAwesomeIcon icon={fontawesome.faMoneyCheck} className='info-menu-box-icon'/>
//                         <div className='info-menu-box-count'>{room.items.length}</div>
//                     </div>
//                     <FontAwesomeIcon icon={fontawesome.faGear} className={`room-icon setting_room-setting ${currentRoom === room.roomName?'active':''}`}/>
//                 </div>
//             </div>
//         )
//     })
//     return(
//         <>
//         <div className="setting_header">
//             <h3>Room</h3>
//             <p>semua ruangan dan jumlah tugas di setiap ruangan</p>
//         </div>
//         <div className='roomList'>
//             {lists}
//         </div>
//         </>
//     )
// }
function GuildSettingRoom() {
    // const {guildRooms, handleRoom, currentRoom} = useContext(GuildContext)
    // const lists = []
    // guildRooms.forEach((room, index) => {
    //     lists.push(
    //         <div key={index} className={`room setting_room ${currentRoom === room.roomName?'active':''}`} onClick={() => handleRoom(index)}>
    //             <FontAwesomeIcon icon={fontawesome.faCheck} className={`room-icon ${currentRoom === room.roomName?'active':''}`}/>
    //             <span className={`setting_room_list_name ${currentRoom === room.roomName?'active':''}`}>{room.roomName}</span>
    //             <div className="room_action">
    //                 <div className="info-menu-box">
    //                     <FontAwesomeIcon icon={fontawesome.faMoneyCheck} className='info-menu-box-icon'/>
    //                     <div className='info-menu-box-count'>{room.items.length}</div>
    //                 </div>
    //                 <FontAwesomeIcon icon={fontawesome.faGear} className={`room-icon setting_room-setting ${currentRoom === room.roomName?'active':''}`}/>
    //             </div>
    //         </div>
    //     )
    // })
    const idBook = useSelector((state) => state.fetch.idBook)
    const [pages, setPages] = useState([])
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    const dispatch = useDispatch()
    const fetchData = useCallback(async () => {
        setReloading(false)
        setLoading(true)
        try {
            const response = await axios.get(`${API}/book/${idBook}/get/pages/details`)
            setPages(
                response.data.pages.map((item, index) => (
                    <PageListItem key={index} data={item} />
                ))
            )
        } catch (error) {
            setReloading(true)
        }
        setLoading(false)
    }, [idBook])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])

    if (reloading) {
        return (
            <>
            <div className="setting_header">
                <h3>Room</h3>
                <p>semua ruangan dan jumlah tugas di setiap ruangan</p>
            </div>
            <div className="nav-guild">
                <div className="reload_btn-frame" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                </div>
            </div>
            </>
        )
    }
    if (loading) {
        return (
            <>
            <div className="setting_header">
                <h3>Room</h3>
                <p>semua ruangan dan jumlah tugas di setiap ruangan</p>
            </div>
            <div className="roomList">
                <div className="room loading" />
            </div>
            </>
        )
    }
    return(
        <>
        <div className="setting_header">
            <h3>Room</h3>
            <p>semua ruangan dan jumlah tugas di setiap ruangan</p>
        </div>
        <div className='roomList'>
            {pages}
        </div>
        </>
    )
}

// function GuildSettingMember() {
//     const { users } = useContext(GuildContext)
//     let box = []
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
//         <>
//         <div className="setting_header">
//             <h3>Anggota</h3>
//             <p>list manusia yang ada di sini</p>
//         </div>
//         {box}
//         </>
//     )
// }
function GuildSettingMember() {
    const idBook = useSelector(state => state.fetch.idBook)
    const members = useSelector(state => state.source.members)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [box, setBox] = useState([])
    function handleEmpety() {
        setIsLoading(false)
        setBox('Empety')
    }

    const { users } = useContext(GuildContext)
    useEffect(() => {
        dataToBox(members)
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`${API}/book/${idBook}/get/users`)
                dispatch(setMembers(data))
            } catch (err) {
                handleEmpety()
            }
        }
        const interval = setInterval(() => {
            fetchData()
        }, 60000)
        return () => clearInterval(interval)
    }, [idBook, members, dispatch])
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
    function dataToBox(data) {
        let sessionBox = []

        setBox(sessionBox)
    }
    if (isLoading) return (
        <div className="sidebar-right">
            <div className="loading sidebar_right_loading"/>
        </div>
    )
    return (
        <>
        <div className="setting_header">
            <h3>Anggota</h3>
            <p>list manusia yang ada di sini</p>
        </div>
        {box}
        </>
    )
}
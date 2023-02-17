import './style/setting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMap, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom'
import { useRef, useState } from 'react'
import { convertDateToString } from '../utils/convertDateFormat'
import { deleteToast, leaveToast, editToast, pageToast } from '../utils/notif'
import { PageListItem } from './Navbar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setMembers } from '../redux/sourceSlice'
import { ModalSecond } from './Modal'

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
                        <p>halaman</p>
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
                <p className='setting_btn blue_btn' onClick={() => editToast('mengedit profile')}>Edit Profil</p>
            </div>
        </div>
        <div className="setting_action">
            <span className="setting_btn delete_btn"  onClick={() => deleteToast('guild terhapus')}>hapus guild</span>
            <span className="setting_btn keluar_btn" onClick={() => leaveToast(`bye everyone in the room ${profile.book_title}`)}>Keluar guild</span>
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
    const [openAdd, setOpenAdd] = useState(false)
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
            dataToElement(response.data.pages)
        } catch (error) {
            setReloading(true)
        }
        setLoading(false)
    }, [idBook])
    function dataToElement(data) {
        setPages(
            data.map((item, index) => (
                <PageListItem key={index} data={item} />
            ))
        )
    }
    function handleClose() {
        setOpenAdd(false)
    }
    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])
    const [value, setValue] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)
    const formRef = useRef()
    async function handleSubmit(e) {
        setBtnLoading(true)
        e.preventDefault()
        try {
            const response = await axios.put(`${API}/book/${idBook}/page`, {page_title: value, icon: 'faCheck'})
            setValue('')
            console.log(response.data)
            pageToast(`${value} berhasil dibuat`)
            setOpenAdd(false)
            setBtnLoading(false)
            dataToElement(response.data.pages)
        } catch (err) {
            setBtnLoading(false)
        }
    }
    const headerElement = (
        <div className="setting_header">
            <h3>Halaman</h3>
            <p>semua halaman dan jumlah tugas</p>
        </div>
    )
    if (reloading) {
        return (
            <>
            {headerElement}
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
            {headerElement}
            <div className="roomList">
                <div className="room loading" />
            </div>
            </>
        )
    }
    return(
        <>
        {headerElement}
        <div className='roomList'>
            {pages}
        </div>
        <div className="setting_action">
            <span className="setting_btn blue_btn" onClick={() => setOpenAdd(true)}>Tambah Halaman</span>
        </div>
        <ModalSecond open={openAdd} close={handleClose}>
        <div className="addPage">
            <form className="form-modal" onSubmit={handleSubmit} ref={formRef}>
                <div className="addPage_body">
                    <p className='heading'>Halaman</p>
                    <p className='small'>Membuat halaman baru</p>
                    <div className="pagePreview">
                        <p className='small bold'>Tipe halaman</p>
                        <div className={`room room-grid active`}>
                            <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon page_icon active`}/>
                            <span className={`page_type active`}>Todo </span>
                            <span className={`page_desc active`}>Daftar, Pesan, Foto, Catatan</span>
                        </div>
                    </div>
                    <p className='small bold'>Nama halaman</p>
                    <div className={`room roomInput ${value&&'active'}`}>
                        <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon ${value&&'active'}`}/>
                        <input type="text" placeholder='halaman baru' onChange={(e) => setValue(e.target.value)} value={value} className={`room_input ${value&&'active'}`} required/>
                    </div>
                </div>
                <div className="addPage_action">
                    <span className='btn_action' onClick={handleClose}>Batal</span>
                    {btnLoading?
                    (<button className={`btn_action btn_add`}>Loading</button>)
                    :
                    (<button type='submit' className={`btn_action btn_add ${value&&'active'}`}>Tambahkan</button>)
                    }
                </div>
            </form>
        </div>
        </ModalSecond>
        </>
    )
}


function GuildSettingMember() {
    const members = useSelector(state => state.source.members)
    const idBook = useSelector(state => state.fetch.idBook)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    function handleEmpety() {
        setIsLoading(false)
        setBox('Empety')
    }
    const [box, setBox] = useState([])
    function dataToBox(data) {
        let sessionBox = []
        data.users.forEach((group, index) => {
            sessionBox.push(
                <p className='users-group' key={index}>{group.details.role}</p>
            )
            let container = []
            group.member.forEach((user, userIndex) => {
                container.push(
                    <div className='group-user pointer' key={`${user.nickname}-${userIndex}`}>
                        <img src={user.avatar} alt={user.nickname} />
                        <div className="user-context">
                            <p style={{color: group.details.role_color}} >{user.nickname}</p>
                            <p className='user-status'>{user.status}</p>
                        </div>
                    </div>
                )
            })
            sessionBox.push(<div key={`${group.details.role}-container`} className='group-user-container'>{container}</div>)
        })
        setBox(sessionBox)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`${API}/book/${idBook}/get/users`)
                dispatch(setMembers(data))
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
            dataToBox(members)
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
        <>
        <div className="setting_header">
            <h3>Anggota</h3>
            <p>list manusia yang ada di sini</p>
        </div>
        {box}
        </>
    )
}
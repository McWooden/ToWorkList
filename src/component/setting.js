import './style/setting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMap, faUserGroup, faXmark, faEllipsisVertical, faPenToSquare, faTrash, faEye, faImage, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom'
import { useRef, useState } from 'react'
import { convertDateToString } from '../utils/convertDateFormat'
import { deleteToast, leaveToast, pageToast, imageToast, saveToast } from '../utils/notif'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setMembers, setPageType, setSource } from '../redux/sourceSlice'
import { ModalSecond } from './Modal'
import { setPathPageOfBook } from '../redux/fetchSlice'
import { Confirm } from './Modal'
import { setGuildProfile } from '../redux/sourceSlice'
import { FileDrop } from './Modal'

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
    const idBook = useSelector(state => state.fetch.idBook)
    const profile = useSelector(state => state.source.guildProfile)
    const dispatch = useDispatch()
    const [dropDown, setDropDown] = useState(false)
    const [openUnggah, setOpenUnggah] = useState(false)
    const url = 'https://zjzkllljdilfnsjxjrxa.supabase.co/storage/v1/object/public/book'
    let menuRef = useRef()
    let btnRef = useRef()
    const [full, setFull] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    
    // file drop
    const fileInput = useRef(null)
    const[image, setImage] = useState(null)
    const[previewUrl, setPreviewUrl] = useState('')
    const handleFile = file => {
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
    }
    const handleOndragOver = event => {
        event.preventDefault()
    }
    const handleOndrop = event => {
        event.preventDefault()
        event.stopPropagation()
        let imageFile = event.dataTransfer.files[0]
        handleFile(imageFile)
    }
    // form
    const formRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        if (profile.avatar_url === 'default') {
            formData.append('avatar_url', null)
        } else {
            formData.append('avatar_url', profile.avatar_url)
        }
        try {
            startInterval()
            await axios.put(`${API}/image/${idBook}/pp`, formData)
            .then(res => {
                dispatch(setGuildProfile(res.data.profile))
                imageToast('pp diunggah')
                setOpenUnggah(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
            }).catch(err => {
                imageToast('pp gagal diunggah')
            }).finally(() => {
                stopInterval()
            })
        } catch (error) {
            stopInterval()
        }
    }
    const [editJudul, setEditJudul] = useState(false)
    const [valueJudul, setValueJudul] = useState(profile.book_title)
    async function handleSubmitJudul(e) {
        e.preventDefault()
        setSaveLoading(true)
        try {
            await axios.put(`${API}/book/${idBook}/judul`, {book_title: valueJudul})
            .then(res => {
                saveToast('berhasil disimpan')
                dispatch(setGuildProfile(res.data.profile))
            })
            .catch(() => {
                saveToast('gagal disimpan')
            })
        } catch (error) {
            
        }
        setSaveLoading(false)
        setEditJudul(false)
    }
    
    const [editDesc, setEditDesc] = useState(false)
    const [valueDesc, setValueDesc] = useState(profile.desc)
    async function handleSubmitDesc(e) {
        e.preventDefault()
        setSaveLoadingDesc(true)
        try {
            await axios.put(`${API}/book/${idBook}/desc`, {desc: valueDesc})
            .then(res => {
                saveToast('berhasil disimpan')
                dispatch(setGuildProfile(res.data.profile))
            })
            .catch(() => {
                saveToast('gagal disimpan')
            })
        } catch (error) {
            
        }
        setSaveLoadingDesc(false)
        setEditDesc(false)
    }
    const [intervalId, setIntervalId] = useState(null)
    const [count, setCount] = useState(0)
    const startInterval = () => {
        const intervalId = setInterval(() => {
            setCount((count) => count + 1)
        }, 1000)
        setIntervalId(intervalId)
    }
    const stopInterval = () => {
        clearInterval(intervalId)
        setCount(0)
        setIntervalId(null)
    }
    useEffect(() => {
        let handler = (e) => {
            try {
                if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) {
                    return
                } else {
                    setDropDown(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener("mousedown", handler)
    })
    async function deletePp() {
        try {
            await axios.delete(`${API}/image/${idBook}/pp?avatar_url=${profile.avatar_url !== 'default' && profile.avatar_url}`)
            .then((res) => {
                deleteToast('pp berhasil dihapus')
                dispatch(setGuildProfile(res.data.profile))
            })
            .catch(err => {
                deleteToast('pp gagal terhapus')
            })
        } catch(err) {

        }
    }
    const [saveLoading, setSaveLoading] = useState(false)
    const [saveLoadingDesc, setSaveLoadingDesc] = useState(false)
    return (
        <>
        <div className="setting_header">
            <h3>Profil</h3>
        </div>
        <div className="setting_full_profile_view">
            <div className='setting_full_profile_view_banner'>
                <img className={`setting_banner ${full?'full':''}`} src={`${url}/${profile.avatar_url}`} alt={profile.book_title} onClick={() => setFull(!full)}/>
            </div>
            <div className="setting_full_profile_view_body">
                <div className="setting_full_profile_view_float">
                    <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} className='setting_full_pp_guild' onClick={() => setDropDown(!dropDown)} ref={btnRef}/>
                    <div className={`card-drop-down ${dropDown?'active':'inactive'}`} ref={menuRef}>
                        <ul className='reverse'>
                            <li className='pointer' onClick={() => setOpenUnggah(true)}>
                                <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn' />
                                <span>Unggah</span>
                            </li>
                            <li className='pointer' onClick={() => setDeleteOpen(true)}>
                                <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                                <span>Hapus</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <h5>Nama Buku</h5>
                <div className='guild_editor'>
                {editJudul?
                        <>
                        <form className="form-modal" onSubmit={handleSubmitJudul}>
                            <input type="text" placeholder={profile.book_title} value={valueJudul}  onChange={(e) => setValueJudul(e.target.value)}/>
                            <div className="sb_action_btn">
                                <FontAwesomeIcon icon={faXmark} onClick={() => setEditJudul(false)} className='action_btn'/>
                                {saveLoading?
                                    <FontAwesomeIcon icon={fontawesome.faSpinner} className='action_btn spinner'/>
                                :
                                    <button type='submit'>
                                        <FontAwesomeIcon icon={faFloppyDisk} className='action_btn'/>
                                    </button>
                                }
                            </div>
                        </form>
                        </>
                    :
                        <>
                        <p className='setting_full_name_guild'>{profile.book_title}</p>
                        <FontAwesomeIcon icon={faPencil} onClick={() => setEditJudul(true)} className='action_btn'/>
                        </>
                }
                </div>
                <h5>Deskripsi</h5>
                <div className="guild_editor">
                    {editDesc?
                            <>
                            <form className="form-modal flex-one" onSubmit={handleSubmitDesc}>
                                <textarea value={valueDesc} placeholder={profile.desc} onChange={(e) => setValueDesc(e.target.value)}/>
                                <div className="sb_action_btn">
                                    <FontAwesomeIcon icon={faXmark} onClick={() => setEditDesc(false)} className='action_btn'/>
                                    {saveLoadingDesc?
                                        <FontAwesomeIcon icon={fontawesome.faSpinner} className='action_btn spinner'/>
                                    :
                                        <button type='submit'>
                                            <FontAwesomeIcon icon={faFloppyDisk} className='action_btn'/>
                                        </button>
                                    }
                                </div>
                            </form>
                            </>
                        :
                            <p onClick={() => setEditDesc(true)}>{profile.desc}</p>
                    }
                </div>
                <h5>Dibuat pada</h5>
                <p className='setting_profile_date'>{convertDateToString(profile.created_at)} oleh {profile.author.nickname}#{profile.author.tag}</p>
            </div>
        </div>
        <div className="setting_action">
            <span className="setting_btn delete_btn"  onClick={() => deleteToast('guild terhapus')}>hapus guild</span>
            <span className="setting_btn keluar_btn" onClick={() => leaveToast(`bye everyone in the room ${profile.book_title}`)}>Keluar guild</span>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={'PP Buku'} metode='delete' color='var(--purple-1)' callback={deletePp} deleteText={'pp nya nanti ilang, diganti gambar udin'}/>
        <FileDrop open={openUnggah} close={() => setOpenUnggah(false)}>
                <form ref={formRef} className='file-drop jadwal-form' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                    <div className="img-view" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                    { previewUrl ? 
                        <img src={previewUrl} alt={image.name} /> 
                    :
                        <div className="drop-zone">
                            <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                            <p className='drop-text'>click atau drop disini</p>
                            <input 
                                type="file" 
                                accept='image/*' 
                                ref={fileInput} hidden 
                                onChange={e => handleFile(e.target.files[0])}
                            />
                        </div>
                    }
                    </div>
                    <div className="img-form">
                        <div className="general-info">
                            <h3>Mengubah pp</h3>
                        </div>
                        <span className='url-image'>{previewUrl? previewUrl : 'Url Image'}/-</span>
                        {count?
                        <button className='task-submit'>Loading...{count}</button>
                        :
                        <button className='task-submit' onClick={() => formRef.current.submit}>Unggah</button>
                        }
                    </div>
                </form>
        </FileDrop>
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
    const dataToElement = useCallback((data) => {
        setPages(
            data.map((item, index) => (
                <SettingPageListItem key={index} data={item} callback={dataToElement}/>
            ))
        )
    }, [])
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
    }, [idBook, dataToElement])
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
            const response = await axios.post(`${API}/book/${idBook}/page`, {page_title: value, icon: 'faCheck'})
            pageToast(`${value} berhasil dibuat`)
            dataToElement(response.data.pages)
            setValue('')
            setOpenAdd(false)
            setBtnLoading(false)
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
    const modalElement = (
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
            {modalElement}
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
            {modalElement}
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
        {modalElement}
        </>
    )
}
export function SettingPageListItem({data, callback}) {
    const idBook = useSelector((state) => state.fetch.idBook)
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const [openAdd, setOpenAdd] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const formRef = useRef()
    const title = data.details.page_title
    const icon = data.details.icon
    const id = data._id
    const [value, setValue] = useState(title)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setSource(null))
        dispatch(setPageType(icon))
        dispatch(setPathPageOfBook({path: title, id}))
        setDropDown(false)
    }
    function handleClose() {
        setOpenAdd(false)
    }
    useEffect(() => {
        let handler = (e) => {
            try {
                if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) {
                    return
                } else {
                    setDropDown(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener("mousedown", handler)
    })
    const [dropDown, setDropDown] = useState(false)
    async function handleSubmit(e) {
        setBtnLoading(true)
        e.preventDefault()
        try {
            const response = await axios.put(`${API}/book/${idBook}/page/${id}`, {page_title: value})
            pageToast(`${value} perubahan berhasil disimpan`)
            callback(response.data.pages)
            setOpenAdd(false)
            setBtnLoading(false)
        } catch (err) {
            setBtnLoading(false)
        }
    }
    let menuRef = useRef()
    let btnRef = useRef()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const active = pathPageOfBook === title
    async function deleteTodo() {
        try {
            await axios.delete(`${API}/book/${idBook}/page/${id}`)
            .then((res) => {
                deleteToast('berhasil dihapus')
                callback(res.data.pages)
                setOpenAdd(false)
                setBtnLoading(false)
            })
            .catch(err => {
                deleteToast('gagal terhapus')
                setBtnLoading(false)
            })
        } catch(err) {

        }
    }
    return (
        <>
        <div className={`room ${active?'active':''}`}>
            <FontAwesomeIcon icon={fontawesome[icon]} className={`room-icon ${active?'active':''}`}/>
            <span className={active?'active':''}>{title}</span>
            <div className="card-more" ref={btnRef}>
                <FontAwesomeIcon icon={faEllipsisVertical} className={`card-more-btn pointer  ${active?'active':''}`} onClick={() => setDropDown(!dropDown)}/>
            </div>
            <div className={`card-drop-down ${dropDown?'active':'inactive'}`} ref={menuRef}>
                <ul>
                    <li className='pointer' onClick={handleClick}>
                        <FontAwesomeIcon icon={faEye} className='card-dd-btn' />
                        <span>Masuk</span>
                    </li>
                    <li className='pointer' onClick={() => setOpenAdd(true)}>
                        <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn' />
                        <span>Ubah</span>
                    </li>
                    <li className='pointer' onClick={() => setDeleteOpen(true)}>
                        <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                        <span>Hapus</span>
                    </li>
                </ul>
            </div>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color='var(--purple-1)' callback={deleteTodo} timeout={25} deleteText={'akan dihapus beserta isinya'}/>
        <ModalSecond open={openAdd} close={handleClose}>
        <div className="addPage">
            <form className="form-modal" onSubmit={handleSubmit} ref={formRef}>
                <div className="addPage_body">
                    <p className='heading'>Halaman</p>
                    <p className='small'>Mengubah halaman <span className='small bold'>{title}</span></p>
                    <div className="pagePreview">
                        <p className='small bold uppercase'>Tipe halaman</p>
                        <div className={`room room-grid active`}>
                            <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon page_icon active`}/>
                            <span className={`page_type active`}>Todo </span>
                            <span className={`page_desc active`}>Daftar, Pesan, Foto, Catatan</span>
                        </div>
                    </div>
                    <p className='small bold uppercase'>Nama halaman</p>
                    <div className={`room roomInput ${value&&'active'}`}>
                        <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon ${value&&'active'}`}/>
                        <input type="text" placeholder={title} onChange={(e) => setValue(e.target.value)} value={value} className={`room_input ${value&&'active'}`} required/>
                    </div>
                </div>
                <div className="addPage_action">
                    <span className='btn_action' onClick={handleClose}>Batal</span>
                    {btnLoading?
                    (<button className={`btn_action btn_add`}>Loading</button>)
                    :
                    (<button type='submit' className={`btn_action btn_add ${value&&'active'}`}>Simpan</button>)
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
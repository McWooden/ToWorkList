import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faXmark, faPenToSquare, faTrash, faImage, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { convertDateToString } from '../../utils/convertDateFormat'
import { DeleteBookModal } from '../Modal/DeleteBookModal'
import { FileDrop } from '../Modal/FileDrop'
import { toast } from 'react-toastify'
import { deleteToast, leaveToast, imageToast, saveToast, alertToast, loadingToast } from '../../utils/notif'
import { setMembers, setPageType, setGuildProfile, setBooksProfile } from '../../redux/sourceSlice'
import { setPathPageOfBook, setPathBook } from '../../redux/fetchSlice'
import {url, API} from '../../utils/variableGlobal'
import axios from 'axios'
import { Confirm } from '../Modal/Confirm'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export function SettingProfile() {
    const myAccount = useSelector(state => state.source.profile)
    const idBook = useSelector(state => state.fetch.idBook)
    const profile = useSelector(state => state.source.guildProfile)
    const userId = useSelector(state => state.source.profile._id)
    const dispatch = useDispatch()
    const [dropDown, setDropDown] = useState(false)
    const [openUnggah, setOpenUnggah] = useState(false)
    
    let menuRef = useRef()
    let btnRef = useRef()
    const [full, setFull] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [leaveOpen, setLeaveOpen] = useState(false)
    const [deleteGuildOpen, setDeleteGuildOpen] = useState(false)
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
        const promise = loadingToast('Mengunggah gambar')
        try {
            setIsFetching(true)
            await axios.put(`${API}/image/${idBook}/pp`, formData, {duplex: 'half'})
            .then(res => {
                dispatch(setGuildProfile(res.data.profile))
                imageToast('pp diunggah')
                setOpenUnggah(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
            }).catch(err => {
                imageToast('pp gagal diunggah')
                toast.dismiss(promise)
            }).finally(() => {
                setIsFetching(false)
                toast.dismiss(promise)
            })
        } catch (error) {
            setIsFetching(false)
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
    const [isFetching, setIsFetching] = useState(false)
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
    const channel = useSelector(state => state.channel.book)
    async function leaveBook() {
        try {
            await axios.put(`${API}/book/leave/${idBook}?userId=${userId}`).then(res => {
                if (res.data.msg !== 'ok') return
                leaveToast(`berhasil keluar dari ${profile.book_title}`)
                channel.send({
                    type: 'broadcast',
                    event: 'memberShouldUpdate',
                    payload: `${myAccount.nickname} keluar`
                })
                dispatch(setPageType('welcome'))
                dispatch(setPathBook({path: '@me', id: '@me'}))
                dispatch(setPathPageOfBook({path: '', id: ''}))
                dispatch(setMembers(null))
                dispatch(setBooksProfile(null))
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteBook() {
        try {
            await axios.delete(`${API}/book/${idBook}`, {
                data: {
                    profile: profile,
                    userClientProfile: {
                        nickname: myAccount.nickname,
                        tag: myAccount.tag
                    }
                }
            })
            .then(res => {
                deleteToast('Buku berhasil di hapus')
                dispatch(setPageType('welcome'))
                dispatch(setPathBook({path: '@me', id: '@me'}))
                dispatch(setPathPageOfBook({path: '', id: ''}))
                dispatch(setMembers(null))
                dispatch(setBooksProfile(null))
            })
            .catch(err => {
                alertToast(err.response.data)
            })
        } catch(err) {}
    }
    const [saveLoading, setSaveLoading] = useState(false)
    const [saveLoadingDesc, setSaveLoadingDesc] = useState(false)
    return (
        <>
        <div className="setting_header">
            <h3>Profil</h3>
        </div>
        <div className="setting_full_profile_view d-flex fd-column">
            <div className='setting_full_profile_view_banner'>
                <img className={`setting_banner pointer ${full?'full zi-3 p-fixed':''}`} src={`${url}/${profile.avatar_url}`} alt={profile.book_title} onClick={() => setFull(!full)}/>
            </div>
            <div className="setting_full_profile_view_body p-relative">
                <div className="setting_full_profile_view_float d-fle ai-center p-absolute bg-zinc-900">
                    <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} className='setting_full_pp_guild pointer' onClick={() => setDropDown(!dropDown)} ref={btnRef}/>
                    <div className={`card-drop-down zi-1 ${dropDown?'active':'inactive'}`} ref={menuRef}>
                        <ul className='reverse d-flex fd-column of-hidden p-absolute pointer'>
                            <li className='d-flex ai-center' onClick={() => setOpenUnggah(true)}>
                                <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn' />
                                <span>Unggah</span>
                            </li>
                            <li className='d-flex ai-center' onClick={() => setDeleteOpen(true)}>
                                <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                                <span>Hapus</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <h5>Nama Buku</h5>
                <div className='guild_editor d-flex ai-center'>
                {editJudul?
                        <>
                        <form className="form-modal flex flex-row" onSubmit={handleSubmitJudul}>
                            <input type="text" placeholder={profile.book_title} value={valueJudul}  onChange={(e) => setValueJudul(e.target.value)} className='border-0'/>
                            <div className="sb_action_btn pi-center d-flex flex-row">
                                <FontAwesomeIcon icon={faXmark} onClick={() => setEditJudul(false)} className='action_btn pointer bg-no rounded'/>
                                {saveLoading?
                                    <FontAwesomeIcon icon={fontawesome.faSpinner} className='action_btn pointer rounded spinner'/>
                                :
                                    <button type='submit' className='h-[28px] pointer'>
                                        <FontAwesomeIcon icon={faFloppyDisk} className='action_btn'/>
                                    </button>
                                }
                            </div>
                        </form>
                        </>
                    :
                        <>
                        <p className='setting_full_name_guild'>{profile.book_title}</p>
                        <FontAwesomeIcon icon={faPencil} onClick={() => setEditJudul(true)} className='action_btn pointer'/>
                        </>
                }
                </div>
                <h5>Deskripsi</h5>
                <div className="guild_editor">
                    {editDesc?
                            <>
                            <form className="form-modal flex-one fd-column" onSubmit={handleSubmitDesc}>
                                <textarea value={valueDesc} placeholder={profile.desc} onChange={(e) => setValueDesc(e.target.value)}/>
                                <div className="sb_action_btn d-grid pi-center as-flex-end">
                                    <FontAwesomeIcon icon={faXmark} onClick={() => setEditDesc(false)} className='action_btn pointer'/>
                                    {saveLoadingDesc?
                                        <FontAwesomeIcon icon={fontawesome.faSpinner} className='action_btn pointer spinner'/>
                                    :
                                        <button type='submit'>
                                            <FontAwesomeIcon icon={faFloppyDisk} className='action_btn pointer'/>
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
        <div className="setting_action d-flex">
            <span className="setting_btn d-flex ai-center pointer delete_btn"  onClick={() => setDeleteGuildOpen(true)}>hapus guild</span>
            <span className="setting_btn d-flex ai-center pointer keluar_btn" onClick={() => setLeaveOpen(true)}>Keluar guild</span>
        </div>
        <DeleteBookModal open={deleteGuildOpen} close={() => setDeleteGuildOpen(false)} data={profile} callback={deleteBook}/>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={'PP Buku'} metode='delete' color='var(--purple-1)' callback={deletePp} deleteText={'pp nya nanti ilang, diganti gambar udin'}/>
        <Confirm open={leaveOpen} close={() => setLeaveOpen(false)} target={'PP Buku'} metode='leave' color='var(--purple-1)' callback={leaveBook} deleteText={'Keluar dari buku'}/>
        <FileDrop open={openUnggah} close={() => setOpenUnggah(false)}>
                <form ref={formRef} className='file-drop d-flex of-scroll jadwal-form' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                    <div className="img-view d-flex ai-center jc-center" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                    { previewUrl ? 
                        <img src={previewUrl} alt={image.name} /> 
                    :
                        <div className="drop-zone d-flex fd-column ai-center jc-center p-relative pointer border-8 border-zinc-600 border-dashed">
                            <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                            <p className='drop-text p-absolute'>click atau drop disini</p>
                            <input 
                                type="file" 
                                accept='image/*' 
                                ref={fileInput} hidden 
                                onChange={e => handleFile(e.target.files[0])}
                            />
                        </div>
                    }
                    </div>
                    <div className="img-form jc-center d-flex fd-column">
                        <div className="general-info">
                            <h3>Mengubah pp</h3>
                        </div>
                        <span className='url-image'>{previewUrl? previewUrl : 'Url Image'}/-</span>
                        {isFetching?
                        <button className='task-submit pointer'>Loading...</button>
                        :
                        <button className='task-submit pointer' onClick={() => formRef.current.submit}>Unggah</button>
                        }
                    </div>
                </form>
        </FileDrop>
        </>
    )
}
import './style/Navbar.css'
import './style/bookCard.css'
import { AppContext } from '../pages/App'
import { useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faGear, faPlus, faCompass, faRepeat, faSearch, faImage, faXmark} from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { GuildSetting } from './setting'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../utils/convertDateFormat'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setFetch, setPathBook, setPathPageOfBook } from '../redux/fetchSlice'
import { setBooksProfile, setGuildProfile, setMembers } from '../redux/sourceSlice'
import { setPageType, setSource } from '../redux/sourceSlice'
import { ModalLight, ModalSecond } from './Modal'
import { toast } from 'react-toastify'
import { loadingToast } from '../utils/notif';

const API = process.env.REACT_APP_API

// main navbar
function Navbar() {
    const {hideNavbar, navRef} = useContext(AppContext)
    return (
        <>
        <div className={`navigation_block ${hideNavbar?'inactive':'active'}`}/>
        <div className={`navigation ${hideNavbar?'hideNavbar':'showNavbar'}`}>
            <nav ref={navRef}>
                <div className='nav-1'>
                    <HomeButton/>
                    <BookList/>
                    <FindAndCreateBook/>
                </div>
            </nav>
            <ModeNavbar/>
        </div>
        </>
    )
}
function HomeButton() {
    const pathBook = useSelector(state => state.fetch.pathBook)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setPathBook({path: '@me', id: '@me'}))
        dispatch(setPathPageOfBook({path: '', id: ''}))
        dispatch(setMembers(null))
    }
    return (
        <div className='home-frame' onClick={handleClick}>
            <div className={`home-profile pointer ${pathBook==='@me' ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faHouse} className={'nav-icon'}/>
            </div>
        </div>
    )
}
function BookList() {
    const [allBook, setAllBook] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isReload, setReload] = useState(false)
    const dispatch = useDispatch()

    async function fetchData () {
        setReload(false)
        setIsLoading(true)
        try {
            let sessionBook = []
            const response = await axios.get(API+'/book')
            response.data.forEach((item, index) => {
                sessionBook.push(<BookItem key={index} data={item}/>)
            })
            setAllBook(sessionBook)
        } catch (err) {
            setReload(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [dispatch])
    if (isReload) return (
        <div className="nav-guild">
            <div className="reload_btn-frame" onClick={fetchData}>
                <FontAwesomeIcon icon={fontawesome.faRotateBack} className='reload_btn'/>
            </div>
        </div>
    )
    if (isLoading) return (
        <div className="nav-guild">
            <div className='guild-frame'>
                <div className="loading guild-photo-profile"/>
            </div>
        </div>
    )
    return (
        <div className="nav-guild">
            {allBook}
        </div>
    )
}
function BookItem({data}) {
    const idBook = useSelector(state => state.fetch.idBook)
    const dispatch = useDispatch()
    const url = 'https://zjzkllljdilfnsjxjrxa.supabase.co/storage/v1/object/public/book'
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setFetch({path: data.profile.book_title, id: data._id}))
        dispatch(setGuildProfile(data.profile))
        dispatch(setMembers(null))
    }
    return (
        <div onClick={handleClick} className={`guild-frame ${idBook===data._id ? 'active' : ''}`}>
            <img src={`${url}/${data.profile.avatar_url}`} className={`guild-photo-profile ${idBook===data._id ? 'active' : ''}`} alt={data.profile.book_title} title={data.profile.book_title}/>
        </div>
    )
}
function ModeNavbar() {
    const { secondNavRef } = useContext(AppContext)
    const pathBook = useSelector(state => state.fetch.pathBook)
    return (
        <div className='modeNavbar' ref={secondNavRef}>
            {pathBook === '@me' ? <ModeNavbarAccountHeader/> : <ModeNavbarHeader/>}
            {pathBook === '@me' ? <PageAccountList/> : <PageList/>}
            <Profile/>
        </div>
    )
}
function FindAndCreateBook() {
    const myAccount = useSelector(state => state.source.profile)
    const navigate = useNavigate()
    useEffect(() => {
        !myAccount && navigate('/auth')
    }, [navigate, myAccount])
    const [addServerModal, setAddServerModal] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [searchText, setSearchText] = useState('')

    function handleInputChange(e) {
        setSearchText(e.target.value)
    }
    function handleSearch(e) {
        e.preventDefault()
        console.log(searchText)
    }
    function handleModalOpen() { setModalOpen(true) }
    function handleModalClose() { setModalOpen(false) }
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
    const handleRemove = () => {
        formRef.current.reset()
        setImage(null)
        setPreviewUrl('')
    }
    // form
    const formRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('data', JSON.stringify({
            book_title: valueJudul,
            author_avatar: myAccount.avatar,
            author: {
                nickname: myAccount.nickname,
                tag: myAccount.tag
            },
        }))
        const promise = loadingToast('Mengunggah gambar')
        try {
            setBtnLoading(true)
            await axios.post(`${API}/image/addBook`, formData)
            .then(res => {
                setModalOpen(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
                setAddServerModal(false)
                valueJudul(`Buku ${myAccount.nickname}`)
            })
            .catch(err => {

            }).finally(() => {
                toast.dismiss(promise)
                setBtnLoading(false)
            })
        } catch(err) {
            setBtnLoading(false)
            toast.dismiss(promise)
        }
    }
    const [btnLoading, setBtnLoading] = useState(false)
    const [valueJudul, setValueJudul] = useState(`Buku ${myAccount?.nickname}`)
    return (
        <>
        <div className='find-create-frame'>
            <div className='home-profile find-create' onClick={handleModalOpen}>
                <FontAwesomeIcon icon={faCompass} className={'nav-icon nav-icon-2'}/>
            </div>
        </div>
        <ModalLight open={modalOpen} close={handleModalClose}>
            <div className="search_book_container">
                <div className="search_book-header">
                    <form onSubmit={handleSearch} className='form-modal'>
                        <div className='search_bar'>
                            <input type="text" value={searchText} onChange={handleInputChange} placeholder="Fitur belum dibuka" />
                            <div className="tiang"/>
                            <button type="submit" className='submit_search'>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>
                    <div className="sb_action_btn">
                        <FontAwesomeIcon icon={faPlus} className='action_btn' onClick={() => setAddServerModal(true)}/>
                    </div>
                </div>
                <AllBookList/>
            </div>
        </ModalLight>
        <ModalSecond open={addServerModal} close={() => setAddServerModal(false)}>
            <form className="add_server_container form-modal" ref={formRef} onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                <div className="add_server-body">
                    <h3>Membuat Buku</h3>
                    <p>Beri buku baru anda nama dan pp. Anda juga bisa menggantinya kapan saja nanti</p>
                    <div className="pp_buku">
                        <div className="img-view" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                            { previewUrl ? 
                                <>
                                <img src={previewUrl} alt={image.name} /> 
                                <FontAwesomeIcon icon={faXmark} className='remove-icon' onClick={handleRemove}/>
                                </>
                            :
                                <div className="drop-zone">
                                    <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                                    <input 
                                        type="file" 
                                        accept='image/*' 
                                        ref={fileInput} hidden 
                                        onChange={e => handleFile(e.target.files[0])}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <h4>Judul Buku</h4>
                    <input type="text" value={valueJudul} placeholder='Judul' onChange={(e) => setValueJudul(e.target.value)}/>
                </div>
                <div className="add_server-footer addPage_action">
                    <span className='btn_action' onClick={() => setAddServerModal(false)}>Batal</span>
                    {btnLoading?
                    (<button className={`btn_action btn_add`}>Loading...</button>)
                    :
                    (<button type='submit' className={`btn_action btn_add ${valueJudul&&'active'}`}>Buat</button>)
                    }
                </div>
            </form>
        </ModalSecond>
        </>
    )
}
function AllBookList() {
    const booksProfile = useSelector(state => state.source.booksProfile)
    const [loading, setLoading] = useState(false)
    const [box, setBox] = useState([])
    const [reload, setReload] = useState(false)
    const dispatch = useDispatch()
    const fetchData = useCallback(async () => {
        setReload(false)
        setLoading(true)
        try {
            const response = await axios.get(`${API}/book`)
            dispatch(setBooksProfile(response.data))
        } catch (err) {
            setReload(true)
        }
        setLoading(false)
    }, [dispatch])

    useEffect(() => {
        if (!booksProfile) {
            fetchData()
        } else {
            let sessionBook = []
            booksProfile.forEach((data, index) => {
                sessionBook.push(<BookCardItem data={data} key={index}/>)
            })
            setBox(sessionBook)
        }
    },[dispatch, fetchData, booksProfile])
    if (reload) return (
        <div className="book_card_container">
            <div className="reload_btn-frame" onClick={fetchData}>
                <FontAwesomeIcon icon={fontawesome.faRotateBack} className='reload_btn'/>
            </div>
        </div>
    )
    if (loading) return (
        <div className="book_card_container">
            <div className="book_card loading"/>
            <div className="book_card loading"/>
        </div>
    )
    return (
        <div className="book_card_container">
            {box}
        </div>
    )
}
function BookCardItem({data}) {
    const profile = data.profile
    const url = 'https://zjzkllljdilfnsjxjrxa.supabase.co/storage/v1/object/public/book'
    // const id = data._id
    return (
        <div className="book_card">
            <div className="book_card-header">
                <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} className='banner'/>
            </div>
            <div className="book_card-body">
                <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} className='avatar'/>
                <p className='title'>{profile.book_title}</p>
                <p>{profile.desc}</p>
                <p className='panjang_anggota'>{data.users_length} Anggota</p>
            </div>
        </div>
    )
}
// modeNavbar component
function ModeNavbarHeader() {
    const pathBook = useSelector(state => state.fetch.pathBook)
    const [settingOpen, setSettingOpen] = useState(false)
    function handleClose() {
        setSettingOpen(false)
    }
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setSettingOpen(false)
            }
        }
        if (settingOpen) {
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [settingOpen])
    return (
        <div className="modeNavbarHeader">
            <h4 className='guild-name'>{pathBook}</h4>
            <FontAwesomeIcon icon={faGear} className='settingNavbar pointer' onClick={() => setSettingOpen(true)}/>
            <GuildSetting open={settingOpen} close={handleClose}/>
        </div>
    )
}
function ModeNavbarAccountHeader() {
    return (
        <div className="modeNavbarHeader">
            <h4 className='app-name'>Toworklist</h4>
        </div>
    )
}

function PageList() {
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
            <div className="nav-guild">
                <div className="reload_btn-frame" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                </div>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="roomList">
                <div className="room loading" />
            </div>
        )
    }
    return (
        <div className="roomList">
            {pages}
        </div>
    )
}
function PageAccountList() {
    const bookId = useSelector(state => state.fetch.bookId)
    const [pageList, setPageList] = useState([])
    const pages = useMemo(() => [
        {
            details: {
                page_title: 'Summary',
                icon: 'faAddressBook',
            }
        },
        {
            details: {
                page_title: 'Notifications',
                icon: 'faBell',
            }
        },
        {
            details: {
                page_title: 'Mail',
                icon: 'faEnvelope',
            }
        },
        {
            details: {
                page_title: 'News',
                icon: 'faNewspaper',
            }
        }
    ], [])

    useEffect(() => {
        const sessionPage = []
        pages.forEach((item, index) => sessionPage.push(<PageListItem key={index} data={item}/>))
        setPageList(sessionPage)
    }, [pages, bookId])

    return (
        <div className="roomList">
            {pageList}
        </div>
    )
}

export function PageListItem({data}) {
    const title = data.details.page_title
    const icon = data.details.icon
    const id = data._id
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setSource(null))
        dispatch(setPageType(icon))
        dispatch(setPathPageOfBook({path: title, id}))
    }
    const active = pathPageOfBook === title
    return (
        <div className={`room ${active?'active':''}`} onClick={handleClick}>
            <FontAwesomeIcon icon={fontawesome[icon]} className={`room-icon ${active?'active':''}`}/> <span className={active?'active':''}>{title}</span>
        </div>
    )
}
function Profile() {
    const navigate = useNavigate()
    const profile = useSelector(state => state.source.profile)
    const [userPop, setUserPop] = useState(false)
    const userPopRef = useRef()
    const profileRef = useRef()
    function handlePop() {
        setUserPop(!userPop)
    }
    useEffect(() => {
        if (!profile) {
            navigate('/auth')
        }
        let handler = (e) => {
            try {
                if (userPopRef.current.contains(e.target) || profileRef.current.contains(e.target)) {
                    return
                } else {
                    setUserPop(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    }, [profile, navigate]);
    
    return (
        <div className="profile-container">
            {profile && (
                <>
                <div className={`profile_pop ${userPop?'active':'inactive'}`} ref={userPopRef}>
                <a href={profile.avatar} target='_blank' rel="noreferrer" >
                    <img src={profile.avatar} alt={profile.nickname}/>
                </a>
                    <div className="profile_pop-body">
                        <div className="profile_pop-nickname">{profile.nickname}<span>#{profile.tag}</span></div>
                        <div className="profile_pop-created_at">
                            <p>Bergabung sejak</p>
                            <span>{convertDateToString(profile.created_at)}</span>
                        </div>
                        <div className="profile_pop-switch_account" onClick={() => navigate('/auth/login')}>
                            <FontAwesomeIcon icon={faRepeat}/>
                            <span>Ganti akun</span>
                        </div>
                        <div className="profile_pop-add_account" onClick={() => navigate('/auth/register')}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Tambah akun</span>
                        </div>
                    </div>
                </div>
                <div className='profile pointer' ref={profileRef} onClick={handlePop}>
                    <img src={profile.avatar} alt={profile.nickname}/>
                    <div className="profile-body">
                        <div className="profile-nickname">{profile.nickname}</div>
                        <div className="profile-id">#{profile.tag}</div>
                    </div>
                </div>
                </>
            )}
        </div>
    )
    
}

export default Navbar
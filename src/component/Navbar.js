import './style/Navbar.css'
import { AppContext, PageContext } from '../pages/App'
import { useContext, useState, useEffect, useRef, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faGear, faPlus, faCompass, faRepeat} from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { myAccount } from '../utils/dataJSON'
import { GuildSetting } from './setting'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../utils/convertDateFormat'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setFetch, setPathBook, setPathPageOfBook } from '../redux/fetchSlice'
import { setError, setMembers } from '../redux/sourceSlice'
import { setPageType, setSource } from '../redux/sourceSlice'

const API = process.env.REACT_APP_API

// main navbar
function Navbar() {
    const {hideNavbar, navRef} = useContext(AppContext)
    return (
        <>
        <div className={`navigation ${hideNavbar?'hideNavbar':'showNavbar'}`} ref={navRef}>
            <nav>
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
    const { handleChangePage } = useContext(PageContext)
    const pathBook = useSelector(state => state.fetch.pathBook)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setPathBook({path: '@me', id: '@me'}))
        dispatch(setPathPageOfBook({path: '', id: ''}))
        dispatch(setMembers(null))
        handleChangePage(myAccount)
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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                let sessionBook = []
                const response = await axios.get(API+'/book')
                response.data.forEach((item, index) => {
                    sessionBook.push(<BookItem key={index} data={item}/>)
                })
                setAllBook(sessionBook)
            } catch (err) {
                const {message, name, code} = err
                dispatch(setError({message, name, code}))
                navigate('/error')
            }
            setIsLoading(false)
        }
        fetchData()
    }, [dispatch, navigate])
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
    const pathBook = useSelector(state => state.fetch.pathBook)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setFetch({path: data.profile.book_title, id: data._id}))
        dispatch(setMembers(null))
    }
    return (
        <div onClick={handleClick} className={`guild-frame ${pathBook===data.profile.book_title ? 'active' : ''}`}>
            <img src={data.profile.avatar_url} className={`guild-photo-profile ${pathBook===data.profile.book_title ? 'active' : ''}`} alt={data.profile.book_title} title={data.profile.book_title}/>
        </div>
    )
}
function ModeNavbar() {
    const pathBook = useSelector(state => state.fetch.pathBook)
    return (
        <div className='modeNavbar'>
            {pathBook === '@me' ? <ModeNavbarAccountHeader/> : <ModeNavbarHeader/>}
            {pathBook === '@me' ? <PageAccountList/> : <PageList/>}
            <Profile/>
        </div>
    )
}
function FindAndCreateBook() {
    return (
        <div className='find-create-frame'>
            <div className='home-profile find-create'>
                <FontAwesomeIcon icon={faPlus} className={'nav-icon nav-icon-2'}/>
            </div>
            <div className='home-profile find-create'>
                <FontAwesomeIcon icon={faCompass} className={'nav-icon nav-icon-2'}/>
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
    const idBook = useSelector(state => state.fetch.idBook)
    const [allPage, setAllPage] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                let sessionPage = []
                const response = await axios.get(`${API}/book/${idBook}/get/pages/details`)
                response.data.pages.forEach((item, index) => {
                    sessionPage.push(<PageListItem key={index} data={item}/>)
                })
                setAllPage(sessionPage)
            } catch (err) {
                console.error(err)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [idBook, dispatch])
    if (isLoading) return (
        <div className="roomList">
            <div className='room loading'/>
        </div>
    )
    return(
        <div className='roomList'>
            {allPage}
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

function PageListItem({data}) {
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
                <img src={profile.avatar} alt={profile.nickname}/>
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
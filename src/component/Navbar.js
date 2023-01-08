import './style/Navbar.css'
import { GuildContext } from '../pages/App'
import { useContext, useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCheck, faGear, faPlus, faCompass, faRepeat} from '@fortawesome/free-solid-svg-icons'
import { myAccount, guildData } from '../utils/dataJSON'
import { GuildSetting } from './setting'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../utils/convertDateFormat'
import { getLocalAccount } from '../utils/localstorage'


function Navbar() {
    const {hideNavbar, navRef} = useContext(GuildContext)
    return (
        <>
        <div className={`navigation ${hideNavbar?'hideNavbar':'showNavbar'}`} ref={navRef}>
            <nav>
                <div className='nav-1'>
                    <HomeButton/>
                    <GuildList/>
                    <FindCreate/>
                </div>
            </nav>
            <ModeNavbar/>
        </div>
        </>
    )
}
function ModeNavbar() {
    return (
        <div className='modeNavbar'>
            <ModeNavbarHeader/>
            <RoomList/>
            <Profile/>
        </div>
    )
}

function ModeNavbarHeader() {
    const {guildName} = useContext(GuildContext)
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
            <h4 className='guild-name'>{guildName}</h4>
            <FontAwesomeIcon icon={faGear} className='settingNavbar pointer' onClick={() => setSettingOpen(true)}/>
            <GuildSetting open={settingOpen} close={handleClose}/>
        </div>
    )
}
function HomeButton() {
    const {handleGuild, guildName} = useContext(GuildContext)
    return (
        <div className='home-frame'>
            <div className={`home-profile pointer ${myAccount.profile.nickname === guildName ? 'active' : ''}`} onClick={() => handleGuild(myAccount)}>
                <FontAwesomeIcon icon={faHouse} className={'nav-icon'}/>
            </div>
        </div>
    )
}
function FindCreate() {
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

function GuildList() {
    const {guildName, handleGuild} = useContext(GuildContext)
    const guild = []
    guildData.forEach((item, index) => {
        guild.push(
            <div key={index} onClick={() => handleGuild(item)} className={`guild-frame ${item.profile.guildName === guildName ? 'active' : ''}`}>
                <img src={item.profile.src} className={`guild-photo-profile ${item.profile.guildName === guildName ? 'active' : ''}`} alt={item.profile.guildName} title={item.profile.guildName}/>
            </div>
        )
    })
    return (
        <div className="nav-guild">
            {guild}
        </div>
    )
}
function RoomList() {
    const {guildRooms, handleRoom, currentRoom} = useContext(GuildContext)
    const lists = []
    guildRooms.forEach((room, index) => {
        lists.push(
            <div key={index} className={`room ${currentRoom === room.roomName?'active':''}`} onClick={() => handleRoom(index)}>
                <FontAwesomeIcon icon={faCheck} className={`room-icon ${currentRoom === room.roomName?'active':''}`}/> <span className={currentRoom === room.roomName?'active':''}>{room.roomName}</span>
            </div>
        )
    })
    return(
        <div className='roomList'>
            {lists}
        </div>
    )
}
function Profile() {
    const profile = getLocalAccount()
    const date = convertDateToString(profile.created_at)
    const navigate = useNavigate()
    const [userPop, setUserPop] = useState(false)
    const userPopRef = useRef()
    const profileRef = useRef()
    function handlePop() {
        setUserPop(!userPop)
    }
    useEffect(() => {
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
    })
    return (
        <div className="profile-container">
            <div className={`profile_pop ${userPop?'active':'inactive'}`} ref={userPopRef}>
            <img src={profile.avatar} alt={profile.nickname}/>
                <div className="profile_pop-body">
                    <div className="profile_pop-nickname">{profile.nickname}<span>#{profile.tag}</span></div>
                    <div className="profile_pop-created_at">
                        <p>Bergabung sejak</p>
                        <span>{date}</span>
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
        </div>
    )
}

export default Navbar
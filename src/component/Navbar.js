import './style/Navbar.css'
import { GuildContext } from '../pages/App'
import { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCheck, faGear, faPlus, faCompass} from '@fortawesome/free-solid-svg-icons'
import { myAccount, guildData } from '../utils/dataJSON'
import { GuildSetting } from './setting'
import { useNavigate } from 'react-router-dom'


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
    const navigate = useNavigate()
    return (
        <div className="profile-container" onClick={() => navigate('/auth')}>
            <div className='profile'>
                <img src={myAccount.profile.pic} alt='no-person'/>
                <div className="profile-body">
                    <div className="profile-nickname">{myAccount.profile.nickname}</div>
                    <div className="profile-id">#{myAccount.profile.id}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
import './style/Navbar.css'
import { GuildContext } from '../pages/App'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCheck, faGear, faPlus, faCompass} from '@fortawesome/free-solid-svg-icons'
import noPic from '../assets/images/noPic.png';
import { myAccount, guildData } from '../component/dataJSON'

function Navbar() {
    const {hideNavbar} = useContext(GuildContext)
    return (
        <>
        <div className={`navigation ${hideNavbar?'hideNavbar':'showNavbar'}`}>
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
    return (
        <div className="modeNavbarHeader">
            <h4 className='guild-name'>{guildName}</h4>
            <FontAwesomeIcon icon={faGear} className='settingNavbar pointer'/>
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
            <div key={index} onClick={() => handleGuild(item)} className={`guild-frame ${item.profile.name === guildName ? 'active' : ''}`}>
                <img src={item.profile.src} className={`guild-photo-profile ${item.profile.name === guildName ? 'active' : ''}`} alt={item.profile.name} title={item.profile.name}/>
            </div>
        )
    })
    return (
        <div className="nav-guild">
            {guild}
        </div>
    )
}
function RoomList(props) {
    const {guildRooms, handleRoom, room} = useContext(GuildContext)
    const lists = []
    guildRooms.forEach((item, index) => {
        lists.push(
            <div key={index} className={`room ${room === item?'active':''}`} onClick={() => handleRoom(item)}>
                <FontAwesomeIcon icon={faCheck} className={`room-icon ${room === item?'active':''}`}/> <span className={room === item?'active':''}>{item}</span>
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
    return (
        <div className="profile-container">
            <div className='profile'>
                <img src={noPic} alt='no-person'/>
                <div className="profile-body">
                    <div className="profile-nickname">McWooden</div>
                    <div className="profile-id">#2521</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
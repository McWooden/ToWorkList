import './style/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCheck, faGear, faPlus, faCompass} from '@fortawesome/free-solid-svg-icons'
import noPic from '../assets/images/noPic.png';
import { myAccount, guildData } from '../component/dataJSON'

function Navbar(props) {
    return (
        <>
        <div className={`navigation ${props.hideNavbar?'hideNavbar':'showNavbar'}`}>
            <nav>
                <div className='nav-1'>
                    <HomeButton handleGuild={props.handleGuild} guildName={props.guildName}/>
                    <GuildList handleGuild={props.handleGuild} guildName={props.guildName}/>
                    <FindCreate/>
                </div>
            </nav>
            <ModeNavbar handleRoom={props.handleRoom} guildRooms={props.guildRooms} guildName={props.guildName} currentRoom={props.currentRoom}/>
        </div>
        </>
    )
}
function ModeNavbar(props) {
    return (
        <div className='modeNavbar'>
            <ModeNavbarHeader guildName={props.guildName}/>
            <RoomList handleRoom={props.handleRoom} guildRooms={props.guildRooms} currentRoom={props.currentRoom}/>
            <Profile/>
        </div>
    )
}

function ModeNavbarHeader(props) {
    return (
        <div className="modeNavbarHeader">
            <h4 className='guild-name'>{props.guildName}</h4>
            <FontAwesomeIcon icon={faGear} className='settingNavbar pointer'/>
        </div>
    )
}
function HomeButton(props) {
    function handleGuild() {
        props.handleGuild(myAccount)
    }
    return (
        <div className='home-frame'>
            <div className={`home-profile pointer ${myAccount.profile.nickname === props.guildName ? 'active' : ''}`} onClick={handleGuild}>
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

function GuildList(props) {
    const guild = []
    guildData.forEach((item, index) => {
        function handleGuild() {
            props.handleGuild(item)
        }
        guild.push(
            <div key={index} onClick={handleGuild} className={`guild-frame ${item.profile.name === props.guildName ? 'active' : ''}`}>
                <img src={item.profile.src} className={`guild-photo-profile ${item.profile.name === props.guildName ? 'active' : ''}`} alt={item.profile.name} title={item.profile.name}/>
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
    const lists = []
    props.guildRooms.forEach((item, index) => {
        function handleRoom() {
            props.handleRoom(item)
        }
        lists.push(
            <div key={index} className={`room ${props.currentRoom === item?'active':''}`} onClick={handleRoom}>
                <FontAwesomeIcon icon={faCheck} className={`room-icon ${props.currentRoom === item?'active':''}`}/> <span className={props.currentRoom === item?'active':''}>{item}</span>
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
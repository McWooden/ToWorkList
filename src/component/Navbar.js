import './style/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCheck, faGear, faPlus, faCompass} from '@fortawesome/free-solid-svg-icons'
import noPic from '../assets/images/noPic.png';
import { partyData } from '../component/dataJSON'

function Navbar(props) {
    return (
        <>
        <div className='navigation hideNavbar'>
            <nav>
                <div className='nav-1'>
                    <HomeButton/>
                    <PartyList handleGuild={props.handleGuild} guildName={props.guildName}/>
                    <FindCreate/>
                </div>
            </nav>
            <ModeNavbar handleRoom={props.handleRoom} rooms={props.rooms} guildName={props.guildName}/>
        </div>
        </>
    )
}
function ModeNavbar(props) {
    return (
        <div className='modeNavbar'>
            <ModeNavbarHeader guildName={props.guildName}/>
            <ModeNavbarList handleRoom={props.handleRoom} rooms={props.rooms}/>
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
function HomeButton() {
    return (
        <div className='home-frame'>
            <div className='home-profile pointer'>
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

function PartyList(props) {
    const party = []
    partyData.forEach((item, index) => {
        function handleGuild() {
            props.handleGuild(item)
        }
        party.push(
            <div key={index} onClick={handleGuild}>
                <img src={item.profile.src} className={`party-photo-profile ${item.profile.name === props.guildName ? 'active' : ''}`} alt={item.profile.name} title={item.profile.name}/>
            </div>
        )
    })
    return (
        <div className="nav-party">
            {party}
        </div>
    )
}
function ModeNavbarList(props) {
    const lists = []
    props.rooms.forEach((item, index) => {
        function handleRoom() {
            props.handleRoom(item)
        }
        lists.push(
            <div key={index} className="room" onClick={handleRoom}>
                <FontAwesomeIcon icon={faCheck} className={'room-icon'} style={{color: 'var(--white-3)'}}/> <span>{item}</span>
            </div>
        )
    })
    return(
        <div className='modeNavbarList'>
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
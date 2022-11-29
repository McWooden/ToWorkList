import React from 'react'
import './style/Navbar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCheck, faGear, faPlus, faCompass} from '@fortawesome/free-solid-svg-icons'

export class Navbar extends React.Component {
    render() {
        return (
            <>
            <div className='navigation'>
                <nav>
                    <div className='nav-1'>
                        <HomeButton/>
                        <PartyList/>
                        <FindCreate/>
                    </div>
                </nav>
                <ModeNavbar/>
            </div>
            </>
            
        )
    }
}
class ModeNavbar extends React.Component {
    render() {
        return (
            <div className='modeNavbar'>
                <ModeNavbarHeader/>
                <ModeNavbarList/>
                <Profile/>
            </div>
        )
    }
}
class ModeNavbarHeader extends React.Component {
    render() {
        return (
            <div className="modeNavbarHeader">
                <h4 className='guild-name'>Guild Name</h4>
                <FontAwesomeIcon icon={faGear} className='settingNavbar pointer'/>
            </div>
        )
    }
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
function PartyList() {
    return (
        <div className="nav-party">
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
            <div>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} className={' party-photo-profile'} alt='no-person'/>
            </div>
        </div>
    )
}
function ModeNavbarList() {
    return(
        <div className='modeNavbarList'>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span>main todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>second todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>third todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span>main todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>second todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>third todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span>main todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>second todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>third todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
            <div className="group-task">
                <FontAwesomeIcon icon={faCheck} className={'group-task-icon'} style={{color: 'var(--white-3)'}}/> <span style={{color: 'var(--white-3)'}}>-th todo</span>
            </div>
        </div>
    )
}
function Profile() {
    return (
        <div className="profile-container">
            <div className='profile'>
                <img src={'https://nvhibgshtzxykdbwmats.supabase.co/storage/v1/object/public/img/user-picture/no-pic.png'} alt='no-person'/>
                <div className="profile-body">
                    <div className="profile-nickname">McWooden</div>
                    <div className="profile-id">#2521</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
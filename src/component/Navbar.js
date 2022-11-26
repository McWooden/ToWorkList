import React from 'react'
import './style/Navbar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faCheck, faArrowLeft, faBars} from '@fortawesome/free-solid-svg-icons'

export class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden : false
        }
        this.handleHidden = this.handleHidden.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }
    handleHidden() {
        this.setState({
            isHidden: true
        })
    }
    handleShow() {
        this.setState({
            isHidden: false
        })
    }
    
    render() {
        return (
            <>
            <div style={{transform: `${this.state.isHidden ? 'translateX(-100%)' : 'translateX(0)'}`}} id='navbar'>
                <div className='navigation'>
                    <nav>
                        <div>
                            <HomeButton/>
                            <PartyList/>
                        </div>
                    </nav>
                    <ModeNavbar closeFunction={this.handleHidden}/>
                </div>
            </div>
            <NavTop open={this.handleShow}/>
            </>
        )
    }
}
class ModeNavbar extends React.Component {
    render() {
        return (
            <div className='modeNavbar'>
                <ModeNavbarHeader closeFunction={this.props.closeFunction}/>
                <ModeNavbarList/>
                <Profile/>
            </div>
        )
    }
}
class ModeNavbarHeader extends React.Component {
    constructor(props) {
        super(props)
        this.close = this.props.closeFunction
    }
    render() {
        return (
            <div className="modeNavbarHeader">
                <h4 className='guild-name'>Guild Name</h4>
                <FontAwesomeIcon icon={faArrowLeft} className='closeNavbar pointer' onClick={this.close}/>
            </div>
        )
    }
}
function HomeButton() {
    return (
        <div className='home-frame'>
            <div className='home-profile'>
                <FontAwesomeIcon icon={faHouse} className={'nav-icon'}/>
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

export class NavTop extends React.Component {
    constructor(props) {
        super(props)
        this.open = this.props.open
    }
    render() {
        return (
            <section>
                <header>
                <FontAwesomeIcon icon={faBars} className='bars pointer' onClick={this.open}/>
                    <h4 className='pageTitle'>TodoList</h4>
                </header>
            </section>
        )
    }
}

export default Navbar
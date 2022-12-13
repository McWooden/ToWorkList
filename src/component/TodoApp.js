import React from 'react'
import './style/TodoApp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faChartSimple, faMessage} from '@fortawesome/free-solid-svg-icons'
import {handleRightBase, handleLeftBase, handleNavbar} from '../utils/hideNavbar'
import { Base } from './Base'


export function TodoApp(props) {
    return (
        <div id='todoApp'>
            <NavTop currentRoom={props.currentRoom}/>
            <Base/>
        </div>
    )
}
export function NavTop({currentRoom}) {
    return (
        <section id='navTop'>
            <header>
            <div className='header-left'>
                <FontAwesomeIcon icon={faBars} className={'bars bars-active pointer'} onClick={handleNavbar}/>
                <h4 className='pageTitle'>{currentRoom}</h4>
            </div>
            <div className="sidebar-button">
                <FontAwesomeIcon icon={faChartSimple} className="btn-sidebar btn-sidebar-left pointer" onClick={handleLeftBase}/>
                <FontAwesomeIcon icon={faMessage} className="btn-sidebar btn-sidebar-right pointer" onClick={handleRightBase}/>
            </div>
            </header>
        </section>
    )
}

export default TodoApp
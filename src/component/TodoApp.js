import './style/TodoApp.css'
import { GuildContext } from '../pages/App'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faChartSimple, faMessage} from '@fortawesome/free-solid-svg-icons'
import {handleRightBase, handleLeftBase} from '../utils/hideNavbar'
import { Base } from './Base'
import { useContext } from 'react'


export function TodoApp() {
    return (
        <div id='todoApp'>
            <NavTop/>
            <Base/>
        </div>
    )
}
export function NavTop() {
    const {hideNavbar, handleNavbar, room} = useContext(GuildContext)
    return (
        <section id='navTop'>
            <header>
            <div className='header-left'>
                <FontAwesomeIcon icon={faBars} className={`bars pointer ${hideNavbar?'':'bars-active'}`} onClick={handleNavbar}/>
                <h4 className='pageTitle'>{room}</h4>
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
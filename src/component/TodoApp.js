import React from 'react'
import './style/TodoApp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faChartSimple, faWindowMaximize} from '@fortawesome/free-solid-svg-icons'
import {handleRightBase, handleLeftBase, handleNavbar} from '../utils/hideNavbar'
import { Base } from './Base'


export class TodoApp extends React.Component {
    render() {
        return (
            <div id='todoApp'>
                <NavTop/>
                <Base/>
            </div>
        )
    }
}
export class NavTop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bars: false
        }
    }
    render() {
        return (
            <section id='navTop'>
                <header>
                <div className='header-left'>
                    <FontAwesomeIcon icon={faBars} className={'bars bars-active pointer'} onClick={handleNavbar}/>
                    <h4 className='pageTitle'>main todo</h4>
                </div>
                <div className="sidebar-button">
                    <FontAwesomeIcon icon={faChartSimple} className="btn-sidebar btn-sidebar-left pointer" onClick={handleLeftBase}/>
                    <FontAwesomeIcon icon={faWindowMaximize} className="btn-sidebar btn-sidebar-right pointer" onClick={handleRightBase}/>
                </div>
                </header>
            </section>
        )
    }
}

export default TodoApp
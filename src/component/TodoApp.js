import './style/TodoApp.css'
import { GuildContext } from '../pages/App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faChartSimple, faMessage, faCube, faUserGroup} from '@fortawesome/free-solid-svg-icons'
import { Base } from './Base'
import { useContext, createContext, useState } from 'react'
import { ItemData } from '../pages/App'
// import { defaultItem } from '../utils/dataJSON'

export const HideBase = createContext()
export function TodoApp({room}) {
    const [hideRightBase, setHideRightBase] = useState(true)
    const [hideLeftBase, setHideLeftBase] = useState(true)
    function handleRightBase(boolean) {
        setHideRightBase(!boolean)
        setHideLeftBase(true)
    }
    function handleLeftBase(boolean) {
        setHideLeftBase(!boolean)
        setHideRightBase(true)
    }
    return (
        <HideBase.Provider value={{hideRightBase, handleRightBase, hideLeftBase, handleLeftBase}}>
            <div id='todoApp'>
                <NavTop/>
                <Base room={room}/>
            </div>
        </HideBase.Provider>
    )
} 
export function NavTop() {
    const {hideRightBase, handleRightBase, hideLeftBase, handleLeftBase} = useContext(HideBase)
    const {hideNavbar, handleNavbar, currentRoom, navTopRef} = useContext(GuildContext)
    const {item} = useContext(ItemData)
    return (
        <section id='navTop'>
            <header ref={navTopRef}>
            <div className='header-left'>
                <FontAwesomeIcon icon={faBars} className={`bars pointer ${hideNavbar?'btn-inactive':'btn-active'}`} onClick={() => handleNavbar(hideNavbar)}/>
                <h4 className='pageTitle'>{currentRoom}</h4>
            </div>
            <div className="sidebar-button">
                <FontAwesomeIcon icon={item?faCube:faChartSimple} className={`btn-sidebar btn-sidebar-left pointer  ${hideLeftBase?'btn-inactive':'btn-active'}`} onClick={() => handleLeftBase(hideLeftBase)}/>
                <FontAwesomeIcon icon={item?faMessage:faUserGroup} className={`btn-sidebar btn-sidebar-right pointer ${hideRightBase?'btn-inactive':'btn-active'}`} onClick={() => handleRightBase(hideRightBase)}/>
            </div>
            </header> 
        </section>
    )
}

export default TodoApp
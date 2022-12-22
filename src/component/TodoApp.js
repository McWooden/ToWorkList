import './style/TodoApp.css'
import { GuildContext } from '../pages/App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faChartSimple, faMessage, faCube, faUserGroup} from '@fortawesome/free-solid-svg-icons'
import { Base } from './Base'
import { useContext } from 'react'
import { createContext } from 'react'
import { useState } from 'react'
// import { defaultItem } from '../utils/dataJSON'

export const HideBase = createContext()
export const ItemData = createContext()
export function TodoApp() {
    const [hideRightBase, setHideRightBase] = useState(true)
    const [hideLeftBase, setHideLeftBase] = useState(true)
    const [item, setItem] = useState()
    function handleItem(item) {
        setItem(item)
    }
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
            <ItemData.Provider value={{item, handleItem}}>
                <div id='todoApp'>
                    <NavTop/>
                    <Base/>
                </div>
            </ItemData.Provider>
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
                <FontAwesomeIcon icon={item?faUserGroup:faMessage} className={`btn-sidebar btn-sidebar-right pointer ${hideRightBase?'btn-inactive':'btn-active'}`} onClick={() => handleRightBase(hideRightBase)}/>
            </div>
            </header>
        </section>
    )
}

export default TodoApp
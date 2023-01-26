import './style/TodoApp.css'
import { AppContext } from '../pages/App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faCube, faUserGroup} from '@fortawesome/free-solid-svg-icons'
import { Base } from './Base'
import { useContext, createContext, useState } from 'react'
// import { ItemData } from '../pages/App'
import { useSelector } from 'react-redux'

export const HideBase = createContext()
// export function TodoApp({room}) {
//     const [hideRightBase, setHideRightBase] = useState(true)
//     const [hideLeftBase, setHideLeftBase] = useState(true)
//     function handleRightBase(boolean) {
//         setHideRightBase(!boolean)
//         setHideLeftBase(true)
//     }
//     function handleLeftBase(boolean) {
//         setHideLeftBase(!boolean)
//         setHideRightBase(true)
//     }
//     return (
//         <HideBase.Provider value={{hideRightBase, handleRightBase, hideLeftBase, handleLeftBase}}>
//             <div id='todoApp'>
//                 <NavTop/>
//                 <Base room={room}/>
//             </div>
//         </HideBase.Provider>
//     )
// } 
export function TodoApp() {
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
                <Base/>
            </div>
        </HideBase.Provider>
    )
} 
// export function NavTop() {
//     const {hideRightBase, handleRightBase, hideLeftBase, handleLeftBase} = useContext(HideBase)
//     const {hideNavbar, handleNavbar, currentRoom, navTopRef} = useContext(GuildContext)
//     const {item} = useContext(ItemData)
//     return (
//         <section id='navTop'>
//             <header ref={navTopRef}>
//             <div className='header-left'>
//                 <FontAwesomeIcon icon={faBars} className={`bars pointer ${hideNavbar?'btn-inactive':'btn-active'}`} onClick={() => handleNavbar(hideNavbar)}/>
//                 <h4 className='pageTitle'>{currentRoom}</h4>
//             </div>
//             <div className="sidebar-button">
//                 <FontAwesomeIcon icon={item?faCube:faChartSimple} className={`btn-sidebar btn-sidebar-left pointer  ${hideLeftBase?'btn-inactive':'btn-active'}`} onClick={() => handleLeftBase(hideLeftBase)}/>
//                 <FontAwesomeIcon icon={item?faMessage:faUserGroup} className={`btn-sidebar btn-sidebar-right pointer ${hideRightBase?'btn-inactive':'btn-active'}`} onClick={() => handleRightBase(hideRightBase)}/>
//             </div>
//             </header> 
//         </section>
//     )
// }
function NavTop() {
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const { hideRightBase, handleRightBase, handleLeftBase, hideLeftBase } = useContext(HideBase)
    const { navTopRef, hideNavbar, handleNavbar} = useContext(AppContext)
    function handleClickNavbar() {
        handleNavbar(hideNavbar)
    }
    function left() {
        handleLeftBase(hideLeftBase)
    }
    function right() {
        handleRightBase(hideRightBase)
    }
    return (
        <section id='navTop'>
            <header ref={navTopRef}>
            <div className='header-left'>
                <FontAwesomeIcon icon={faBars} className={`bars pointer ${hideNavbar?'btn-inactive':'btn-active'}`} onClick={handleClickNavbar}/>
                <h4 className='pageTitle'>{pathPageOfBook}</h4>
            </div>
            <div className="sidebar-button">
                <FontAwesomeIcon icon={faCube} className={`btn-sidebar btn-sidebar-left pointer ${hideLeftBase?'btn-inactive':'btn-active'}`} onClick={left}/>
                <FontAwesomeIcon icon={faUserGroup} className={`btn-sidebar btn-sidebar-right pointer ${hideRightBase?'btn-inactive':'btn-active'}`} onClick={right}/>
            </div>
            </header> 
        </section>
    )
}

export default TodoApp
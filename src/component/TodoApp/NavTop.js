import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faCube, faUserGroup} from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../pages/App'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { HideBase } from './TodoApp'

export function NavTop() {
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const { hideRightBase, handleRightBase, handleLeftBase, hideLeftBase } = useContext(HideBase)
    const { hideNavbar, handleNavbar} = useContext(AppContext)
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
            <header className='d-flex ai-center ac-center jc-space-between p-fixed'>
            <div className='header-left d-flex'>
                <FontAwesomeIcon icon={faBars} className={`bars pointer ${hideNavbar?'btn-inactive':'btn-active'}`} onClick={handleClickNavbar}/>
                <h4 className='of-hidden'>{pathPageOfBook}</h4>
            </div>
            <div className="sidebar-button d-flex ai-center">
                <FontAwesomeIcon icon={faCube} className={`btn-sidebar btn-sidebar-left pointer ${hideLeftBase?'btn-inactive':'btn-active'}`} onClick={left}/>
                <FontAwesomeIcon icon={faUserGroup} className={`btn-sidebar btn-sidebar-right pointer ${hideRightBase?'btn-inactive':'btn-active'}`} onClick={right}/>
            </div>
            </header> 
        </section>
    )
}
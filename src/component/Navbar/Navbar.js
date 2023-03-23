import { AppContext } from '../../pages/App'
import { useContext } from 'react'

import { HomeButton } from './HomeButton'
import { BookList } from './Book/BookList'
import { ModeNavbar } from './SecondNavbar/ModeNavbar'
import { FindAndCreateBook } from './FindAndCreate/FindAndCreateBook'

function Navbar() {
    const {hideNavbar, navRef} = useContext(AppContext)
    return (
        <>
        <div className={`navigation_block p-fixed ${hideNavbar?'inactive':'active'}`}/>
        <div className={`navigation d-flex fd-row p-fixed ${hideNavbar?'hideNavbar':'showNavbar'}`}>
            <nav className='d-flex fw-wrap jc-center' ref={navRef}>
                <div className='nav-1 d-flex fd-column'>
                    <HomeButton/>
                    <BookList/>
                    <FindAndCreateBook/>
                </div>
            </nav>
            <ModeNavbar/>
        </div>
        </>
    )
}

export default Navbar
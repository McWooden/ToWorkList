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
        <div className={`navigation_block zi-2 p-fixed ${hideNavbar?'inactive':'active'}`}/>
        <div className={`navigation zi-2 d-flex fd-row p-fixed ${hideNavbar?'hideNavbar':'showNavbar'}`}>
            <nav className='d-flex fw-wrap jc-center d-flex fd-column bg-secondary ai-center' ref={navRef}>
                <HomeButton/>
                <hr className='hr-w-75'/>
                <BookList/>
                <hr className='hr-w-75'/>
                <FindAndCreateBook/>
            </nav>
            <ModeNavbar/>
        </div>
        </>
    )
}

export default Navbar
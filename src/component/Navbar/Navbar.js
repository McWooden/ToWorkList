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
        <div className={`navigation_block ${hideNavbar?'inactive':'active'}`}/>
        <div className={`navigation ${hideNavbar?'hideNavbar':'showNavbar'}`}>
            <nav ref={navRef}>
                <div className='nav-1'>
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
import { reverseNavbar } from '../../redux/hideAndShowSlice'
import { HomeButton } from './HomeButton'
import { BookList } from './Book/BookList'
import { ModeNavbar } from './SecondNavbar/ModeNavbar'
import { FindAndCreateBook } from './FindAndCreate/FindAndCreateBook'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { DailyTask } from './DailyTaskButton'

function Navbar() {
    const isNavbarShow = useSelector(state => state.show.navbar)
    const dispatch = useDispatch()
    return (
        <>
        <div className={`navigation_block zi-2 p-fixed ${isNavbarShow?'active':'inactive'}`} onClick={() => dispatch(reverseNavbar())}/>
        <div className={`navigation zi-2 d-flex fd-row p-fixed rounded ${isNavbarShow?'showNavbar':'hideNavbar'}`}>
            <nav className='d-flex fw-wrap jc-center d-flex fd-column ai-center bg-primary border-burlywood text-primary shadow-lg'>
                <HomeButton/>
                <BookList/>
                <DailyTask/>
                <FindAndCreateBook/>
            </nav>
            <ModeNavbar/>
        </div>
        </>
    )
}

export default Navbar
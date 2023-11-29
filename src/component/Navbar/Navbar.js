import { reverseNavbar } from '../../redux/hideAndShowSlice'
import { HomeButton } from './HomeButton'
import { BookList } from './Book/BookList'
import { ModeNavbar } from './SecondNavbar/ModeNavbar'
import { FindAndCreateBook } from './FindAndCreate/FindAndCreateBook'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { DailyTask } from './DailyTaskButton'
import MyBlock from '../../utils/MyBlock'
import { useSwipeable } from 'react-swipeable'

function Navbar() {
    const isNavbarShow = useSelector(state => state.show.navbar)
    const dispatch = useDispatch()
    const handlers = useSwipeable({
        onSwipedLeft: () => dispatch(reverseNavbar()),
        swipeDuration: 1000,
        delta: 250,
    })
    return (
        <div {...handlers}>
        <MyBlock active={isNavbarShow} cb={() => dispatch(reverseNavbar())} component={'nav'}/>
        <div className={`navigation zi-2 d-flex fd-row p-fixed rounded ${isNavbarShow?'showNavbar':'hideNavbar'}`}>
            <nav className='d-flex fw-wrap jc-center d-flex fd-column ai-center bg-primary border-burlywood text-primary shadow-lg'>
                <HomeButton/>
                <BookList/>
                <DailyTask/>
                <FindAndCreateBook/>
            </nav>
            <ModeNavbar/>
        </div>
        </div>
    )
}

export default Navbar
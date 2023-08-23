import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { setMembers, setPageType } from '../../redux/sourceSlice'
import { useDispatch } from 'react-redux'
import { setPathBook, setPathPageOfBook } from '../../redux/fetchSlice'

export function DailyTask() {
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setPageType('dailyTask'))
        dispatch(setPathBook({path: '@me', id: '@me'}))
        dispatch(setPathPageOfBook({path: '', id: ''}))
        dispatch(setMembers(null))
    }
    return (
        <div className='nav-icon-frame of-hidden jc-center d-flex' onClick={handleClick}>
            <div className={`nav-icon jc-center ai-center d-flex pointer bg-burlywood`}>
                <FontAwesomeIcon icon={faCalendarCheck}/>
            </div>
        </div>
    )
}
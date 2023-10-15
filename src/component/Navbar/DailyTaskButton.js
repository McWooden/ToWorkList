import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { setIsAdmin, setMembers, setPageType, setSource } from '../../redux/sourceSlice'
import { useDispatch } from 'react-redux'
import { setFetch } from '../../redux/fetchSlice'

export function DailyTask() {
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setPageType('dailyTask'))
        dispatch(setFetch({path: '@me', id: '@me', pathPage: 'Global DailyTask'}))
        dispatch(setMembers(null))
        dispatch(setSource(null))
        dispatch(setIsAdmin())
    }
    return (
        <div className='nav-icon-frame of-hidden jc-center d-flex' onClick={handleClick}>
            <div className={`nav-icon jc-center ai-center d-flex pointer bg-burlywood`}>
                <FontAwesomeIcon icon={faCalendarCheck}/>
            </div>
        </div>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { setPageType, setMembers } from '../../redux/sourceSlice'
import { setPathBook, setPathPageOfBook } from '../../redux/fetchSlice'

export function HomeButton() {
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setPathBook({path: '@me', id: '@me'}))
        dispatch(setPathPageOfBook({path: '', id: ''}))
        dispatch(setMembers(null))
    }
    return (
        <div className='nav-icon-frame of-hidden jc-center d-flex' onClick={handleClick}>
            <div className={`nav-icon jc-center ai-center d-flex pointer bg-burlywood`}>
                <FontAwesomeIcon icon={faHouse}/>
            </div>
        </div>
    )
}
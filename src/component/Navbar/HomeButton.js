import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { setPageType, setMembers, setSource, setIsAdmin } from '../../redux/sourceSlice'
import { setFetch } from '../../redux/fetchSlice'

export function HomeButton() {
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setFetch({path: '@me', id: '@me'}))
        dispatch(setSource(null))
        dispatch(setMembers(null))
        dispatch(setIsAdmin())
    }
    return (
        <div className='nav-icon-frame of-hidden jc-center d-flex' onClick={handleClick}>
            <div className={`nav-icon jc-center ai-center d-flex pointer bg-burlywood`}>
                <FontAwesomeIcon icon={faHouse}/>
            </div>
        </div>
    )
}
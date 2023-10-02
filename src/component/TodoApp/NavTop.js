import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faCube, faUserGroup} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { reverseLeftSide, reverseNavbar, reverseRightSide } from '../../redux/hideAndShowSlice'

export function NavTop() {
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const source = useSelector(state => state.source.source)
    const dispatch = useDispatch()
    function handleClickNavbar() {
        dispatch(reverseNavbar())
    }
    function left() {
        dispatch(reverseLeftSide())
    }
    function right() {
        dispatch(reverseRightSide())
    }
    return (
        <section id='navTop'>
            <header className='zi-1 d-flex ai-center jc-space-between p-fixed bg-burlywood text-primary'>
            <div className='header-left d-flex pointer' onClick={handleClickNavbar}>
                <FontAwesomeIcon icon={faBars} className='bars'/>
                <h4 className='of-hidden'>{source?.detils?.page_title||pathPageOfBook}</h4>
            </div>
            <div className="sidebar-button d-flex ai-center">
                <FontAwesomeIcon icon={faCube} className='btn-sidebar btn-sidebar-left pointer' onClick={left}/>
                <FontAwesomeIcon icon={faUserGroup} className='btn-sidebar btn-sidebar-right pointer' onClick={right}/>
            </div>
            </header> 
        </section>
    )
}
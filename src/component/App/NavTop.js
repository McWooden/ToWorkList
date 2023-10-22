import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faSquareCaretLeft, faSquareCaretRight} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { reverseLeftSide, reverseNavbar, reverseRightSide } from '../../redux/hideAndShowSlice'
import AnimatePing from '../../utils/AnimatePing'

export function NavTop() {
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const source = useSelector(state => state.source.source)
    const disableIconLeft = useSelector(state => state.show.disableIconLeft)
    const disableIconRight = useSelector(state => state.show.disableIconRight)
    const dispatch = useDispatch()
    const guestMode = useSelector(state => state.source.guestMode)
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
        <section id='navTop' className='relative z-[3]'>
            <header className='zi-1 d-flex ai-center jc-space-between p-fixed bg-burlywood text-primary' id='navigasiTop'>
            <div className='header-left d-flex pointer' onClick={handleClickNavbar}>
                <div className='relative flex items-center'>
                    {guestMode && <AnimatePing className={'absolute top-0 right-0 mt-0.5 mr-2.5'}/>}
                    <FontAwesomeIcon icon={faBars} className='bars'/>
                </div>
                <h4 className='of-hidden text-shadow'>{source?.details?.page_title||pathPageOfBook}</h4>
            </div>
            <div className="sidebar-button d-flex ai-center">
                {!disableIconLeft && <FontAwesomeIcon icon={faSquareCaretLeft} className='btn-sidebar btn-sidebar-left pointer' onClick={left}/>}
                {!disableIconRight && <FontAwesomeIcon icon={faSquareCaretRight} className='btn-sidebar btn-sidebar-right pointer' onClick={right}/>}
            </div>
            </header> 
        </section>
    )
}
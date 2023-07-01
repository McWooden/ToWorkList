import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from "react-redux"
import { setSource, setPageType } from "../../../redux/sourceSlice"
import { setPathPageOfBook } from "../../../redux/fetchSlice"
import * as fontawesome from '@fortawesome/free-solid-svg-icons'

export function PageListItem({data}) {
    const title = data.details.page_title
    const icon = data.details.icon
    const id = data._id
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setSource(null))
        dispatch(setPageType(icon))
        dispatch(setPathPageOfBook({path: title, id}))
    }
    const active = pathPageOfBook === title
    return (
        <div className={`room d-flex ai-center p-relative pointer ${active?'active':''}`} onClick={handleClick}>
            <FontAwesomeIcon icon={fontawesome[icon]} className={`room d-flex ai-center p-relative pointer-icon ${active?'active':''}`}/> <span className={active?'active':''}>{title}</span>
        </div>
    )
}
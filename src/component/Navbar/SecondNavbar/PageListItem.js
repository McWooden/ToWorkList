import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from "react-redux"
import { setPageType, setSource } from "../../../redux/sourceSlice"
import { setPathPageOfBook } from "../../../redux/fetchSlice"
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { clearTodo } from '../../../redux/todo'

export function PageListItem({data}) {
    const title = data.details.page_title
    const icon = data.details.icon
    const id = data._id
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(clearTodo())
        dispatch(setPageType(icon))
        dispatch(setPathPageOfBook({path: title, id}))
        dispatch(setSource(null))
    }
    const active = pathPageOfBook === title
    return (
        <div className={`room d-flex ai-center p-relative pointer shadow bg-primary-bright first:rounded-t last:rounded-b ${active?'active':''} scale-fade-in`} onClick={handleClick}>
            <FontAwesomeIcon icon={fontawesome[icon]} className={`p-1 d-flex ai-center p-relative pointer-icon ${active?'active':''}`}/> <span className={active?'active':''}>{title}</span>
        </div>
    )
}
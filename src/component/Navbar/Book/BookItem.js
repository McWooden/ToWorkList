import { useDispatch, useSelector } from "react-redux"
import { setPageType, setMembers, setGuildProfile } from "../../../redux/sourceSlice"
import { setFetch } from "../../../redux/fetchSlice"
import { url } from "../../../utils/variableGlobal"
import { clearTodo } from "../../../redux/todo"

export function BookItem({data}) {
    const idBook = useSelector(state => state.fetch.idBook)
    const dispatch = useDispatch()
    
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setFetch({path: data.profile.book_title, id: data._id}))
        dispatch(setGuildProfile(data.profile))
        dispatch(setMembers(null))
        dispatch(clearTodo())
    }
    return (
        <div onClick={handleClick} className={`guild-frame pointer ${idBook===data._id ? 'active' : ''}`}>
            <img src={`${url}/${data.profile.avatar_url}`} className='guild-photo-profile d-flex jc-center ai-center shadow-lg' alt={data.profile.book_title} title={data.profile.book_title}/>
        </div>
    )
}
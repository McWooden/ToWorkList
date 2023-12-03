import { useDispatch, useSelector } from "react-redux"
import { setPageType, setMembers, setGuildProfile, setPages, setSource } from "../../../redux/sourceSlice"
import { setFetch } from "../../../redux/fetchSlice"
import { url } from "../../../utils/variableGlobal"
import { clearTodo } from "../../../redux/todo"
import { useNavigate } from "react-router-dom"

export function BookItem({data}) {
    const idBook = useSelector(state => state.fetch.idBook)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setFetch({path: data.profile.book_title, id: data._id, pathPage: data.page?.detail?.page_title, idPage: data.page?._id}))
        dispatch(setPageType(data.page.detail.icon))
        dispatch(setGuildProfile({...data.profile, _id: data._id, isAdmin: data.isAdmin}))
        dispatch(setMembers(null))
        dispatch(setPages(null))
        navigate('/')
        dispatch(setSource(null))
        dispatch(clearTodo())
    }
    return (
        <div onClick={handleClick} className={`guild-frame pointer ${idBook===data._id ? 'active' : ''} scale-fade-in`}>
            <img src={`${url}/${data.profile.avatar_url}`} className='guild-photo-profile d-flex jc-center ai-center shadow' alt={data.profile.book_title} title={data.profile.book_title} loading="lazy"/>
        </div>
    )
}
import { useDispatch, useSelector } from "react-redux"
import { setPageType, setMembers, setGuildProfile, setPages } from "../../../redux/sourceSlice"
import { setFetch } from "../../../redux/fetchSlice"
import { url } from "../../../utils/variableGlobal"
import { clearTodo } from "../../../redux/todo"
import { useEffect } from "react"

export function BookItem({data}) {
    const idBook = useSelector(state => state.fetch.idBook)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(data);
    },[data])
    
    function handleClick() {
        dispatch(setPageType('welcome'))
        dispatch(setFetch({path: data.profile.book_title, id: data._id, pathPage: data.page?.detail?.page_title, idPage: data.page?._id}))
        dispatch(setPageType(data.page.detail.icon))
        dispatch(setGuildProfile({...data.profile, _id: data._id, isAdmin: data.isAdmin}))
        dispatch(setMembers(null))
        dispatch(setPages(null))
        dispatch(clearTodo())
    }
    return (
        <div onClick={handleClick} className={`guild-frame pointer ${idBook===data._id ? 'active' : ''}`}>
            <img src={`${url}/${data.profile.avatar_url}`} className='guild-photo-profile d-flex jc-center ai-center shadow' alt={data.profile.book_title} title={data.profile.book_title}/>
        </div>
    )
}
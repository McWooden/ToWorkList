import { useSelector, useDispatch } from "react-redux"
import { useContext, useEffect, useState } from "react"
import { HideBase } from '../TodoApp/TodoApp'
import axios from "axios"
import { API } from "../../utils/variableGlobal"
import { setTodo } from "../../redux/todo"
import { MoreInfoCard } from "./BaseLeft/MoreInfoCard"
import { DetailLeftAction } from "./BaseLeft/DetailLeftAction"
import { CardImages } from "./Image/CardImages"
import { Notes } from "./Note/Notes"
import { NoteEditor } from "./Note/NoteEditor"
import { CenterActionButton } from "./BaseCenter/CenterActionButton"
import { AddNoteModal } from "./Note/AddNoteModal"
import { SidebarRightChat } from "./BaseRight/SidebarRightChat"


export function TodoDetail() {
    const todoId = useSelector(state => state.todo.id)
    const todoDetails = useSelector(state => state.todo.details)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()
    const { hideLeftBase } = useContext(HideBase)
    const [modalOpen, setModalOpen] = useState(false)
    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`${API}/source/list/${idPageOfBook}/${todoId}`)
            dispatch(setTodo(data))
        }
        fetchData()
        const interval = setInterval(fetchData, 20000)
        return () => clearInterval(interval)
    }, [idPageOfBook, todoId, dispatch])
    return (
        <>
        {/* left */}
            <div className={`base-left ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
                <div className="sidebar-left">
                    <MoreInfoCard/>
                    <DetailLeftAction/>
                </div>
            </div>
        {/* center */}
            <div className='base-center'>
                <div className='center'>
                    <DetailCard/>                    
                    <AddNoteModal modalOpen={modalOpen} title={todoDetails.item_title} handleModalClose={handleModalClose}/>
                    <CenterActionButton handleModalOpen={handleModalOpen}/>
                </div>
            </div>
        {/* right */}
            <SidebarRightChat/>
        </>
    )
}
function DetailCard() {
    const todo = useSelector(state => state.todo)
    return(
        <>
        <div className='detail-desc'>
            <div className="color" style={{backgroundColor: todo.details.color}}></div>
            <div className='detail-desc-context'>
                <p>{todo.details.desc}</p>
                <CardImages/>
            </div>
        </div>
        <NoteEditor/>
        <Notes/>
        </>
    )
}
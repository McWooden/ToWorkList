import { useSelector, useDispatch } from "react-redux"
import { useContext, useEffect, useState } from "react"
import { HideBase } from '../TodoApp/TodoApp'
import axios from "axios"
import { API } from "../../utils/variableGlobal"
import { setTodo } from "../../redux/todo"
import { MoreInfoCard } from "./BaseLeft/MoreInfoCard"
import { DetailLeftAction } from "./BaseLeft/DetailLeftAction"
import { CenterActionButton } from "./BaseCenter/CenterActionButton"
import { AddNoteModal } from "./Note/AddNoteModal"
import { SidebarRightChat } from "./BaseRight/SidebarRightChat"
import { DetailCard } from "./BaseCenter/DetailCard"


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
        // const interval = setInterval(fetchData, 20000)
        // return () => clearInterval(interval)
    }, [idPageOfBook, todoId, dispatch])
    return (
        <>
        {/* left */}
            <div className={`base-left of-auto zi-1 flex-1 ${hideLeftBase?'base-left-hide':'base-left-show'} fd-column d-flex`}>
                <div className="sidebar-left fd-column d-flex">
                    <MoreInfoCard/>
                    <DetailLeftAction/>
                </div>
            </div>
        {/* center */}
            <div className='base-center p-relative of-auto'>
                <div className='center d-flex p-relative fd-column'>
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

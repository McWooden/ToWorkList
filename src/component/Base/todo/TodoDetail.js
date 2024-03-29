import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { API } from "../../../utils/variableGlobal"
import { setTodo } from "../../../redux/todo"
import { MoreInfoCard } from "../BaseLeft/MoreInfoCard"
import { DetailLeftAction } from "../BaseLeft/DetailLeftAction"
import { CenterActionButton } from "../BaseCenter/CenterActionButton"
import { AddNoteModal } from "../Note/AddNoteModal"
import { SidebarRightChat } from "../BaseRight/SidebarRightChat"
import { DetailCard } from "../BaseCenter/DetailCard"
import { Center } from '../BaseComponent'
import { Left } from '../BaseComponent'

export function TodoDetail() {
    const todoId = useSelector(state => state.todo.id)
    const todoDetails = useSelector(state => state.todo.details)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.source.isAdmin)
    const [modalOpen, setModalOpen] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)

    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
    const fetchData = useCallback(async() => {
        const {data} = await axios.get(`${API}/source/list/${idPageOfBook}/${todoId}`)
        dispatch(setTodo(data))
        setShouldUpdate(false)
    }, [dispatch, idPageOfBook, todoId])
    const channel = useSelector(state => state.channel.book)
    useEffect(() => {
        if (!todoDetails) fetchData()
        channel.on('broadcast', { event: `${idPageOfBook}/${todoId}:notesUpdate` }, payload => {
            console.log(payload);
            setShouldUpdate(payload.payload.message)
        })
    }, [channel, dispatch, fetchData, idPageOfBook, todoDetails, todoId])
    
    return (
        <>
        {/* left */}
        <Left>
            <div className="sidebar-left fd-column d-flex">
                <MoreInfoCard/>
                <DetailLeftAction/>
            </div>
        </Left>
        {/* center */}
            <Center>
                <div className='center d-flex p-relative fd-column'>
                {!isAdmin && <p className='text-whitesmoke text-xs text-center px-2 bg-primary-dark-25 p-1'>Hanya Admin yang dapat mengedit</p>}
                    {shouldUpdate && 
                        <div className="p-[15px] bg-info flex justify-center items-center gap-x-2 text-xs rounded m-2 pointer sticky top-1 bg-info" onClick={fetchData}>
                            <FontAwesomeIcon icon={faRotateRight}/>
                            <p>{shouldUpdate}</p>
                        </div>
                    }
                    <DetailCard/>                    
                    <AddNoteModal modalOpen={modalOpen} title={todoDetails.item_title} handleModalClose={handleModalClose}/>
                    <CenterActionButton handleModalOpen={handleModalOpen}/>
                </div>
            </Center>
        {/* right */}
            <SidebarRightChat/>
        </>
    )
}

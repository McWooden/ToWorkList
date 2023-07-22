import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import { useContext, useEffect, useState, useCallback } from "react"
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
import supabase from "../../utils/supabase"
import { setChannelTodoDetail } from '../../redux/channelReducer'

export function TodoDetail() {
    const todoId = useSelector(state => state.todo.id)
    const todoDetails = useSelector(state => state.todo.details)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()
    const { hideLeftBase } = useContext(HideBase)
    const [modalOpen, setModalOpen] = useState(false)
    const myNickname = useSelector(state => state.source.profile.nicname)
    const [shouldUpdate, setShouldUpdate] = useState(false)

    const channelTodoDetail = useSelector(state => state.channel.todoDetail)

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
      },
      [dispatch, idPageOfBook, todoId],
    )
    useEffect(() => {
        fetchData()
        dispatch(setChannelTodoDetail(supabase.channel(`${idPageOfBook}/${todoId}`)))
        return () => dispatch(setChannelTodoDetail(null))
    }, [dispatch, fetchData, idPageOfBook, todoId])

    useEffect(() => {
        channelTodoDetail.on({ event: 'shouldUpdate' }, payload => setShouldUpdate(payload.payload)).subscribe()
    },[channelTodoDetail])

    useEffect(() => {
        const channel = supabase.channel(`${idPageOfBook}/${todoId}`)
        channel.on('broadcast', {event: 'shouldUpdate'}, (cb) => {
            setShouldUpdate(cb.payload)
        })
        channel.subscribe()
      
        return () => {
          channel.unsubscribe()
        }
      }, [idPageOfBook, myNickname, shouldUpdate, todoId])
    
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
                    {shouldUpdate && 
                        <div className="h-[45px] bg-sky-500 flex justify-center items-center flex-col text-zinc-900 rounded m-2 gap-2 pointer sticky top-1" onClick={fetchData}>
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon icon={faRotateRight}/>
                                <p>perbarui</p>
                            </div>
                            <p className='text-xm'>({shouldUpdate})</p>
                        </div>
                    }
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

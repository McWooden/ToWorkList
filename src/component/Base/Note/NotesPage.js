import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faRotateRight, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { TodoRight } from "../todo/todoRight"
import { Left, Center } from "../BaseComponent"
import { Greeting } from "../../../utils/greeting"
import Calendar from 'react-calendar';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { setAddAndEdit } from "../../../redux/addAndEditForGlobalStore"
import { useEffect } from "react"
import { useState } from "react"
import { useCallback } from 'react'
import axios from 'axios'
import { setPageType, setSource } from '../../../redux/sourceSlice'
import { API } from '../../../utils/variableGlobal'
import MyLoading from '../../../utils/myLoading'
import Notes from './Notes'
import { NoteEditor } from './NoteEditor'
import InfoMenu from '../BaseLeft/InfoMenu'

export default function NotesPage() {
    return (
        <>
        <NoteLeft/>
        <NoteCenter/>
        <TodoRight/>
        </>
    )
}

function NoteLeft() {
    const noteList = useSelector(state => state.source?.source?.noteList)
    return (
        <Left>
            <div className="p-2 flex flex-col gap-3">
                <Greeting/>
                <Calendar 
                    className="calendar-dark" 
                    locale='id-ID'
                    next2Label={null}
                    prev2Label={null}
                />
                <div>
                    <InfoMenu icon={faNoteSticky} count={noteList?.length || 0}/>
                </div>
            </div>
        </Left>
    )
}

function NoteCenter() {
    const isAdmin = useSelector(state => state.source.isAdmin)
    const dispatch = useDispatch()

    
    return (
        <Center className="of-auto flex flex-col">
            {!isAdmin && <p className='text-whitesmoke text-xs text-center px-2 bg-primary-dark-25 p-1'>Hanya Admin yang dapat mengedit</p>}
            <div className="p-2 flex flex-col flex-1 gap-2">
                <div className="flex-1 flex">
                    <NoteContainer/>
                </div>
                <div className={`center-action-btn d-flex ai-center jc-flex-end as-flex-end text-primary w-full`}>
                    <div className='flex-1'>
                        {isAdmin &&
                            <div className='flex flex-1 justify-end'>
                                <div className="action-add">
                                    <FontAwesomeIcon icon={faAdd} className='add-btn pointer bg-burlywood' onClick={() => dispatch(setAddAndEdit({type: 'ADD_NOTE'}))}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Center>   
    )
}

function NoteContainer() {
    const [isLoading, setIsLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const source = useSelector(state => state.source.source)
    const dispatch = useDispatch()
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const channel = useSelector(state => state.channel.book)
    const fetchData = useCallback(async() => {
        setIsLoading(true)
        try {
            setShouldUpdate(false)
            const {data} = await axios.get(`${API}/source/page/${idPageOfBook}`)
            dispatch(setPageType(data.details.icon))
            dispatch(setSource(data))
        } catch (error) {}
        setIsLoading(false)
      },
      [dispatch, idPageOfBook],
    )
    useEffect(() => {
        channel.on('broadcast', {event: `${idPageOfBook}:shouldUpdate`}, payload => {
          setShouldUpdate(payload.payload)
        })
      }, [channel, dispatch, idPageOfBook])
    useEffect(() => {
        if (!source) fetchData()
      }, [fetchData, source])
    return (
        <div className='flex-1 flex-col flex'>
            {shouldUpdate && 
                <div className="p-[15px] flex justify-center items-center gap-x-2 text-xs rounded m-2 pointer sticky top-1 bg-info" onClick={fetchData}>
                    <FontAwesomeIcon icon={faRotateRight}/>
                    <p>{shouldUpdate}</p>
                </div>
            }
            {isLoading && <MyLoading/>}
            <NoteEditor/>
            <Notes/>
        </div>
    )
}
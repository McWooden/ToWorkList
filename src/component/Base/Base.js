
import { useSelector } from 'react-redux'
import { Welcome } from '../Page/Welcome'
import { TodoDetail } from './todo/TodoDetail'
import { TodoPage } from './todo/TodoPage'
import { TodoRight } from './todo/todoRight'
import Summary from '../Page/summary'
import Email from '../Page/email'
import { DailyTask } from '../Page/DailyTask'
import Daily from './Daily/Daily'
import NotesPage from './Note/NotesPage'
import { useLocation } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import MyLoading from '../../utils/myLoading'
import axios from 'axios'
import { API } from '../../utils/variableGlobal'
import { setTodo } from '../../redux/todo'
import { setIsAdmin, setPageType, setSource } from '../../redux/sourceSlice'
import { useDispatch } from 'react-redux'

// const pages = useMemo(() => [
//     {
//         details: {
//             page_title: 'Ringkasan',
//             icon: 'faAddressBook',
//         }
//     },
//     {
//         details: {
//             page_title: 'Notifikasi',
//             icon: 'faBell',
//         }
//     },
//     {
//         details: {
//             page_title: 'Surat',
//             icon: 'faEnvelope',
//         }
//     },
//     {
//         details: {
//             page_title: 'Berita',
//             icon: 'faNewspaper',
//         }
//     }
// ], [])


export function Base() {
    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)
    const [isLink, setIsLink] = useState('')
    const dispatch = useDispatch()

    const location = useLocation()

    const fetchData = useCallback(async(short) => {
        await axios.get(API+`/short/${short}`)
        .then(res => {
            if (res.data.type === 'TODO') {
                dispatch(setTodo(res.data.data))
                dispatch(setPageType('faCheck'))
                setIsLink('')
            } else {
                dispatch(setSource(res.data.data))
                dispatch(setPageType(res.data.type))
                setIsLink('')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },[dispatch])

    useEffect(() => {
        const queryString = window.location.search
        const queryParams = new URLSearchParams(queryString)
        const paramValue = queryParams.get('src')

        if (paramValue) {
            dispatch(setIsAdmin(false))
            setIsLink(paramValue)
            fetchData(paramValue)
        }
    },[dispatch, fetchData, location])

    if (isLink) return (
        <div className='base of-hidden d-flex text-whitesmoke flex-col'>
            <p className='p-2 m-2 bg-burlywood rounded shadow text-primary'>Target: {isLink}</p>
            <MyLoading className='w-full'/>
        </div>
    )

    return (
        <div className='base of-hidden d-flex text-whitesmoke'>
            {todoId? <TodoDetail/> :
                (<>
                    {pageType === 'welcome' && <Welcome/>}
                    {pageType === 'dailyTask' && <DailyTask/>}
                    {pageType === 'faAddressBook' && <Summary/>}
                    {pageType === 'faCheck' && <><TodoPage/><TodoRight/></>}
                    {pageType === 'faEnvelope' && <Email/>}
                    {pageType === 'faChartBar' && <Daily/>}
                    {pageType === 'faNoteSticky' && <NotesPage/>}
                </>)
            }
        </div>
    )
}


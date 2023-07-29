import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Welcome } from '../Page/Welcome'
import { TodoDetail } from './TodoDetail';
import { TodoPage } from './TodoPage';
import { BaseRight } from './BaseRight';
import Summary from '../Page/summary';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { pageToast } from '../../utils/notif';
import { setChannel } from '../../redux/channelReducer';

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
    const nickname = useSelector(state => state.source.profile.nickname)
    const [shouldUpdate, setShouldUpdate] = useState(null)
    const idBook = useSelector((state) => state.fetch.idBook)
    const dispatch = useDispatch()

    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)
    useEffect(() => {
        if (!idBook || idBook === '@me') return
        const channel = supabase.channel(idBook)
        channel.on('broadcast', {event: 'pageShouldUpdate'}, payload => {
            setShouldUpdate(payload.payload)
            pageToast(payload.payload)
            console.log('ga manuk akal', payload.payload);
        }).subscribe(cb => {
            channel.send({type: 'broadcast', event: 'pageShouldUpdate', payload: `${nickname}`})
            console.log(cb)
        })
        dispatch(setChannel(channel))
        return () => channel.unsubscribe()
    },[dispatch, idBook, nickname])
    const updateClick = () => {
        console.log('updated')
    }

    return (
        <div className='base of-hidden d-flex'>
            {shouldUpdate && 
                        <div className="h-[45px] bg-sky-500 flex justify-center items-center gap-x-2 text-xs text-zinc-900 rounded m-2 pointer sticky top-1" onClick={updateClick}>
                            <FontAwesomeIcon icon={faRotateRight}/>
                            <p>{shouldUpdate}</p>
                        </div>
            }
            {todoId? <TodoDetail/> :
                (<>
                    {pageType === 'welcome' && <Welcome/>}
                    {pageType === 'faAddressBook' && <Summary/>}
                    {pageType === 'faCheck' && <><TodoPage/><BaseRight/></>}
                </>)
            }
        </div>
    )
}


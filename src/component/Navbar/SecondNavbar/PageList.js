import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { API } from "../../../utils/variableGlobal"
import { useState, useCallback, useEffect } from 'react'
import { PageListItem } from './PageListItem'
import supabase from '../../../utils/supabase'
import { pageToast } from '../../../utils/notif'
import { setChannel } from '../../../redux/channelReducer'

export function PageList() {
    const idBook = useSelector((state) => state.fetch.idBook)
    const [pages, setPages] = useState([])
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(null)
    const dispatch = useDispatch()
    const nickname = useSelector(state => state.source.profile.nickname)

    const fetchData = useCallback(async () => {
        setReloading(false)
        setLoading(true)
        try {
            const response = await axios.get(`${API}/book/${idBook}/get/pages/details`)
            setPages(
                response.data.pages.map((item, index) => (
                    <PageListItem key={index} data={item} />
                ))
            )
        } catch (error) {
            setReloading(true)
        }
        setLoading(false)
    }, [idBook])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])
    useEffect(() => {
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
    return (
        <div className="roomList of-auto">
            {reloading &&
                <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                </div>
            }
            {loading && 
                <div className="room d-flex ai-center p-relative pointer loading" />
            }
            {shouldUpdate && 
                        <div className="h-[45px] bg-sky-500 flex justify-center items-center gap-x-2 text-xs text-zinc-900 rounded m-2 pointer sticky top-1" onClick={fetchData}>
                            <FontAwesomeIcon icon={fontawesome.faRotateRight}/>
                            <p>{shouldUpdate}</p>
                        </div>
                }
            {pages}
        </div>
    )
}
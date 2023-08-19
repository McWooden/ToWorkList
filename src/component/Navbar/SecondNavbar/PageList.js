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
import { setPages, setUpdateGuildProfile } from '../../../redux/sourceSlice'

export function PageList() {
    const idBook = useSelector((state) => state.fetch.idBook)
    const [pagesElement, setPagesElement] = useState([])
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    const dispatch = useDispatch()
    const nickname = useSelector(state => state.source.profile.nickname)
    const pages = useSelector(state => state.source.pages)

    const fetchData = useCallback(async () => {
        setReloading(false)
        try {
            const response = await axios.get(`${API}/book/${idBook}/get/pages/details`).catch(err => {
                throw new Error(err)
            })
            dispatch(setPages(response.data.pages))
            
        } catch (error) {
            setLoading(false)
            setReloading(true)
        }
    }, [dispatch, idBook])

    useEffect(() => {
        setLoading(true)
        if (!pages) {
            fetchData()
        } else {
            setPagesElement(
                pages.map((item, index) => (
                    <PageListItem key={index} data={item} />
                ))
            )
        }
        setLoading(false)
    }, [dispatch, fetchData, pages])
    useEffect(() => {
        const channel = supabase.channel(idBook)
        channel.on('broadcast', {event: 'pageShouldUpdate'}, payload => {
            fetchData()
            pageToast(payload.payload)
        })
        channel.on('broadcast', {event: 'guildProfileShouldUpdate'}, payload => {
            dispatch(setUpdateGuildProfile(payload.payload))
        })
        channel.subscribe()
        dispatch(setChannel(channel))
        return () => channel.unsubscribe()
    },[dispatch, fetchData, idBook, nickname])
    return (
        <div className="roomList of-auto px-1">
            {reloading &&
                <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                </div>
            }
            {loading && 
                <div className="room d-flex ai-center p-relative pointer loading" />
            }
            {pagesElement}
        </div>
    )
}
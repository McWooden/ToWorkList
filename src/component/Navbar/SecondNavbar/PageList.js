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
import MyLoading from '../../../utils/myLoading'

export function PageList() {
    const idBook = useSelector(state => state.fetch.idBook)
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    const dispatch = useDispatch()
    const nickname = useSelector(state => state.source.profile.nickname)
    const pages = useSelector(state => state.source.pages)
    const [list, setList] = useState(pages)

    const handleSourceToListSorted = useCallback((dataToSort) => {
        const sortedList = dataToSort ? [...pages].sort((a, b) => a.order - b.order) : []
        setList(sortedList)
    }, [pages])

    useEffect(() => {
        handleSourceToListSorted(pages)
    }, [handleSourceToListSorted, pages])

    const fetchData = useCallback(async () => {
        setLoading(true)
        setReloading(false)
        try {
            const response = await axios.get(`${API}/book/${idBook}/get/pages/details`).catch(err => {
                throw new Error(err)
            })
            dispatch(setPages(response.data.pages))
        } catch (error) {
            setReloading(true)
        }
        setLoading(false)
    }, [dispatch, idBook])

    useEffect(() => {
        if (!pages) {
            fetchData()
        }
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
            {loading && <MyLoading/>}
            {list?.map((item, index) => (
                <PageListItem key={index} data={item} />
            ))}
        </div>
    )
}
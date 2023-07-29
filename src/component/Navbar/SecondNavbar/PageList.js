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
    const dispatch = useDispatch()

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
            if (payload.event === 'pageShouldUpdate') {
                fetchData()
                pageToast(payload.payload)
                console.log(payload)
            }
        })
        dispatch(setChannel(channel))
        return () => channel.unsubscribe()
    })
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
            {pages}
        </div>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { API } from "../../../utils/variableGlobal"
import { useState, useCallback, useEffect } from 'react'
import { PageListItem } from './PageListItem'

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

    if (reloading) {
        return (
            <div className="nav-guild">
                <div className="reload_btn-frame" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                </div>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="roomList">
                <div className="room loading" />
            </div>
        )
    }
    return (
        <div className="roomList">
            {pages}
        </div>
    )
}
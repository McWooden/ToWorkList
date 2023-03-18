import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { API } from '../../utils/variableGlobal'
import { BookCardItem } from './BookCardItem'

export function AllBookList() {
    const [globalBook, setGlobalBook] = useState(null)
    const [loading, setLoading] = useState(false)
    const [box, setBox] = useState([])
    const [reload, setReload] = useState(false)
    const dispatch = useDispatch()
    const fetchData = useCallback(async () => {
        setReload(false)
        setLoading(true)
        try {
            const response = await axios.get(`${API}/book`)
            setGlobalBook(response.data)
        } catch (err) {
            setReload(true)
        }
        setLoading(false)
    }, [])
    useEffect(() => {
        if (!globalBook) {
            fetchData()
        } else {
            let sessionBook = []
            globalBook.forEach((data, index) => {
                sessionBook.push(<BookCardItem data={data} key={index}/>)
            })
            setBox(sessionBook)
        }
    },[dispatch, fetchData, globalBook])
    if (reload) return (
        <div className="book_card_container">
            <div className="reload_btn-frame" onClick={fetchData}>
                <FontAwesomeIcon icon={fontawesome.faRotateBack} className='reload_btn'/>
            </div>
        </div>
    )
    if (loading) return (
        <div className="book_card_container">
            <div className="book_card loading"/>
            <div className="book_card loading"/>
        </div>
    )
    return (
        <div className="book_card_container">
            {box}
        </div>
    )
}
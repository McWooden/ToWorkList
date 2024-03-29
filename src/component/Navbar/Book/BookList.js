import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { setBooksProfile } from '../../../redux/sourceSlice'
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { API } from '../../../utils/variableGlobal'
import { BookItem } from './BookItem'

export function BookList() {
    const [allBook, setAllBook] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isReload, setReload] = useState(false)
    const dispatch = useDispatch()
    const booksProfile = useSelector(state => state.source.booksProfile)
    const myAccount = useSelector(state => state.source.profile)
    const fetchData = useCallback(async () => {
        setReload(false)
        if (!myAccount?._id) return dispatch(setBooksProfile([]))
        setIsLoading(true)
        try {
            const response = await axios.get(`${API}/book/${myAccount._id}`)
            dispatch(setBooksProfile(response.data))
        } catch (err) {
            setReload(true)
        }
        setIsLoading(false)
    }, [dispatch, myAccount])

    useEffect(() => {
        if (!booksProfile) {
            fetchData()
        } else {
            let sessionBook = []
            try {
                booksProfile?.forEach((item, index) => {
                    sessionBook.push(<BookItem key={index} data={item}/>)
                })
            } catch (error) {
                setReload(true)
            }
            setAllBook(sessionBook)
            setIsLoading(false)
        }
    }, [dispatch, booksProfile, fetchData])
    useEffect(() => {
    return () => {
        setBooksProfile(null)
    }
    }, [])
    return (
        <div className="nav-guild of-auto d-flex fd-column bg-primary-bright rounded shadow">
            {isReload && (
                <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className='reload_btn'/>
                </div>
            )}
            {isLoading && (
                <div className='guild-frame'>
                    <div className="loading guild-photo-profile d-flex jc-center ai-center"/>
                </div>
            )}
            {allBook}
        </div>
    )
}
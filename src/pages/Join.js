import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { alertToast, loadingToast } from '../utils/notif'
import { setFetch } from '../redux/fetchSlice'
import { useDispatch } from 'react-redux'
import { setBooksProfile, setGuildProfile, setMembers, setPageType } from '../redux/sourceSlice'
import {url, API} from '../utils/variableGlobal'
export default function Join(){
    const [data, setData] = useState(null)
    const [isReload, setIsReload] = useState(false)
    let [searchParams] = useSearchParams()
    const myAccount = useSelector(state => state.source.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const fetchData = useCallback(async () => {
        setIsReload(false)
        try {
            const response = await axios.get(`${API}/book/join/${searchParams.get('invite')}`)
            setData(response.data)
        } catch (err) {
            setIsReload(true)
        }
    },[searchParams])
    useEffect(() => {
        fetchData()
    }, [searchParams, fetchData])
    if (isReload) return (
        <div className="modal_container">
            <div className="modal_context">
                <h3>Bergabung</h3>
                <div className="reload_btn-frame" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className='reload_btn'/>
                </div>
            </div>
            <div className="navigate_to">
                    <div className="auth_btn" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={fontawesome.faChevronLeft}/>
                        <span>Kembali</span>
                    </div>
                </div>
        </div>
    )
    async function gabung() {
        const data = {
            nickname: myAccount.nickname,
            tag: myAccount.tag,
            avatar: myAccount.avatar,
            _id: myAccount._id
        }
        const promise = loadingToast('Bergabung...')
        try {
            const response = await axios.post(`${API}/book/join/${searchParams.get('invite')}`, data)
            dispatch(setPageType('welcome'))
            dispatch(setFetch({path: response.data.profile.book_title, id: response.data._id}))
            dispatch(setGuildProfile(response.data.profile))
            dispatch(setMembers(null))
            dispatch(setBooksProfile(null))
            navigate('/')
            toast.dismiss(promise)
        } catch (error) {
            toast.dismiss(promise)
            alertToast('Gagal bergabung')
        }
    }
    if (!data) {
        return (
            <div className="modal_container">
                <div className="modal_context">
                    <h3>Bergabung</h3>
                    <div className='loading book_card'/>
                </div>
                <div className="navigate_to">
                    <div className="auth_btn" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={fontawesome.faChevronLeft}/>
                        <span>Kembali</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="modal_container">
            <div className="modal_context modal_context-transparent">
                <div className="book_card">
                    <div className="book_card-header">
                        <img src={`${url}/${data.profile.avatar_url}`} alt={data.profile.book_title} className='banner'/>
                    </div>
                    <div className="book_card-body">
                        <img src={`${url}/${data.profile.avatar_url}`} alt={data.profile.book_title} className='avatar'/>
                        <p className='title'>{data.profile.book_title}</p>
                        <p>{data.profile.desc}</p>
                        <p className='panjang_anggota'>{data.users_length} Anggota</p>
                    </div>
                    <div className='join_btn' onClick={gabung}>
                        <img src={myAccount.avatar} alt={myAccount.nickname} />
                        <span>
                            Bergabung
                            <FontAwesomeIcon icon={fontawesome.faChevronRight}/>
                        </span>
                    </div>
                </div>
                <div className="navigate_to">
                    <div className="auth_btn" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={fontawesome.faChevronLeft}/>
                        <span>Kembali</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
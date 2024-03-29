import { useState, useEffect, useCallback, useRef } from 'react'
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
import supabase from '../utils/supabase'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
export default function Join(){
    const [data, setData] = useState(null)
    let [searchParams] = useSearchParams()
    const myAccount = useSelector(state => state.source.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const channelRef = useRef(null)
    useEffect(() => {
        const channel = supabase.channel(searchParams.get('invite'))
        channel.subscribe()
        channelRef.current = channel
        return () => {
            channel.unsubscribe()
        }
    },[searchParams])
    
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`${API}/book/join/${searchParams.get('invite')}`)
            setData(response.data)
        } catch (err) {
        }
    },[searchParams])
    useEffect(() => {
        fetchData()
    }, [searchParams, fetchData])

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
            channelRef.current.send({
                type: 'broadcast',
                event: 'memberShouldUpdate',
                payload: `${myAccount.nickname} bergabung`
            })
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

    return (
        <div className="modal_container d-flex fc-column ai-center jc-center">
            <div className="modal_context d-flex fd-column modal_context-transparent">
                <div className="book_card of-hidden w-1/4 bg-primary border-burlywood shadow-lg text-whitesmoke">
                {data ?
                        <>
                        <div className="book_card of-hidden-header d-flex fd-column">
                            <img src={`${url}/${data.profile.avatar_url}`} alt={data.profile.book_title} className='banner h-32 object-cover'/>
                        </div>
                        <div className="book_card of-hidden-body p-relative d-flex fd-column p-relative d-flex fd-column p-5">
                            <img src={`${url}/${data.profile.avatar_url}`} alt={data.profile.book_title} className='avatar p-absolute'/>
                            <p className='title'>{data.profile.book_title}</p>
                            <div className='flex gap-4'>
                                <div className='flex-1 flex flex-col gap-2'>
                                    <p className='as-flex-end'>Dibuat sejak {format(new Date(data.profile.created_at), 'dd LLL yyyy', { locale: id })} oleh {data.profile.author.nickname}#{data.profile.author.tag}</p>
                                    <p className='as-flex-end'>{data.users_length} Anggota</p>
                                </div>
                                <div className='flex-2'>
                                    <p>{data.profile.desc}</p>
                                    {myAccount?
                                        <div className='join_btn d-flex jc-center ai-center mt-2 w-full pointer shadow-md text-primary bg-burlywood' onClick={gabung}>
                                            <img src={myAccount.avatar||''} alt={myAccount.nickname||''} referrerPolicy='no-referrer'/>
                                            <span className='d-flex ai-center jc-flex-end'>
                                                Bergabung
                                                <FontAwesomeIcon icon={fontawesome.faChevronRight}/>
                                            </span>
                                        </div>
                                    :
                                        <>
                                        <div className='join_btn d-flex jc-center ai-center mt-2 w-full pointer shadow-md text-primary bg-burlywood' onClick={() => navigate('/auth/login')}>
                                            <span>Login</span>
                                        </div>
                                        <span className='text-[0.5rem]'>Pengguna perlu masuk ke akun sebelum bergabung!</span>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        </>
                    :
                        <div className='flex flex-col p-2'>
                            <div className="reload_btn-frame pointer d-grid pi-center" onClick={fetchData}>
                                <FontAwesomeIcon icon={fontawesome.faRotateBack} className='reload_btn'/>
                            </div>
                            <p>Kode invite: {searchParams.get('invite') || '<Kosong>'}</p>
                        </div>
                }
                </div>
                {!searchParams.get('invite') && 
                    <div className='p-2 text-whitesmoke text-sm'>
                        <p>Pastikan kode invite tidak kosong</p>
                    </div>
                }
                <div className="navigate_to pointer">
                    <div className="auth_btn d-flex ai-center pointer bg-zinc-900 text-whitesmoke" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={fontawesome.faChevronLeft}/>
                        <span>Kembali</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
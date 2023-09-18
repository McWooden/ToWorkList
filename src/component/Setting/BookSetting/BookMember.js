import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertToast, blankToast, loadingToast } from '../../../utils/notif'
import { useCallback } from 'react'
import axios from 'axios'
import { setMembers } from '../../../redux/sourceSlice'
import { API } from '../../../utils/variableGlobal'
import { useRef } from 'react'
import { toast } from 'react-toastify'

export default function BookMember() {
    const [isLoading, setIsLoading] = useState(false)
    const members = useSelector(state => state.source.members)
    const idBook = useSelector(state => state.fetch.idBook)
    function handleEmpety() {
        setIsLoading(false)
    }
    const dispatch = useDispatch()
    const fetchData = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API}/book/${idBook}/get/users`)
            dispatch(setMembers(data.users))
        } catch (err) {
            handleEmpety()
        }
    } ,[dispatch, idBook])
    useEffect(() => {
        if (!members) {
            if (idBook === '@me') return handleEmpety()
            setIsLoading(true)
            fetchData()
            setIsLoading(false)
        }
    }, [idBook, members, dispatch, fetchData])
    function addToClip() {
        navigator.clipboard.writeText(`https://mcwooden.netlify.app/join?invite=${idBook}`)
        blankToast('Link tersalin di papan klip')
    }
    return (
        <>
        <div className="setting_header">
            <h3>Anggota</h3>
            <p>list manusia yang ada di sini</p>
        </div>
        <h6>Tambahkan Anggota</h6>
        <div className='h-[48px] bg-burlywood text-primary rounded flex items-center gap-x-2 px-4 py-2 mb-4 pointer' onClick={addToClip}>
            <FontAwesomeIcon icon={faLink}/>
            <p className='inline'>Bagikan tautan</p>
        </div>
        {isLoading && <div className="loading sidebar_right_loading d-grid pi-center"/>}
        <p>{members?.length || ''} peserta</p>
        {members?.map((user, index) => <MemberCard user={user} key={index}/>) || 'Empety'}
        </>
    )
}

function MemberCard({user}) {
    const idBook = useSelector(state => state.fetch.idBook)
    const isAdmin = useSelector(state => state.source.isAdmin)
    const [dropDown, setDropDown] = useState(false)
    let menuRef = useRef()
    let btnRef = useRef()
    const dispatch = useDispatch()
    
    useEffect(() => {
        let handler = (e) => {
            try {
                if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) {
                    return
                } else {
                    setDropDown(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener("mousedown", handler)
    })
    function showDropDown() {
        if (!isAdmin) return
        setDropDown(!dropDown)
    }
    async function reverseAdmin() {
        const promise = loadingToast(`${user.isAdmin?'Memberhentikan':'Menjadikan'} ${user.nickname} sebagai Admin`)
        console.log(user);
        try {
            await axios.get(API+`/book/reverseAdmin/${idBook}/${user._id}`).then(res => {
                dispatch(setMembers(res.data.users))
                console.log(res.data.users);
                toast.dismiss(promise)
            })
            .catch(err => {
                toast.dismiss(promise)
                throw new Error(err)
            })
        } catch (error) {
            alertToast(`Gagal ${user.isAdmin?'Memberhentikan':'Menjadikan'} Admin`)
        }
    }
    return (
        <div className='group-user pointer d-flex ai-center flex-row relative hover:bg-zinc-800'>
            <div ref={btnRef} className='flex-1 flex gap-2 items-center' onClick={showDropDown}>
                <img src={user.avatar} alt={user.nickname} />
                <div className="user-context flex-1">
                    <p>{user.nickname}</p>
                    <p className='user-status'>{user.status}</p>
                </div>
                <p className='rounded bg-ok text-whitesmoke px-2'>{user.isAdmin && 'Admin'}</p>
            </div>
            <div className={`card-drop-down zi-1 ${dropDown?'active':'inactive'}`} ref={menuRef}>
                <ul className='d-flex fd-column of-hidden p-absolute pointer'>
                    <li className='d-flex ai-center' onClick={reverseAdmin}>
                        <span>{user.isAdmin?'Berhentikan sebagai':'Jadikan sebagai'} Admin</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
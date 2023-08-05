import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blankToast } from '../../utils/notif'
import { useCallback } from 'react'
import axios from 'axios'
import { setMembers } from '../../redux/sourceSlice'
import { API } from '../../utils/variableGlobal'

export function SettingMember() {
    const [isLoading, setIsLoading] = useState(false)
    const members = useSelector(state => state.source.members)
    const idBook = useSelector(state => state.fetch.idBook)
    function handleEmpety() {
        setIsLoading(false)
        setBox('Empety')
    }
    const dispatch = useDispatch()
    const [box, setBox] = useState([])
    function dataToBox(data) {
        let sessionBox = []
        data.forEach((user, index) => {
            sessionBox.push(
                <div className='group-user pointer d-flex ai-center' key={`${user.nickname}-${index}`}>
                    <img src={user.avatar} alt={user.nickname} />
                    <div className="user-context">
                        <p>{user.nickname}</p>
                        <p className='user-status'>{user.status}</p>
                    </div>
                </div>
            )
        })
        setBox(sessionBox)
    }
    useEffect(() => {
        if (members) dataToBox(members)
    }, [idBook, members, dispatch])
    const fetchData = useCallback(async () => {
        try {
            const {data} = await axios.get(`${API}/book/${idBook}/get/users`)
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
        } else {
            try {
                dataToBox(members)
            } catch (error) {
                console.log(members)
                console.log(error)
            }
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
        <div className='h-[48px] bg-burlywood text-primary rounded flex items-center gap-x-2 px-4 py-2 mb-4' onClick={addToClip}>
            <FontAwesomeIcon icon={faLink}/>
            <p className='inline'>Bagikan tautan</p>
        </div>
        {isLoading && <div className="loading sidebar_right_loading d-grid pi-center"/>}
        <p>{members?.length || ''} peserta</p>
        {box}
        </>
    )
}
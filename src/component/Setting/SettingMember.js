import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setMembers } from '../../redux/sourceSlice'
import { API } from '../../utils/variableGlobal'

export function SettingMember() {
    const members = useSelector(state => state.source.members)
    const idBook = useSelector(state => state.fetch.idBook)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    function handleEmpety() {
        setIsLoading(false)
        setBox('Empety')
    }
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
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`${API}/book/${idBook}/get/users`)
                dispatch(setMembers(data.users))
            } catch (err) {
                handleEmpety()
            }
        }
        if (!members) {
            if (idBook === '@me') return handleEmpety()
            setIsLoading(true)
            fetchData()
            setIsLoading(false)
        } else {
            dataToBox(members)
        }
        const interval = setInterval(() => {
            if (idBook === '@me') return handleEmpety()
            fetchData()
        }, 60000)
        return () => clearInterval(interval)
    }, [idBook, members, dispatch])
    if (isLoading) return (
        <div className="base-right">
            <div className="sidebar-right">
                <div className="loading sidebar_right_loading"/>
            </div>
        </div>
    )
    return (
        <>
        <div className="setting_header">
            <h3>Anggota</h3>
            <p>list manusia yang ada di sini</p>
        </div>
        {box}
        </>
    )
}
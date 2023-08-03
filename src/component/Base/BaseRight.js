import { useState, useContext, useEffect, useCallback } from "react"
import { HideBase } from '../TodoApp/TodoApp'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { API } from "../../utils/variableGlobal"
import { setMembers } from "../../redux/sourceSlice"
import { memberToast } from "../../utils/notif"

export function BaseRight() {
    const [isLoading, setIsLoading] = useState(false)
    const { hideRightBase } = useContext(HideBase)
    const idBook = useSelector(state => state.fetch.idBook)
    const members = useSelector(state => state.source.members)
    const dispatch = useDispatch()
    const [box, setBox] = useState([])
    const channel = useSelector(state => state.channel.book)
    function handleEmpety() {
        setIsLoading(false)
        setBox('Empety')
    }
    function dataToBox(data) {
        let sessionBox = []
        data.forEach((user, index) => {
            sessionBox.push(
                <div className='group-user bg-primary shadow pointer d-flex ai-center' key={`${user.nickname}-${index}`}>
                    <img src={user.avatar} alt={user.nickname} />
                    <div className="d-flex fd-column">
                        <p>{user.nickname}</p>
                        <p className='user-status'>{user.status}</p>
                    </div>
                </div>
            )
        })
        setBox(sessionBox)
    }
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
        const interval = setInterval(() => {
            if (idBook === '@me') return handleEmpety()
            fetchData()
        }, 60000)
        return () => clearInterval(interval)
    }, [idBook, members, dispatch, fetchData])
    useEffect(() => {
        channel.on('broadcast', {event: 'memberShouldUpdate'}, payload => {
            fetchData()
            memberToast(payload.payload)
        })
    }, [channel, fetchData])
    return (
        <div className={`base-right of-auto ${hideRightBase?'base-right-hide':'base-right-show'} d-flex fd-column bg-indianred`}>
            <div className="sidebar-right d-flex fd-column of-auto">
                {isLoading && <div className="loading sidebar_right_loading d-grid pi-center"/>}
                {box}
            </div>
        </div>
    )
}

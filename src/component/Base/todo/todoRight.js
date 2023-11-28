import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateBack } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { API } from "../../../utils/variableGlobal"
import { setMembers } from "../../../redux/sourceSlice"
import { memberToast } from "../../../utils/notif"
import { Right } from "../BaseComponent"

export function TodoRight() {
    const [isLoading, setIsLoading] = useState(false)
    const idBook = useSelector(state => state.fetch.idBook)
    const members = useSelector(state => state.source.members)
    const [box, setBox] = useState([])
    const channel = useSelector(state => state.channel.book)
    const dispatch = useDispatch()
    const [isReload, setIsReload] = useState(false)
    function handleEmpety() {
        setIsLoading(false)
        setBox('Empety')
    }
    function dataToBox(data) {
        let sessionBox = []
        data.forEach((user, index) => {
            sessionBox.push(
                <div className='group-user bg-primary shadow pointer d-flex ai-center scale-fade-in' key={`${user.nickname}-${index}`}>
                    <img src={user.avatar} alt={user.nickname} referrerPolicy='no-referrer'/>
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
        setIsReload(false)
        try {
            const {data} = await axios.get(`${API}/book/${idBook}/get/users`)
            dispatch(setMembers(data.users))
        } catch (err) {
            setIsReload(true)
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
    useEffect(() => {
        channel.on('broadcast', {event: 'memberShouldUpdate'}, payload => {
            fetchData()
            memberToast(payload.payload)
        })
    }, [channel, fetchData])
    return (
        <Right>
            {isReload ? 
                <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
                <FontAwesomeIcon icon={faRotateBack} className="reload_btn" />
                </div>
            :
            <div className="sidebar-right d-flex fd-column of-auto">
                {isLoading && <div className="loading sidebar_right_loading d-grid pi-center"/>}
                {box}
            </div>
            }
        </Right>
    )
}

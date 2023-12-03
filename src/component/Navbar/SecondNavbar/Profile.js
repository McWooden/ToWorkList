import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat, faRightFromBracket, faGear, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"
import UserSetting from '../../Setting/UserSetting'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useDispatch } from 'react-redux'
import { url } from '../../../utils/variableGlobal'
import { setGuestMode, setProfie } from '../../../redux/sourceSlice'
import AnimatePing from '../../../utils/AnimatePing'

export function Profile() {
    const navigate = useNavigate()
    const profile = useSelector(state => state.source.profile)
    const [userPop, setUserPop] = useState(false)
    const userPopRef = useRef()
    const profileRef = useRef()
    const [openSetting, setOpenSetting] = useState(false)
    const dispatch = useDispatch()
    const guestMode = useSelector(state => state.source.guestMode)
    function handlePop() {
        setUserPop(!userPop)
    }
    useEffect(() => {
        if (!profile) {
            dispatch(setProfie({
                nickname: 'guest',
                avatar: url+`/default`,
                email: 'guest@example.com',
                created_at: new Date().toISOString(),
                tag: '12345',
            }))
            dispatch(setGuestMode(true))
        }
    }, [profile, dispatch])
    useEffect(() => {
        let handler = (e) => {
            try {
                if (userPopRef.current.contains(e.target) || profileRef.current.contains(e.target)) {
                    return
                } else {
                    setUserPop(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [profile, navigate]);
    function handleLogout() {
        localStorage.removeItem('account')        
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
    }
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setOpenSetting(false)
            }
        }
        if (openSetting) {
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [openSetting])
    return (
        <div className="profile-container">
            {profile && (
                <>
                <div key={userPop} className={`profile_pop bg-primary-bright d-flex fd-column p-fixed shadow-lg z-[2] ${userPop?'active':'inactive'} scale-fade-in`} ref={userPopRef}>
                    <div className='min-h-120px flex justify-end mx-3'>
                        <FontAwesomeIcon icon={faGear} className='settingNavbar pointer bg-primary-bright' onClick={() => setOpenSetting(true)}/>
                    </div>
                    <div className="profile_pop-body bg-primary-dark-50 p-3 pt-10 mx-3">
                        <a href={profile.avatar} target='_blank' rel="noreferrer" style={{width:'120px'}} className='absolute top-2 left-2'>
                            <img src={profile.avatar} alt={profile.nickname} className='border-primary-dark-50 w-20 h-20' referrerPolicy='no-referrer'/>
                        </a>
                        <div className="profile_pop-nickname">{profile.nickname}<span>#{profile.tag}</span></div>
                        <div className="profile_pop-created_at">
                            <p>Bergabung sejak</p>
                            <span>{profile.created_at && format(new Date(profile.created_at), 'EEEE, dd MMM yyyy', {locale: id})}</span>
                        </div>
                        <div className="relative profile_pop-btn d-flex ai-center pointer bg-primary-dark-25 shadow" onClick={() => navigate('/auth/login')}>
                            {guestMode?
                                <>
                                <AnimatePing className={'absolute top-0 right-0 -mt-1 -mr-1'}/>
                                <FontAwesomeIcon icon={faRightToBracket}/>
                                <span>Masuk</span>
                                </>
                                :
                                <>
                                <FontAwesomeIcon icon={faRepeat}/>
                                <span>Ganti akun</span>
                                </>
                            }
                        </div>
                        {!guestMode &&
                            <div className="profile_pop-btn d-flex ai-center pointer bg-primary-dark-25 shadow" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket}/>
                                <span>Keluar</span>
                            </div>
                        }
                    </div>
                </div>
                <div className='relative profile d-flex ai-center pointer bg-primary-bright shadow' ref={profileRef} onClick={handlePop}>
                    {guestMode && <AnimatePing className={'absolute top-0 right-0 -mt-1 -mr-1'}/>}
                    <img src={profile.avatar} alt={profile.nickname} className='w-[32px] h-[32px]' referrerPolicy='no-referrer'/>
                    <div className="profile-body">
                        <div className="profile-nickname">{profile.nickname}</div>
                        <div className="profile-id">#{profile.tag}</div>
                    </div>
                </div>
                </>
            )}
            <UserSetting open={openSetting} close={() => setOpenSetting(false)}/>
        </div>
    )
    
}

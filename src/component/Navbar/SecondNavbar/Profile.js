import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat, faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"
import UserSetting from '../../Setting/UserSetting'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export function Profile() {
    const navigate = useNavigate()
    const profile = useSelector(state => state.source.profile)
    const [userPop, setUserPop] = useState(false)
    const userPopRef = useRef()
    const profileRef = useRef()
    const [openSetting, setOpenSetting] = useState(false)
    function handlePop() {
        setUserPop(!userPop)
    }
    useEffect(() => {
        if (!profile) {
            navigate('/auth')
        }
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
                <div className={`profile_pop bg-primary-bright d-flex fd-column p-fixed shadow-lg ${userPop?'active':'inactive'}`} ref={userPopRef}>
                    <div className='min-h-120px flex justify-between'>
                        <a href={profile.avatar} target='_blank' rel="noreferrer" style={{width:'120px'}}>
                            <img src={profile.avatar} alt={profile.nickname}/>
                        </a>
                        <FontAwesomeIcon icon={faGear} className='settingNavbar pointer bg-primary-bright mr-[10px]' onClick={() => setOpenSetting(true)}/>
                    </div>
                    <div className="profile_pop-body bg-primary-dark-50">
                        <div className="profile_pop-nickname">{profile.nickname}<span>#{profile.tag}</span></div>
                        <div className="profile_pop-created_at">
                            <p>Bergabung sejak</p>
                            <span>{format(new Date(profile.created_at), 'EEEE, dd MMM yyyy', {locale: id})}</span>
                        </div>
                        <div className="profile_pop-btn d-flex ai-center pointer bg-primary-dark-25 shadow" onClick={() => navigate('/auth/login')}>
                            <FontAwesomeIcon icon={faRepeat}/>
                            <span>Ganti akun</span>
                        </div>
                        <div className="profile_pop-btn d-flex ai-center pointer bg-primary-dark-25 shadow" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                            <span>Keluar</span>
                        </div>
                    </div>
                </div>
                <div className='profile d-flex ai-center pointer bg-primary-bright shadow' ref={profileRef} onClick={handlePop}>
                    <img src={profile.avatar} alt={profile.nickname} className='w-[32px] h-[32px]'/>
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
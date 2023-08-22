import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRepeat, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { convertDateToString } from "../../../utils/convertDateFormat"

export function Profile() {
    const navigate = useNavigate()
    const profile = useSelector(state => state.source.profile)
    const [userPop, setUserPop] = useState(false)
    const userPopRef = useRef()
    const profileRef = useRef()
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
    return (
        <div className="profile-container">
            {profile && (
                <>
                <div className={`profile_pop d-flex fd-column p-fixed shadow ${userPop?'active':'inactive'}`} ref={userPopRef}>
                <a href={profile.avatar} target='_blank' rel="noreferrer" style={{width:'120px'}}>
                    <img src={profile.avatar} alt={profile.nickname}/>
                </a>
                    <div className="profile_pop-body">
                        <div className="profile_pop-nickname">{profile.nickname}<span>#{profile.tag}</span></div>
                        <div className="profile_pop-created_at">
                            <p>Bergabung sejak</p>
                            <span>{convertDateToString(profile.created_at)}</span>
                        </div>
                        <div className="profile_pop-btn d-flex ai-center pointer" onClick={() => navigate('/auth/login')}>
                            <FontAwesomeIcon icon={faRepeat}/>
                            <span>Ganti akun</span>
                        </div>
                        <div className="profile_pop-btn d-flex ai-center pointer" onClick={() => navigate('/auth/register')}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Tambah akun</span>
                        </div>
                        <div className="profile_pop-btn d-flex ai-center pointer" onClick={handleLogout}>
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
        </div>
    )
    
}
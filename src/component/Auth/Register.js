import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadingToast, accountToast } from '../../utils/notif'
import { toast } from 'react-toastify'
import { setLocalAccountWithoutEncrypt } from '../../utils/localstorage'
import { useDispatch } from 'react-redux'
import { setBooksProfile, refreshProfile, setGuestMode } from '../../redux/sourceSlice'
import { API } from '../../utils/variableGlobal'

export default function Register() {
    const [msg, setMsg] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <div className="auth d-flex ai-center jc-center flex-col gap-2">
                <div className="auth-context bg-burlywood text-primary">
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                        <div className="register d-flex jc-center ai-center fd-column">
                            <h4>Registrasi</h4>
                            <p className='msg_email_exist'>{msg}</p>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    setMsg(null)
                                    const promise = loadingToast('mencari akun dengan email yang sama')
                                    axios.post(`${API}/user`, {user: credentialResponse.credential})
                                    .then(res => {
                                        console.log(res);
                                        setLocalAccountWithoutEncrypt(res.data.account)
                                        dispatch(refreshProfile())
                                        dispatch(setBooksProfile(null))
                                        toast.dismiss(promise)
                                        accountToast('Berhasil membuat')
                                        navigate('/')
                                        toast.dismiss(promise)
                                        dispatch(setGuestMode(false))
                                    })
                                    .catch(err => {
                                        setMsg(err.response.data)
                                        toast.dismiss(promise)
                                        accountToast(err.response.data)
                                    })
                                }}
                                onError={() => {
                                    console.log('Login Failed')
                                }}
                                useOneTap
                                text='Sign up with Google'
                            />
                            <div className="navigate_to pointer">
                                <p>Sudah memiliki akun? <span onClick={() => navigate('/auth/login')}>login</span></p>
                            </div>
                            <div className="auth_btn d-flex ai-center pointer navigate_back w-full" onClick={() => navigate('/home')}>
                                <FontAwesomeIcon icon={faChevronLeft}/>
                                <span>Kembali</span>
                            </div>
                        </div>
                    </GoogleOAuthProvider>
                </div>
            </div>
        </>
    )
}
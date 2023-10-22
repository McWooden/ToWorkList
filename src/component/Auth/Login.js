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
import { setBooksProfile, refreshProfile, setPages, setGuildProfile, setPageType, setGuestMode } from '../../redux/sourceSlice'
import { setFetch, setPathBook, setPathPageOfBook } from '../../redux/fetchSlice'

const API = process.env.REACT_APP_API



export default function Login() {
    const [nickname, setNickname] = useState('')
    const [password, setPassowrd] = useState('')
    const [msg, setMsg] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleSuccess(response) {
        setMsg(null)
        const credential = response.credential
        const promise = loadingToast('Mendapatkan data akun')
        await axios.put(`${API}/user/login/google`, {credential})
        .then(res => {
            setLocalAccountWithoutEncrypt(res?.data?.account)
            dispatch(refreshProfile())
            dispatch(setBooksProfile(null))
            dispatch(setGuildProfile(null))
            dispatch(setPages(null))
            dispatch(setFetch({id: null, path: null}))
            dispatch(setPageType('welcome'))
            dispatch(setPathBook({path: '@me', id: '@me'}))
            dispatch(setPathPageOfBook({path: '', id: ''}))
            
            toast.dismiss(promise)
            accountToast('Berhasil masuk ke akun')
            navigate('/')
            dispatch(setGuestMode(false))
        })
        .catch(err => {
            toast.dismiss(promise)
            accountToast('Gagal mendapatkan akun :(')
            setMsg(err.response.data)
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        setMsg(null)
        const data = {
            nickname,
            password
        }
        const promise = loadingToast('Mendapatkan data akun')
        axios.put(`${API}/user/login/form`, data)
        .then((res) => {
            setLocalAccountWithoutEncrypt(res.data.account)
            dispatch(refreshProfile())
            toast.dismiss(promise)
            accountToast('Berhasil masuk ke akun')
            navigate('/')
            dispatch(setGuestMode(false))
        })
        .catch((err) => {
            setMsg(err.response.data)
            toast.dismiss(promise)
            accountToast('Gagal mendapatkan akun :(')
        })
    }
    return (
        <div className="auth d-flex ai-center jc-center">
            <div className="auth-context bg-burlywood text-primary">
                <h4>Login</h4>
                <form className='auth_form' onSubmit={handleSubmit}>
                    <p className='error_msg'>{msg}</p>
                    <label>
                        <span>Nickname</span>
                        <input className='d-block' type="text" value={nickname} onChange={event => setNickname(event.target.value)} placeholder='nickname'/>
                    </label>
                    <label>
                        <span>Password</span>
                        <input className='d-block' type="password" value={password} onChange={event => setPassowrd(event.target.value)} placeholder='password'/>
                    </label>
                    <div className="login_btn_container mt-2 d-flex ai-center">
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    handleSuccess(credentialResponse)
                                }}
                                onError={() => {
                                    console.log('Login Failed')
                                }}
                                useOneTap
                                type='icon'
                            />
                        </GoogleOAuthProvider>
                        <input type="submit" className="bg-info d-flex ai-center jc-center pointer" value="Login"/>
                    </div>
                </form>
                <div className="navigate_to pointer">
                    <p>Lupa <span onClick={() => navigate('/auth/pemulihan')}>password</span></p>
                    <p>Belum memiliki akun? <span onClick={() => navigate('/auth/register')}>Sign up</span></p>
                </div>
                <div className="auth_btn d-flex ai-center pointer navigate_back w-full" onClick={() => navigate('/home')}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    <span>Kembali</span>
                </div>
            </div>
        </div>
    )
}

import './Auth.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadingToast, accountToast } from '../utils/notif'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faRightToBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons'


const API_LOCAL = 'http://localhost:3001'
const API_ONLINE = process.env.REACT_APP_API 
const API = API_ONLINE

export function Auth() {
    const navigate = useNavigate()
    return (
        <div className="auth">
            <div className="auth-context">
                <h3>Autentikasi</h3>
                <div className="navigate_to">
                    <p>Masuk ke akun</p>
                    <div className="auth_btn navigate_login" onClick={() => navigate('/auth/login')}>
                        <FontAwesomeIcon icon={faRightToBracket}/>
                        <span>Login</span>
                    </div>
                </div>
                <div className="navigate_to">
                    <p>Tidak memiliki akun?</p>
                    <div className="auth_btn navigate_register" onClick={() => navigate('/auth/register')}>
                        <FontAwesomeIcon icon={faAddressCard}/>
                        <span>Register</span>
                    </div>
                </div>
                <div className="navigate_to">
                    <div className="auth_btn navigate_back" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        <span>Kembali</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Register() {
    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState(null)
    const navigate = useNavigate()
    function handleChangeUser(data) {
        setUser(data)
    }
    return (
        <>
            <div className="auth">
                <div className="auth-context">
                {
                    user ?
                        <FormRegist data={user}/>
                    :
                        <>
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                            <div className="register">
                                <h4>Registrasi</h4>
                                <p className='msg_email_exist'>{msg}</p>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        setMsg(null)
                                        const decode = jwt_decode(credentialResponse.credential)
                                        let data = {
                                            name: decode.name,
                                            email: decode.email,
                                            avatar: decode.picture
                                        }
                                        const promise = loadingToast('mencari akun dengan email yang sama')
                                        axios.get(`${API}/user/emailExist/${data.email}`)
                                        .then(res => {
                                            handleChangeUser(data)
                                            toast.dismiss(promise)
                                        })
                                        .catch(err => {
                                            setMsg(err.response.data)
                                            toast.dismiss(promise)
                                        })
                                    }}
                                    onError={() => {
                                        console.log('Login Failed')
                                    }}
                                    useOneTap
                                />
                                <div className="navigate_to">
                                    <p>Sudah memiliki akun? <span onClick={() => navigate('/auth/login')}>login</span></p>
                                </div>
                            </div>
                        </GoogleOAuthProvider>
                        </>
                }
                </div>
            </div>
        </>
    )
}
function FormRegist({data}) {
    const [inputLock,] = useState(data)
    const [nickname, setNickname] = useState('')
    const [msgNickname, setMsgNickname] = useState(null)
    const [errorNickname, setErrorNickname] = useState(null)
    const [myPassword, setMyPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState(null)
    const [redBorderInput, setRedBorderInput] = useState(false)
    const [greenBorderInput, setGreenBorderInput] = useState(false)
    const btn = useRef()

    function handleMatchPassword(text) {
        setErrorPassword(text)
    }
    function handleNicknameChange(currentNickname) {
        setGreenBorderInput(false)
        setMsgNickname(null)
        if (nickname.length < 4) return
        axios.get(`${API}/user/avaible/${currentNickname}`)
        .then(res => {
            setGreenBorderInput(true)
            setErrorNickname(null)
            setMsgNickname(res.data)
        })
        .catch(err => {
            setGreenBorderInput(false)
            setErrorNickname(err.response.data)
        })
    }
    useEffect(() => {
        setErrorPassword(null)
        setRedBorderInput(false)
    }, [confirmPassword, myPassword])

    const navigate = useNavigate()
    function handleSubmit(event) {
        event.preventDefault()
        if (!setGreenBorderInput) return
        if (confirmPassword !== myPassword) {
            handleMatchPassword('Password dan Confirm password tidak cocok')
            setRedBorderInput(true)
            return
        }
        btn.current.style.backgroundColor = 'var(--black-1)'
        let data = {
            ...inputLock,
            nickname: nickname,
            password: myPassword,
        }
        const promise = loadingToast('mengirim data')
        axios.post(API + '/user', data)
        .then((res) => {
            navigate('/')
            const newLocalData = {
                name: inputLock.name,
                nickname: nickname,
                avatar: inputLock.avatar,
                email: inputLock.email,
                password: myPassword,
                tag: res.data._doc.tag,
                created_at: res.data._doc.created_at
            }
            localStorage.setItem('account', JSON.stringify(newLocalData))
            toast.dismiss(promise)
            accountToast(res.data.message)
        })
        .catch((err) => {
            console.log(err)
            toast.dismiss(promise)
            accountToast('Gagal membuat akun')
        }).finally(()=> {
            btn.current.style.backgroundColor = 'royalblue'
        })
    }
    return (
        <>
            <h4>Sign up</h4>
            <div className="account_preview">
                <img src={inputLock.avatar} alt={inputLock.name}/>
                <div>
                    <p>{inputLock.name}</p>
                    <p className='nickname_preview'>{nickname}</p>
                </div>
            </div>
            <form className='auth_form' onSubmit={handleSubmit}>
                <label>
                {errorNickname?
                <p className='error_msg'>{errorNickname}</p>
                :
                <span>{msgNickname || 'Nickname'}</span>
                }
                <input type="text" value={nickname} onChange={event => setNickname(event.target.value) + handleNicknameChange(event.target.value)} placeholder='Nama panggilan' required maxLength='18' className={`${greenBorderInput?'green-border':''}`} minLength='4' />
                </label>
                <label>
                {errorPassword?
                <p className='error_msg'>{errorPassword}</p>
                :
                <span>Password</span>
                }
                    <input type="password" value={myPassword} onChange={event => setMyPassword(event.target.value)} placeholder='Password' required className={`${redBorderInput?'red-border':''}`} maxLength='20' minLength='4'/>
                </label>
                <label>
                <span>Confirm Password</span>
                    <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder='Ketik ulang password' className={`${redBorderInput?'red-border':''}`} minLength='4'/>
                </label>
                <input type="submit" value="Sign up" ref={btn}/>
            </form>
            <div className="navigate_to">
                <p>Sudah memiliki akun? <span onClick={() => navigate('/auth/login')}>login</span></p>
            </div>
        </>
    )
}

export function Login() {
    const [nickname, setNickname] = useState('')
    const [password, setPassowrd] = useState('')
    const [msg, setMsg] = useState(null)
    const navigate = useNavigate()
    function handleSuccess(response) {
        setMsg(null)
        const credential = response.credential
        const promise = loadingToast('Mendapatkan data akun')
        axios.put(`${API}/user/login/google`, {credential})
        .then(res => {
            localStorage.setItem('account', JSON.stringify(res.data))
            toast.dismiss(promise)
            accountToast('Berhasil masuk ke akun')
            navigate('/')
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
            localStorage.setItem('account', JSON.stringify(res.data))
            toast.dismiss(promise)
            accountToast('Berhasil masuk ke akun')
            navigate('/')
        })
        .catch((err) => {
            setMsg(err.response.data)
            toast.dismiss(promise)
            accountToast('Gagal mendapatkan akun :(')
        })
    }
    return (
        <div className="auth">
            <div className="auth-context">
                <h4>Login</h4>
                <form className='auth_form' onSubmit={handleSubmit}>
                    <p className='error_msg'>{msg}</p>
                    <label>
                        <span>Nickname</span>
                        <input type="text" value={nickname} onChange={event => setNickname(event.target.value)} placeholder='nickname'/>
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" value={password} onChange={event => setPassowrd(event.target.value)} placeholder='password'/>
                    </label>
                    <div className="login_btn_container">
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
                        <input type="submit" value="Login"/>
                    </div>
                </form>
                <div className="navigate_to">
                    <p>Belum memiliki akun? <span onClick={() => navigate('/auth/register')}>Sign up</span></p>
                </div>
            </div>
        </div>
    )
}
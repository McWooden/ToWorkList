import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadingToast, accountToast } from '../utils/notif'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faRightToBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { setLocalAccountWithoutEncrypt } from '../utils/localstorage'
import { useDispatch } from 'react-redux'
import { setBooksProfile, setProfile } from '../redux/sourceSlice'


const API = process.env.REACT_APP_API

export function Auth() {
    const navigate = useNavigate()
    return (
        <div className="auth d-flex ai-center jc-center">
            <div className="auth-context bg-burlywood text-primary">
                <h3>Autentikasi</h3>
                <div className="navigate_to pointer">
                    <p>Masuk ke akun</p>
                    <div className="auth_btn d-flex ai-center pointer navigate_login bg-primary text-burlywood" onClick={() => navigate('/auth/login')}>
                        <FontAwesomeIcon icon={faRightToBracket}/>
                        <span>Login</span>
                    </div>
                </div>
                <div className="navigate_to pointer">
                    <p>Tidak memiliki akun?</p>
                    <div className="auth_btn d-flex ai-center pointer navigate_register bg-primary text-burlywood" onClick={() => navigate('/auth/register')}>
                        <FontAwesomeIcon icon={faAddressCard}/>
                        <span>Register</span>
                    </div>
                </div>
                <div className="navigate_to pointer">
                    <div className="auth_btn d-flex ai-center pointer navigate_back" onClick={() => navigate('/')}>
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
            <div className="auth d-flex ai-center jc-center">
                <div className="auth-context bg-burlywood text-primary">
                {
                    user ?
                        <FormRegist data={user}/>
                    :
                        <>
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                            <div className="register d-flex jc-center ai-center fd-column">
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
                                            accountToast('Melanjutkan membuat akun')
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
    const dispatch = useDispatch()
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
            setLocalAccountWithoutEncrypt(res.data.account)
            dispatch(setProfile())
            toast.dismiss(promise)
            accountToast(res.data.message)
            dispatch(setBooksProfile(null))
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
            <div className="account_preview d-flex ai-center">
                <img src={inputLock.avatar} alt={inputLock.name}/>
                <div>
                    <p>{inputLock.name}</p>
                    <p className='nickname_preview'>{nickname}</p>
                </div>
            </div>
            <form className='auth_form d-flex fd-column' onSubmit={handleSubmit}>
                <label>
                {errorNickname?
                    <p className='error_msg'>{errorNickname}</p>
                    :
                    <span>{msgNickname || 'Nickname'}</span>
                }
                <input type="text" value={nickname} onChange={event => setNickname(event.target.value) + handleNicknameChange(event.target.value)} placeholder='Nama panggilan' required maxLength='18' className={`d-block ${greenBorderInput?'green-border':''}`} minLength='4' />
                </label>
                <label>
                {errorPassword?
                    <p className='error_msg text-no'>{errorPassword}</p>
                    :
                    <span>Password</span>
                }
                    <input type="password" value={myPassword} onChange={event => setMyPassword(event.target.value)} placeholder='Password' required className={`d-block ${redBorderInput?'red-border':''}`} maxLength='20' minLength='4'/>
                </label>
                <label>
                <span>Confirm Password</span>
                    <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder='Ketik ulang password' className={`d-block ${redBorderInput?'red-border':''}`} minLength='4'/>
                </label>
                <button type="submit" className="d-flex ai-center jc-center pointer bg-info text-whitesmoke min-h-[40px] rounded" ref={btn}>Sign up</button>
            </form>
            <div className="navigate_to pointer">
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
    const dispatch = useDispatch()
    function handleSuccess(response) {
        setMsg(null)
        const credential = response.credential
        const promise = loadingToast('Mendapatkan data akun')
        axios.put(`${API}/user/login/google`, {credential})
        .then(res => {
            setLocalAccountWithoutEncrypt(res.data)
            dispatch(setProfile())
            dispatch(setBooksProfile(null))
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
            setLocalAccountWithoutEncrypt(res.data)
            dispatch(setProfile())
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
            </div>
        </div>
    )
}

export function Pemulihan() {
    const navigate = useNavigate()
    const [msg, setMsg] = useState(null)
    const [account, setAccount] = useState(null)
    const [myPassword, setMyPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState(null)
    const [redBorderInput, setRedBorderInput] = useState(false)
    const btn = useRef()
    const dispatch = useDispatch()
    function handleSuccess(response) {
        const credential = response.credential
        setMsg(null)
        const promise = loadingToast('Mencari akun')
        axios.put(`${API}/user/pemulihan`, {credential})
        .then((res) => {
            setAccount(res.data)
            toast.dismiss(promise)
            accountToast('Berhasil menemukan akun')
        })
        .catch((err) => {
            toast.dismiss(promise)
            accountToast('Tidak menemukan akun')
            setMsg(err.response.data || err)
        })
    }
    useEffect(() => {
        setErrorPassword(null)
        setRedBorderInput(false)
    }, [confirmPassword, myPassword])
    function handleSubmit(event) {
        event.preventDefault()
        if (confirmPassword !== myPassword) {
            setErrorPassword('Password dan Confirm password tidak cocok')
            setRedBorderInput(true)
            return
        }
        btn.current.style.backgroundColor = 'var(--black-1)'
        const data = {
            email: account.email,
            password: myPassword
        }
        const promise = loadingToast('Mengganti password')
        axios.post(API + '/user/pemulihan', data)
        .then((res) => {
            navigate('/')
            setLocalAccountWithoutEncrypt(res.data)
            dispatch(setProfile())
            toast.dismiss(promise)
            accountToast('Berhasil mengganti password dan masuk ke akun')
        })
        .catch((err) => {
            toast.dismiss(promise)
            accountToast('Gagal mengubah password')
        }).finally(()=> {
            btn.current.style.backgroundColor = 'royalblue'
        })
    }
    return (
        <div className="auth d-flex ai-center jc-center">
            <div className="auth-context bg-burlywood text-primary pemulihan d-flex fd-column ai-center jc-center">
                <h4>Memulihkan akun</h4>
                <p className='error_msg'>{msg}</p>
                {
                    account ?
                    <>
                        <div className="account_preview">
                            <img src={account.avatar} alt={account.name}/>
                            <div>
                                <p>{account.nickname}<span>#{account.tag}</span></p>
                                <p className='nickname_preview'>{account.name}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className='auth_form'>
                            <label>
                            {errorPassword?
                                <p className='error_msg'>{errorPassword}</p>
                            :
                                <span>Password</span>
                            }
                                <input type="password" value={myPassword} onChange={event => setMyPassword(event.target.value)} placeholder='Password baru' required className={`d-block ${redBorderInput?'red-border':''}`} maxLength='20' minLength='4'/>
                            </label>
                            <label>
                                <span>Confirm Password</span>
                                <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder='Ketik ulang password' className={`d-block ${redBorderInput?'red-border':''}`} minLength='4'/>
                            </label>
                            <input type="submit" className="d-flex ai-center jc-center pointer" value="Ganti password" ref={btn}/>
                        </form>
                    </>
                    :
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        handleSuccess(credentialResponse)
                                    }}
                                    onError={() => {
                                        console.log('Login Failed')
                                    }}
                                    useOneTap
                                />
                        </GoogleOAuthProvider>
                }
                <div className="navigate_to pointer">
                    <p>Sudah memiliki akun <span onClick={() => navigate('/auth/login')}>Login</span></p>
                    <p>Belum memiliki akun? <span onClick={() => navigate('/auth/register')}>Sign up</span></p>
                </div>
            </div>
        </div>
    )
}
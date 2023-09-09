import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadingToast, accountToast } from '../../utils/notif'
import { toast } from 'react-toastify'
import { decrypt, setLocalAccountWithoutEncrypt } from '../../utils/localstorage'
import { useDispatch } from 'react-redux'
import { refreshProfile } from '../../redux/sourceSlice'

const API = process.env.REACT_APP_API

export default function Pemulihan() {
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
            const decryptedData = JSON.parse(decrypt(res.data.account))
            console.log(decryptedData);
            setAccount(decryptedData)
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
            setLocalAccountWithoutEncrypt(res.data.account)
            dispatch(refreshProfile())
            toast.dismiss(promise)
            accountToast('Berhasil mengganti password dan masuk ke akun')
            navigate('/')
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
            <div className="auth-context bg-burlywood text-primary pemulihan d-flex fd-column jc-center items-center">
                <h4 className='text-center'>Memulihkan akun</h4>
                <p className='text-no'>{msg}</p>
                {
                    account ?
                    <>
                        <div className='flex flex-col'>
                            <img src={account.avatar} alt={account.name} className='rounded-full h-16 w-16'/>
                            <div>
                                <p>{account.nickname}<span>#{account.tag}</span></p>
                                <p className='nickname_preview'>{account.name}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className='auth_form'>
                            {errorPassword && <p className='text-whitesmoke bg-no p-2 text-xs rounded'>{errorPassword}</p>}
                            <label>
                                <span>Password</span>
                                <input type="password" value={myPassword} onChange={event => setMyPassword(event.target.value)} placeholder='Password baru' required className={`d-block ${redBorderInput&&'border-l-no'}`} maxLength='20' minLength='4'/>
                            </label>
                            <label>
                                <span>Confirm Password</span>
                                <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder='Ketik ulang password' className={`d-block ${redBorderInput&&'border-l-no'}`} minLength='4'/>
                            </label>
                            <input type="submit" className="d-flex ai-center jc-center pointer bg-info shadow" value="Ganti password" ref={btn}/>
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

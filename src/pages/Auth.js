import './Auth.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'
import { accountToast } from '../utils/notif'
import { useNavigate } from 'react-router-dom'




function Auth() {
    const [user, setUser] = useState(null)
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
                            <div className="login">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const decode = jwt_decode(credentialResponse.credential)
                                    let data = {
                                        name: decode.name,
                                        email: decode.email,
                                        avatar: decode.picture
                                    }
                                    handleChangeUser(data)
                                }}
                                onError={() => {
                                    console.log('Login Failed')
                                }}
                                useOneTap
                                />
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
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    function handleSubmit(event) {
        event.preventDefault()
        let data = {
            ...inputLock,
            nickname: nickname,
            password: password,
        }
        console.log(data)
        accountToast('akun berhasil dibuat!')
        setTimeout(() => {
            accountToast('tapi blom dikirim ke backend')
        }, 2000)
        setTimeout(() => {
            accountToast('aowkokwao')
        }, 2500)
        setTimeout(() => {
            accountToast('Zǎo shang hǎo zhōng guó!')
        }, 3500)
        setTimeout(() => {
            accountToast('Xiàn zài wǒ yǒu')
        }, 4500)
        setTimeout(() => {
            accountToast('BING CHILLING 🍦')
        }, 5000)
        setTimeout(() => {
            accountToast('Wǒ hěn xǐ huān')
        }, 6000)
        setTimeout(() => {
            accountToast('BING CHILLING 🍦 🍦 🍦')
        }, 6500)
        setTimeout(() => {
            accountToast('Dàn shì "sù dù yǔ')
        }, 7000)
        setTimeout(() => {
            accountToast('jī qíng jiǔ" bǐ')
        }, 7500)
        setTimeout(() => {
            accountToast(' 🍦 🍦 🍦 BING CHILLING 🍦 🍦 🍦 ')
        }, 8000)
        navigate('/')
    }
    return (
        <div className='sign_up'>
            <h4>Sign up</h4>
            <div className="account_preview">
                <img src={inputLock.avatar} alt={inputLock.name}/>
                <div>
                    <p>{inputLock.name}</p>
                    <p className='nickname_preview'>{nickname}</p>
                </div>
            </div>
            <form className='register_form' onSubmit={handleSubmit}>
                <label>
                Nickname
                <input type="text" value={nickname} onChange={event => setNickname(event.target.value)} placeholder='Nama panggilan'/>
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder='Password'/>
                </label>
                <label>
                    Confirm Password
                    <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder='Ketik ulang password'/>
                </label>
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}

export default Auth
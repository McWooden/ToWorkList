import './Login.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'
import { SocialButton } from 'react-social-login';



function Auth() {
    const [user, setUser] = useState(null)
    function handleChangeUser(data) {
        setUser(data)
    }
    return (
        <>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <div className="auth">
                <div className="auth-context">
                {
                    user ?
                        <FormRegist data={user}/>
                    :
                        <GetData callback={handleChangeUser}/>
                }
                </div>
            </div>
        </GoogleOAuthProvider>
        </>
    )
}
function GetData({callback}) {
    const handleSocialLogin = (user) => {
        console.log(user)
    }
    return (
        <div className="login-google">
            <h3>Lanjutkan dengan</h3>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const decode = jwt_decode(credentialResponse.credential)
                    let data = {
                        name: decode.name,
                        email: decode.email,
                        avatar: decode.picture
                    }
                    callback(data)
                }}
                onError={() => {
                    console.log('Login Failed')
                }}
                useOneTap
                text='lanjutkan dengan'
            />
            <SocialButton
            provider='facebook'
            appId='425755386336327'
            onLoginSuccess={handleSocialLogin}
            >
            Login with Facebook
            </SocialButton>
        </div>
    )
}
function FormRegist({data}) {
    return (
        <>
            <h1>Register</h1>
            <form>
                <input type="text" placeholder='Name' value={data.name}/>
                <input type="text" placeholder='Nickname' value=''/>
                <input type="text" placeholder='avatar url' value={data.avatar}/>
                <input type="email" placeholder='email' value={data.email}/>
            </form>
        </>
    )
}
export default Auth
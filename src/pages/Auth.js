import './Auth.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'



function Auth() {
    const [user, setUser] = useState(null)
    function handleChangeUser(data) {
        setUser(data)
    }
    console.log(process.env.REACT_APP_CLIENT_ID)
    return (
        <>
            <div className="auth">
                <div className="auth-context">
                {
                    user ?
                        <FormRegist data={user}/>
                    :
                        <>
                        <h4>Buat akun dengan</h4>
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
                                text='lanjutkan dengan'
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
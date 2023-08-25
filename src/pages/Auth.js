import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faRightToBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons'

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
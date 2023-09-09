import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faKey } from '@fortawesome/free-solid-svg-icons'
import { SettingClose } from "./SettingClose"
import { useState } from 'react'
import ReactDOM from 'react-dom'
import UserProfile from './UserSetting/UserProfile'
import UserPassword from './UserSetting/UserPassword'

export default function UserSetting({open, close}) {
    const [select, setSelect] = useState('profile')
    if (!open) return
    function handleSelectOnChange(newSelect) {
        setSelect(newSelect)
    }
    return ReactDOM.createPortal(
        <div className="setting_full zi-2 p-fixed d-flex text-whitesmoke bg-zinc-900">
            <div className="setting_full_nav zi-1">
                <ul className='of-hidden'>
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'profile' && 'active'}`} onClick={() => handleSelectOnChange('profile')}>
                        <FontAwesomeIcon icon={faPencil} className='setting_full_nav_list_icon'/>
                        <p>Profil</p>
                    </li>
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'key' && 'active'}`} onClick={() => handleSelectOnChange('key')}>
                        <FontAwesomeIcon icon={faKey} className='setting_full_nav_list_icon'/>
                        <p>Kata sandi</p>
                    </li>
                </ul>
            </div>
            <div className="setting_full_body p-relative of-auto">
                <section className='h-full'>
                    {select === 'profile' && <UserProfile/>}
                    {select === 'key' && <UserPassword/>}
                </section>
                <SettingClose callback={close}/>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

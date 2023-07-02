import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMap, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { SettingClose } from "./SettingClose"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { SettingProfile } from './SettingProfile'
import { SettingRoom } from './SettingRoom'
import { SettingMember } from './SettingMember'

export default function Setting({open, close}) {
    const [select, setSelect] = useState('profile')
    const pathBook = useSelector(state => state.fetch.pathBook)
    if (!open) return
    function handleSelectOnChange(newSelect) {
        setSelect(newSelect)
    }
    return ReactDOM.createPortal(
        <div className="setting_full zi-2 p-fixed d-flex">
            <div className="setting_full_nav zi-1">
                <ul className='of-hidden'>
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'profile' && 'active'}`} onClick={() => handleSelectOnChange('profile')}>
                        <FontAwesomeIcon icon={faPencil} className='setting_full_nav_list_icon'/>
                        <p>{pathBook}</p>
                    </li>
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'room' && 'active'}`} onClick={() => handleSelectOnChange('room')}>
                        <FontAwesomeIcon icon={faMap} className='setting_full_nav_list_icon'/>
                        <p>halaman</p>
                    </li>
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'member' && 'active'}`} onClick={() => handleSelectOnChange('member')}>
                        <FontAwesomeIcon icon={faUserGroup} className='setting_full_nav_list_icon'/>
                        <p>orang</p>
                    </li>
                </ul>
            </div>
            <div className="setting_full_body p-relative of-auto">
                <section>
                    {select === 'profile' && <SettingProfile/>}
                    {select === 'room' && <SettingRoom/>}
                    {select === 'member' && <SettingMember/>}
                </section>
                <SettingClose callback={close}/>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMap, faUserGroup, faEnvelope, faMask } from '@fortawesome/free-solid-svg-icons'
import { SettingClose } from "./SettingClose"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import BookProfile from './BookSetting/BookProfile'
import BookMember from './BookSetting/BookMember'
import BookMail from './BookSetting/BookMail'
import BookPage from './BookSetting/BookPage'
import BookRole from './BookSetting/BookRole'

export default function BookSetting({open, close}) {
    const [select, setSelect] = useState('profile')
    const pathBook = useSelector(state => state.fetch.pathBook)
    if (!open) return
    function handleSelectOnChange(newSelect) {
        setSelect(newSelect)
    }
    return ReactDOM.createPortal(
        <div className="setting_full zi-3 p-fixed d-flex text-whitesmoke bg-zinc-900">
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
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'mail' && 'active'}`} onClick={() => handleSelectOnChange('mail')}>
                        <FontAwesomeIcon icon={faEnvelope} className='setting_full_nav_list_icon'/>
                        <p>Surat</p>
                    </li>
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'member' && 'active'}`} onClick={() => handleSelectOnChange('member')}>
                        <FontAwesomeIcon icon={faUserGroup} className='setting_full_nav_list_icon'/>
                        <p>orang</p>
                    </li>
                    <li className={`setting_full_nav_list d-flex ai-center pointer ${select === 'role' && 'active'}`} onClick={() => handleSelectOnChange('role')}>
                        <FontAwesomeIcon icon={faMask} className='setting_full_nav_list_icon'/>
                        <p>Peran</p>
                    </li>
                </ul>
            </div>
            <div className="setting_full_body p-relative of-auto">
                <section className='h-full'>
                    {select === 'profile' && <BookProfile/>}
                    {select === 'room' && <BookPage/>}
                    {select === 'mail' && <BookMail/>}
                    {select === 'member' && <BookMember/>}
                    {select === 'role' && <BookRole/>}
                </section>
                <SettingClose callback={close}/>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

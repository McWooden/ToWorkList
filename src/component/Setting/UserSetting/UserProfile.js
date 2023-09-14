import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faFloppyDisk, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { refreshProfile } from '../../../redux/sourceSlice'
import { setLocalAccountWithoutEncrypt } from '../../../utils/localstorage'
import { alertToast, saveToast } from '../../../utils/notif'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { useDispatch } from 'react-redux'
import { differenceInDays } from 'date-fns'


export default function UserProfile() {
    const myAccount = useSelector(state => state.source.profile)
    const [full, setFull] = useState(false)
    const [inputNickname, setInputNickname] = useState(myAccount.nickname)
    const [showInput, setShowInput] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const differenceDays = differenceInDays(new Date(), parseISO(myAccount?.last_changes?.nickname_change_date))
    const inputRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        if (showInput && inputRef.current) {
          inputRef.current.focus()
        }
      }, [showInput])
      
    async function handleSubmit(e) {
        e.preventDefault()
        setSaveLoading(true)
        try {
            await axios.put(`${API}/user/nickname`, {nickname: inputNickname, _id: myAccount._id})
            .then(res => {
                saveToast('Judul berhasil disimpan')
                setLocalAccountWithoutEncrypt(res.data.account)
                dispatch(refreshProfile())
            })
            .catch(() => {
                saveToast('gagal disimpan')
            })
        } catch (error) {
            
        }
        setSaveLoading(false)
        setShowInput(false)
    }
    function changeNickname() {
        try {
            if (myAccount?.last_changes?.nickname_change_date !== null || differenceDays <= 30) return alertToast(`Nickname dapat diganti setelah 30 hari, berdasarkan perubahan terakhir yang terjadi selama ${differenceDays} hari`)
            setShowInput(true)
        } catch (error) {
            console.log(error)
        }
    }
    function validationNickname(string) {
        const validNicknameRegex = /^[a-zA-Z0-9._]+$/
        if (!string) return setInputNickname('')
        if (validNicknameRegex.test(string)) {
            setInputNickname(string)
        } else {
            alertToast('Nickname hanya boleh menggunakan huruf, angka, garis bawah dan titik')
        }
    }
    return (
        <>
        <div className="setting_header">
            <h3>Profil</h3>
        </div>
        <div className="setting_full_profile_view d-flex fd-column">
            <div className='setting_full_profile_view_banner'>
                <img className={`setting_banner pointer ${full?'full zi-3 p-fixed':''}`} src={myAccount.avatar} alt={myAccount.nickname} onClick={() => setFull(!full)}/>
            </div>
            <div className="setting_full_profile_view_body p-relative">
                <div className="setting_full_profile_view_float d-fle ai-center p-absolute bg-zinc-900">
                    <img src={myAccount.avatar} alt={myAccount.nickname} className='setting_full_pp_guild pointer'/>
                </div>
            </div>
        </div>
        <h5 className='mt-2'>Bergabung pada</h5>
        <p className='setting_profile_date mb-2'>{format(new Date(myAccount.created_at), 'EEEE, MMM yyyy', {locale: id})}</p>
        <p className='text-zinc-600'>Nickname terakhir diubah pada {myAccount.last_changes.nickname_change_date?format(parseISO(myAccount.last_changes.nickname_change_date), 'EEEE, MMM yyyy - HH.mm', {locale: id}):'-'}</p>
        {showInput?
            <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
                <input type="text" placeholder={myAccount.nickname} value={inputNickname} ref={inputRef} onChange={(e) => validationNickname(e.target.value)} className='border-0 p-1' required minLength={4} maxLength={30}/>
                <div className="gap-2 d-flex flex-row items-center">
                    <FontAwesomeIcon icon={faXmark} onClick={() => setShowInput(false)} className='h-5 w-5 p-1 action_btn pointer bg-no rounded'/>
                    {saveLoading?
                        <FontAwesomeIcon icon={faSpinner} className='h-5 w-5 p-1 action_btn pointer rounded spinner'/>
                    :
                        <button type='submit' className='min-w-[36px] min-h-[36px] flex items-center justify-center pointer'>
                            <FontAwesomeIcon icon={faFloppyDisk} className='h-5 action_btn'/>
                        </button>
                    }
                </div>
                <span className='text-zinc-500'>#{myAccount.tag}</span>
            </form>
            : <input type="text" className='border-0 p-1' onClick={changeNickname} value={`${myAccount.nickname}#${myAccount.tag}`} readOnly/>
        }
        </>
    )
}
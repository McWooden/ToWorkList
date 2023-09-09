import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { refreshProfile } from '../../../redux/sourceSlice'
import { alertToast, saveToast } from '../../../utils/notif'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import Confirm from '../../Modal/Confirm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function UserPassword() {
    const myAccount = useSelector(state => state.source.profile)
    const [oldPassword, setOldPassword] = useState('')
    const [inputPassword, setinputPassword] = useState('')
    const [inputConfirmPassword, setInputConfirmPassword] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openDeletePassword, setOpenDeletePassword] = useState(false)
    useEffect(() => {
        setErrorMsg('')
    },[oldPassword, inputPassword, inputConfirmPassword])
    async function handleSubmit(e) {
        e.preventDefault()
        if (inputPassword !== inputConfirmPassword) {
            setErrorMsg('Password dan konfirmasi password tidak cocok')
            return
        }

        const dataToSend = {
            oldPassword: oldPassword,
            newPassword: inputPassword,
            _id: myAccount._id
        }
        setSaveLoading(true)
        try {
            await axios.post(`${API}/user/change_password`, dataToSend)
            .then(res => {
                saveToast('Password berhasil diperbarui')
                dispatch(refreshProfile())
                resetForm()
            })
            .catch(err => {
                alertToast(err)
            })
        } catch (error) {
            
        }
        setSaveLoading(false)
    }
    async function deletePassword() {
        try {
            await axios.delete(`${API}/user/delete_password/${myAccount._id}`)
            .then(res => {
                alertToast('Password berhasil dihapus')
                setOpenDeletePassword(false)
            })
        } catch (err) {
            alertToast('Password gagal terhapus')
        }
    }
    function resetForm() {
        setOldPassword('')
        setinputPassword('')
        setInputConfirmPassword('')
    }
    return (
        <>
        <div className="setting_header">
            <h3>Password</h3>
        </div>
        <div className="setting_full_profile_view d-flex fd-column">
            <p className='text-zinc-600'>Password terakhir diubah pada {myAccount.last_changes.password_change_date ? format(parseISO(myAccount?.last_changes?.password_change_date), 'EEEE, MMM yyyy - HH.mm', {locale: id}):'-'}</p>
            <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
                {errorMsg && <p className='text-whitesmoke bg-no p-2 text-xs rounded'>{errorMsg}</p>}
                <h5 className='mt-2'>Password lama</h5>
                <input type="password" placeholder='Old' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='border-0 p-1' required/>
                <h5 className='mt-2'>Password baru</h5>
                <input type="password" placeholder='Password' value={inputPassword} onChange={(e) => setinputPassword(e.target.value)} className='border-0 p-1' required minLength={4}/>

                <h5 className='mt-2'>Konfirmasi password baru</h5>
                <input type="password" placeholder='Confirm password' value={inputConfirmPassword} onChange={(e) => setInputConfirmPassword(e.target.value)} className='border-0 p-1' required minLength={4}/>
                <div className="gap-2 d-flex flex-row items-center mt-2 items-center">
                    {saveLoading?
                        <FontAwesomeIcon icon={faSpinner} className='h-5 w-5 p-1 action_btn pointer rounded spinner'/>
                    : inputPassword && inputConfirmPassword && oldPassword ?
                        <button type='submit' className='py-1 flex place-items-center pointer gap-2 px-2'>
                            <span>Perbarui</span><FontAwesomeIcon icon={faFloppyDisk} className='h-5 w-5 action_btn'/>
                        </button>
                        :
                        <button type='submit' className='py-1 flex place-items-center pointer gap-2 bg-zinc-500  px-2'>
                            <span>Perbarui</span><FontAwesomeIcon icon={faFloppyDisk} className='h-5 w-5 action_btn'/>
                        </button>
                    }
                    <span className='text-xs text-info pointer' onClick={() => navigate('/auth/pemulihan')}>Lupa password?</span>
                    <span className='text-xs text-no pointer' onClick={() => setOpenDeletePassword(true)}>Hapus password</span>
                </div>
            </form>
        </div>
        <Confirm open={openDeletePassword} callback={deletePassword} target={'Password'} close={() => setOpenDeletePassword(false)} color='white' metode='delete' deleteText='akan dihapus dari database, kamu hanya dapat login dengan Google untuk selanjutnya'/>
        </>
    )
}
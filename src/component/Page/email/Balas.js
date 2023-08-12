import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { blankToast } from '../../../utils/notif'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { Modal } from '../../Modal/Modal'

export default function Balas({mail, open, close, cb}) {
    const [inputBalasan, setInputBalasan] = useState('')
    const myProfile = useSelector(state => state.source?.profile)
    async function handleSubmit(e) {
      e.preventDefault()
      if (!inputBalasan) return blankToast('Isi teks!')
      const data = {
        nama: `${myProfile.nickname}#${myProfile.tag}`,
        avatar: `${myProfile.avatar}`,
        type: 'user',
        createdAt: new Date().toISOString(),
        balas: inputBalasan,
      }
      try {
        await axios.post(API+`/mail/balasan/${mail._id}`, data)
        .then(res => {
          cb(res.data.mail)
        })
      } catch (error) {}
    }
  
    return (
      <Modal open={open} close={() => close()}>
        <form onSubmit={handleSubmit} className='form-modal flex flex-col'>
          <div className='flex justify-between'>
            <p className='capitalize'>Balas</p>
            <button type="submit" className='py-1 px-3 flex gap-2 place-items-center pointer'>
              <FontAwesomeIcon icon={faPaperPlane}/>
              <span>Kirim</span>
            </button>
          </div>
          <textarea value={inputBalasan} onChange={(e) => setInputBalasan(e.target.value)} className='mt-5 flex-1' placeholder='Ketik balasan'/>
        </form>
      </Modal>
    )
  }
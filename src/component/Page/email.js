import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { Greeting } from "../../utils/greeting"
import KirimSurat from './email/KirimSurat'
import DisplayMail from './email/DisplayMail'
import { useSelector } from 'react-redux'
import { Center, Left } from '../Base/BaseComponent'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { disableIcon } from '../../redux/hideAndShowSlice'

export default function Email() {
  const myProfile = useSelector(state => state.source.profile)
  const thisProfile = {
    nama: `${myProfile.nickname}#${myProfile.tag}`,
    avatar: myProfile.avatar,
    _id: myProfile._id
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(disableIcon({right: true}))
    return () => {
      dispatch(disableIcon({right: false}))
    }
  }, [dispatch])
  
  return (
    <>
    <MailLeft thisProfile={thisProfile}/>
    <MailRight thisProfile={thisProfile}/>
    </>
  )
}

function MailLeft({thisProfile}) {
  const [openTulis, setopenTulis] = useState(false)
  return (
    <Left>
      <div className='p-2'>
        <Greeting/>
        <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setopenTulis(true)}>
          <FontAwesomeIcon icon={faPenToSquare}/>
          <span>Tulis</span>
        </div>
        <KirimSurat type='tulis' open={openTulis} close={() => setopenTulis(false)} thisProfile={thisProfile}/>
      </div>
    </Left>
  )
}

function MailRight({thisProfile}) {
  
  return (
    <Center className='overflow-y-auto p-2 flex flex-col'>
        <DisplayMail thisProfile={thisProfile}/>
    </Center>
  )
}
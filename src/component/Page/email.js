import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from "react"
import { HideBase } from "../TodoApp/TodoApp"
import { Greeting } from "../../utils/greeting"
import KirimSurat from './email/KirimSurat'
import DisplayMail from './email/DisplayMail'
import { useSelector } from 'react-redux'
// import OneSignal from 'react-onesignal'
import runOneSignal from '../../utils/runOneSignal'

export default function Email() {
  const myProfile = useSelector(state => state.source.profile)
  const [thisProfile, setThisProfile] = useState({})
  useEffect(() => {
      setThisProfile({
          nama: `${myProfile.nickname}#${myProfile.tag}`,
          avatar: myProfile.avatar,
          _id: myProfile._id
      })
  },[myProfile])
  // const [initialized, setInitialized] = useState(false);
  
  // useEffect(() => {
  //   OneSignal.init({ appId: '54a01f93-b460-49e6-8813-8428b4ef42ab' }).then(() => {
  //     setInitialized(true);
  //     OneSignal.showSlidedownPrompt().then(() => {
  //       console.log('anjay gaatau');
  //     })
  //   })
  // },[])
  useEffect(() => {
    runOneSignal()
  }, [])
  return (
    <>
    <MailLeft thisProfile={thisProfile}/>
    <MailRight thisProfile={thisProfile}/>
    </>
  )
}

function MailLeft({thisProfile}) {
  const { hideLeftBase } = useContext(HideBase)
  const [openTulis, setopenTulis] = useState(false)
  return (
    <div className={`base-left of-auto zi-1 flex-1 ${hideLeftBase?'base-left-hide':'base-left-show'} fd-column d-flex p-2`}>
      <Greeting/>
      <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setopenTulis(true)}>
        <FontAwesomeIcon icon={faPenToSquare}/>
        <span>Tulis</span>
      </div>
      <KirimSurat type='tulis' open={openTulis} close={() => setopenTulis(false)} thisProfile={thisProfile}/>
    </div>
  )
}

function MailRight({thisProfile}) {
  
  return (
    <>
    <div className="base-center p-relative overflow-y-auto p-2 flex flex-col">
      <DisplayMail thisProfile={thisProfile}/>
    </div>
    </>
  )
}
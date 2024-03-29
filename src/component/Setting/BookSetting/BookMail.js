import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faLock } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { Greeting } from "../../../utils/greeting";
import DisplayMail from "../../Page/email/DisplayMail";
import { url } from "../../../utils/variableGlobal";
import KirimSurat from "../../Page/email/KirimSurat";
import { useState } from 'react';

export default function BookMail() {
    const guildProfile = useSelector(state => state.source.guildProfile)
    const profile = {
        nama: guildProfile.book_title,
        avatar: `${url}/${guildProfile.avatar_url}`,
        _id: guildProfile._id
    }
    const isAdmin = useSelector(state => state.source.isAdmin)
    return (
        <>
        <SettingMailLeft profile={profile}/>
        <DisplayMail thisProfile={profile} isAdmin={isAdmin}/>
        </>
    )
}

function SettingMailLeft({profile}) {
    const [openTulis, setopenTulis] = useState(false)
    const isAdmin = useSelector(state => state.source.isAdmin)
    return (
        <>
        <Greeting/>
        {isAdmin ? 
        <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setopenTulis(true)}>
          <FontAwesomeIcon icon={faPenToSquare}/>
          <span>Tulis</span>
        </div>
        :
        <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer'>
          <FontAwesomeIcon icon={faLock}/>
          <span>Admin</span>
        </div>
        }
        <KirimSurat type='tulis' open={openTulis} close={() => setopenTulis(false)}  thisProfile={profile}/>
        </>
    )
}
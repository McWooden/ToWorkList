import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faShare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import { blankToast } from '../../../utils/notif'
import { format, parseISO } from 'date-fns'
import id from 'date-fns/locale/id'
import Markdown from 'markdown-to-jsx'
import KirimSurat from './KirimSurat'
import Balas from './Balas'



export default function Reading({data, thisProfile}) {
    const [item, setItem] = useState(data)
    const [teruskan, setTeruskan] = useState(false)
    const [balasan, setBalasan] = useState(false)
    const [balasanElement, setbalasanElement] = useState(null)
    function handleBalas(item) {
      setItem(item)
      setBalasan(false)
      blankToast('Balasan terkirim')
    }
    useEffect(() => {
      let box = []
      item.balasan.forEach((item, index) => {
        box.push(
          <div key={index} className='flex flex-col border-burlywood rounded shadow text-sm p-2'>
            <div className='flex flex-row items-center gap-3'>
              <img src={item.avatar} alt="avatar" className='w-[42px] rounded-full' />
              <p>{item.nama}</p>
            </div>
            <p className='p-3'>{item.balas}</p>
          </div>
        )
      })
      setbalasanElement(box)
    },[item])
    return (
      <>
        <div className='h-full flex flex-col'>
          <h2 className='m-5'>{item.subjek}</h2>
          <div className='flex gap-2 items-center'>
            <img src={item.pengirim.avatar} alt="avatar" className='rounded-full w-[48px] shadow'/>
            <div>
              <p>{item.pengirim.nama}</p>
              <p>{format(parseISO(item.createdAt), 'd MMMM, HH.mm', { id })}</p>
            </div>
          </div>
          <div className='m-5 border-burlywood rounded p-2 shadow flex-1'>
            <Markdown>{item.body}</Markdown>
          </div>
          <div className='flex gap-3'>
            <div className='border-burlywood text-burlywood flex place-items-center px-3 py-2 rounded-3xl shadow-md my-2 gap-3 pointer' onClick={() => setBalasan(true)} >
              <FontAwesomeIcon icon={faReply}/>
              <p>Balas</p>
            </div>
            <div className='border-burlywood text-burlywood flex place-items-center px-3 py-2 rounded-3xl shadow-md my-2 gap-3 pointer' onClick={() => setTeruskan(true)}>
              <FontAwesomeIcon icon={faShare}/>
              <p>Teruskan</p>
            </div>
          </div>
          <div className='flex flex-col m-5 pb-5'>
            {balasanElement}
          </div>
        </div>
        <KirimSurat open={teruskan} close={() => setTeruskan(false)} type={'teruskan'} mail={item} thisProfile={thisProfile}/>
        <Balas open={balasan} close={() => setBalasan(false)} mail={item} cb={handleBalas} thisProfile={thisProfile}/>
      </>
    )
  }
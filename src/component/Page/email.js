import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane, faPenToSquare, faReply, faRotate, faShare } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useContext, useState } from "react"
import { HideBase } from "../TodoApp/TodoApp"
import { Greeting } from "../../utils/greeting"
import { blankToast, loadingToast } from '../../utils/notif'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { API, url } from '../../utils/variableGlobal'
import { Modal } from '../Modal/Modal'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'
import id from 'date-fns/locale/id'
import Markdown from 'markdown-to-jsx'

export default function Email() {
  return (
    <>
    <MailLeft/>
    <MailRight/>
    </>
  )
}

function MailLeft() {
  const { hideLeftBase } = useContext(HideBase)
  const [openTulis, setopenTulis] = useState(false)
  return (
    <div className={`base-left of-auto zi-1 flex-1 ${hideLeftBase?'base-left-hide':'base-left-show'} fd-column d-flex p-2`}>
      <Greeting/>
      <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setopenTulis(true)}>
        <FontAwesomeIcon icon={faPenToSquare}/>
        <span>Tulis</span>
      </div>
      <KirimSurat type='tulis' open={openTulis} close={() => setopenTulis(false)}/>
    </div>
  )
}

function MailRight() {
  const [mails, setMails] = useState([])
  const [mailsElement, setMailsElement] = useState([])
  const myId = useSelector(state => state.source.profile._id)
  const [isReading, setIsReading] = useState(null)
  const fetchData = useCallback(async() => {
    setIsReading(null)
    const promise = loadingToast('Mencari surat')
    try {
      await axios.get(API+"/mail/"+myId)
      .then(res => {
        setMails(res.data.mails)
        toast.dismiss(promise)
      })
      .catch(err => {throw new Error(err)})
    } catch (error) {
      toast.dismiss(promise)
    }
  },[myId])

  useEffect(() => {
    let box = []
    try {
      mails?.forEach((data, index) => {
          box.push(
            <tr key={index} className='flex flex-nowrap gap-x-2 pointer mb-0.5 shadow p-2 overflow-hidden w-full whitespace-nowrap bg-zinc-900 rounded' onClick={() => setIsReading({...data})}>
              <td className='font-semibold'>{data.pengirim.nama}</td>
              <td className='overflow-hidden w-full'>
                <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.subjek} - {data.body}</p>
              </td>
              <td>
                <p className='text-sm font-medium'>{format(parseISO(data.createdAt), 'd MMM', { id })}</p>
              </td>
            </tr>
          )
        }
      )
    } catch (error) {}
    setMailsElement(box)
  }, [mails])
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return (
    <>
    <div className="base-center p-relative overflow-y-auto p-2 flex flex-col">
      <div className='flex justify-end gap-2'>
        {isReading && 
          <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-full gap-3 pointer' onClick={() => setIsReading(null)}>
            <FontAwesomeIcon icon={faArrowLeft}/>
            <p>Kembali</p>
          </div>
        }
        <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={fetchData}>
          <FontAwesomeIcon icon={faRotate}/>
          <span>Segarkan</span>
        </div>
      </div>
      {isReading ? <Reading data={isReading}/>:
        <div className='max-w-full'>
          <table className='table-fixed w-full'>
            <tbody>
              {mailsElement}
            </tbody>
          </table>
        </div>
      }
    </div>
    </>
  )
}

function Reading({data}) {
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
      <KirimSurat open={teruskan} close={() => setTeruskan(false)} type={'teruskan'} mail={item}/>
      <Balas open={balasan} close={() => setBalasan(false)} mail={item} cb={handleBalas}/>
    </>
  )
}

function KirimSurat({mail, open, close, type}) {
  const myProfile = useSelector(state => state.source?.profile)
  const [kepadaBox, setKepadaBox] = useState([])
  const [kepadaBoxElement, setKepadaBoxElement] = useState([])
  const [search, setSearch] = useState('')
  const [searchBox, setSearchBox] = useState([])
  const [searchBoxElement, setSearchBoxElement] = useState([])
  const [subject, setSubject] = useState('')
  const [bodyMail, setBodyMail] = useState('')
  async function handleSubmit(e) {
    e.preventDefault()
    if (!kepadaBox.length) return blankToast('Tambahkan Penerima!')
    if (type === 'tulis' && !bodyMail) return blankToast('Tidak ada isi')
    const data = {
      pengirim: {
        nama: `${myProfile.nickname}#${myProfile.tag}`,
        avatar: myProfile.avatar,
        _id: myProfile._id
      },
      penerima: kepadaBox,
      subjek: type === 'teruskan' ? mail.subjek : subject,
      body: type === 'teruskan' ? `${bodyMail}\n----SURAT YANG DITERUSKAN----\nDari ${mail.pengirim.nama}\n${format(parseISO(mail.createdAt), 'EEE, d MMMM, HH.mm', { locale: id })}\nSubjek ${mail.subjek}\nPenerima ${myProfile.nickname}#${myProfile.tag}\n${mail.body}` : mail.body
    }
    try {
      const response = await axios.post(API+'/mail/send', data)
      if (response.status !== 201) throw new Error()
      close()
      setKepadaBox([])
      setSubject([])
      setBodyMail('')
      setSearch('')
      blankToast('Surat berhasil dikirim!')
    } catch (error) {
      console.log(error)
    }
  }
  const searchIt = useCallback(async(searchKey) => {
    try {
        if (!searchKey) return
        const response = await axios.get(`${API}/search/key?value=${search}`)
        setSearchBox(response.data)
    } catch (err) {}  
  },[search, setSearchBox])

  useEffect(() => {
    searchIt(search)
  }, [search, searchIt])

  useEffect(() => {
    let box = []
    searchBox?.forEach((item, index) => {
      if (item.type === 'book') {        
        box.push(
        <div key={index} className='text-sm flex flex-nowrap flex-row items-center gap-2 border-burlywood p-1 rounded pointer' 
          onClick={() => {
            setSearch('')
            setKepadaBox(prev => [...prev, {nama: item.book_title, _id: item._id, avatar: item.avatar_url, type: 'book'}])
          }}>
          <img src={url+'/'+item.avatar_url} alt='avatar' className='w-[32px] rounded-full'/>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{item.book_title}@{item.author_nickname}#{item.author_tag}</span>
          </div>)
      } else {
        box.push(
        <div key={index} className='text-sm flex flex-nowrap flex-row items-center gap-2 border-burlywood p-1 rounded pointer' 
          onClick={() => {
            setSearch('')
            setKepadaBox(prev => [...prev, {nama: item.nickname, _id: item._id, avatar: item.avatar, type: 'user'}])
          }}>
          <img src={item.avatar} alt='avatar' className='w-[32px] rounded-full'/>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{item.nickname}#{item.tag}</span>
        </div>)
      }
    })
    setSearchBoxElement(box)
  }, [searchBox])
  useEffect(() => {
    let box = []
    kepadaBox?.forEach((item, index) => {
      if (item.type === 'book') {
        box.push(
          <div key={index} className='flex flex-nowrap m-0.5 items-center border-burlywood gap-1 rounded-3xl overflow-hidden w-fit pr-1' onClick={() => setKepadaBox(prev => prev.filter(x => x._id !== item._id))}>
            <img src={`${url}/${item.avatar}`} alt='avatar' className='w-[24px] rounded-full m-0.5' />
            <span className='text-xs'>{item.nama}</span>
          </div>)
      } else {
        box.push(
          <div key={index} className='flex flex-nowrap m-0.5 items-center border-burlywood gap-1 rounded-3xl overflow-hidden w-fit pr-1' onClick={() => setKepadaBox(prev => prev.filter(x => x._id !== item._id))}>
            <img src={item.avatar} alt='avatar' className='w-[24px] rounded-full m-0.5' />
            <span className='text-xs'>{item.nama}</span>
          </div>)
      }
    })
    setKepadaBoxElement(box)
  },[kepadaBox])

  return (
    <Modal open={open} close={() => close(false)}>
      <form onSubmit={handleSubmit} className='form-modal p-4 flex flex-col'>
          <div className='flex justify-between'>
            <p className='capitalize'>{type}</p>
            <button type="submit" className='py-1 px-3 flex gap-2 place-items-center pointer'>
              <FontAwesomeIcon icon={faPaperPlane}/>
              <span>Kirim</span>
            </button>
          </div>
          <table className='w-full h-full'>
            <tbody>
              <tr>
                <td>Dari</td>
                <td>{myProfile.nickname}#{myProfile.tag}</td>
              </tr>
              <tr>
                <td>Kepada</td>
                <td>
                  <div className='flex flex-wrap'>
                  {kepadaBoxElement}
                  </div>
                  <div className='relative'>
                    <input type="text" className='w-full mt-2' value={search} onChange={(e) => setSearch(e.target.value)}/>
                    {search && 
                      <div className='absolute bg-primary rounded p-1 shadow w-full mt-2 gap-y-2 flex flex-col'>
                        {searchBoxElement}
                      </div>
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td>Subjek</td>
                <td>
                  {type === 'tulis' ? <input type="text" className='w-full mt-2' value={subject} onChange={(e) => setSubject(e.target.value)}/> : <p>{mail.subjek}</p>}
                </td>
              </tr>
              <tr>
                <td colSpan={'2'} className='h-full'>
                  <textarea value={bodyMail} onChange={(e) => setBodyMail(e.target.value)} className='w-full h-full mt-5' placeholder={`${type === 'tulis' ? 'Tulis surat' : 'Tambahkan catatan'}`}/>
                </td>
              </tr>
            </tbody>
          </table>
          {type === 'teruskan' &&
            <div className='mt-5'>
              <div className='flex flex-col mb-4'>
                <p className='uppercase'>----Surat yang diteruskan----</p>
                <p>Dari {mail.pengirim.nama}</p>
                <p>{format(parseISO(mail.createdAt), 'EEE, d MMMM, HH.mm', { locale: id })}</p>
                <p>Subjek {mail.subjek}</p>
                <p>Penerima {myProfile.nickname}#{myProfile.tag}</p>
              </div>
              <Markdown>
                {mail.body}
              </Markdown>
            </div>
          }
        </form>
      </Modal>
  )
}

function Balas({mail, open, close, cb}) {
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
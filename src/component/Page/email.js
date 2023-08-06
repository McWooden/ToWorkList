import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPenToSquare, faRotate } from '@fortawesome/free-solid-svg-icons'
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
  const [openTulis, setOpenTulis] = useState(false)
  const myProfile = useSelector(state => state.source?.profile)
  const [kepadaBox, setKepadaBox] = useState([])
  const [kepadaBoxElement, setKepadaBoxElement] = useState([])
  const [search, setSearch] = useState('')
  const [searchBox, setSearchBox] = useState([])
  const [searchBoxElement, setSearchBoxElement] = useState([])
  
  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      pengirim: {
        nama: `${myProfile.nickname}#${myProfile.tag}`,
        avatar: myProfile.avatar,
        _id: myProfile._id
      },
      penerima: kepadaBox,
      subject: subject,
      body: bodyMail
    }
    try {
      const response = await axios.post(API+'/mail/send', data)
      if (response.status !== 201) throw new Error()
      setOpenTulis(false)
      setKepadaBox([])
      setSubject([])
      setBodyMail('')
      setSearch('')
      blankToast('Surat berhasil terkirim!')
    } catch (error) {}
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

  const [subject, setSubject] = useState('')
  const [bodyMail, setBodyMail] = useState('')

  return (
    <div className={`base-left of-auto zi-1 flex-1 ${hideLeftBase?'base-left-hide':'base-left-show'} fd-column d-flex p-2`}>
      <Greeting/>
      <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setOpenTulis(true)}>
        <FontAwesomeIcon icon={faPenToSquare}/>
        <span>Tulis</span>
      </div>
      <Modal open={openTulis} close={() => setOpenTulis(false)}>
        <form onSubmit={handleSubmit} className='form-modal p-4 flex flex-col'>
          <div className='flex justify-between'>
          <p>Tulis</p>
          <button type="submit" className='py-1 px-3 flex gap-2 place-items-center'>
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
                <td><input type="text" className='w-full mt-2' value={subject} onChange={(e) => setSubject(e.target.value)}/></td>
              </tr>
              <tr>
                <td colSpan={'2'} className='h-full'>
                  <textarea value={bodyMail} onChange={(e) => setBodyMail(e.target.value)} className='w-full h-full mt-5' placeholder='Tulis surat'/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </div>
  )
}

function MailRight() {
  const [mails, setMails] = useState([])
  const [mailsElement, setMailsElement] = useState([])
  const myId = useSelector(state => state.source.profile._id)
  const fetchData = useCallback(async() => {
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
          box.push(<div key={index} className='flex flex-nowrap'>
            <span>{data.penerima.name}</span>
            <span>{data.subjek}</span>
            <span>{data.body}</span>
          </div>)
        }
      )
    } catch (error) {
      console.log(error);
    }
    setMailsElement(box)
  }, [mails])
  useEffect(() => {
      fetchData()
  }, [fetchData])
  
  return (
    <div className="base-center p-relative of-auto p-2 flex flex-col">
      <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 self-end pointer' onClick={fetchData}>
        <FontAwesomeIcon icon={faRotate}/>
        <span>Segarkan</span>
      </div>
      {mailsElement}
    </div>
  )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useState } from "react"
import { blankToast } from '../../../utils/notif'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { API, url } from '../../../utils/variableGlobal'
import { Modal } from '../../Modal/Modal'
import { format, parseISO } from 'date-fns'
import id from 'date-fns/locale/id'
import Markdown from 'markdown-to-jsx'

export default function KirimSurat({mail, open, close, type}) {
    const myProfile = useSelector(state => state.source?.profile)
    const [kepadaBox, setKepadaBox] = useState([])
    const [kepadaBoxElement, setKepadaBoxElement] = useState([])
    const [search, setSearch] = useState('')
    const [searchBox, setSearchBox] = useState([])
    const [searchBoxElement, setSearchBoxElement] = useState([])
    const [subjek, setSubjek] = useState('')
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
        subjek: type === 'teruskan' ? mail.subjek : subjek,
        body: type === 'teruskan' ? `${bodyMail}\n----SURAT YANG DITERUSKAN----\nDari ${mail.pengirim.nama}\n${format(parseISO(mail.createdAt), 'EEE, d MMMM, HH.mm', { locale: id })}\nSubjek ${mail.subjek}\nPenerima ${myProfile.nickname}#${myProfile.tag}\n${mail.body}` : bodyMail
      }
      try {
        console.log(subjek)
        const response = await axios.post(API+'/mail/send', data)
        if (response.status !== 201) throw new Error()
        close()
        setKepadaBox([])
        setSubjek('')
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
                    {type === 'tulis' ? <input type="text" className='w-full mt-2' value={subjek} onChange={(e) => setSubjek(e.target.value)}/> : <p>{mail.subjek}</p>}
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
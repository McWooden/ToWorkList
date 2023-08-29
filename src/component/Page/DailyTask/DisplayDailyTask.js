import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faCircle, faCircleCheck, faEllipsisVertical, faRotate, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useRef } from "react"
import axios from "axios"
import { API } from '../../../utils/variableGlobal'
import { useState } from "react"
import MyLoading from '../../../utils/myLoading'
import { useSelector } from 'react-redux'
import { blankToast, loadingToast } from '../../../utils/notif'
import { toast } from 'react-toastify'
import DailyTaskEditor from './DailyTaskEditor'
import { Confirm } from '../../Modal/Confirm'
import SearchDaily from './SearchDaily'

export default function TaskContainer() {
  const [list, setlist] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const divRef = useRef(null)
  const fetchData = useCallback(async() => {
    setIsLoading(true)
    const promise = loadingToast('Memuat')
    try {
      await axios.get(API+'/daily/task/all').then(res => {
        setlist(res.data.all)
      }).catch(err => console.log(err))
    } catch (error) {}
    toast.dismiss(promise)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  },[fetchData])

  return (
    <>
    <div className='flex gap-2' ref={divRef}>
      <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setIsEditorOpen(prev => !prev)}>
        <FontAwesomeIcon icon={faCheckToSlot}/>
        <span>{isEditorOpen?'Tutup':'Tambah'}</span>
      </div>
      <div className='flex-1 bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer self-end my-2' onClick={() => fetchData()}>
        <FontAwesomeIcon icon={faRotate}/>
        <span>Segarkan</span>
      </div>
    </div>
    <DailyTaskEditor open={isEditorOpen} cb={fetchData} close={() => setIsEditorOpen(false)}/>
    <div className='flex-1 flex flex-col pb-[38px]'>
      {isLoading && <MyLoading className='mb-2'/>}
      {list.map((item, index) => <Task data={item} key={index} cb={fetchData}/>)}
      <SearchDaily/>
    </div>
    </>
  )
}
  
function Task({data, cb}) {
  const userId = useSelector(state => state.source.profile._id)
  const [thisData, setThisData] = useState(data)
  const [dropDown, setDropDown] = useState(false)
  const [maxScore, setMaxScore] = useState(0)
  let menuRef = useRef()
  let btnRef = useRef()
  useEffect(() => {
    let handler = (e) => {
        try {
            if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) {
                return
            } else {
                setDropDown(false)
            }
        } catch (error) {
            
        }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])
  useEffect(() => {
    setMaxScore(Math.max(...data.list.map(x => x.check.length)))
  },[data])
  async function handleDelete() {
    const promise = loadingToast('Menghapus tugas')
    try {
      console.log(API+'/daily/task/'+data._id);
      await axios.delete(API+'/daily/task/'+data._id)
      .then(res => {
        blankToast('Tugas berhasil dihapus')
        cb()
      })
      .catch(err => {
        console.log(err);
        blankToast('Tugas gagal dihapus')
      })
    } catch (error) {
      console.log(error)
    }
    toast.dismiss(promise)
  }
  const [deleteOpen, setDeleteOpen] = useState(false)
  async function reverseList(listId) {
    const dataToSend = {
      _id: userId
    }
    const promise = loadingToast('Centang')
    try {
      await axios.put(API+`/daily/task/reverse/${data._id}/${listId}`, dataToSend)
      .then(res => {
        setThisData(res.data.task)
      })
      .catch(err => {
        console.log(err)
        blankToast(err.data.error)
      })
    } catch (error) {
      console.log(error)
    }
    toast.dismiss(promise)
  }
  return (
    <>
    <div className='bg-primary-dark-50 rounded-md p-4 mb-2'>
      <div className='mb-2'>
        <div className='mb-3 relative flex items-center'>
          <p className='flex-1'>{data.detail.title}</p>
          {data.author._id === userId && 
          <>
          <div className="card-more d-flex ai-center" ref={btnRef}>
            <FontAwesomeIcon icon={faEllipsisVertical} className='p-2 ai-center-btn pointer' onClick={() => setDropDown(!dropDown)}/>
          </div>
          <div className={`card-drop-down zi-1 ${dropDown?'active':'inactive'}`} ref={menuRef}>
                    <ul className='d-flex fd-column of-hidden p-absolute pointer bg-primary border-burlywood text-zinc-300'>
                        <li className='d-flex ai-center hover:brightness-110 py-2' onClick={() => setDeleteOpen(true)}>
                            <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                            <span>delete</span>
                        </li>
                    </ul>
                </div>
          </>
          }
        </div>
        {thisData.list.map((item, index) => <TaskList data={item} key={index} cb={reverseList} maxScore={maxScore}/>)}
      </div>
      <p className='text-end text-xs'>by {data.author.name}</p>
    </div>
    <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={data.detail.title} metode='delete' callback={handleDelete} color='greenyellow'/>
    </>
  )
}
  
function TaskList({data, cb, maxScore}) {
  const userId = useSelector(state => state.source.profile._id)
  const check = data.check.includes(userId) || false
  const [widthBar, setWidthBar] = useState('w-0')
  function reverseCheck() {
    cb(data._id)
  }
  useEffect(() => {
    if (!data.check.length) return
    setWidthBar(`w-${data.check.length}/${maxScore}`)
  },[data, maxScore])
  return (
    <div className='flex flex-col w-full mb-2 pointer' onClick={reverseCheck}>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={check?faCircleCheck:faCircle} className={`transition-ease mr-2 ring-1 text-xl ${check ? 'text-ok ring-[#0d7377]' : 'ring-white text-transparent'} rounded-full `}/>
        <p className='flex-1'>{data.title}</p>
        {data.check.length !== 0 && (
            <div className='text-sm flex gap-1 items-center text-white/[.6]'>
              <span>{data.check.length}</span>
              <FontAwesomeIcon icon={faUser}/>
            </div>
          )
        }
      </div>
      <div className='pl-5'>
        <div className='bg-primary-dark-25 w-full h-[12px] rounded-lg overflow-hidden'>
          <div className={`h-full ${widthBar} bg-ok`}/>
        </div>
      </div>
    </div>
  )
}
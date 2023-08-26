import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faCircle, faCircleCheck, faRotate, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect } from "react"
import axios from "axios"
import { API } from '../../../utils/variableGlobal'
import { useState } from "react"
import MyLoading from '../../../utils/myLoading'
import { useSelector } from 'react-redux'
import { blankToast, loadingToast } from '../../../utils/notif'
import { toast } from 'react-toastify'
import DailyTaskEditor from './DailyTaskEditor'



export default function TaskContainer() {
  const [list, setlist] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
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
    <div className='flex gap-2'>
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
      {list.map((item, index) => <Task data={item} key={index}/>)}
      <div className={`center-action-btn self-end d-flex p-fixed ai-center text-primary`}>
        <div className="action-add">
            <FontAwesomeIcon icon={faSearch} className='add-btn pointer bg-burlywood' />
        </div>
      </div>
    </div>
    </>
  )
}
  
function Task({data}) {
  const userId = useSelector(state => state.source.profile._id)
  const [thisData, setThisData] = useState(data)
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
        <p className='mb-3'>{data.detail.title}</p>
        {thisData.list.map((item, index) => <TaskList data={item} key={index} cb={reverseList}/>)}
      </div>
      <p className='text-end text-xs'>by {data.author.name}</p>
    </div>
    </>
  )
}
  
function TaskList({data, cb}) {
  const userId = useSelector(state => state.source.profile._id)
  const check = data.check.includes(userId) || false
  function reverseCheck() {
    cb(data._id)
  }
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
          <div className='h-full w-5 bg-ok'/>
        </div>
      </div>
    </div>
  )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faRotate } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useRef } from "react"
import axios from "axios"
import { API } from '../../../utils/variableGlobal'
import { useState } from "react"
import MyLoading from '../../../utils/myLoading'
import { useSelector } from 'react-redux'
import { loadingToast } from '../../../utils/notif'
import { toast } from 'react-toastify'
import DailyTaskEditor from './DailyTaskEditor'
import SearchDaily from './SearchDaily'
import DailyTask from '../../Model/Daily'

export default function TaskContainer() {
  const myId = useSelector(state => state.source.profile._id)
  const [list, setlist] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const divRef = useRef(null)
  const fetchData = useCallback(async() => {
    setIsLoading(true)
    const promise = loadingToast('Memuat')
    try {
      await axios.get(API+`/daily/task/${myId}`).then(res => {
        setlist(res.data.all)
      }).catch(err => console.log(err))
    } catch (error) {}
    toast.dismiss(promise)
    setIsLoading(false)
  }, [myId])

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
    <div className='flex-1 flex flex-col'>
      {isLoading && <MyLoading className='mb-2'/>}
      {list.map(item => <DailyTask data={item} key={item._id} cb={fetchData}/>)}
      <SearchDaily cb={fetchData}/>
    </div>
    </>
  )
}
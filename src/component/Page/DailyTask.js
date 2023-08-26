import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faCircle, faCircleCheck, faRotate, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect } from "react"
import { Greeting } from "../../utils/greeting"
import axios from "axios"
import { API } from '../../utils/variableGlobal'
// import { useDispatch } from "react-redux"
import { useState } from "react"
import MyLoading from '../../utils/myLoading'
import { useSelector } from 'react-redux'
import { blankToast, loadingToast } from '../../utils/notif'
import { toast } from 'react-toastify'


export function DailyTask() {
  return (
    <div className='flex w-full'>
      <DailyTaskLeft/>
      <DailyTaskRight/>
    </div>
  )
}

function DailyTaskLeft() {
  const isLeftSideShow = useSelector(state => state.show.leftSide)
  return (
    <div className={`base-left of-auto zi-1 flex-1 base-left-${isLeftSideShow?'show':'hide'} fd-column d-flex p-2`}>
      <Greeting/>
      <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer'>
        <FontAwesomeIcon icon={faCheckToSlot}/>
        <span>Tambah</span>
      </div>
    </div>
  )
}

function DailyTaskRight() {
  return (
    <div className="flex flex-3 flex-col p-[.5em]">
      <div className="welcome flex flex-col overflow-auto flex-3">
        <TaskContainer/>
      </div>
    </div>
  )
}

function TaskContainer() {
  const [list, setlist] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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
    <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer self-end my-2' onClick={() => fetchData()}>
      <FontAwesomeIcon icon={faRotate}/>
      <span>Segarkan</span>
    </div>
    <div className='flex-1 flex flex-col pb-[38px]'>
      {isLoading && <MyLoading/>}
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
      <p className='text-end text-xs'>by {data.author.nickname}</p>
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
        <p>{data.title}</p>
      </div>
      <div className='pl-5'>
        <div className='bg-primary-dark-25 w-full h-[12px] rounded-lg overflow-hidden'>
          <div className='h-full w-5 bg-ok'/>
        </div>
      </div>
    </div>
  )
}
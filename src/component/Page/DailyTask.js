import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect } from "react"
import { Greeting } from "../../utils/greeting"
import axios from "axios"
import { API } from '../../utils/variableGlobal'
// import { useDispatch } from "react-redux"
import { useState } from "react"
export function DailyTask() {
  const taglines = [
    "Fitur baru akan tersedia",
    "Tunggu sebentar",
    "dikerjakan 24/08/2023",
  ]
  return (
    <div className="flex w-full sm:flex-row flex-col">
      <div className="welcome flex flex-col overflow-auto flex-3">
        <Greeting />
        <span className="welcome_tagline as-flex-start m-4">
            {taglines[Math.floor(Math.random() * taglines.length)]}
        </span>
        <TaskContainer/>
      </div>
    </div>
  )
}

function TaskContainer() {
  const [list, setlist] = useState([])
  const fetchData = useCallback(async() => {
    try {
      await axios.get(API+'/daily/task/all').then(res => {
        setlist(res.data.all)
      }).catch(err => console.log(err))
    } catch (error) {}
  }, [])

  useEffect(() => {
    fetchData()
  },[fetchData])

  return (
    <div className='bg-primary-bright rounded shadow m-4 p-5 flex-1'>
      {list.map((item, index) => <Task data={item} key={index}/>)}
    </div>
  )
}

function Task({data}) {
  return (
    <>
    <div className='bg-primary-dark-50 rounded-md p-4'>
      <div className='mb-2'>
        <p className='mb-3'>{data.detail.title}</p>
        {data.list.map((item, index) => <TaskList data={item} key={index}/>)}
      </div>
      <p className='text-end text-xs'>by {data.author.nickname}</p>
    </div>
    </>
  )
}

function TaskList({data}) {
  const [check, setCheck] = useState(false)
  function reverseCheck() {
    setCheck(!check)
  }
  return (
    <div className='flex flex-col w-full mb-2' onClick={reverseCheck}>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={check?faCircleCheck:faCircle} className={`mr-2 ring-1 ring-white text-lg ${check ? 'text-ok ring-[#0d7377]' : 'text-transparent'} rounded-full `}/>
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
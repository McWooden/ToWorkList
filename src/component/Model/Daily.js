import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faEllipsisVertical, faTrash, faUser, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../../utils/variableGlobal"
import { blankToast, loadingToast } from "../../utils/notif"
import axios from "axios"
import { toast } from "react-toastify"
import Confirm from '../Modal/Confirm'


export default function DailyTask({data, cb}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const userId = useSelector(state => state.source.profile._id)
    const [thisData, setThisData] = useState(data)
    const isAdmin = useSelector(state => state.source.isAdmin)
    const pageType = useSelector(state => state.source.pageType)
    useEffect(() => {
      setThisData(data)
    },[data])
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
      setMaxScore(Math.max(...thisData.list.map(x => x.check.length)))
    },[thisData])
    async function handleDelete() {
      const promise = loadingToast('Menghapus tugas')
      try {
        console.log(pageType);
        await axios.delete(API+`/source/daily/${idPageOfBook}/${data._id}`)
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
      let path
      if (pageType === 'faChartBar') {
        path = API+`/source/daily/reverse/${idPageOfBook}/${data._id}/${listId}`
      } else {
        path = API+`/daily/task/reverse/${data._id}/${listId}`
      }
      const dataToSend = {
        _id: userId
      }
      const promise = loadingToast('Centang')
      try {
        await axios.put(path, dataToSend)
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
    const [showDetail, setShowDetail] = useState(false)
    return (
      <>
      <div className='bg-primary-dark-50 rounded-md p-4 mb-2 scale-fade-in'>
        <div className='mb-2'>
            <div className='mb-3 relative flex'>
              <div className='flex flex-1 pointer flex-col' onClick={() => setShowDetail(prev => !prev)}>
                <div className='flex w-full items-center'>
                  <p className='flex-1'>{data.detail.title}</p>
                  <FontAwesomeIcon icon={showDetail?faChevronDown:faChevronRight} className='p-2 ai-center-btn pointer'/>
                </div>
                {showDetail && <div>
                  <p className='text-sm'>{data.detail.desc}</p>
                </div>}
              </div>
              {(data.author._id === userId || isAdmin) && 
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
          {thisData.list.map((item, index) => <DailyTaskList data={item} key={index} cb={reverseList} maxScore={maxScore}/>)}
        </div>
        <p className='text-end text-xs'>by {data.author.name}</p>
      </div>
      <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={data.detail.title} metode='delete' callback={handleDelete} color='greenyellow'/>
      </>
    )
}

function DailyTaskList({data, cb, maxScore}) {
    const userId = useSelector(state => state.source.profile._id)
    const check = data.check.includes(userId) || false
    const [widthBar, setWidthBar] = useState('flex-0')
    const [empetyBar, setEmpetyBar] = useState('flex-1')
    function reverseCheck() {
      cb(data._id)
    }
    useEffect(() => {
      if (!data.check.length)  {
        setWidthBar('flex-0')
        setEmpetyBar('flex-1')
      }
      setWidthBar(`flex-${data.check.length}`)
      setEmpetyBar(`flex-${maxScore-data.check.length}`)
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
          <div className='bg-primary-dark-25 w-full h-[12px] rounded-lg overflow-hidden flex'>
            <div className={`h-full transition-ease ${widthBar} bg-ok rounded-lg`}/>
            <div className={`h-full transition-ease ${empetyBar} bg-primary-dark-25`}/>
          </div>
        </div>
      </div>
    )
}
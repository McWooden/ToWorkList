import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRotateBack, faCheckToSlot, faCircle, faCircleCheck, faEllipsisVertical, faRotate, faTrash, faUser, faChevronDown, faChevronRight, faLock } from '@fortawesome/free-solid-svg-icons'
import { useRef } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { blankToast, loadingToast } from "../../../utils/notif"
import axios from "axios"
import { API } from "../../../utils/variableGlobal"
import { toast } from "react-toastify"
import { useEffect } from "react"
import MyLoading from '../../../utils/myLoading'
import Confirm from '../../Modal/Confirm'
import { useMemo } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { setPageType, setSource } from '../../../redux/sourceSlice'
import { useDispatch } from 'react-redux'

export default function DisplayDailyContainer() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const source = useSelector(state => state.source.source)
    const list = useSelector(state => state.source?.source?.dailyList || null)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const dispatch = useDispatch()
    const [isReload, setIsReload] = useState(false)
    const isAdmin = useSelector(state => state.source.isAdmin)
    const fetchData = useCallback(async() => {
        setIsLoading(true)
        setIsReload(false)
        const promise = loadingToast('Memuat')
        try {
        await axios.get(`${API}/source/page/${idPageOfBook}`).then(res => {
            dispatch(setPageType(res.data.details.icon))
            dispatch(setSource(res.data))
          }).catch(err => {
            throw new Error(err)
          })
        } catch (error) {
          setIsReload(false)
          setIsLoading(false)
          console.log(error)
        }
        toast.dismiss(promise)
        setIsLoading(false)
    }, [dispatch, idPageOfBook])

    useEffect(() => {
      if (!source) fetchData()
    },[fetchData, source])

    if (isReload) return (<div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
      <FontAwesomeIcon icon={faRotateBack} className="reload_btn" />
    </div>)

    if (!list) return <MyLoading/>

    return (
        <>
        <div className='flex gap-2'>
          {isAdmin ? 
            <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setIsEditorOpen(prev => !prev)}>
                <FontAwesomeIcon icon={faCheckToSlot}/>
                <span>{isEditorOpen?'Tutup':'Tambah'}</span>
            </div>
            :
            <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer'>
                <FontAwesomeIcon icon={faLock}/>
                <span>Admin</span>
            </div>
          }
            <div className='flex-1 bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer self-end my-2' onClick={() => fetchData()}>
                <FontAwesomeIcon icon={faRotate}/>
                <span>Segarkan</span>
            </div>
        </div>
        <DailyTaskEditor open={isEditorOpen} cb={fetchData} close={() => setIsEditorOpen(false)}/>
        <div className='flex-1 flex flex-col'>
          {isLoading ? <MyLoading className='mb-2'/> : list.map((item, index) => <Task data={item} key={index} cb={fetchData}/>)}
        </div>
        </>
    )
}

function DailyTaskEditor({open, cb, close}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const myProfile = useSelector(state => state.source.profile)
    const defaultListJson = useMemo(()=>({title: '', _id: String(+new Date())}),[])
    const [inputJudul, setInputJudul] = useState('')
    const [inputDesc, setInputDesc] = useState('')
    const [thisList, setThisList] = useState([defaultListJson])
    const [errMsg, setErrMsg] = useState('')

    if (!open) return
    function handleOnDragEnd(result) {
        try {
            const { destination, source } = result
            if (source.index === destination.index) return
            
            const items = Array.from(thisList)
            const [recordedItems] = items.splice(source.index, 1)
            items.splice(destination.index, 0, recordedItems)
            setThisList(items)
        } catch (error) {
            console.log(error, result)
        }
    }
    
    function resetForm() {
        setThisList([defaultListJson])
        setInputDesc('')
        setInputJudul('')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (thisList.filter(x => x.title !== '').length === 0) return setErrMsg('Setidaknya memiliki 1 tugas')

        const dataToSend = {
            detail: {
                title: inputJudul,
                desc: inputDesc,
            },
            list: thisList.map((x, i) => ({title: x.title, order: i})).filter(item => item.title !== ''),
            author : {
                name: `${myProfile.nickname}#${myProfile.tag}`,
                _id: myProfile._id,
            }
        }
        const promise = loadingToast('Menambah Tugas harian baru')
        try {
            console.log(dataToSend);
            await axios.post(API+`/source/daily/${idPageOfBook}`, dataToSend)
            .then(res => {
                cb()
                close()
                resetForm()
                blankToast('Tugas harian baru ditambahkan!')
            }).catch(err => {
                throw new Error(err)
            })
        } catch (error) {
            blankToast('Tugas harian baru Gagal ditambahkan!')
            console.log(error)
        }
        toast.dismiss(promise)
    }

    function handleInput(value, _id) {
        const updatedArray = thisList.map(item => {
            if (item._id === _id) {
                return { ...item, title: value }
            }
            return item
        })
    
        if (updatedArray.length > 0 && updatedArray[updatedArray.length - 1].title) {
            updatedArray.push({_id: String(+new Date()), title: ''})
        }
    
        setThisList(updatedArray)
    }

    function handleDeleteEmpty() {
        setErrMsg('')
        const updatedArray = thisList.filter((item, index) => item.title !== '' || index === thisList.length - 1)
        setThisList(updatedArray)
    }
    
    return (
        <form onSubmit={handleSubmit} className='form-modal overflow-unset-important p-4 flex flex-col bg-primary-dark-50 rounded-md mb-2 flex-2'>
            <div className='flex flex-col'>
                <label htmlFor="titleField">Judul</label>
                <input type="text" id="titleField" placeholder='Judul Tugas' value={inputJudul} onChange={(e) => setInputJudul(e.target.value)} required autoComplete='false'/>
                <label htmlFor="descField">Deskripsi (Opsional)</label>
                <input type="text" id="descField" placeholder='Deskripsi' value={inputDesc} onChange={(e) => setInputDesc(e.target.value)} autoComplete='false'/>
            </div>
            <span className='text-sm text-no'>{errMsg}</span>
            <div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='listInputModel'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className='bg-primary-dark-25 rounded-md p-1'>
                                {thisList.map((data, index) => (
                                    <Draggable key={data._id} draggableId={data._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} className='flex flex-row mb-2'>
                                                <input className='flex-1' type="text" placeholder='Tambah' onChange={(e) => handleInput(e.target.value, data._id)} value={data.title} onBlur={handleDeleteEmpty} autoComplete='false'/>
                                                <div className='w-[45px] flex place-items-center' {...provided.dragHandleProps}>
                                                    <FontAwesomeIcon icon={faBars} className='w-full'/>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className='flex self-end'>
                <button type="submit" className='py-1 px-3 flex gap-2 place-items-center pointer mt-4'>
                    <FontAwesomeIcon icon={faCheckToSlot}/>
                    <span>Tambah</span>
                </button>
            </div>
        </form>
    )
}

function Task({data, cb}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const userId = useSelector(state => state.source.profile._id)
    const [thisData, setThisData] = useState(data)
    const isAdmin = useSelector(state => state.source.isAdmin)
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
        console.log(API+`/source/daily/${idPageOfBook}/${data._id}`)
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
      const dataToSend = {
        _id: userId
      }
      const promise = loadingToast('Centang')
      try {
        await axios.put(API+`/source/daily/reverse/${idPageOfBook}/${data._id}/${listId}`, dataToSend)
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
      <div className='bg-primary-dark-50 rounded-md p-4 mb-2'>
        <div className='mb-2'>
            <div className='mb-3 relative flex items-center'>
              <div className='flex flex-1 items-center pointer flex-col' onClick={() => setShowDetail(prev => !prev)}>
                <div className='flex w-full items-center'>
                  <p className='flex-1'>{data.detail.title}</p>
                  <FontAwesomeIcon icon={showDetail?faChevronDown:faChevronRight} className='p-2 ai-center-btn pointer'/>
                </div>
                {isAdmin && <div>
                  <p className='text-sm'>{data.detail.desc}</p>
                </div>}
              </div>
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
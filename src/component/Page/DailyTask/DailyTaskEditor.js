import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCheckToSlot } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { blankToast, loadingToast } from '../../../utils/notif'
import { toast } from 'react-toastify'
import { API } from '../../../utils/variableGlobal'


export default function DailyTaskEditor({open, cb, close}) {
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
            },
            followers: [{
                name: `${myProfile.nickname}#${myProfile.tag}`,
                avatar: myProfile.avatar
            }]
        }
        const promise = loadingToast('Menambah Tugas harian baru')
        try {
            console.log(dataToSend);
            await axios.post(API+'/daily/task/create', dataToSend)
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
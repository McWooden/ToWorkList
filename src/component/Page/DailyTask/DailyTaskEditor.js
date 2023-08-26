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
    const defaultListJson = useMemo(()=>({_id: String(+new Date()), value: ''}),[])
    const [inputJudul, setInputJudul] = useState('')
    const [inputDesc, setInputDesc] = useState('')
    const [list, setList] = useState([defaultListJson])
    const [errMsg, setErrMsg] = useState('')
    function handleOnDragEnd(result) {
        try {
            const { destination, source } = result
            if (source.index === destination.index) return
            
            const items = Array.from(list)
            const [recordedItems] = items.splice(source.index, 1)
            items.splice(destination.index, 0, recordedItems)
            setList(items)
        } catch (error) {
            console.log(error, result)
        }
    }
    
    function resetForm() {
        setList([defaultListJson])
        setInputDesc('')
        setInputJudul('')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (list.filter(x => x.value !== '').length === 0) return setErrMsg('Setidaknya memiliki 1 tugas')
        handleDeleteEmpty()

        const {nickname, tag, _id, avatar} = myProfile
        const dataToSend = {
            detail: {
                title: inputJudul,
                desc: inputDesc,
            },
            list: list.map(x => ({title: x.value, order: 1})),
            author: {
                name: `${nickname}#${tag}`,
                _id: _id,
            },
            followers: [{
                name: `${nickname}#${tag}`,
                avatar: avatar
            }]
        }
        const promise = loadingToast('Menambah Tugas harian baru')
        try {
            await axios.post(API+'/daily/task/create', dataToSend)
            .then(res => {
                cb()
                close()
                resetForm()
                blankToast('Tugas harian baru ditambahkan!')
            }).cath(err => {
                throw new Error(err)
            })
        } catch (error) {
            blankToast('Tugas harian baru Gagal ditambahkan!')
            console.log('asw gagal', error);
        }
        toast.dismiss(promise)
    }

    function handleInput(value, _id) {
        const updatedArray = list.map(item => {
            if (item._id === _id) {
                return { ...item, value: value }
            }
            return item
        })
    
        if (updatedArray.length > 0 && updatedArray[updatedArray.length - 1].value) {
            updatedArray.push({_id: String(+new Date()), value: ''})
        }
    
        setList(updatedArray)
    }

    function handleDeleteEmpty() {
        setErrMsg('')
        const updatedArray = list.filter((item, index) => item.value !== '' || index === list.length - 1)
        setList(updatedArray)
    }
    
    
    if (!open) return
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
                                {list.map((data, index) => (
                                    <Draggable key={data._id} draggableId={data._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} className='flex flex-row mb-2'>
                                                <input className='flex-1' type="text" placeholder='Tambah' onChange={(e) => handleInput(e.target.value, data._id)} value={data.value} onBlur={handleDeleteEmpty} autoComplete='false'/>
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
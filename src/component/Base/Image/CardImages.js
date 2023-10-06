import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faFloppyDisk, faXmark, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react'
import { setImages, setTodo } from '../../../redux/todo'
import { blankToast, imageToast, loadingToast } from '../../../utils/notif'
import { API } from '../../../utils/variableGlobal'
import { FileDrop } from '../../Modal/FileDrop'
import axios from 'axios'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Image } from './Image'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export function CardImages() {
    const nickname = useSelector(state => state.source.profile.nickname)
    const userId = useSelector(state => state.source.profile._id)
    const channel = useSelector(state => state.channel.book)
    const idBook = useSelector(state => state.fetch.idBook)
    const todoId = useSelector(state => state.todo.id)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoImages = useSelector(state => state.todo.images)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [list, setList] = useState(todoImages)
    const [saveIt, setSaveIt] = useState(false)
    const isAdmin = useSelector(state => state.source.isAdmin)    
    const [isOrderMode, setIsOrderMode] = useState(false)

    const handleSourceToListSorted = useCallback((dataToSort) => {
        const sortedList = dataToSort ? [...todoImages].sort((a, b) => a.order - b.order) : []
        setList(sortedList)
    }, [todoImages])

    useEffect(() => {
        handleSourceToListSorted(todoImages)
    }, [handleSourceToListSorted, todoImages])

    function handleOnDragEnd(result) {
        try {
            const { destination, source } = result
            if (source.index === destination.index) return
            
            const items = Array.from(list)
            const [recordedItems] = items.splice(source.index, 1)
            items.splice(destination.index, 0, recordedItems)
            setList(items)

            const sortedReduxList = [...todoImages].sort((a, b) => a.order - b.order)
            const changesDetected = sortedReduxList.some((e, i) => e._id !== items[i]._id)
            setSaveIt(changesDetected)
        } catch (error) {
            console.log(error)
        }
    }

    const date = convertDateToString(new Date().toLocaleDateString())
    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
    // file drop
    const fileInput = useRef(null)
    const[image, setImage] = useState(null)
    const[previewUrl, setPreviewUrl] = useState('')
    const handleFile = file => {
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleOndragOver = event => {
        event.preventDefault()
    }
    const handleOndrop = event => {
        event.preventDefault()
        event.stopPropagation()
        let imageFile = event.dataTransfer.files[0]
        handleFile(imageFile)
    }
    // form
    const formRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nickname', nickname)
        formData.append('_id', userId)
        formData.append('image', image)
        formData.append('desc', e.target.desc.value)
        const promise = loadingToast('Mengunggah gambar')
        setIsFetching(true)
        try {
            await axios.post(`${API}/image/${idBook}/${idPageOfBook}/${todoId}`, formData)
            .then(res => {
                imageToast()
                setModalOpen(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
                dispatch(setTodo(res.data))
                channel.send({
                    type: 'broadcast',
                    event: `${idPageOfBook}/${todoId}:shouldUpdate`,
                    payload: `${nickname} menambahkan foto`,
                })
            })
            .catch(err => {
                imageToast('gambar gagal ditambahkan')
            }).finally(() => {
                toast.dismiss(promise)
                setIsFetching(false)
            })
        } catch(err) {
            toast.dismiss(promise)
            setIsFetching(false)
        }
    }
    useEffect(() => {
        channel.on('broadcast', {event: `${idPageOfBook}/${todoId}:imagesUpdate`}, payload => {
            try {
                const data = todoImages
                
                data.map(item => {
                    const thisItem = item
                    const contain = payload.payload.newOrder.find(x => x._id === item._id)
                    if (contain) thisItem.order = contain.order
                    return thisItem
                })
                
                dispatch(setImages(data))
                
                blankToast(payload.payload.message)
            } catch (err) {}
        })
    }, [channel, dispatch, handleSourceToListSorted, idPageOfBook, todoId, todoImages])
    async function handleSaveIt() {
        const dataToSend = {newOrder: list.map((data, index) => ({_id: data._id, order: index}))}
        const promise = loadingToast('Menyimpan susunan')
        try {
            await axios.put(API+`/order/images/${idPageOfBook}/${todoId}`, dataToSend)
            .then(res => {
                blankToast("Susunan berhasil disimpan")
                setSaveIt(false)
                channel.send({
                    type: 'broadcast',
                    event: `${idPageOfBook}/${todoId}:imagesUpdate`,
                    payload: {...dataToSend, message: `${nickname} mengubah susunan gambar`},
                })
            }).catch(err => {
                console.log(err)
                
            }).finally(() => toast.dismiss(promise))
        } catch (error) {
            toast.dismiss(promise)
        }
    }
    function handleCancelSaveIt() {
        handleSourceToListSorted(todoImages)
        setSaveIt(false)
    }
    const [isFetching, setIsFetching] = useState(false)
    return (
        <div className='images-container d-flex fd-column items-end gap-2'>
            {list?.length !== 0 &&
                <FontAwesomeIcon icon={isOrderMode ? faXmark : faPenToSquare} className='pointer min-w-[16px]' onClick={() => setIsOrderMode(!isOrderMode)}/>
            }
            {isOrderMode && saveIt && (
                <div className='flex bg-info shadow m-2 rounded items-center self-stretch'>
                    {isAdmin ?
                        <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]" onClick={handleSaveIt}>
                            <FontAwesomeIcon icon={faFloppyDisk}/>
                            <p>Simpan susunan</p>
                        </div>
                        :
                        <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]">
                            <FontAwesomeIcon icon={faLock}/>
                            <p>Admin</p>
                        </div>
                    }
                    
                    <div className="h-[45px] flex justify-center shadow items-center gap-x-2 text-xs rounded m-2 pointer bg-no flex-1" onClick={handleCancelSaveIt}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                </div>
            )}
            <div className='self-stretch'>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='imageModel'>
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className={`list-none flex ${isOrderMode ? 'flex-col self-stretch' : 'flex-wrap'} gap-1`}>
                        {list?.map((data, index) => (
                            <Draggable key={data._id} draggableId={data._id} index={index} isDragDisabled={!isOrderMode}>
                                {(provided) => (
                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`${!isOrderMode && 'basis-36'} grow`}>
                                        <Image data={data} />
                                    </li>
                                )}
                            </Draggable>
                        ))||''}
                        {provided.placeholder}
                        </ul>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>

            {isAdmin? 
            <div className='add-image pointer flex justify-center gap-x-1 items-center bg-info' onClick={handleModalOpen}>
                <FontAwesomeIcon icon={faImage}/>
                <span>Foto baru</span>
            </div>
            :
            <div className='add-image pointer flex justify-center gap-x-1 items-center bg-info'>
                <FontAwesomeIcon icon={faLock}/>
                <span>Admin</span>
            </div>
            }
            <FileDrop open={modalOpen} close={handleModalClose}>
                <form ref={formRef} className='file-drop d-flex of-scroll' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                    <div className="img-view d-flex ai-center jc-center" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                    { previewUrl ? 
                        <img src={previewUrl} alt={image.name} /> 
                    :
                        <div className="drop-zone d-flex fd-column ai-center jc-center p-relative pointer border-8 border-zinc-600 border-dashed">
                            <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                            <p className='drop-text p-absolute'>Click atau drop disini</p>
                            <input 
                                type="file" 
                                accept='image/*' 
                                ref={fileInput} hidden 
                                onChange={e => handleFile(e.target.files[0])}
                            />
                        </div>
                    }
                    </div>
                    <div className="img-form jc-center d-flex fd-column p-2">
                        <div className="general-info">
                            <h3>Menambah foto</h3>
                            <p className='date'>{date}</p>
                        </div>
                        <span className='url-image mb-2'>{previewUrl? previewUrl : 'Url Image'}/-</span>
                        <textarea placeholder='deskripsi' rows="10"name='desc' className='p-2'/>
                        {isFetching?
                            <button className='task-submit pointer'>Loading...</button>
                            :
                            <button className='task-submit pointer' onClick={() => formRef.current.submit}>Tambah</button>
                        }
                    </div>
                </form>
            </FileDrop>
        </div>
    )
}
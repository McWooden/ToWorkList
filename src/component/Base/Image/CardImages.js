import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { setTodo } from '../../../redux/todo'
import { imageToast, loadingToast } from '../../../utils/notif'
import { API } from '../../../utils/variableGlobal'
import { FileDrop } from '../../Modal/FileDrop'
import axios from 'axios'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Image } from './Image'
import { useSelector, useDispatch } from 'react-redux'

export function CardImages() {
    const nickname = useSelector(state => state.source.profile.nickname)
    const channelTodoDetail = useSelector(state => state.channel.todoDetail)
    const idBook = useSelector(state => state.fetch.idBook)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todo = useSelector(state => state.todo)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const box = []
    todo.images.forEach((data, index) => {
        box.push(
            <Image key={index} data={data}/>
        )
    })
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
        formData.append('image', image)
        formData.append('desc', e.target.desc.value)
        const promise = loadingToast('Mengunggah gambar')
        setIsFetching(true)
        try {
            await axios.post(`${API}/image/${idBook}/${idPageOfBook}/${todo.id}`, formData)
            .then(res => {
                imageToast()
                setModalOpen(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
                dispatch(setTodo(res.data))
                channelTodoDetail.send({
                    type: 'broadcast',
                    event: 'shouldUpdate',
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
    const [isFetching, setIsFetching] = useState(false)
    return (
        <div className='images-container d-flex fd-column'>
            <div className='images-list d-flex fw-wrap'>
                {box}
            </div>
            <div className='add-image pointer flex justify-center gap-x-1 items-center bg-info' onClick={handleModalOpen}>
                <FontAwesomeIcon icon={faImage}/>
                <span>Foto baru</span>
            </div>
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
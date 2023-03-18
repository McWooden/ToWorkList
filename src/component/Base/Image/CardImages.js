import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faImage } from '@fortawesome/free-solid-svg-icons'
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
        <div className='images-container'>
            <div className='images-list'>
                {box}
            </div>
            <FontAwesomeIcon icon={faPlus} className='add-image' onClick={handleModalOpen}/>
            <FileDrop open={modalOpen} close={handleModalClose}>
                <form ref={formRef} className='file-drop' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                    <div className="img-view" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                    { previewUrl ? 
                        <img src={previewUrl} alt={image.name} /> 
                    :
                        <div className="drop-zone">
                            <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                            <p className='drop-text'>click atau drop disini</p>
                            <input 
                                type="file" 
                                accept='image/*' 
                                ref={fileInput} hidden 
                                onChange={e => handleFile(e.target.files[0])}
                            />
                        </div>
                    }
                    </div>
                    <div className="img-form">
                        <div className="general-info">
                            <h3>Menambah foto</h3>
                            <p className='date'>{date}</p>
                        </div>
                        <span className='url-image'>{previewUrl? previewUrl : 'Url Image'}/-</span>
                        <textarea placeholder='deskripsi' rows="10"name='desc'/>
                        {isFetching?
                            <button className='task-submit'>Loading...</button>
                            :
                            <button className='task-submit' onClick={() => formRef.current.submit}>Tambah</button>
                        }
                    </div>
                </form>
            </FileDrop>
        </div>
    )
}
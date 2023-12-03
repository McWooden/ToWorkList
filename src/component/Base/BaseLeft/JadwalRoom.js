import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faChevronRight, faGear} from '@fortawesome/free-solid-svg-icons'
import { setJadwalSource } from '../../../redux/sourceSlice';
import { toast } from 'react-toastify'
import { url, API } from '../../../utils/variableGlobal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { convertDateToString } from '../../../utils/convertDateFormat';
import axios from 'axios';
import { FileDrop } from '../../Modal/FileDrop';
import { imageToast } from '../../../utils/notif';
import { loadingToast } from '../../../utils/notif';
import { ModalSecond } from '../../Modal/ModalSecond';


export function JadwalRoom() {
    const idBook = useSelector(state => state.fetch.idBook)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const jadwalUrl = useSelector(state => state.source.source.details.jadwal_url)
    const [full, setFull] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const date = convertDateToString(new Date().toLocaleDateString())
    
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
    const channel = useSelector(state => state.channel.book)
    const dispatch = useDispatch()
    useEffect(() => {
      channel.on('broadcast', {event: `${idPageOfBook}:newJadwal`}, payload => {
        dispatch(setJadwalSource(payload.payload))
      })
    }, [channel, dispatch, idPageOfBook])
    
    // form
    const formRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('jadwal_url', jadwalUrl)
        const promise = loadingToast('Mengunggah gambar')
        try {
            await axios.post(`${API}/image/jadwal/${idBook}/${idPageOfBook}`, formData)
            .then(res => {
                dispatch(setJadwalSource(res.data.jadwal_url))
                channel.send({type: 'broadcast', event: `${idPageOfBook}:newJadwal`, payload: res.data.jadwal_url})
                imageToast('jadwal diperbarui')
                setModalOpen(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
            }).catch(err => {
                imageToast('jadwal gagal diperbarui')
            }).finally(() => {
                toast.dismiss(promise)
                setIsFetching(false)
            })
        } catch (error) {
            toast.dismiss(promise)
            setIsFetching(false)
        }
    }
    const [isFetching, setIsFetching] = useState(false)
    return (
        <div className="jadwal d-flex fd-row of-hidden p-relative shadow bg-primary-dark-50">
            <div className='preview relative w-10'>
                <img src={`${url}/${jadwalUrl}`} alt="jadwal" loading='lazy' className='h-10 w-10 absolute right-0 left-0 bottom-0 top-0'/>
                <div className="setting pointer d-flex jc-center ai-center shadow absolute right-0 left-0 bottom-0 top-0" onClick={() => setModalOpen(true)}>
                    <FontAwesomeIcon icon={faGear} className='setting-btn'/>
                </div>
            </div>
            <div className="open-jadwal pointer d-flex jc-space-between ai-center" onClick={() => setFull(true)}>
                <p>Jadwal</p>
                <FontAwesomeIcon icon={faChevronRight} className='jadwal-arrow'/>
            </div>
            <FileDrop open={modalOpen} close={() => setModalOpen(false)}>
                <form ref={formRef} className='file-drop d-flex of-scroll jadwal-form' onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                    <div className="img-view d-flex ai-center jc-center" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                    { previewUrl ? 
                        <img src={previewUrl} alt={image.name} loading="lazy"/> 
                    :
                        <div className="drop-zone d-flex fd-column ai-center jc-center p-relative pointer border-8 border-zinc-600 border-dashed">
                            <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                            <p className='drop-text p-absolute'>click atau drop disini</p>
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
                            <h3>Memperbarui jadwal</h3>
                            <p className='date'>{date}</p>
                        </div>
                        <span className='url-image'>{previewUrl? previewUrl : 'Url Image'}/-</span>
                        {isFetching?
                        <button className='task-submit pointer'>Loading...</button>
                        :
                        <button className='task-submit pointer' onClick={() => formRef.current.submit}>Perbarui</button>
                        }
                    </div>
                </form>
            </FileDrop>
            <ModalSecond open={full} close={() => setFull(false)}>
                <div onClick={() => setFull(false)} className='flex justify-center'>
                    <img src={`${url}/${jadwalUrl}`} alt="jadwal room" className='h-screen' loading="lazy"/>
                </div>
            </ModalSecond>
        </div>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCompass, faSearch, faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { setFetch } from '../../../redux/fetchSlice'
import { setBooksProfile, setGuildProfile, setMembers, setPageType } from '../../../redux/sourceSlice'
import { toast } from 'react-toastify'
import { imageToast, loadingToast } from '../../../utils/notif';
import { ModalSecond } from '../../Modal/ModalSecond'
import { ModalLight } from '../../Modal/ModalLight'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../utils/variableGlobal'
import { AllBookList } from './AllBookList'


export function FindAndCreateBook() {
    const myAccount = useSelector(state => state.source.profile)
    const navigate = useNavigate()
    useEffect(() => {
        !myAccount && navigate('/auth')
    }, [navigate, myAccount])
    const [addServerModal, setAddServerModal] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const dispatch = useDispatch()

    function handleInputChange(e) {
        setSearchText(e.target.value)
    }
    function handleSearch(e) {
        e.preventDefault()
        console.log(searchText)
    }
    function handleModalOpen() { setModalOpen(true) }
    function handleModalClose() { setModalOpen(false) }
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
    const handleRemove = () => {
        formRef.current.reset()
        setImage(null)
        setPreviewUrl('')
    }
    
    // form
    const formRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('data', JSON.stringify({
            book_title: valueJudul,
            author_avatar: myAccount.avatar,
            author: {
                nickname: myAccount.nickname,
                tag: myAccount.tag,
                _id: myAccount._id
            },
        }))
        const promise = loadingToast('Membuat buku')
        try {
            setBtnLoading(true)
            await axios.post(`${API}/image/addBook`, formData)
            .then(res => {
                setModalOpen(false)
                formRef.current.reset()
                setImage(null)
                setPreviewUrl('')
                setAddServerModal(false)
                setValueJudul(`Buku ${myAccount.nickname}`)
                dispatch(setPageType('welcome'))
                dispatch(setFetch({path: res.data.profile.book_title, id: res.data._id}))
                dispatch(setGuildProfile(res.data.profile))
                dispatch(setMembers(null))
                dispatch(setBooksProfile(null))
                imageToast('buku baru dibuat!')
            })
            .catch(err => {
                console.log(err)
            }).finally(() => {
                toast.dismiss(promise)
                setBtnLoading(false)
            })
        } catch(err) {
            setBtnLoading(false)
            toast.dismiss(promise)
        }
    }
    const [btnLoading, setBtnLoading] = useState(false)
    const [valueJudul, setValueJudul] = useState(`Buku ${myAccount?.nickname}`)
    return (
        <>
        <div className='find-create-frame'>
            <div className='home-profile find-create' onClick={handleModalOpen}>
                <FontAwesomeIcon icon={faCompass} className={'nav-icon nav-icon-2'}/>
            </div>
        </div>
        <ModalLight open={modalOpen} close={handleModalClose}>
            <div className="search_book_container">
                <div className="search_book-header">
                    <form onSubmit={handleSearch} className='form-modal'>
                        <div className='search_bar'>
                            <input type="text" value={searchText} onChange={handleInputChange} placeholder="Fitur belum dibuka" />
                            <div className="tiang"/>
                            <button type="submit" className='submit_search'>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>
                    <div className="container-sb_action_btn">
                        <div className="sb_action_btn">
                            <FontAwesomeIcon icon={fontawesome.faRotateBack} className='action_btn' onClick={() => ''}/>
                        </div>
                        <div className="sb_action_btn">
                            <FontAwesomeIcon icon={faPlus} className='action_btn' onClick={() => setAddServerModal(true)}/>
                        </div>
                    </div>
                </div>
                <AllBookList/>
            </div>
        </ModalLight>
        <ModalSecond open={addServerModal} close={() => setAddServerModal(false)}>
            <form className="add_server_container form-modal" ref={formRef} onDragOver={handleOndragOver} onDrop={handleOndrop} onSubmit={handleSubmit}>
                <div className="add_server-body">
                    <h3>Membuat Buku</h3>
                    <p>Beri buku baru anda nama dan pp. Anda juga bisa menggantinya kapan saja nanti</p>
                    <div className="pp_buku">
                        <div className="img-view" onClick = { () => {try{fileInput.current.click()} catch(err){}}}>
                            { previewUrl ? 
                                <>
                                <img src={previewUrl} alt={image.name} /> 
                                <FontAwesomeIcon icon={faXmark} className='remove-icon' onClick={handleRemove}/>
                                </>
                            :
                                <div className="drop-zone">
                                    <FontAwesomeIcon icon={faImage} className='drop-icon'/>
                                    <input 
                                        type="file" 
                                        accept='image/*' 
                                        ref={fileInput} hidden 
                                        onChange={e => handleFile(e.target.files[0])}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <h4>Judul Buku</h4>
                    <input type="text" value={valueJudul} placeholder='Judul' onChange={(e) => setValueJudul(e.target.value)}/>
                </div>
                <div className="add_server-footer addPage_action">
                    <span className='btn_action' onClick={() => setAddServerModal(false)}>Batal</span>
                    {btnLoading?
                    (<button className={`btn_action btn_add`}>Loading...</button>)
                    :
                    (<button type='submit' className={`btn_action btn_add ${valueJudul&&'active'}`}>Buat</button>)
                    }
                </div>
            </form>
        </ModalSecond>
        </>
    )
}
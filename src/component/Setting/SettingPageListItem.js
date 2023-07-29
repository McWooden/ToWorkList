import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect } from 'react'
import { deleteToast, pageToast } from '../../utils/notif'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPageType, setSource } from '../../redux/sourceSlice'
import { setPathPageOfBook } from '../../redux/fetchSlice'
import { Confirm } from '../Modal/Confirm'
import { ModalSecond } from '../Modal/ModalSecond'
import { API } from '../../utils/variableGlobal'

export function SettingPageListItem({data, callback}) {
    const idBook = useSelector((state) => state.fetch.idBook)
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const [openAdd, setOpenAdd] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const formRef = useRef()
    const title = data.details.page_title
    const icon = data.details.icon
    const id = data._id
    const [value, setValue] = useState(title)
    const dispatch = useDispatch()
    const channel = useSelector(state => state.channel.book)
    const nickname = useSelector(state => state.source.profile.nickname)
    function handleClick() {
        dispatch(setSource(null))
        dispatch(setPageType(icon))
        dispatch(setPathPageOfBook({path: title, id}))
        setDropDown(false)
    }
    function handleClose() {
        setOpenAdd(false)
    }
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
    })
    const [dropDown, setDropDown] = useState(false)
    async function handleSubmit(e) {
        setBtnLoading(true)
        e.preventDefault()
        try {
            const response = await axios.put(`${API}/book/${idBook}/page/${id}`, {page_title: value})
            pageToast(`mengganti nama halaman ${title} menjadi ${value}`)
            channel.send({
                type: 'broadcast',
                event: 'pageShouldUpdate',
                payload: `${nickname} mengganti nama halaman ${title} menjadi ${value}`,
            })
            callback(response.data.pages)
            setOpenAdd(false)
            setBtnLoading(false)
        } catch (err) {
            console.log(err)
            setBtnLoading(false)
        }
    }
    let menuRef = useRef()
    let btnRef = useRef()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const active = pathPageOfBook === title
    async function deleteTodo() {
        try {
            await axios.delete(`${API}/book/${idBook}/page/${id}`)
            .then((res) => {
                deleteToast('berhasil dihapus')
                callback(res.data.pages)
                setOpenAdd(false)
                setBtnLoading(false)
                channel.send({
                    type: 'broadcast',
                    event: 'pageShouldUpdate',
                    payload: `${nickname} menghapus halaman ${title}`,
                })
            })
            .catch(err => {
                deleteToast('gagal terhapus')
                setBtnLoading(false)
            })
        } catch(err) {

        }
    }
    return (
        <>
        <div className={`room d-flex ai-center p-relative pointer ${active?'active':''}`}  onClick={() => setDropDown(!dropDown)} ref={btnRef}>
            <FontAwesomeIcon icon={fontawesome[icon]} className={`room d-flex ai-center p-relative pointer-icon ${active?'active':''} ${dropDown?'text-primary':''}`}/>
            <span className={`${active?'active':''} ${dropDown?'text-primary':''}`}>{title}</span>
            <div className={`card-drop-down zi-1 ${dropDown?'active':'inactive'}`} ref={menuRef}>
                <ul className='d-flex fd-column of-hidden p-absolute pointer'>
                    <li className='d-flex ai-center' onClick={handleClick}>
                        <FontAwesomeIcon icon={faEye} className='card-dd-btn' />
                        <span>Pergi</span>
                    </li>
                    <li className='d-flex ai-center' onClick={() => setOpenAdd(true)}>
                        <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn' />
                        <span>Ubah</span>
                    </li>
                    <li className='d-flex ai-center' onClick={() => setDeleteOpen(true)}>
                        <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                        <span>Hapus</span>
                    </li>
                </ul>
            </div>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color='var(--purple-1)' callback={deleteTodo} timeout={10} deleteText={'akan dihapus beserta isinya'}/>
        <ModalSecond open={openAdd} close={handleClose}>
        <div className="addPage">
            <form className="form-modal" onSubmit={handleSubmit} ref={formRef}>
                <div className="addPage_body">
                    <p className='heading'>Halaman</p>
                    <p className='small'>Mengubah halaman <span className='small bold'>{title}</span></p>
                    <div className="pagePreview">
                        <p className='small bold uppercase'>Tipe halaman</p>
                        <div className={`room d-flex ai-center p-relative pointer room-grid d-grid gaf-row active`}>
                            <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon page_icon active`}/>
                            <span className={`page_type active`}>Todo </span>
                            <span className={`page_desc active`}>Daftar, Pesan, Foto, Catatan</span>
                        </div>
                    </div>
                    <p className='small bold uppercase'>Nama halaman</p>
                    <div className={`room d-flex ai-center p-relative pointer d-flex ${value&&'active'}`}>
                        <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon ${value&&'active'}`}/>
                        <input type="text" placeholder={title} onChange={(e) => setValue(e.target.value)} value={value} className={`room_input ${value&&'active'}`} required/>
                    </div>
                </div>
                <div className="addPage_action d-flex jc-flex-end">
                    <span className='btn_action' onClick={handleClose}>Batal</span>
                    {btnLoading?
                    (<button className={`btn_action btn_add`}>Loading</button>)
                    :
                    (<button type='submit' className={`btn_action btn_add ${value&&'active'}`}>Simpan</button>)
                    }
                </div>
            </form>
        </div>
        </ModalSecond>
        </>
    )
}
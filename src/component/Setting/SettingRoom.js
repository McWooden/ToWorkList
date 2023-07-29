import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect, useCallback } from 'react'
import { pageToast } from '../../utils/notif'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ModalSecond } from '../Modal/ModalSecond'
import { API } from '../../utils/variableGlobal'
import { SettingPageListItem } from './SettingPageListItem'

export function SettingRoom() {
    const [openAdd, setOpenAdd] = useState(false)
    const idBook = useSelector((state) => state.fetch.idBook)
    const [pages, setPages] = useState([])
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    const dispatch = useDispatch()
    const dataToElement = useCallback((data) => {
        setPages(
            data.map((item, index) => (
                <SettingPageListItem key={index} data={item} callback={dataToElement}/>
            ))
        )
    }, [])
    const channel = useSelector(state => state.channel.book)
    const fetchData = useCallback(async () => {
        setReloading(false)
        setLoading(true)
        try {
            const response = await axios.get(`${API}/book/${idBook}/get/pages/details`)
            dataToElement(response.data.pages)
        } catch (error) {
            setReloading(true)
        }
        setLoading(false)
    }, [idBook, dataToElement])
    function handleClose() {
        setOpenAdd(false)
    }
    useEffect(() => {
        channel.subscribe()
        channel.on('broadcast', {event: 'pageShouldUpdate'}, payload => {
            fetchData()
        })
        return () => channel.unsubscribe()
    })
    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])
    const [value, setValue] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)
    const formRef = useRef()
    async function handleSubmit(e) {
        setBtnLoading(true)
        e.preventDefault()
        try {
            const response = await axios.post(`${API}/book/${idBook}/page`, {page_title: value, icon: 'faCheck'})
            pageToast(`${value} berhasil dibuat`)
            dataToElement(response.data.pages)
            setValue('')
            setOpenAdd(false)
            setBtnLoading(false)
        } catch (err) {
            setBtnLoading(false)
        }
    }
    const headerElement = (
        <div className="setting_header">
            <h3>Halaman</h3>
            <p>semua halaman dan jumlah tugas</p>
        </div>
    )
    const modalElement = (
        <ModalSecond open={openAdd} close={handleClose}>
        <div className="addPage">
            <form className="form-modal" onSubmit={handleSubmit} ref={formRef}>
                <div className="addPage_body">
                    <p className='heading'>Halaman</p>
                    <p className='small'>Membuat halaman baru</p>
                    <div className="pagePreview">
                        <p className='small bold'>Tipe halaman</p>
                        <div className={`room d-flex ai-center p-relative pointer room-grid d-grid gaf-row active`}>
                            <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon page_icon active`}/>
                            <span className={`page_type active`}>Todo </span>
                            <span className={`page_desc active`}>Daftar, Pesan, Foto, Catatan</span>
                        </div>
                    </div>
                    <p className='small bold'>Nama halaman</p>
                    <div className={`room d-flex ai-center p-relative pointer d-flex ${value&&'active'}`}>
                        <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon ${value&&'active'}`}/>
                        <input type="text" placeholder='halaman baru' onChange={(e) => setValue(e.target.value)} value={value} className={`room_input ${value&&'active'}`} required/>
                    </div>
                </div>
                <div className="addPage_action d-flex jc-flex-end">
                    <span className='btn_action' onClick={handleClose}>Batal</span>
                    {btnLoading?
                    (<button className={`btn_action btn_add`}>Loading</button>)
                    :
                    (<button type='submit' className={`btn_action btn_add ${value&&'active'}`}>Tambahkan</button>)
                    }
                </div>
            </form>
        </div>
        </ModalSecond>
    )

    return(
        <>
        {headerElement}
        <div className='roomList of-auto'>
            {reloading &&
                <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
                    <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                </div>
            }
            {loading && <div className="room d-flex ai-center p-relative pointer loading" />}
            {pages}
        </div>
        <div className="setting_action d-flex">
            <span className="setting_btn d-flex ai-center pointer blue_btn" onClick={() => setOpenAdd(true)}>Tambah Halaman</span>
        </div>
        {modalElement}
        </>
    )
}
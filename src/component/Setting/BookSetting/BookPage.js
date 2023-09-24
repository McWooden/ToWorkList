import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { blankToast, loadingToast, pageToast } from '../../../utils/notif'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ModalSecond } from '../../Modal/ModalSecond'
import { API } from '../../../utils/variableGlobal'
import BookPageListItem from './BookPageListItem'
import { setPages } from '../../../redux/sourceSlice'
import { toast } from 'react-toastify'

export default function BookPage() {
    const [openAdd, setOpenAdd] = useState(false)
    const idBook = useSelector((state) => state.fetch.idBook)
    const nickname = useSelector(state => state.source.profile.nickname)
    const pages = useSelector(state => state.source.pages)
    const [list, setList] = useState(pages)
    const [saveIt, setSaveIt] = useState(false)
    const dispatch = useDispatch()
    const [tipeNewRoom, setTipeNewRoom] = useState('faCheck')
    const isAdmin = useSelector(state => state.source.isAdmin)

    const handleSourceToListSorted = useCallback((dataToSort) => {
        const sortedList = dataToSort ? [...pages].sort((a, b) => a.order - b.order) : []
        setList(sortedList)
    }, [pages])

    useEffect(() => {
        handleSourceToListSorted(pages)
    }, [handleSourceToListSorted, pages])

    const dataToRedux = useCallback((data) => {
        dispatch(setPages(data))
    }, [dispatch])

    const channel = useSelector(state => state.channel.book)

    function handleClose() {
        setOpenAdd(false)
    }

    function handleOnDragEnd(result) {
        try {
            const { destination, source } = result
            if (source.index === destination.index) return
            
            const items = Array.from(list)
            const [recordedItems] = items.splice(source.index, 1)
            items.splice(destination.index, 0, recordedItems)
            setList(items)

            const sortedReduxList = [...pages].sort((a, b) => a.order - b.order)
            const changesDetected = sortedReduxList.some((e, i) => e._id !== items[i]._id)
            setSaveIt(changesDetected)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSaveIt() {
        const dataToSend = {newOrder: list.map((data, index) => ({_id: data._id, order: index}))}
        const promise = loadingToast('Menyimpan susunan')
        try {
            await axios.put(API+`/order/pages/${idBook}`, dataToSend)
            .then(res => {
                blankToast("Susunan berhasil disimpan")
                setSaveIt(false)
                channel.send({
                    type: 'broadcast',
                    event: `${idBook}:pageShouldUpdate`,
                    payload: {...dataToSend, message: `${nickname} mengubah susunan halaman`},
                })
                const order = pages.map((old, i) => {
                    const matchingNew = list.find(newItem => newItem._id === old._id)
                    if (matchingNew) {
                      return { ...old, order: i }
                    }
                    return old
                  })                  
                dispatch(setPages(order))
            }).catch(err => {
                console.log(err)
                
            }).finally(() => toast.dismiss(promise))
        } catch (error) {
            toast.dismiss(promise)
        }
    }
    function handleCancelSaveIt() {
        handleSourceToListSorted(pages)
        setSaveIt(false)
    }

    const [value, setValue] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)
    const formRef = useRef()
    async function handleSubmit(e) {
        setBtnLoading(true)
        e.preventDefault()
        try {
            const response = await axios.post(`${API}/book/${idBook}/page`, {page_title: value, icon: tipeNewRoom})
            pageToast(`${value} berhasil dibuat`)
            dataToRedux(response.data.pages)
            channel.send({
                type: 'broadcast',
                event: 'pageShouldUpdate',
                payload: `${nickname} menambah halaman ${value}`,
            })
            setValue('')
            setOpenAdd(false)
            setBtnLoading(false)
        } catch (err) {
            console.log(err)
            setBtnLoading(false)
        }
    }
    const headerElement = (
        <div className="setting_header">
            <h3>Halaman</h3>
            <p>semua halaman</p>
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
                        <div className={`room d-flex ai-center p-relative pointer room-grid d-grid gaf-row ${tipeNewRoom === 'faCheck' && 'active'}`} onClick={() => setTipeNewRoom('faCheck')}>
                            <FontAwesomeIcon icon={fontawesome['faCheck']} className={`room-icon page_icon`}/>
                            <span className={`page_type active`}>Todo</span>
                            <span className={`page_desc active`}>Daftar, Pesan, Foto, Catatan</span>
                        </div>
                        <div className={`room d-flex ai-center p-relative pointer room-grid d-grid gaf-row ${tipeNewRoom === 'faNoteSticky' && 'active'}`} onClick={() => setTipeNewRoom('faNoteSticky')}>
                            <FontAwesomeIcon icon={fontawesome['faNoteSticky']} className={`room-icon page_icon`}/>
                            <span className={`page_type active`}>Catatan</span>
                            <span className={`page_desc active`}>Catatan</span>
                        </div>
                        <div className={`room d-flex ai-center p-relative pointer room-grid d-grid gaf-row ${tipeNewRoom === 'faChartBar' && 'active'}`} onClick={() => setTipeNewRoom('faChartBar')}>
                            <FontAwesomeIcon icon={fontawesome['faChartBar']} className={`room-icon page_icon`}/>
                            <span className={`page_type active`}>Harian</span>
                            <span className={`page_desc active`}>Voting, Direset jam 00.00 WIB</span>
                        </div>
                    </div>
                    <p className='small bold'>Nama halaman</p>
                    <div className={`room d-flex ai-center p-relative pointer d-flex ${value&&'active'}`}>
                        <FontAwesomeIcon icon={fontawesome[tipeNewRoom]} className={`room-icon ${value&&'active'}`}/>
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {saveIt && (
                <div className='flex bg-info shadow m-2 rounded items-center'>
                    {isAdmin ?
                        <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]" onClick={handleSaveIt}>
                            <FontAwesomeIcon icon={fontawesome.faFloppyDisk}/>
                            <p>Simpan susunan</p>
                        </div>
                        :
                        <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]">
                            <FontAwesomeIcon icon={fontawesome.faLock}/>
                            <p>Admin</p>
                        </div>
                    }
                    <div className="h-[45px] flex justify-center shadow items-center gap-x-2 text-xs rounded m-2 pointer bg-no flex-1" onClick={handleCancelSaveIt}>
                        <FontAwesomeIcon icon={fontawesome.faXmark}/>
                    </div>
                </div>
            )}
            <Droppable droppableId='pageModel'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='roomList'>
                            {list?.map((item, index) => (
                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} ref={provided.innerRef}>
                                            <BookPageListItem data={item} handleAreaToDrag={provided.dragHandleProps} callback={dataToRedux}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))||''}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <div className="setting_action d-flex">
            <span className="setting_btn d-flex ai-center pointer blue_btn text-primary bg-burlywood shadow" onClick={() => setOpenAdd(true)}>Tambah Halaman</span>
        </div>
        {modalElement}
        </>
    )
}
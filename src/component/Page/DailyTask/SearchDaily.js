import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '../../Modal/Modal'
import { useState } from 'react'
import { API } from '../../../utils/variableGlobal'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { loadingToast } from '../../../utils/notif'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function SearchDaily({cb}) {
    const myId = useSelector(state => state.source.profile._id)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    async function handleSearch(e) {
        e.preventDefault()
        if (!searchText) return
        setLoading(true)
        try {
            if (!searchText) return
            const response = await axios.get(`${API}/search/dailyTask?value=${searchText}&myId=${myId}`)
            setDataSearch(response.data)
        } catch (err) {}
        setLoading(false)
    }
    function handleInputChange(e) {
        setSearchText(e.target.value)
    }
    function handleModalOpen() { setIsModalOpen(true) }
    function handleModalClose() { setIsModalOpen(false) }
    useEffect(() => {
        return () => {
            setDataSearch([])
            setSearchText('')
        }
    }, [])
    return (
        <div className={`center-action-btn self-end d-flex p-fixed ai-center text-primary`}>
            <div className="action-add" onClick={handleModalOpen}>
                <FontAwesomeIcon icon={faSearch} className='add-btn pointer bg-burlywood' />
            </div>
            <Modal open={isModalOpen} close={() => setIsModalOpen(false)}>
            <div className="search_book_container w-full">
                <div className="search_book-header d-flex gap-2 flex-col sm:flex-row">
                    <form onSubmit={handleSearch} className='flex-1'>
                        <div className='h-[45px] sm:px-5 ox-2 d-flex overflow-auto focus-within:ring-violet-600 ring-transparent ring-2 rounded-3xl flex-1 bg-zinc-800 shadow-lg'>
                            <input type="text" value={searchText} onChange={handleInputChange} placeholder="Cari tugas harian" className='px-2 bg-transparent w-full border-none outline-none h-full caret-violet-600' required />
                            <div className="tiang"/>
                            <button type="submit" className='submit_search px-2 sm:pl-5 pointer bg-transparent'>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>
                </div>
                {loading && <div className="loading my-2 h-[64px]"></div>}
                <DisplaySearchKey dataSearch={dataSearch} closeModalCallback={handleModalClose} cb={cb}/>
            </div>
            </Modal>
        </div>
    )
}

export function DisplaySearchKey({dataSearch, cb}) {
    useEffect(() => {
    }, [dataSearch])
    
    return (
        <div className="book_card_container d-flex flex-col jc-center">
            {dataSearch?.map((x,i) => <CardList item={x} key={x._id} cb={cb}/>)}
        </div>
    )
}

function CardList({item, cb}) {
    const myProfile = useSelector(state => state.source.profile)
    const [detailOpen, setDetailOpen] = useState(false)
    const [isFollow, setIsFollow] = useState(item.isUserInclude)
    async function reverseIkuti() {
        const dataToSend = {
            name: `${myProfile.nickname}#${myProfile.tag}`,
            avatar: myProfile.avatar,
        }
        const promise = loadingToast(isFollow?'Berhenti mengikuti':'Mengikuti')
        try {
            await axios.put(API+`/daily/task/follow/${item._id}/${myProfile._id}`, dataToSend)
            .then(res => {
                setIsFollow(res.data.isFollow)
                cb()
            })
            .catch(err => {throw new Error(err)})
        } catch (error) {
            console.log(error)
        }
        toast.dismiss(promise)
    }
    useEffect(() => {
        console.log(item.isUserInclude)
    },[item])
    return (
        <div className='bg-zinc-800 border-primary-bright p-2 rounded mt-auto'>
            <div className='flex items-center gap-2 items-center'>
                <div className='flex-1 flex items-center pointer' onClick={() => setDetailOpen(prev => !prev)}>
                    <p className='flex-1'>{item.title}</p>
                    <FontAwesomeIcon icon={detailOpen?faChevronDown:faChevronRight}/>
                </div>
                <div className={`py-0.5 px-6 ${isFollow?'bg-zinc-700':'bg-info'} shadow rounded-md pointer`} onClick={reverseIkuti}>{isFollow?'Berhenti':'Ikuti'}</div>
            </div>
            {detailOpen && 
                <div className='flex text-xs gap-2 flex-col'>
                    <div className='flex flex-wrap gap-2'>
                        {item.list.map((x, i) => (
                            <div className='px-2 rounded-lg bg-zinc-700' key={i}>{x}</div>
                        ))}
                    </div>
                    <div>
                        <p>{item.desc}</p>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <p>{item.list.length} Tugas</p>
                        <p>{item.followersLength} Pengikut</p>
                        <p>{item.author_name}</p>
                    </div>
                </div>
            }
        </div>
    )
}

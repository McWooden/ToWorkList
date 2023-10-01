import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faShare } from '@fortawesome/free-solid-svg-icons'
import { Greeting } from "../../../utils/greeting"
import DisplayDailyContainer from "./DisplayDailyContainer"
import { Center, Left } from "../BaseComponent"
import HistoryDaily from './HistoryDaily'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ShareModal from '../../Modal/ShareModal'


export default function Daily() {
    return (
        <div className='flex w-full'>
            <DailyTaskLeft/>
            <DailyTaskRight/>
        </div>
    )
}

function DailyTaskLeft() {
    const [historyOpen, setHistoryOpen] = useState(false)
    const bookId = useSelector(state => state.fetch.idBook)
    const pageId = useSelector(state => state.fetch.idPageOfBook)
    const [isShareOpen, setIsShareOpen] = useState(false)
    function handleShareModal() {
        setIsShareOpen(true)
    }
    return (
    <Left>
        <div className='p-2'>
            <Greeting/>
            <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setHistoryOpen(true)}>
                <FontAwesomeIcon icon={faHistory}/>
                <span>Riwayat</span>
            </div>
            <HistoryDaily open={historyOpen} close={() => setHistoryOpen(false)}/>
            <div className='text-sm shadow rounded flex gap-2 px-2 py-1 items-center bg-primary-dark-25 w-fit pointer' onClick={handleShareModal}>
                <FontAwesomeIcon icon={faShare}/>
                <span>Bagikan</span>
            </div>
        </div>
        <ShareModal open={isShareOpen} close={() => setIsShareOpen(false)} path={{bookId, pageId}}/>
    </Left>
    )
}

function DailyTaskRight() {
  const isAdmin = useSelector(state => state.source.isAdmin)

    return (
        <Center>
            <div className="welcome flex flex-col overflow-auto flex-3 p-[.5em]">
            {!isAdmin && <p className='text-whitesmoke text-xs text-center px-2 bg-primary-dark-25 p-1'>Hanya Admin yang dapat mengedit</p>}
            <DisplayDailyContainer/>
            </div>
        </Center>
    )
}

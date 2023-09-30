import { PageProggress } from '../../../utils/progress'
import { Greeting } from '../../../utils/greeting'
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheck, faShare } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { JadwalRoom } from '../BaseLeft/JadwalRoom';
import { Left } from '../BaseComponent';
import InfoMenu from '../BaseLeft/InfoMenu';
import { useState } from 'react';
import ShareModal from '../../Modal/ShareModal';

export function TodoLeft() {
    const bookId = useSelector(state => state.fetch.idBook)
    const pageId = useSelector(state => state.fetch.idPageOfBook)
    const source = useSelector(state => state.source.source)
    const [isShareOpen, setIsShareOpen] = useState(false)
    let colors = null
    try {
        colors = source.list.map(item => {
            const date = new Date(item.details.deadline)
            return {
                date: isNaN(date) ? new Date(Number(item.details.deadline)) : date,
                color: item.details.color,
                title: item.details.item_title,
            }
        })

    } catch (error) {
        console.log(source)
    }
    function handleShareModal() {
        setIsShareOpen(true)
    }
    return (
        <Left>
            <div className="sidebar-left fd-column d-flex">
                <Greeting/>
                <JadwalRoom/>
                <Calendar 
                className="calendar-dark" 
                locale='id-ID'
                next2Label={null}
                prev2Label={null}
                tileContent={({ date, view }) => {
                    if (!colors) {
                        return null
                    }
                    const color = colors.find((c) => c.date.getTime() === date.getTime())
                    if (color) {
                    return (
                        <div className='repalace' style={{ border: `1px solid ${color.color}`, borderRadius: '50px' }} title={color.title}>
                        {date.getDate()}
                        </div>
                    )
                }
            }}
            />
                <PageProggress/>
                <InfoMenu icon={faMoneyCheck} count={source.list ? source.list.length : 0}/>
                <div className='text-sm shadow rounded flex gap-2 px-2 py-1 items-center bg-primary-dark-25 w-fit pointer' onClick={handleShareModal}>
                    <FontAwesomeIcon icon={faShare}/>
                    <span>Bagikan</span>
                </div>
            </div>
            <ShareModal open={isShareOpen} close={() => setIsShareOpen(false)} path={{bookId, pageId}}/>
        </Left>
    )
}
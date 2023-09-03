import { PageProggress } from '../../../utils/progress'
import { Greeting } from '../../../utils/greeting'
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { JadwalRoom } from '../BaseLeft/JadwalRoom';
import { Left } from '../BaseComponent';

export function TodoLeft() {
    const source = useSelector(state => state.source.source)
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
                <div className="menu-box d-flex ai-center jc-center shadow bg-primary-bright text-zinc-300">
                    <FontAwesomeIcon icon={faMoneyCheck} className="menu-box-icon"/>
                    <p className="menu-box-count">{source.list ? source.list.length : ''}</p>
                </div>
            </div>
        </Left>
    )
}
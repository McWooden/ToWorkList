import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import '../component/style/kalender.css'
import { useState } from 'react'
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

export function Kalender() {
    let [date, setDate] = useState(new Date())
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())

    function prevNext(prevOrNext) {
        prevOrNext === 'prev' ? setMonth(month - 1) : setMonth(month + 1)
        if (month < 1 || month > 10) {
            setDate(new Date(year, month))
            setYear(new Date().getFullYear())
            setMonth(new Date().getMonth())
        } else {
            setDate(new Date())
        }

    }

    let currentDate = `${bulan[month]} ${year}`
    let firstDayOfMonth = new Date(year, month, 1).getDay(),
    lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
    lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay(),
    lastDateOfLastMonth = new Date(year, month, 0).getDate()
    let liDaysTag = []

    for (let i = firstDayOfMonth; i > 0; i--) {
        liDaysTag.push(<li key={'first-'+i + 1} className='inactive'>{lastDateOfLastMonth -i+1}</li>)
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        liDaysTag.push(<li key={i + 1} className={(i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? 'active' : ''}>{i}</li>)
    }
    for (let i = lastDayOfMonth; i < 6; i++) {
        liDaysTag.push(<li key={'last-'+i + 1} className='inactive'>{i - lastDayOfMonth +1}</li>)
    }


    return (
        <div className="wrapper">
            <div className="wrapper-header">
                <p>{currentDate}</p>
                <div className="move">
                    <FontAwesomeIcon icon={faChevronLeft} className='icon' onClick={() => prevNext('prev')}/>
                    <FontAwesomeIcon icon={faChevronRight} className='icon' onClick={() => prevNext('next')}/>
                </div>
            </div>
            <div className="kalender">
                <ul className='mingguan'>
                    <li>Min</li>
                    <li>Sen</li>
                    <li>Sel</li>
                    <li>Rab</li>
                    <li>Kam</li>
                    <li>Jum</li>
                    <li>Sab</li>
                </ul>
                <ul className='harian'>
                    {liDaysTag}
                </ul>
            </div>
        </div>
    )
}
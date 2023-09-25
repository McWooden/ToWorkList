import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { Greeting } from "../../../utils/greeting"
import DisplayDailyContainer from "./DisplayDailyContainer"
import { Center, Left } from "../BaseComponent"
import HistoryDaily from './HistoryDaily'
import { useState } from 'react'


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
    return (
    <Left>
        <div className='p-2'>
            <Greeting/>
            <div className='bg-burlywood text-primary flex place-items-center py-4 px-8 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => setHistoryOpen(true)}>
                <FontAwesomeIcon icon={faHistory}/>
                <span>Riwayat</span>
            </div>
            <HistoryDaily open={historyOpen} close={() => setHistoryOpen(false)}/>
        </div>
    </Left>
    )
}

function DailyTaskRight() {
    return (
        <Center>
            <div className="welcome flex flex-col overflow-auto flex-3 p-[.5em]">
            <DisplayDailyContainer/>
            </div>
        </Center>
    )
}

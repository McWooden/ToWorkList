import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import { Modal } from "../../Modal/Modal"
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { useSelector } from 'react-redux'

export default function HistoryDaily({history, open, close}) {
    const [task, setTask] = useState(null)
    useEffect(() => {

    })
    return (
        <Modal open={open} close={close}>
            <div className="m-2 flex flex-col w-full items-center justify-center">
                {task? <DetailTask task={task}/> : <ListTask history={history} cb={(task) => setTask(task)}/>}
            </div>
        </Modal>
    )
}

function ListTask({history, cb}) {
    return (
        <div className="flex flex-col w-[90%]">
            {history?.map((item, index) => (
                <div className='bg-zinc-800 border-primary-bright p-2 rounded' key={index} onClick={()=> cb(item)}>
                    <div className='flex items-center gap-2 items-center'>
                        <div className='flex-1 flex items-center pointer'>
                            <p className='flex-1'>{item.detail.title}</p>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function DetailTask({task}) {
    return (
        <div className='flex flex-col w-full h-full'>
            <div className='p-2 px-4 rounded mb-2'>
                <p>{task.detail.title}</p>
                <p>{task.detail.desc}</p>
            </div>
            <div className='flex flex-col gap-2'>
                {task?.box?.map((item, index) => (
                    <BoxList item={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

function BoxList({item}) {
    const [detail, setDetail] = useState(false)
    
    return (
        <div className='bg-zinc-800 rounded p-2 flex items-center px-4 flex-col pointer' onClick={() => setDetail(prev => !prev)}>
            <div className='flex items-center w-full'>
                <p className='flex-1'>{format(parseISO(item.date), 'iiii, dd LLL yyyy', { locale: id })}</p>
                <FontAwesomeIcon icon={detail?faChevronDown:faChevronRight}/>
            </div>
            {detail && (
                <div className='flex flex-wrap gap-2'>
                    {item?.list?.map((item, index) => 
                        <LabelList key={index} item={item}/>
                    )}
                </div>
            )}
        </div>
    )
}

function LabelList({item}) {
    const userId = useSelector(state => state.source.profile._id)
    const active = item.check.includes(userId)
    return (
        <div className={`flex gap-2 items-center py-1 px-2 rounded-md ${active ? 'text-burlywood border-burlywood': 'text-sm text-zinc-500'}`}>
            <span>{item.title}</span>
            {active && <FontAwesomeIcon icon={faCheck}/>}
        </div>
    )
}

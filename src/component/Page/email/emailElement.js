import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { format, parseISO } from 'date-fns'
import id from 'date-fns/locale/id'
import { useEffect } from 'react'

export default function EmailElement({data, handleIsReading, isCheck, handleCheck}) {
    useEffect(() => {
    }, [])
    return (
        <tr className='flex flex-nowrap gap-x-2 pointer hover:shadow-md decoration-solid decoration-1 decoration-transparent underline hover:decoration-orange-500 shadow overflow-hidden w-full whitespace-nowrap rounded border-solid border-transparent border-1 hover:bg-orange-500/[.1] pr-2'>
            <td onClick={handleCheck} className={`my-1 py-1 px-2 mx-0.5 hover:bg-orange-400/[.4] rounded-full ${isCheck && 'bg-orange-500/[.2]'}`}>
                <FontAwesomeIcon icon={isCheck ? faCheckSquare : faSquare} className={`rounded ${isCheck && 'text-orange-500'}`}/>
            </td>
            <td className='font-semibold py-2' onClick={handleIsReading}>{data.pengirim.nama}</td>
            <td className='overflow-hidden py-2 w-full' onClick={handleIsReading}>
                <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{data.subjek} - {data.body}</p>
            </td>
            <td className='py-2'>
                <p className='text-sm font-medium'>{format(parseISO(data.createdAt), 'd MMM', { id })}</p>
            </td>
        </tr>
    )
}
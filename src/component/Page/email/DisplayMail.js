import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faRotate, faSquare, faSquareCheck, faSquareMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useState } from "react"
import { blankToast, loadingToast } from '../../../utils/notif'
import { useEffect } from 'react'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { toast } from 'react-toastify'
import Reading from '../email/Reading'
import EmailElement from '../email/emailElement'

export default function DisplayMail({thisProfile}) {
    const [mails, setMails] = useState([])
    const [mailsElement, setMailsElement] = useState([])
    const [isReading, setIsReading] = useState(null)
    const [checkArray, setCheckArray] = useState([])
    const fetchData = useCallback(async() => {
        setIsReading(null)
        try {
            const promise = loadingToast('Mencari surat')
            await axios.get(API+"/mail/"+thisProfile._id)
            .then(res => {
                setMails(res.data.mails)
                toast.dismiss(promise)
            })
            .catch(err => {
                toast.dismiss(promise)
                throw new Error(err)
            })
        } catch (error) {console.log(error)}
    },[thisProfile])

    const [checkAllElement, setCheckAllElement] = useState(<FontAwesomeIcon icon={faSquare} className='pointer hover:bg-orange-400/[.4] my-1 p-2 mx-0.5 rounded'
        onClick={() => {
            const allId = mails.map(x => x._id)
            setCheckArray(allId)
        }}
    />)

    function handleDeleteInCheckArray() {
        const promise = loadingToast('Menghapus surat')
        const data = {arrayOfId: checkArray}
        try {
            axios.put(API+`/mail/${thisProfile._id}`, data)
            .then(res => {
                if (!res.data.success) throw new Error(res.statusText)
                toast.dismiss(promise)
                blankToast('Surat berhasil dihapus')
                setCheckArray([])
                setMails(res.data.mails)
            }).catch(err => {
                console.log(err)
                toast.dismiss(promise)
            })
        } catch (error) {
            console.log(error)
            toast.dismiss(promise)
        }
    }

    useEffect(() => {
        if (checkArray.length === 0) setCheckAllElement(<FontAwesomeIcon icon={faSquare} className='pointer hover:bg-orange-400/[.4] my-1 p-2 mx-0.5 rounded' 
            onClick={() => {
                const allId = mails.map(x => x._id)
                setCheckArray(allId)
            }}
            />)
        if (checkArray.length !== 0 && checkArray.length !== mails.length) setCheckAllElement(<FontAwesomeIcon icon={faSquareMinus} className='pointer hover:bg-orange-400/[.4] my-1 p-2 mx-0.5 rounded' onClick={() => setCheckArray([])}/>)
        if (checkArray.length === mails.length) setCheckAllElement(<FontAwesomeIcon icon={faSquareCheck} className='pointer hover:bg-orange-400/[.4] my-1 p-2 mx-0.5 rounded' onClick={() => setCheckArray([])}/>)
    }, [checkArray, mails])
    useEffect(() => {
        let box = []
        try {
            mails?.forEach((data, index) => {
                const isContain = checkArray.includes(data._id)
                box.push(
                    <EmailElement key={index} data={data} 
                    isCheck={isContain} 
                    handleCheck={() => {
                        if (isContain) return setCheckArray(prev => prev.filter((x) => x !== data._id))
                        setCheckArray(prev => [...prev, data._id])
                    }}
                    handleIsReading={() => setIsReading(data)}/>
                )
            })
        } catch (error) {console.log(error)}
        setMailsElement(box)
    }, [checkArray, mails])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        <div className='flex justify-end gap-2'>
            {isReading && 
                <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-full gap-3 pointer' onClick={() => setIsReading(null)}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <p>Kembali</p>
                </div>
            }
            <div className='bg-burlywood text-primary flex place-items-center py-2 px-6 rounded shadow-md my-2 w-fit gap-3 pointer' onClick={() => fetchData()}>
                <FontAwesomeIcon icon={faRotate}/>
                <span>Segarkan</span>
            </div>
        </div>
        {isReading ? <Reading data={isReading} thisProfile={thisProfile}/>:
        <div className='max-w-full flex-1'>
            <table className='table-fixed w-full bg-primary-bright rounded h-full'>
                <thead>
                    <tr>
                        <th className='flex justify-between px-[0.2rem]'>
                            <div className='flex items-center'>
                                {checkAllElement} 
                                {checkArray.length !== 0 && <span>{checkArray.length}</span>}
                            </div>
                            <div className='flex items-center'>
                                {checkArray.length !== 0 &&
                                <FontAwesomeIcon icon={faTrash} className='p-2 m-0.5 hover:bg-orange-500/[.5] rounded pointer' onClick={handleDeleteInCheckArray}/>
                                }
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>{mailsElement}</tbody>
            </table>
        </div>
        }
        </>
    )
}
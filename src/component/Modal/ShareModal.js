import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from "react"
import { Modal } from "./Modal"
import { WhatsappShareButton, FacebookShareButton, TelegramShareButton, EmailShareButton, TelegramIcon, EmailIcon, FacebookIcon, WhatsappIcon } from "react-share"
import axios from "axios"
import { API } from "../../utils/variableGlobal"
import { blankToast } from "../../utils/notif"
import { useEffect } from "react"
import MyLoading from "../../utils/myLoading"
import { useState } from "react"
import moment from "moment"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setShort } from "../../redux/sourceSlice"

export default function ShareModal({close, path}) {
    const origin = window.location.origin
    const short = useSelector(state => state.source.short)
    const guestMode = useSelector(state => state.source.guestMode)

    const [isLoading, setIsLoading] = useState(false)
    const [isShareOpen, setIsShareOpen] = useState(false)

    function handleShareModal() {
        setIsShareOpen(true)
    }

    const dispatch = useDispatch()
    const fetchData = useCallback(async () => {
        if (guestMode || !path.pageId) return
        try {
            await axios.post(API+'/short', path)
            .then(res => {
                dispatch(setShort(res.data.short))
            })
            .catch(err => {
                throw new Error(err)
            })
        } catch (error) {
            console.log(error);
        }
    },[dispatch, guestMode, path])

    useEffect(() => {
        if (!short) {
            setIsLoading(true)
            fetchData()
            setIsLoading(false)
        }
    },[fetchData, short])

    useEffect(() => {
    
    return () => {
        dispatch(setShort(null))
    }
    }, [dispatch])

    function handleSalin() {
        navigator.clipboard.writeText(`${origin}/?src=${short.short}`)
        blankToast('Link tersalin di papan klip')
    }

    if (guestMode) return null

    return <>
    <div className='text-sm shadow rounded flex gap-2 px-2 py-1 items-center bg-primary-dark-25 w-fit pointer' onClick={handleShareModal}>
        <FontAwesomeIcon icon={faShare}/>
        <span>Bagikan</span>
    </div>
    <Modal open={isShareOpen} close={close} costum={true}>
        <div className='fixed_center bg-primary-dark-25 text-whitesmoke rounded shadow max-w-[550px] h-fit w-full p-4 scale-fade-in'>
            <h3>Bagikan</h3>
            {isLoading? 
                <MyLoading/>
            :
            <>
                <div className="flex gap-2 my-3 justify-center">
                    <div className="text-xs flex flex-col items-center">
                        <WhatsappShareButton url={`${origin}/?src=${short?.short}`}><WhatsappIcon round={true} size={48}/></WhatsappShareButton>
                        <span>Whatsapp</span>
                    </div>
                    <div className="text-xs flex flex-col items-center">
                        <FacebookShareButton url={`${origin}/?src=${short?.short}`}><FacebookIcon round={true} size={48}/></FacebookShareButton>
                        <span>Facebook</span>
                    </div>
                    <div className="text-xs flex flex-col items-center">
                        <TelegramShareButton url={`${origin}/?src=${short?.short}`}><TelegramIcon round={true} size={48}/></TelegramShareButton>
                        <span>Telegram</span>
                    </div>
                    <div className="text-xs flex flex-col items-center">
                        <EmailShareButton url={`${origin}/?src=${short?.short}`}><EmailIcon round={true} size={48}/></EmailShareButton>
                        <span>Email</span>
                    </div>
                </div>
                <div className="bg-primary flex rounded p-1">
                    <input type="text" readOnly value={`${origin}/?src=${short?.short}`} className="flex-1"/>
                    <span className="bg-info rounded-full px-3 text-primary-dark-50 shadow h-fit pointer" onClick={handleSalin}>Salin</span>
                </div>
                <div className="text-xs mt-2">
                    <span>Link akan kadaluarsa dalam {moment(short?.createdAt || null).add(7, 'days').diff(moment(), 'days')} hari lagi</span>
                </div>
            </>
            }
        </div>
    </Modal>
    </>
}
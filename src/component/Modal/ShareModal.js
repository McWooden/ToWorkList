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

export default function ShareModal({open, close, path}) {
    const origin = window.location.origin
    const short = useSelector(state => state.source.short)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const fetchData = useCallback(async () => {
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
    },[dispatch, path])

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

    return <Modal open={open} close={close} costum={true}>
        <div className='fixed_center bg-primary-dark-25 text-whitesmoke rounded shadow max-w-[550px] h-fit w-full p-4'>
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
}
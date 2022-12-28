import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../component/style/notif.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faTrash, faPenToSquare, faCheck, faNoteSticky, faImage} from '@fortawesome/free-solid-svg-icons'

export function editToast(text) {
    toast(
    <div className="myToast myToast-edit">
        <div className="icon">
            <FontAwesomeIcon icon={faPenToSquare}/>
        </div>
        <p>{text || 'edit'}</p>
    </div>, {
        closeButton: false
    })
}
export function deleteToast(text) {
    toast(
    <div className="myToast myToast-delete">
        <div className="icon">
            <FontAwesomeIcon icon={faTrash}/>
        </div>
        <p>{text || 'terhapus'}</p>
    </div>, {
        closeButton: false
    })
}
export function sendToast(text) {
    toast(
    <div className="myToast myToast-info">
        <div className="icon">
            <FontAwesomeIcon icon={faPaperPlane}/>
        </div>
        <p>{text || 'terkirim'}</p>
    </div>, {
        closeButton: false
    })
}
export function todoToast({title:text, color}) {
    toast(
    <div className="myToast">
        <div className="icon" style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faCheck}/>
        </div>
        <p>tugas baru ditambahkan! {text || 'tugas'}</p>
    </div>, {
        closeButton: false
    })
}
export function noteToast({color}) {
    toast(
    <div className="myToast">
        <div className="icon" style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faNoteSticky}/>
        </div>
        <p>catatan baru ditambahkan!</p>
    </div>, {
        closeButton: false
    })
}
export function imageToast(text) {
    toast(
    <div className="myToast myToast-greenyellow">
        <div className="icon">
            <FontAwesomeIcon icon={faImage}/>
        </div>
        <p>{text || 'foto baru ditambahkan!'}</p>
    </div>, {
        closeButton: false
    })
}
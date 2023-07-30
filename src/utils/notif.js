import { toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faTrash, faPenToSquare, faCheck, faNoteSticky, faImage, faRightFromBracket, faUser, faMap, faFloppyDisk, faExclamation, faCommentDots, faPerson} from '@fortawesome/free-solid-svg-icons'

export function editToast(text) {
    toast(
    <div className="myToast myToast-edit">
        <div className="icon">
            <FontAwesomeIcon icon={faPenToSquare}/>
        </div>
        <p>{text || 'edit'}</p>
    </div>)
}
export function saveToast(text) {
    toast(
    <div className="myToast myToast-edit">
        <div className="icon">
            <FontAwesomeIcon icon={faFloppyDisk}/>
        </div>
        <p>{text || 'save'}</p>
    </div>)
}
export function deleteToast(text) {
    toast(
    <div className="myToast myToast-delete">
        <div className="icon">
            <FontAwesomeIcon icon={faTrash}/>
        </div>
        <p>{text || 'terhapus'}</p>
    </div>)
}
export function alertToast(text) {
    toast(
    <div className="myToast myToast-delete" key={+new Date()}>
        <div className="icon">
            <FontAwesomeIcon icon={faExclamation}/>
        </div>
        <p>{text || 'alert'}</p>
    </div>)
}
export function sendToast(text) {
    toast(
    <div className="myToast myToast-info">
        <div className="icon">
            <FontAwesomeIcon icon={faPaperPlane}/>
        </div>
        <p>{text || 'terkirim'}</p>
    </div>)
}
export function memberToast(text) {
    toast(
    <div className="myToast myToast-info">
        <div className="icon">
            <FontAwesomeIcon icon={faPerson}/>
        </div>
        <p>{text||'seseorang'}</p>
    </div>)
}
export function chatToast(text) {
    toast(
    <div className="myToast myToast-info">
        <div className="icon">
            <FontAwesomeIcon icon={faCommentDots}/>
        </div>
        <p>{text}</p>
    </div>)
}
export function todoToast({item_title, color}) {
    toast(
    <div className="myToast">
        <div className="icon" style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faCheck}/>
        </div>
        <p>tugas baru ditambahkan! {item_title || 'tugas'}</p>
    </div>)
}
export function checkToast({title, color}) {
    toast(
    <div className="myToast">
        <div className="icon" style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faCheck}/>
        </div>
        <p>reverse: {title || ''}</p>
    </div>)
}
export function noteToast({color}) {
    toast(
    <div className="myToast">
        <div className="icon" style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faNoteSticky}/>
        </div>
        {color === 'var(--danger)' ? <p>catatan gagal dibuat</p> : <p>catatan baru ditambahkan!</p>}
    </div>)
}
export function noteToastSecond({ text, color }) {
    toast(
    <div className="myToast">
        <div className="icon" style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faNoteSticky}/>
        </div>
        {text}
    </div>)
}
export function imageToast(text) {
    toast(
    <div className="myToast myToast-greenyellow">
        <div className="icon">
            <FontAwesomeIcon icon={faImage}/>
        </div>
        <p>{text || 'foto baru ditambahkan!'}</p>
    </div>)
}
export function leaveToast(text) {
    toast(
    <div className="myToast">
        <div className="icon">
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </div>
        <p>{text || 'keluar'}</p>
    </div>)
}
export function accountToast(text) {
    toast(
    <div className="myToast">
        <div className="icon">
            <FontAwesomeIcon icon={faUser}/>
        </div>
        <p>{text || 'Account'}</p>
    </div>)
}
export function pageToast(text) {
    toast(
    <div className="myToast">
        <div className="icon">
            <FontAwesomeIcon icon={faMap}/>
        </div>
        <p>{text || 'halaman'}</p>
    </div>)
}

export function loadingToast(text) {
    const promise = toast.loading(
        <div className="myToast">
            <p>{text || 'Account'}</p>
        </div>)
    return promise
}
export function updateToast(text) {
    return (
        <div className="myToast">
            <p>{text || 'update'}</p>
        </div>
    )
}
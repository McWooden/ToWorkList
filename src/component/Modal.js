import React from 'react'
import ReactDOM from 'react-dom'
import './style/Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// parent
export function Modal({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay' onClick={setClose}/>
        <div className='modal'>
            {children}
        </div>
        </>,
        document.getElementById('portal')
    )
}
// extends
export function Confirm({ metode, open, close, target, color, callback }) {
    if (!open) return null
    let icon = null
    let msg = null
    if (metode === 'delete') {
        icon = <FontAwesomeIcon icon={faTrash}/>
        msg = <p className='msg'><span style={{color: color}}>{target}</span> akan terhapus secara permanen</p>
    }
    function acceptCallback() {
        close()
        callback()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay' onClick={close}/>
        <div className="confirm">
            <div className="confirm-header">
                {icon}
            </div>
            <div className="confirm-body">
                <div className="confirm-context">
                    <h3>Hapus</h3>
                    {msg}
                    <p className='next-text'>apa kamu yakin?</p>
                </div>
                <div className="confirm-button">
                    <div className="confirm-btn confirm-no" onClick={close}>Batal</div>
                    <div className="confirm-btn confirm-yes" onClick={acceptCallback}>Yakin</div>
                </div>
            </div>
        </div>
        </>,
        document.getElementById('confirm')
    )
}
// fileDrop
export function FileDrop({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay' onClick={setClose}/>
        <div className='modal'>
            {children}
        </div>
        </>,
        document.getElementById('portal')
    )
}
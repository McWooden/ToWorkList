import React from 'react'
import ReactDOM from 'react-dom'
import './style/Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export function Modal({children, open, close, colorDefault}) {
    if (!open) return null
    function setClose() {
        close()
        colorDefault()
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

export function Confirm({ children, open, close }) {
    if (!open) return null
    return ReactDOM.createPortal(
        <>
        <div className='overlay' onClick={close}/>
            <div className="confirm">
                <div className="confirm-header">
                    <FontAwesomeIcon icon={faTrash}/>
                    <span>Hapus</span>
                </div>
                <div className="confirm-body">
                    {children}
                </div>
                <div className="confirm-button">
                    <div className="confirm-btn confirm-no" onClick={close}>Batal</div>
                    <div className="confirm-btn confirm-yes">Yakin</div>
            </div>
        </div>
        </>,
        document.getElementById('confirm')
    )
}
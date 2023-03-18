import React from 'react'
import ReactDOM from 'react-dom'
import '../style/Modal.css'

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
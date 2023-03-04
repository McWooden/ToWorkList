import React from 'react'
import ReactDOM from 'react-dom'
import './style/Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTextSlash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

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
export function ModalLight({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay' onClick={setClose}/>
        <div className='modal light'>
            {children}
        </div>
        </>,
        document.getElementById('portal')
    )
}
export function ModalSecond({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay' onClick={setClose}/>
        <div className='modal second_modal'>
            {children}
        </div>
        </>,
        document.getElementById('portal_second')
    )
}
export function ModalNoteEditor({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay' onClick={setClose}/>
        {children}
        </>,
        document.getElementById('portal')
    )
}
// extends
export function Confirm({ metode, open, close, target, color, callback, timeout = 0, deleteText = 'akan terhapus secara permanen' }) {
    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
        let intervalId = null
        if (remainingTime > 0) {
            intervalId = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1)
            }, 1000)
        }

        return () => clearInterval(intervalId)
    }, [remainingTime])
    useEffect(() => {
        if (open) setRemainingTime(timeout)
    }, [open, timeout])

    if (!open) return null
    let icon = null
    let msg = null
    let context = null
    if (metode === 'delete') {
        icon = <FontAwesomeIcon icon={faTrash} />
        msg = (
            <p className="msg">
                <span style={{ color: color }}>{target}</span> {deleteText}
            </p>
        )
        context = (
            <div className="confirm-context">
                <h3>Hapus</h3>
                {msg}
                <p className="next-text">kamu yakin?</p>
            </div>
        )
    }
    if (metode === 'discard') {
        icon = <FontAwesomeIcon icon={faTextSlash} />
        msg = <p className="msg">Yakin menutup editor?</p>
        context = (
            <div className="confirm-context">
                <h3>Tutup</h3>
                {msg}
            </div>
        )
    }
    function acceptCallback() {
        close()
        callback()
    }

    return ReactDOM.createPortal(
        <>
            <div className="overlay" onClick={close} />
            <div className="confirm">
                <div className="confirm-header">{icon}</div>
                <div className="confirm-body">
                    {context}
                    <div className="confirm-button">
                        <div className="confirm-btn confirm-no" onClick={close}>
                            Batal
                        </div>
                        {remainingTime > 0 ? (
                            <div className="confirm-btn confirm-yes transparent">Yakin ({remainingTime})</div>
                        ) : (
                            <div className="confirm-btn confirm-yes" onClick={acceptCallback}>
                                Yakin
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('confirm')
    )
}
export function DeleteBookModal({open, close, data, callback}) {
    const profile = data
    const [value, setValue] = useState('')
    if (!open) return null
    const url = 'https://zjzkllljdilfnsjxjrxa.supabase.co/storage/v1/object/public/book'
    function closeModal() {
        close()
        setValue('')
    }
    function acceptCallback() {
        close()
        callback()
        setValue('')
    }

    return ReactDOM.createPortal(
        <>
        <div className="overlay" onClick={closeModal} />
        <div className="confirm guild_delete light">
            <div className="confirm-body">
                <div className="confirm-profile">
                    <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} />
                    <div className="confirm-context">
                    <h3>Hapus</h3>
                    <p className="msg">
                        <span style={{color: 'var(--purple-1)'}}>{profile.book_title}</span> oleh {profile.author.nickname}#{profile.author.tag}
                    </p>
                    </div>
                </div>
                <p className="next-text">Tindakan ini akan menghapus gambar, pesan, tugas, catatan dan apapun yang ada didalamnya</p>
                <form className='form-modal light'>
                    <p>ketik <span className="bold">{profile.book_title}</span> untuk melanjutkan menghapus</p>
                    <input type="text" placeholder='masukkan judul buku' value={value} onChange={(e) => setValue(e.target.value)}/>
                    <div className="confirm-button">
                        <div className="confirm-btn confirm-no" onClick={closeModal}>Batal</div>
                        {value === profile.book_title  ? (
                            <div className="confirm-btn confirm-yes" onClick={acceptCallback}>
                                Hapus
                            </div>
                        ) : (
                            <div className="confirm-btn confirm-yes transparent">Hapus</div>
                        )}
                    </div>
                </form>
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
import { useState, useEffect } from "react"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTextSlash } from '@fortawesome/free-solid-svg-icons'

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
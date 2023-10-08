import ReactDOM from 'react-dom'
import { useState } from 'react'
import { url } from '../../utils/variableGlobal'

export function DeleteBookModal({open, close, data, callback}) {
    const profile = data
    const [value, setValue] = useState('')
    if (!open) return null
    
    function closeModal() {
        close()
        setValue('')
    }
    function acceptCallback(e) {
        e.preventDefault()
        if (value !== profile.book_title) return
        close()
        callback()
        setValue('')
    }

    return ReactDOM.createPortal(
        <>
        <div className="overlay zi-3 p-fixed" onClick={closeModal} />
        <div className="confirm zi-3 p-fixed shadow-lg fd-column scale-fade-in">
            <div className="confirm-body">
                <div className="confirm-profile d-flex">
                    <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} />
                    <div className="confirm-context">
                    <h3>Hapus</h3>
                    <p className="msg">
                        <span style={{color: 'var(--purple-1)'}}>{profile.book_title}</span> oleh {profile.author.nickname}#{profile.author.tag}
                    </p>
                    </div>
                </div>
                <p className="next-text">Tindakan ini akan menghapus gambar, pesan, tugas, catatan dan apapun yang ada didalamnya</p>
                <form className='form-modal' onSubmit={acceptCallback}>
                    <p>ketik <span className="bold">{profile.book_title}</span> untuk melanjutkan menghapus</p>
                    <input type="text" placeholder='masukkan judul buku' value={value} onChange={(e) => setValue(e.target.value)} className='w-full border-0'/>
                    <div className="confirm-button d-flex ai-center jc-flex-end">
                        <div className="confirm-btn pointer confirm-no" onClick={closeModal}>Batal</div>
                        {value === profile.book_title  ? (
                            <div className="confirm-btn pointer confirm-yes bg-indianred" onClick={acceptCallback}>
                                Hapus
                            </div>
                        ) : (
                            <div className="confirm-btn pointer confirm-yes transparent">Hapus</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
        </>,
        document.getElementById('confirm')
    )
}
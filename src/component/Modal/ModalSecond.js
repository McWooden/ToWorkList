import ReactDOM from 'react-dom'

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
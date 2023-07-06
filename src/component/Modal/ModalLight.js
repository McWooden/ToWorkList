import ReactDOM from 'react-dom'

export function ModalLight({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay zi-3 p-fixed' onClick={setClose}/>
        <div className='modal zi-3 p-fixed of-auto light'>
            {children}
        </div>
        </>,
        document.getElementById('portal')
    )
}
import ReactDOM from 'react-dom'

export function ModalLight({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay p-fixed' onClick={setClose}/>
        <div className='modal of-auto light'>
            {children}
        </div>
        </>,
        document.getElementById('portal')
    )
}
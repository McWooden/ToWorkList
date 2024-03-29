import ReactDOM from 'react-dom'

export function ModalSecond({children, open, close, className}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay zi-3 p-fixed' onClick={setClose}/>
        <div className={`modal shadow-lg zi-3 p-fixed of-auto second_modal text-whitesmoke ${className} scale-fade-in`}>
            {children}
        </div>
        </>,
        document.getElementById('portal_second')
    )
}
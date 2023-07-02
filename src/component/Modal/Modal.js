import ReactDOM from 'react-dom'

export function Modal({children, open, close}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay zi-3 p-fixed' onClick={setClose}/>
        <div className='modal zi-3p-fixedof-auto'>
            {children}
        </div>
        </>,
        document.getElementById('portal')
    )
}
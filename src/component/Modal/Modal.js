import ReactDOM from 'react-dom'

export function Modal({children, open, close, costum}) {
    if (!open) return null
    function setClose() {
        close()
    }
    return ReactDOM.createPortal(
        <>
        <div className='overlay zi-3 p-fixed' onClick={setClose}/>
        {costum ? 
            <>{children}</>
        :
            <div className='modal zi-3 p-fixed of-auto'>
                {children}
            </div>
        }
        </>,
        document.getElementById('portal')
    )
}
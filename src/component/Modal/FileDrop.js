import ReactDOM from 'react-dom'

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
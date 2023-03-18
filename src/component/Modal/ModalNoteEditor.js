import ReactDOM from 'react-dom'

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
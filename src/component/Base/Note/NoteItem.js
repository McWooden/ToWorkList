import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faTrash, faPenToSquare, faLock, faExpand, faCompress, faXmark } from '@fortawesome/free-solid-svg-icons'
import { deleteToast, noteToastSecond } from '../../../utils/notif';
import { useSelector, useDispatch } from 'react-redux';
import { API } from '../../../utils/variableGlobal';
import { setTodo } from '../../../redux/todo';
import { setSource } from '../../../redux/sourceSlice';
import Confirm from '../../Modal/Confirm';
import axios from 'axios';
import { useState } from 'react'
import Markdown from 'markdown-to-jsx';
import { id } from 'date-fns/locale';
import { format } from 'date-fns';
import { useEffect } from 'react';


export function NoteItem({data, handleAreaToDrag}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const dispatch = useDispatch()
    const nickname = useSelector(state => state.source.profile.nickname)
    const channel = useSelector(state => state.channel.book)
    const isAdmin = useSelector(state => state.source.isAdmin)
    const [isFull, setIsFull] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [noteVal, setNoteVal] = useState(data.context)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const [discard, setDiscard] = useState(false)
    useEffect(() => {
        if (data.context === noteVal) return setShowSaveButton(false)
        setShowSaveButton(true)
    },[data.context, noteVal])
    function resetNoteContext() {
        setNoteVal(data.context)
    }
    function handleChange(data) {
        setNoteVal(data.target.value)
    }
    async function handleDelete() {
        let path
        let eventPath
        if (pageType === 'faNoteSticky') {
            path = `${API}/notes/${idPageOfBook}/${data._id}`
            eventPath = `${idPageOfBook}:shouldUpdate`
        } else {
            path = `${API}/todo-notes/${idPageOfBook}/${todoId}/${data._id}`
            eventPath = `${idPageOfBook}/${todoId}:shouldUpdate`
        }
        try {
            await axios.delete(path)
            .then((res) => {
                deleteToast('catatan berhasil dihapus')
                if (pageType === 'faNoteSticky') {
                    dispatch(setSource(res.data))
                } else {
                    dispatch(setTodo(res.data))
                }
                channel.send({
                    type: 'broadcast',
                    event: eventPath,
                    payload: `${nickname} menghapus catatan`,
                })
            })
            .catch(err => {
                deleteToast('catatan gagal dihapus')
            }) 
        } catch(err) {
            
        }
    }
    function confirmToDelete() {
        setConfirmOpen(true)
    }
    function handleEdit() {
        setIsEditMode(prev => !prev)
    }
    function toggleZoom() {
        setIsFull(prev => !prev)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        let path
        let eventPath
        if (pageType === 'faNoteSticky') {
            path = `${API}/notes/${idPageOfBook}/${data._id}`
            eventPath = `${idPageOfBook}:shouldUpdate`
        } else {
            path = `${API}/todo-notes/${idPageOfBook}/${todoId}/${data._id}`
            eventPath = `${idPageOfBook}/${todoId}:shouldUpdate`
        }
        const dataToSend = {
            context: noteVal
        }
        try {
            await axios.put(path, dataToSend)
            .then(res => {
                noteToastSecond({text: 'catatan berhasil diperbarui', color: data.color})
                if (pageType === 'faNoteSticky') {
                    dispatch(setSource(res.data))
                } else {
                    dispatch(setTodo(res.data))
                }
                setIsEditMode(false)
                channel.send({
                    type: 'broadcast',
                    event: eventPath,
                    payload: `${nickname} memperbarui catatan`,
                })
            })
            .catch(err => {
                noteToastSecond({text: 'catatan gagal diperbarui', color: 'var(--danger)'})
                console.log(err)
            })
        } catch (err) {
            
        }
    }
    const element = <>
    <form className={`${isFull && 'absolute top-[47px] z-[1] left-0 right-0 bottom-0'} note of-hidden bg-primary-dark-50 text-whitesmoke shadow flex flex-col scale-fade-in`} onSubmit={handleSubmit}>
        <div className='note-head d-flex jc-space-between ai-center bg-primary-dark-25 shadow' {...handleAreaToDrag}>
            <FontAwesomeIcon icon={faNoteSticky} style={{color: data.color}} className='note-color'/>
            {showSaveButton && 
            <div className='note-btn-simpan pointer flex flex-1 gap-2'>
                 <button type='submit' className='flex-1 pointer'>Simpan</button>
                 <span className='bg-no rounded p-1 px-2 pointer' onClick={() => setDiscard(true)}>Ulang</span>
            </div>
            }
            <div className={`note-btn ai-center text-zinc-400 ${showSaveButton && 'flex'}`}>
                <FontAwesomeIcon icon={isFull?faCompress:faExpand} className='pointer' onClick={toggleZoom}/>
                {isAdmin ? 
                    <>
                        <FontAwesomeIcon icon={faTrash} className='pointer' onClick={confirmToDelete}/>
                        <FontAwesomeIcon icon={isEditMode? faXmark : faPenToSquare} className='pointer' onClick={handleEdit}/>
                    </>
                    :
                    <FontAwesomeIcon icon={faLock}/>
                }
            </div>
        </div>
        <div className='note-body flex-1'>
            {isEditMode?
                <textarea
                    className='block rounded-none min-h-[100px] pt-[5px] px-[10px] font-size-small resize-y w-full'
                    placeholder={data.context}
                    value={noteVal || ''}
                    onChange={handleChange}
                />
            :
                <pre className='of-auto'>
                    <Markdown className="markdown">{noteVal}</Markdown>
                </pre>
            }
            <div className='note-info flex justify-end align-center'>
                <span className='flex items-center'>{`${data.by.nickname || data.by}, ${format(new Date(data.date), 'iiii, dd LLL yyyy', { locale: id })}`}</span>
                {isEditMode && <a className='note-btn-simpan pointer d-flex text-whitesmoke' target='_blank' href='https://dev.to/codeninjausman/markdown-a-simple-guide-1f2f' rel="noreferrer">Docs</a>}
            </div>
        </div>
    </form>
    <Confirm open={confirmOpen} close={() => setConfirmOpen(false)} target={`${data.by.nickname || data.by}, ${format(new Date(data.date), 'iiii, dd LLL yyyy', { locale: id })}`} metode='delete' color={data.color} callback={handleDelete}/>
    <Confirm open={discard} close={() => setDiscard(false)} target={`${data.by.nickname}, ${format(new Date(data.date), 'iiii, dd LLL yyyy', { locale: id })}`} metode='discard' color={data.color} callback={resetNoteContext}/>
    </>
    return isFull ? ReactDOM.createPortal(element, document.getElementById('fullscreen')) : element
}
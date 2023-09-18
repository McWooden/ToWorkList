import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import Confirm from '../../Modal/Confirm'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { useSelector, useDispatch } from 'react-redux'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { setTodo } from '../../../redux/todo'
import { noteToastSecond } from '../../../utils/notif'
import { setNoteEditor, setSource } from '../../../redux/sourceSlice'
import { Modal } from '../../Modal/Modal'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'


export function NoteEditor() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)
    const data = useSelector(state => state.source.noteEditor)
    const nickname = useSelector(state => state.source.profile.nickname)
    const channel = useSelector(state => state.channel.book)
    const [noteVal, setNoteVal] = useState(null)
    const [discard, setDiscard] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (data) {
            setNoteVal(data.context)
        }
    }, [data])
    if (!data) return null
    function confirmToClose() {
        if (noteVal !== data.context) {
            setDiscard(true)
        } else {
            modalClose()
        }
    }
    function modalClose() {
        dispatch(setNoteEditor(null))
    }
    function handleChange(data) {
        setNoteVal(data.target.value)
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
                modalClose()
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
    return (
        <>
        <Modal open={true} close={confirmToClose} costum={true}>
            <form className='note p-fixed note-editor zi-3 bg-zinc-900 text-whitesmoke' onSubmit={handleSubmit}>
                <div className='note-head d-flex ai-center jc-space-between'>
                    <FontAwesomeIcon 
                    icon={faNoteSticky} 
                    style={{color: data.color}} 
                    className='note-color'/>
                    <div className='self-end flex'>
                        <a className='note-btn-simpan pointer d-flex text-whitesmoke' target='_blank' href='https://dev.to/codeninjausman/markdown-a-simple-guide-1f2f' rel="noreferrer">Docs</a>
                        <button type='submit' className='note-btn-simpan pointer d-flex'>Simpan</button>
                    </div>
                </div>
                <div className='note-body fd-column d-flex'>
                    <textarea
                        className='note_editor-textarea'
                        placeholder={data.context}
                        value={noteVal || ''}
                        onChange={handleChange}
                    />
                    <span className='note-info ai-flex-end'>
                        {`${data.by.nickname || data.by}, ${format(new Date(data.date), 'iiii, dd LLL yyyy', { locale: id })}`}
                    </span>
                </div>
            </form>
        </Modal>
        <Confirm open={discard} close={() => setDiscard(false)} target={`${data.by.nickname}, ${convertDateToString(data.date)}`} metode='discard' color={data.color} callback={modalClose}/>
        </>
    )
}
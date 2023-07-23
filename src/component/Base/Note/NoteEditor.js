import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { Confirm } from '../../Modal/Confirm'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { useSelector, useDispatch } from 'react-redux'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { setTodo } from '../../../redux/todo'
import { noteToastSecond } from '../../../utils/notif'
import { setNoteEditor } from '../../../redux/sourceSlice'
import { Modal } from '../../Modal/Modal'


export function NoteEditor() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const data = useSelector(state => state.source.noteEditor)
    const nickname = useSelector(state => state.source.profile.nickname)
    const channelTodoDetail = useSelector(state => state.channel.todoDetail)
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
        const dataToSend = {
            context: noteVal
        }
        try {
            await axios.put(`${API}/notes/${idPageOfBook}/${todoId}/${data._id}`, dataToSend)
            .then(res => {
                noteToastSecond({text: 'catatan berhasil diperbarui', color: data.color})
                dispatch(setTodo(res.data))
                modalClose()
                console.log(res)
                channelTodoDetail.send({
                    type: 'broadcast',
                    event: 'shouldUpdate',
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
            <form className='note p-fixed note-editor zi-3' onSubmit={handleSubmit}>
                <div className='note-head d-flex ai-center jc-space-between'>
                    <FontAwesomeIcon 
                    icon={faNoteSticky} 
                    style={{color: data.color}} 
                    className='note-color'/>
                    <button type='submit' className='note-btn-simpan pointer d-flex as-flex-end'>Simpan</button>
                </div>
                <div className='note-body fd-column d-flex'>
                    <textarea
                        className='note_editor-textarea'
                        placeholder={data.context}
                        value={noteVal || ''}
                        onChange={handleChange}
                    />
                    <span className='note-info ai-flex-end'>
                        {`${data.by}, ${convertDateToString(data.date)}`}
                    </span>
                </div>
            </form>
        </Modal>
        <Confirm open={discard} close={() => setDiscard(false)} target={`${data.by}, ${convertDateToString(data.date)}`} metode='discard' color={data.color} callback={modalClose}/>
        </>
    )
}
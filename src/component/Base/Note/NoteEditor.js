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
import { ModalNoteEditor } from '../../Modal/ModalNoteEditor'


export function NoteEditor() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const data = useSelector(state => state.source.noteEditor)
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
        <ModalNoteEditor open={true} close={confirmToClose}>
            <form className='note note-editor' onSubmit={handleSubmit}>
                <div className='note-head'>
                    <FontAwesomeIcon 
                    icon={faNoteSticky} 
                    style={{color: data.color}} 
                    className='note-color'/>
                    <button type='submit' className='note-btn-simpan'>Simpan</button>
                </div>
                <div className='note-body'>
                    <textarea
                        className='note_editor-textarea'
                        placeholder={data.context}
                        value={noteVal || ''}
                        onChange={handleChange}
                    />
                    <span className='note-info'>
                        {`${data.by}, ${convertDateToString(data.date)}`}
                    </span>
                </div>
            </form>
        </ModalNoteEditor>
        <Confirm open={discard} close={() => setDiscard(false)} target={`${data.by}, ${convertDateToString(data.date)}`} metode='discard' color={data.color} callback={modalClose}/>
        </>
    )
}
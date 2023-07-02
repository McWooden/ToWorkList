import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { deleteToast, editToast } from '../../../utils/notif';
import { useSelector, useDispatch } from 'react-redux';
import { API } from '../../../utils/variableGlobal';
import { setTodo } from '../../../redux/todo';
import { setNoteEditor } from '../../../redux/sourceSlice';
import { Confirm } from '../../Modal/Confirm';
import axios from 'axios';
import { useState } from 'react'
import { convertDateToString } from '../../../utils/convertDateFormat';


export function NoteItem({data}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const dispatch = useDispatch()
    async function handleDelete() {
        try {
            await axios.delete(`${API}/notes/${idPageOfBook}/${todoId}/${data._id}`)
            .then((res) => {
                deleteToast('catatan berhasil dihapus')
                dispatch(setTodo(res.data))
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
        editToast('mengedit catatan')
        dispatch(setNoteEditor(data))
    }
    return (
        <>
        <div className='note of-hidden'>
            <div className='note-head d-flex jc-space-between ai-center'>
                <FontAwesomeIcon icon={faNoteSticky} style={{color: data.color}} className='note-color'/>
                <div className="note-btn ai-center">
                    <FontAwesomeIcon icon={faTrash} className='pointer' onClick={confirmToDelete}/>
                    <FontAwesomeIcon icon={faPenToSquare} className='pointer' onClick={handleEdit}/>
                </div>
            </div>
            <div className='note-body d-flex fd-column'>
                <pre className='of-auto'>
                    {data.context}
                </pre>
                <span className='note-info ai-flex-end'>{`${data.by}, ${convertDateToString(data.date)}`}</span>
            </div>
        </div>
        <Confirm open={confirmOpen} close={() => setConfirmOpen(false)} target={`${data.by}, ${convertDateToString(data.date)}`} metode='delete' color={data.color} callback={handleDelete}/>
        </>
    )
}
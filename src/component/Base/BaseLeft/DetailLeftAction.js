import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { deleteToast } from '../../../utils/notif';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearTodo } from '../../../redux/todo';
import { Confirm } from '../../Modal/Confirm';

import { API } from '../../../utils/variableGlobal'
import { setAddAndEdit } from '../../../redux/addAndEditForGlobalStore';

export function DetailLeftAction() {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const item = useSelector(state => state.todo)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()
    const title = item.details.item_title
    async function deleteTodo() {
        try {
            await axios.delete(`${API}/source/addTodo/${idPageOfBook}/${item.id}`)
            .then((res) => {
                deleteToast('berhasil dihapus')
                dispatch(clearTodo())
            })
            .catch(err => {
                deleteToast('gagal terhapus')
            })
        } catch(err) {

        }
    }
    return (
        <>
        <div className='detail-Left-action d-flex'>
            <FontAwesomeIcon icon={faTrash} className='action-left pointer action-trash-left' onClick={() => setDeleteOpen(true)}/>
            <FontAwesomeIcon icon={faPenToSquare} className='action-left pointer action-edit-left' onClick={() => dispatch(setAddAndEdit({type: 'EDIT_TODO_INSIDE', ...item}))}/>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color={item.details.color} callback={deleteTodo}/>
        </>
    )
}
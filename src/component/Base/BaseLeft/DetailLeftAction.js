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
    const nickname = useSelector(state => state.source.profile.nickname)
    const channel = useSelector(state => state.channel.book)
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
                channel.send({
                    type: 'broadcast',
                    event: `${idPageOfBook}/${item.id}:shouldUpdate`,
                    payload: `${nickname} menghapus tugas ini`,
                })
                channel.send({
                    type: 'broadcast',
                    event: `${idPageOfBook}:shouldUpdate`,
                    payload: `${nickname} menghapus (${title})`
                })
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
            <FontAwesomeIcon icon={faTrash} className='action-left pointer action-trash-left bg-zinc-900 text-no' onClick={() => setDeleteOpen(true)}/>
            <FontAwesomeIcon icon={faPenToSquare} className='action-left pointer action-edit-left bg-zinc-900 text-info' onClick={() => dispatch(setAddAndEdit({type: 'EDIT_TODO_INSIDE', ...item}))}/>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color={item.details.color} callback={deleteTodo}/>
        </>
    )
}
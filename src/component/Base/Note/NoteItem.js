import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faTrash, faPenToSquare, faLock } from '@fortawesome/free-solid-svg-icons'
import { deleteToast, editToast } from '../../../utils/notif';
import { useSelector, useDispatch } from 'react-redux';
import { API } from '../../../utils/variableGlobal';
import { setTodo } from '../../../redux/todo';
import { setNoteEditor, setSource } from '../../../redux/sourceSlice';
import Confirm from '../../Modal/Confirm';
import axios from 'axios';
import { useState } from 'react'
import Markdown from 'markdown-to-jsx';
import { id } from 'date-fns/locale';
import { format } from 'date-fns';


export function NoteItem({data, handleAreaToDrag}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const dispatch = useDispatch()
    const nickname = useSelector(state => state.source.profile.nickname)
    const channel = useSelector(state => state.channel.book)
    const isAdmin = useSelector(state => state.source.isAdmin)
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
        editToast('mengedit catatan')
        dispatch(setNoteEditor(data))
    }
    return (
        <>
        <div className='note of-hidden bg-primary-dark-50 text-whitesmoke shadow'>
            <div className='note-head d-flex jc-space-between ai-center bg-primary-dark-25 shadow' {...handleAreaToDrag}>
                <FontAwesomeIcon icon={faNoteSticky} style={{color: data.color}} className='note-color'/>
                <div className="note-btn ai-center text-zinc-400">
                    {isAdmin ? 
                        <>
                            <FontAwesomeIcon icon={faTrash} className='pointer' onClick={confirmToDelete}/>
                            <FontAwesomeIcon icon={faPenToSquare} className='pointer' onClick={handleEdit}/>
                        </>
                        :
                        <FontAwesomeIcon icon={faLock}/>
                    }
                </div>
            </div>
            <div className='note-body d-flex fd-column'>
                <pre className='of-auto'>
                    <Markdown className="markdown">{data.context}</Markdown>
                </pre>
                <span className='note-info as-flex-end'>{`${data.by.nickname || data.by}, ${format(new Date(data.date), 'iiii, dd LLL yyyy', { locale: id })}`}</span>
            </div>
        </div>
        <Confirm open={confirmOpen} close={() => setConfirmOpen(false)} target={`${data.by.nickname || data.by}, ${format(new Date(data.date), 'iiii, dd LLL yyyy', { locale: id })}`} metode='delete' color={data.color} callback={handleDelete}/>
        </>
    )
}
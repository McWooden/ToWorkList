import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faAdd  } from '@fortawesome/free-solid-svg-icons'
import { clearTodo } from '../../../redux/todo';
import { useDispatch, useSelector } from 'react-redux';
import { setAddAndEdit } from '../../../redux/addAndEditForGlobalStore';

export function CenterActionButton() {
    const todoId = useSelector(state => state.todo.id)
    function handleClick() {
        dispatch(clearTodo())
    }
    const dispatch = useDispatch()
    return (
        <div className={`center-action-btn d-flex p-fixed ai-center jc-flex-end as-flex-end text-primary ${todoId && 'bg-indianred'}`}>
                {todoId && (
                <div className='detail-back pointer d-flex ai-center' onClick={handleClick}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <span>Kembali</span>
                </div>
                )}
                <div className="action-add">
                    <FontAwesomeIcon icon={faAdd} className='add-btn pointer bg-burlywood' onClick={() => dispatch(setAddAndEdit({type: todoId ? 'ADD_NOTE' : 'ADD_TODO', id: todoId && todoId}))}/>
                </div>
        </div>
    )
}
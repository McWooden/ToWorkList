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
        <div className='center-action-btn d-flex p-fixed ai-center jc-flex-end as-flex-end'>
                {todoId && (
                <div className='detail-back pointer d-flex ai-center' onClick={handleClick}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <span>Back</span>
                </div>
                )}
                <div className="action-add">
                    <FontAwesomeIcon icon={faAdd} className='add-btn pointer' onClick={() => dispatch(setAddAndEdit({type: 'ADD_TODO'}))}/>
                </div>
        </div>
    )
}
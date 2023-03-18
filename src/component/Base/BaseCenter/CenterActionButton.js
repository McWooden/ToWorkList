import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faStickyNote, faArrowLeft  } from '@fortawesome/free-solid-svg-icons'
import { clearTodo } from '../../../redux/todo';
import { useDispatch, useSelector } from 'react-redux';


export function CenterActionButton({handleModalOpen}) {
    const todoId = useSelector(state => state.todo.id)
    function handleClick() {
        dispatch(clearTodo())
    }
    const dispatch = useDispatch()
    return (
        <div className='center-action-btn'>
                {todoId && (
                <div className='detail-back pointer' onClick={handleClick}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <span>Back</span>
                </div>
                )}
                <div className="action-add">
                    <FontAwesomeIcon icon={todoId?faStickyNote:faCheck} className='add-btn pointer' onClick={handleModalOpen}/>
                </div>
        </div>
    )
}
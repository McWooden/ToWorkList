
import { useSelector } from 'react-redux'
import { Welcome } from '../Page/Welcome'
import { TodoDetail } from './TodoDetail';
import { TodoPage } from './TodoPage';
import { BaseRight } from './BaseRight';

export function Base() {
    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)
    if (todoId) return (
        <div className="base">
            <TodoDetail/>
        </div>
    )
    return (
        <div className='base'>
            {pageType === 'welcome' && <Welcome/>}
            {pageType === 'faCheck' && <TodoPage/>}
            <BaseRight/>
        </div>
    )
}


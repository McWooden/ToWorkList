
import { useSelector } from 'react-redux'
import { Welcome } from '../Page/Welcome'
import { TodoDetail } from './TodoDetail';
import { TodoPage } from './TodoPage';
import { BaseRight } from './BaseRight';
import Summary from '../Page/summary';

// const pages = useMemo(() => [
//     {
//         details: {
//             page_title: 'Ringkasan',
//             icon: 'faAddressBook',
//         }
//     },
//     {
//         details: {
//             page_title: 'Notifikasi',
//             icon: 'faBell',
//         }
//     },
//     {
//         details: {
//             page_title: 'Surat',
//             icon: 'faEnvelope',
//         }
//     },
//     {
//         details: {
//             page_title: 'Berita',
//             icon: 'faNewspaper',
//         }
//     }
// ], [])


export function Base() {
    const pageType = useSelector(state => state.source.pageType)
    const todoId = useSelector(state => state.todo.id)

    return (
        <div className='base of-hidden d-flex'>
            {todoId? <TodoDetail/> :
                (<>
                    {pageType === 'welcome' && <Welcome/>}
                    {pageType === 'faAddressBook' && <Summary/>}
                    {pageType === 'faCheck' && <TodoPage/>}
                    <BaseRight/>
                </>)
            }
        </div>
    )
}


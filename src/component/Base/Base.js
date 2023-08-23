
import { useSelector } from 'react-redux'
import { Welcome } from '../Page/Welcome'
import { TodoDetail } from './TodoDetail';
import { TodoPage } from './TodoPage';
import { BaseRight } from './BaseRight';
import Summary from '../Page/summary';
import Email from '../Page/email';
import { DailyTask } from '../Page/DailyTask';

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
        <div className='base of-hidden d-flex text-whitesmoke'>
            {todoId? <TodoDetail/> :
                (<>
                    {pageType === 'welcome' && <Welcome/>}
                    {pageType === 'dailyTask' && <DailyTask/>}
                    {pageType === 'faAddressBook' && <Summary/>}
                    {pageType === 'faCheck' && <><TodoPage/><BaseRight/></>}
                    {pageType === 'faEnvelope' && <Email/>}
                </>)
            }
        </div>
    )
}


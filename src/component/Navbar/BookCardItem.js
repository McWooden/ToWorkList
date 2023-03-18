import { useNavigate } from 'react-router-dom'
import { url } from '../../utils/variableGlobal'


export function BookCardItem({data}) {
    const profile = data.profile
    
    const navigate = useNavigate()
    const id = data._id
    return (
        <div className="book_card" onClick={() => navigate(`/join?invite=${id}`)}>
            <div className="book_card-header">
                <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} className='banner'/>
            </div>
            <div className="book_card-body">
                <img src={`${url}/${profile.avatar_url}`} alt={profile.book_title} className='avatar'/>
                <p className='title'>{profile.book_title}</p>
                <p>{profile.desc}</p>
                <p className='panjang_anggota'>{data.users_length} Anggota</p>
            </div>
        </div>
    )
}

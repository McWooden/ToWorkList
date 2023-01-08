import './style/setting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMap, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { GuildContext } from '../pages/App'
import { convertDateToString } from '../utils/convertDateFormat'
import { deleteToast, leaveToast, editToast } from '../utils/notif'
import { myAccount } from '../utils/dataJSON'

export function GuildSetting({open, close}) {
    const [select, setSelect] = useState('profile')
    const {guildName} = useContext(GuildContext)
    if (!open) return
    function handleSelectOnChange(newSelect) {
        setSelect(newSelect)
    }
    return ReactDOM.createPortal(
        <div className="setting_full">
            <div className="setting_full_nav">
                <ul>
                    <li className={`setting_full_nav_list ${select === 'profile' && 'active'}`} onClick={() => handleSelectOnChange('profile')}>
                        <FontAwesomeIcon icon={faPencil} className='setting_full_nav_list_icon'/>
                        <p>{guildName}</p>
                    </li>
                    <li className={`setting_full_nav_list ${select === 'room' && 'active'}`} onClick={() => handleSelectOnChange('room')}>
                        <FontAwesomeIcon icon={faMap} className='setting_full_nav_list_icon'/>
                        <p>ruangan</p>
                    </li>
                    <li className={`setting_full_nav_list ${select === 'member' && 'active'}`} onClick={() => handleSelectOnChange('member')}>
                        <FontAwesomeIcon icon={faUserGroup} className='setting_full_nav_list_icon'/>
                        <p>orang</p>
                    </li>
                </ul>
            </div>
            <div className="setting_full_body">
                <section>
                    {select === 'profile' && <GuildSettingProfile/>}
                    {select === 'room' && <GuildSettingRoom/>}
                    {select === 'member' && <GuildSettingMember/>}
                </section>
                <GuildSettingClose callback={close}/>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
function GuildSettingClose({callback}) {
    return (
        <div className="setting_full_close pointer" onClick={callback}>
            <FontAwesomeIcon icon={faXmark} className='x_mark'/>
            <p>esc</p>
        </div>
    )
}

function GuildSettingProfile() {
    const { guild } = useContext(GuildContext)
    return (
        <>
        <div className="setting_header">
            <h3>Profil</h3>
        </div>
        <div className="setting_full_profile_view">
            <div className="setting_full_profile_view_header">
                <img src={guild.profile.pic || guild.profile.src} alt={guild.profile.name} className='setting_full_pp_guild'/>
                <p className='setting_full_name_guild'>{guild.profile.name || guild.profile.guildName}{guild.profile.nickname? <span>#{guild.profile.id || '0000'}</span> : null}</p>

            </div>
            <div className="setting_full_profile_view_body">
                <h5>Dibuat pada</h5>
                <p className='setting_profile_date'>{convertDateToString(guild.profile.created_at)} {guild.profile.by? `oleh ${guild.profile.by}`: null}</p>
                <p className='setting_keluar_btn edit_btn' onClick={() => editToast('mengedit profile')}>Edit Profil</p>
            </div>
        </div>
        <div className="setting_keluar">
            {guild.profile.nickname? 
            <>
            <p>Akun</p>
            <div className="setting_keluar-action">
                <span className="setting_keluar_btn delete_btn" onClick={() => deleteToast('akun terhapus')}>hapus akun</span>
                <span className="setting_keluar_btn keluar_btn" onClick={() => leaveToast(`bye ${myAccount.profile.nickname}`)}>Keluar</span>
            </div>
            </>
            :
            <>
            <p>Guild</p>
            <div className="setting_keluar-action">
                <span className="setting_keluar_btn delete_btn"  onClick={() => deleteToast('guild terhapus')}>hapus guild</span>
                <span className="setting_keluar_btn keluar_btn" onClick={() => leaveToast(`bye everyone in the room ${guild.profile.guildName}`)}>Keluar guild</span>
            </div>
            </>
            }
            
        </div>
        </>
    )
}
function GuildSettingRoom() {
    const {guildRooms, handleRoom, currentRoom} = useContext(GuildContext)
    const lists = []
    guildRooms.forEach((room, index) => {
        lists.push(
            <div key={index} className={`room setting_room ${currentRoom === room.roomName?'active':''}`} onClick={() => handleRoom(index)}>
                <FontAwesomeIcon icon={fontawesome.faCheck} className={`room-icon ${currentRoom === room.roomName?'active':''}`}/>
                <span className={`setting_room_list_name ${currentRoom === room.roomName?'active':''}`}>{room.roomName}</span>
                <div className="room_action">
                    <div className="info-menu-box">
                        <FontAwesomeIcon icon={fontawesome.faMoneyCheck} className='info-menu-box-icon'/>
                        <div className='info-menu-box-count'>{room.items.length}</div>
                    </div>
                    <FontAwesomeIcon icon={fontawesome.faGear} className={`room-icon setting_room-setting ${currentRoom === room.roomName?'active':''}`}/>
                </div>
            </div>
        )
    })
    return(
        <>
        <div className="setting_header">
            <h3>Room</h3>
            <p>semua ruangan dan jumlah tugas di setiap ruangan</p>
        </div>
        <div className='roomList'>
            {lists}
        </div>
        </>
    )
}
function GuildSettingMember() {
    const { users } = useContext(GuildContext)
    let box = []
    Object.keys(users).forEach((propertyName) => {
        box.push(
            <p className='users-group' key={propertyName}>{propertyName}</p>
        )
        let container = []
        users[propertyName].user.forEach((user, index) => {
            container.push(
                <div className='group-user pointer' key={`${user.name}-${index}`}>
                    <img src={user.pic} alt={user.name} />
                    <div className="user-context">
                        <p style={{color: users[propertyName].color}} >{user.name}</p>
                        <p className='user-status'>{user.status}</p>
                    </div>
                </div>
            )
        })
        box.push(<div key={`${propertyName}-container`} className='group-user-container'>{container}</div>)
    })
    return (
        <>
        <div className="setting_header">
            <h3>Anggota</h3>
            <p>list manusia yang ada di sini</p>
        </div>
        {box}
        </>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function InfoMenu({icon, count}) {
    return (
        <div className="menu-box d-flex ai-center jc-center bg-primary-dark-50 shadow text-zinc-400">
            <FontAwesomeIcon icon={icon} className='menu-box-icon'/>
            <div className='menu-box-count'>{count || 0}</div>
        </div>
    )
}
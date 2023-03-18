import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function InfoMenu({icon, count}) {
    return (
        <div className="info-menu-box">
            <FontAwesomeIcon icon={icon} className='info-menu-box-icon'/>
            <div className='info-menu-box-count'>{count}</div>
        </div>
    )
}
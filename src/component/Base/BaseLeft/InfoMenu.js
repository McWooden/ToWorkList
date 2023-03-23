import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function InfoMenu({icon, count}) {
    return (
        <div className="info-menu-box d-flex ai-center jc-center">
            <FontAwesomeIcon icon={icon} className='info-menu-box-icon'/>
            <div className='info-menu-box-count'>{count}</div>
        </div>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export function SettingClose({callback}) {
    return (
        <div className="setting_full_close d-flex fd-column jc-center ai-center p-fixed pointer" onClick={callback}>
            <FontAwesomeIcon icon={faXmark} className='x_mark d-grid pi-center'/>
            <p>esc</p>
        </div>
    )
}
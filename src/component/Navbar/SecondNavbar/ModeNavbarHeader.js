import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Setting from '../../Setting/Setting'

export function ModeNavbarHeader() {
    const nameBook = useSelector(state => state.source.guildProfile?.book_title)
    const [settingOpen, setSettingOpen] = useState(false)
    function handleClose() {
        setSettingOpen(false)
    }
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setSettingOpen(false)
            }
        }
        if (settingOpen) {
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [settingOpen])
    return (
        <div className="modeNavbarHeader d-flex ai-center">
            <h4 className='guild-name d-inline-block of-hidden'>{nameBook || ''}</h4>
            <FontAwesomeIcon icon={faGear} className='settingNavbar pointer bg-primary-bright' onClick={() => setSettingOpen(true)}/>
            <Setting open={settingOpen} close={handleClose}/>
        </div>
    )
}
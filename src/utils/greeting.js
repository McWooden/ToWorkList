import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faMoon, faMountainSun } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'


export function Greeting() {
    let time = null
    let color = null
    let greetingIcon = null

        const currentTime = new Date()
        const hour = currentTime.getHours()

        if (hour < 12) {
            time = ('pagi')
            color = ('greenyellow')
            greetingIcon = <FontAwesomeIcon icon={faSun}/>
        } else if (hour < 15) {
            time = ('siang')
            color = ('royalblue')
            greetingIcon = <FontAwesomeIcon icon={faCloud}/>
        } else if (hour < 18) {
            time = ('sore')
            color = ('tomato')
            greetingIcon = <FontAwesomeIcon icon={faMountainSun}/>
        } else {
            time = ('malam')
            color = ('goldenrod')
            greetingIcon = <FontAwesomeIcon icon={faMoon}/>
        }

    return (
        <div className='greeting d-flex fd-row of-hidden bg-primary-dark-50 text-white shadow'>
            <div className="color d-grid pi-center" style={{color: color}}>
                {greetingIcon}
            </div>
            <div className="greeting-context d-flex fd-column jc-center text-sm">
                <p className='selamat'>Selamat {time}!</p>
                <p className='date'>{format(new Date(), 'EEEE, d MMM yyyy', {locale: id})}</p>
            </div>
        </div>
    )
}
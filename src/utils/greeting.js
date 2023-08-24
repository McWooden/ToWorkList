import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faMoon, faMountainSun } from '@fortawesome/free-solid-svg-icons'


export function Greeting() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const day = days[new Date().getDay()];
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
                <p className='date'>{day}, {new Date().getDate()} {bulan[new Date().getMonth()]} {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}
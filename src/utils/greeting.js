import React, { useState, useEffect } from 'react';
import { convertDateToString } from './convertDateFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faMoon, faMountainSun } from '@fortawesome/free-solid-svg-icons'


export function Greeting() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const day = days[new Date().getDay()];
    const [time, setTime] = useState(null)
    const [color, setColor] = useState(null)
    const [greetingIcon, setGreetingIcon] = useState(null)

    useEffect(() => {
        const currentTime = new Date()
        const hour = currentTime.getHours()

        if (hour < 12) {
            setTime('pagi')
            setColor('greenyellow')
            setGreetingIcon(faSun)
        } else if (hour < 15) {
            setTime('siang')
            setColor('royalblue')
            setGreetingIcon(faCloud)
        } else if (hour < 18) {
            setTime('sore')
            setColor('tomato')
            setGreetingIcon(faMountainSun)
        } else {
            setTime('malam')
            setColor('goldenrod')
            setGreetingIcon(faMoon)
        }
    }, [])

    return (
        <div className='greeting'>
            <div className="color">
                <FontAwesomeIcon style={{color: color}} icon={greetingIcon}/>
            </div>
            <div className="greeting-context">
                <p className='selamat'>Selamat {time}!</p>
                <p className='date'>{day}, {convertDateToString(new Date().toLocaleDateString())}</p>
            </div>
        </div>
    )
}
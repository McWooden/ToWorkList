import { Greeting } from "../utils/greeting"
import './style/page.css'
import { useState, useEffect } from "react"
import { AppContext } from "../pages/App"
import { useContext } from "react"

export function Welcome() {
    const { handleNavbar, hideNavbar } = useContext(AppContext)
    // const taglines = [
    //     "Simplify your tasks",
    //     "Efficiently organize your life",
    //     "Elevate productivity",
    //     "Transform your to-do lists",
    //     "Next level task management"
    // ]
    const taglines = [
        "Masih dalam pembuatan",
        "Nantikan update berikutnya!",
        "Developer sedang panik",
        "Developer ingin membeli waktu",
        "Perkembangan cukup lambat",
        "Maintance...",
        "Sedang mengerjakan backend",
        "Laptop saya panas...",
        "Loadingnya lama...",
    ]
    
    const randomIndex = Math.floor(Math.random() * taglines.length)
    const [randomTagline, setRandomTagline] = useState(taglines[randomIndex])
    const [typing, setTyping] = useState(false)
    const [displayText, setDisplayText] = useState('')
    
    useEffect(() => {
        let i = 0
        const typingEffect = setInterval(() => {
            if (i <= randomTagline.length) {
                setDisplayText(randomTagline.slice(0, i))
                i++
            } else {
                clearInterval(typingEffect)
            }
        }, 50)
        return () => clearInterval(typingEffect)
    }, [randomTagline])
    function handleClick() {
        setTyping(true)
        setTimeout(() => setTyping(false), randomTagline.length * 50 + 300)
        let newRandomIndex = Math.floor(Math.random() * taglines.length)
        setRandomTagline(taglines[newRandomIndex])
    }
    return (
        <div className="welcome" onClick={handleClick}>
            <Greeting/>
            <div className='welcome_page'>
                <p className='welcome_name'>Toworklist</p>
                <span className={`welcome_tagline ${typing ? 'typing': ''}`}>{displayText}<span className="cursor">|</span></span>
                <span className="tapToOpenNavbar" onClick={() => handleNavbar(hideNavbar)}>Ketuk untuk membuka navbar</span>
            </div>
        </div>
    )
}
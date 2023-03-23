import { Greeting } from "../../utils/greeting"
import { useState, useEffect } from "react"
import { AppContext } from "../../pages/App"
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
        <div className="welcome d-flex fd-column of-auto" onClick={handleClick}>
            <Greeting/>
            <div className='welcome_page d-flex fd-column ai-center jc-flex-start'>
                <p className='welcome_name as-flex-start'>Toworklist</p>
                <span className={`welcome_tagline as-flex-start ${typing ? 'typing': ''}`}>{displayText}<span className="cursor">|</span></span>
                <span className="tapToOpenNavbar as-flex-start d-block" onClick={() => handleNavbar(hideNavbar)}>Ketuk untuk membuka navbar</span>
            </div>
        </div>
    )
}
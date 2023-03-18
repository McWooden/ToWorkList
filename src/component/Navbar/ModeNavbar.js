import { useContext } from "react"
import { useSelector } from "react-redux"
import { AppContext } from "../../pages/App"
import { ModeNavbarHeader } from "./ModeNavbarHeader"
import { Profile } from "./Profile"
import { PageAccountList } from "./PageAccountList"
import { PageList } from "./PageList"

export function ModeNavbar() {
    const { secondNavRef } = useContext(AppContext)
    const pathBook = useSelector(state => state.fetch.pathBook)
    return (
        <div className='modeNavbar' ref={secondNavRef}>
            {pathBook === '@me' ? (
                <div className="modeNavbarHeader">
                    <h4 className='app-name'>Toworklist</h4>
                </div>
            ) : <ModeNavbarHeader/>}
            {pathBook === '@me' ? <PageAccountList/> : <PageList/>}
            <Profile/>
        </div>
    )
}
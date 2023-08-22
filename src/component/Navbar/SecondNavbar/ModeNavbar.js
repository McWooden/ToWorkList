import { useSelector } from "react-redux"
import { ModeNavbarHeader } from "./ModeNavbarHeader"
import { Profile } from "./Profile"
import { PageAccountList } from "./PageAccountList"
import { PageList } from "./PageList"

export function ModeNavbar() {
    const pathBook = useSelector(state => state.fetch.pathBook)
    return (
        <div className='modeNavbar d-flex fd-column of-hidden p-relative border-burlywood bg-primary shadow-lg'>
            {pathBook === '@me' ? (
                <div className="modeNavbarHeader d-flex ai-center">
                    <h4 className='app-name'>Toworklist</h4>
                </div>
            ) : <ModeNavbarHeader/>}
            {pathBook === '@me' ? <PageAccountList/> : <PageList/>}
            <Profile/>
        </div>
    )
}
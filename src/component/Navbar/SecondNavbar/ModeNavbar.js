import { useSelector } from "react-redux"
import { ModeNavbarHeader } from "./ModeNavbarHeader"
import { Profile } from "./Profile"
import { PageAccountList } from "./PageAccountList"
import { PageList } from "./PageList"
import { useNavigate } from "react-router-dom"

export function ModeNavbar() {
    const pathBook = useSelector(state => state.fetch.pathBook)
    const navigate = useNavigate()
    return (
        <div className='flex flex-col of-hidden relative'>
            <div className='modeNavbar flex flex-col of-hidden border-burlywood bg-primary shadow-lg flex-1'>
                {pathBook === '@me' ? (
                    <div className="modeNavbarHeader d-flex ai-center">
                        <h4 className='app-name pointer' onClick={() => navigate('/home')}>Toworklist</h4>
                    </div>
                ) : <ModeNavbarHeader/>}
                {pathBook === '@me' ? <PageAccountList/> : <PageList/>}
                <Profile/>
            </div>
        </div>
    )
}
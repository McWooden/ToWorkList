import { useContext } from "react"
import { GuildContext } from "../pages/App"
import { myAccount } from "./dataJSON"

export function RoomProggress() {
    const myNickname =myAccount.profile.nickname
    const { room } = useContext(GuildContext)
    const items = room.items
    const finished = items.filter(item => item.dones.indexOf(myNickname) !== -1)
    const unfinished = items.filter(item => item.dones.indexOf(myNickname) === -1)
    function widthValue(value) {
        return Math.round((value.length / items.length)*100) + '%'
    }
    return (
        <div className="progress">
            <div className="progress-bar">
                <div className="progress-value undone" style={{width: widthValue(finished)}}/>
            </div>
            <div className="progress-bar">
                <div className="progress-value done" style={{width: widthValue(unfinished)}}/>
            </div>
        </div>
    )
}
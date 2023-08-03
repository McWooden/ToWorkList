import { useSelector } from "react-redux"

export function PageProggress() {
    const source = useSelector(state => state.source.source)
    const profile = useSelector(state => state.source.profile)
    const myNickname = profile.nickname
    const list = source.list || []
    const finished = list.filter(item => item.dones.indexOf(myNickname) !== -1)
    const unfinished = list.filter(item => item.dones.indexOf(myNickname) === -1)
    function widthValue(value) {
        return Math.round((value.length / list.length)*100) + '%'
    }
    return (
        <div className="progress d-flex fd-column">
            <div className="progress-bar of-hidden shadow-lg bg-zinc-900">
                <div className="progress-value bg-ok" style={{width: widthValue(finished)}}/>
            </div>
            <div className="progress-bar of-hidden shadow-lg bg-zinc-900">
                <div className="progress-value bg-no" style={{width: widthValue(unfinished)}}/>
            </div>
        </div>
    )
}
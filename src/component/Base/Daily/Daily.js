import { useSelector } from "react-redux"
import { Greeting } from "../../../utils/greeting"
import DisplayDailyContainer from "./DisplayDailyContainer"


export default function Daily() {
    return (
        <div className='flex w-full'>
            <DailyTaskLeft/>
            <DailyTaskRight/>
        </div>
    )
}

function DailyTaskLeft() {
    const isLeftSideShow = useSelector(state => state.show.leftSide)
    return (
    <div className={`base-left of-auto zi-1 flex-1 base-left-${isLeftSideShow?'show':'hide'} fd-column d-flex p-2`}>
        <Greeting/>
    </div>
    )
}

function DailyTaskRight() {
    return (
    <div className="flex flex-3 flex-col">
        <div className="welcome flex flex-col overflow-auto flex-3 p-[.5em]">
        <DisplayDailyContainer/>
        </div>
    </div>
    )
}

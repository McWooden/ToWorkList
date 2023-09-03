import { Greeting } from "../../utils/greeting"
import TaskContainer from './DailyTask/DisplayDailyTask'
import { Left } from "../Base/BaseComponent"


export function DailyTask() {
  return (
    <div className='flex w-full'>
      <DailyTaskLeft/>
      <DailyTaskRight/>
    </div>
  )
}

function DailyTaskLeft() {
  return (
    <Left>
      <div className="p-2">
        <Greeting/>
      </div>
    </Left>
  )
}

function DailyTaskRight() {
  return (
    <div className="flex flex-3 flex-col">
      <div className="welcome flex flex-col overflow-auto flex-3 p-[.5em]">
        <TaskContainer/>
      </div>
    </div>
  )
}
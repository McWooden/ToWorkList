import { Greeting } from "../../utils/greeting"
import TaskContainer from './DailyTask/DisplayDailyTask'
import { Center, Left } from "../Base/BaseComponent"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { disableIcon } from "../../redux/hideAndShowSlice"


export function DailyTask() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(disableIcon({left: true, right: true}))
    return () => {
      dispatch(disableIcon({left: false, right: false}))
    }
  },[dispatch])
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
    <Center>
      <div className="welcome flex flex-col overflow-auto flex-3 p-2 h-full">
        <TaskContainer/>
      </div>
    </Center>
  )
}
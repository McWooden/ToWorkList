import { Base } from '../Base/Base'
import { createContext, useState } from 'react'
import { NavTop } from './NavTop'

export const HideBase = createContext()

export function TodoApp() {
    const [hideRightBase, setHideRightBase] = useState(true)
    const [hideLeftBase, setHideLeftBase] = useState(true)
    function handleRightBase(boolean) {
        setHideRightBase(!boolean)
        setHideLeftBase(true)
    }
    function handleLeftBase(boolean) {
        setHideLeftBase(!boolean)
        setHideRightBase(true)
    }
    return (
        <HideBase.Provider value={{hideRightBase, handleRightBase, hideLeftBase, handleLeftBase}}>
            <div id='todoApp'>
                <NavTop/>
                <Base/>
            </div>
        </HideBase.Provider>
    )
}

export default TodoApp
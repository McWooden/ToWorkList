import { useDispatch } from "react-redux"
import MyBlock from "../../utils/MyBlock"
import { reverseLeftSide, reverseRightSide } from "../../redux/hideAndShowSlice"
import { useSelector } from "react-redux"

export function Center({children}) {
    <div className="base-center p-relative of-auto">
        {children}
    </div>
}

export function Right({children}) {
    const active = useSelector(state => state.show.rightSide)
    const dispatch = useDispatch()
    return (
        <>
        <MyBlock className={'base-right_block'} cb={() => dispatch(reverseRightSide())} active={active}/>
        <div className={`base-right of-auto zi-1 flex-1 base-right-${active?'show':'hide'} fd-column d-flex bg-indianred`}>
            {children}
        </div>
        </>
    )
}

export function Left({children}) {
    const active = useSelector(state => state.show.leftSide)
    const dispatch = useDispatch()
    return (
        <>
        <MyBlock className={'base-left_block'} cb={() => dispatch(reverseLeftSide())} active={active}/>
        <div className={`base-left of-auto zi-1 flex-1 base-left-${active?'show':'hide'} fd-column d-flex`}>
            {children}
        </div>
        </>
    )
}
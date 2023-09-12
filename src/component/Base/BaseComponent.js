import { useDispatch } from "react-redux"
import MyBlock from "../../utils/MyBlock"
import { reverseLeftSide, reverseNavbar, reverseRightSide } from "../../redux/hideAndShowSlice"
import { useSelector } from "react-redux"
import { useSwipeable } from "react-swipeable"

export function Center({children, className = 'of-auto'}) {
    const dispatch = useDispatch()
    const handlers = useSwipeable({
        onSwipedRight: () => dispatch(reverseLeftSide()),
        onSwipedLeft: () => dispatch(reverseRightSide()),
    })
    return (
        <div {...handlers} className={`base-center relative ${className}`}>
            {children}
        </div>
    )
}

export function Right({children}) {
    const active = useSelector(state => state.show.rightSide)
    const dispatch = useDispatch()
    const handlers = useSwipeable({
        onSwipedRight: () => dispatch(reverseRightSide()),
    })
    return (
        <>
        <MyBlock className={'base-right_block'} cb={() => dispatch(reverseRightSide())} active={active}/>
        <div {...handlers} className={`base-right of-auto zi-1 flex-1 base-right-${active?'show':'hide'} fd-column d-flex bg-indianred`}>
            {children}
        </div>
        </>
    )
}

export function Left({children}) {
    const active = useSelector(state => state.show.leftSide)
    const dispatch = useDispatch()
    const handlers = useSwipeable({
        onSwipedRight: () => dispatch(reverseNavbar()),
        onSwipedLeft: () => dispatch(reverseLeftSide()),
      })
      
    return (
        <>
            <MyBlock className={'base-left_block'} cb={() => dispatch(reverseLeftSide())} active={active}/>
            <div {...handlers} className={`base-left of-auto zi-1 flex-1 base-left-${active?'show':'hide'} fd-column d-flex`}>
                {children}
            </div>
        </>
    )
}
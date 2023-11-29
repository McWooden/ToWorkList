import { useDispatch } from "react-redux"
import { useSwipeable } from "react-swipeable"
import { reverseLeftSide, reverseNavbar, reverseRightSide } from "../redux/hideAndShowSlice"

export default function MyBlock({active, className, cb, component}) {
    const dispatch = useDispatch()
    const handlers = useSwipeable({
        onSwipedRight: () => {
            switch (component) {
                case 'right':
                    dispatch(reverseRightSide())
                    break
                case 'left':
                    dispatch(reverseNavbar())
                    break
                case 'nav':
                    dispatch(reverseNavbar())
                    break
                default:
                    break
            }
        },
        onSwipedLeft: () => {
            switch (component) {
                case 'left':
                    dispatch(reverseLeftSide())
                    break
                default:
                    break
            }
        },
        swipeDuration: 1000,
        delta: 250,
    })

    return <div className={`navigation_block zi-2 p-fixed ${active?'active':'inactive'} ${className}`} onClick={cb} {...handlers}/>
}
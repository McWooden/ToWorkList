import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useEffect, useContext } from "react"
import { API } from "../../utils/variableGlobal"
import { setSource } from "../../redux/sourceSlice"
import { HideBase } from '../TodoApp/TodoApp'
import { BaseLeft } from "./BaseLeft"
import { BaseCenter } from "./BaseCenter"


export function TodoPage() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const source = useSelector(state => state.source.source)
    const dispatch = useDispatch()
    const { hideLeftBase } = useContext(HideBase)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/source/page/${idPageOfBook}`)
                dispatch(setSource(response.data))
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [idPageOfBook, dispatch])

    if (!source) return (
        <>
        <div className={`base-left zi-1 flex-1 of-auto ${hideLeftBase?'base-left-hide':'base-left-show'}`}>
            <div className="sidebar-left">
                <div className='sidebar_left_loading loading'/>
            </div>
        </div>
        <div className="base-center p-relative of-auto">
            <div className="center d-flex p-relative fd-column">
                <div className="loading center_loading"/>
            </div>
        </div>
        </>
    )
    return (
        <>
            <BaseLeft/>
            <BaseCenter/>
        </>
    )
}


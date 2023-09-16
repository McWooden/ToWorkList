import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { API } from "../../../utils/variableGlobal"
import { setSource } from "../../../redux/sourceSlice"
import { TodoLeft } from "./todoLeft"
import MyLoading from "../../../utils/myLoading"
import { TodoCenter } from './todoCenter'



export function TodoPage() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const source = useSelector(state => state.source.source)
    const dispatch = useDispatch()
    const [isReload, setIsReload] = useState(false)
    const fetchData = useCallback(async () => {
        setIsReload(false)
            try {
                const response = await axios.get(`${API}/source/page/${idPageOfBook}`).catch(err => {
                    throw new Error(err)
                })
                dispatch(setSource(response.data))
                console.log(response.data);
            } catch (err) {
                console.error(err)
                setIsReload(true)
            }
    },[dispatch, idPageOfBook])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return (
        <>  
            {isReload && 
            <div className="flex-3 p-relative of-auto">
                <div className="center d-flex p-relative fd-column">
                    <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
                        <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                    </div>
                </div>
            </div>
            }
            {!source && !isReload && <div className="flex-3 p-relative of-auto">
                <div className="center d-flex p-relative fd-column">
                    <MyLoading/>
                </div>
            </div>}
            {source && <>
                <TodoLeft/>
                <TodoCenter/>
            </>}
        </>
    )
}


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fontawesome from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { API } from "../../../utils/variableGlobal"
import { setSource } from "../../../redux/sourceSlice"
import { BaseLeft } from "../BaseLeft"
import { BaseCenter } from "../BaseCenter"
import MyLoading from "../../../utils/myLoading"


export function TodoPage() {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const source = useSelector(state => state.source.source)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [isReload, setIsReload] = useState(false)
    const fetchData = useCallback(async () => {
        setIsReload(false)
        setIsLoading(true)
            try {
                const response = await axios.get(`${API}/source/page/${idPageOfBook}`).catch(err => {
                    throw new Error(err)
                })
                dispatch(setSource(response.data))
                setIsLoading(false)
            } catch (err) {
                console.error(err)
                setIsReload(true)
                setIsLoading(false)
            }
    },[dispatch, idPageOfBook])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {

    })
    return (
        <>  
            {isReload && 
            <div className="base-center p-relative of-auto">
                <div className="center d-flex p-relative fd-column">
                    <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
                        <FontAwesomeIcon icon={fontawesome.faRotateBack} className="reload_btn" />
                    </div>
                </div>
            </div>
            }
            {isLoading && <div className="flex-3 p-relative of-auto">
                <div className="center d-flex p-relative fd-column">
                    <MyLoading/>
                </div>
            </div>}
            {source && <>
                <BaseLeft/>
                <BaseCenter/>
            </>}
        </>
    )
}


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { CenterActionButton } from './BaseCenter/CenterActionButton';
import { CardContainer } from './BaseCenter/CardContainer';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSource } from '../../redux/sourceSlice';
import { API } from '../../utils/variableGlobal';
import axios from 'axios';
export function BaseCenter() {
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()
    const fetchData = useCallback(async() => {
        const {data} = await axios.get(`${API}/source/page/${idPageOfBook}`)
        dispatch(setSource(data))
        setShouldUpdate(false)
      },
      [dispatch, idPageOfBook],
    )
    const channel = useSelector(state => state.channel.book)
    useEffect(() => {
      channel.on('broadcast', {event: `${idPageOfBook}:shouldUpdate`}, payload => {
        setShouldUpdate(payload.payload)
      })
    }, [channel, dispatch, idPageOfBook])

    return (
        <div className="base-center p-relative of-auto">
            <div className="center d-flex p-relative fd-column">
                {shouldUpdate && 
                        <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs rounded m-2 pointer sticky top-1 bg-info" onClick={fetchData}>
                            <FontAwesomeIcon icon={faRotateRight}/>
                            <p>{shouldUpdate}</p>
                        </div>
                }
                <CardContainer/>
                <CenterActionButton/>
            </div>
        </div>
    )
}
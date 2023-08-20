import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux"
import { TodoModel } from "../../Model/Todo"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useEffect, useState } from "react"
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { blankToast, loadingToast } from '../../../utils/notif'
import { useCallback } from 'react'
import { setSource } from '../../../redux/sourceSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export function CardContainer() {
    const pageId = useSelector(state => state.fetch.idPageOfBook)
    const reduxSource = useSelector(state => state.source.source)
    const [list, setList] = useState(reduxSource.list)
    const [saveIt, setSaveIt] = useState(false)
    const channel = useSelector(state => state.channel.book)
    const myNickname = useSelector(state => state.source.profile.nickname)
    const dispatch = useDispatch()

    const handleSourceToListSorted = useCallback((dataToSort) => {
        const sortedList = dataToSort ? [...reduxSource.list].sort((a, b) => a.order - b.order) : []
        setList(sortedList)
    }, [reduxSource])

    useEffect(() => {
        handleSourceToListSorted(reduxSource.list)
    }, [handleSourceToListSorted, reduxSource])

    function handleOnDragEnd(result) {
        try {
            const { destination, source } = result
            if (source.index === destination.index) return
            
            const items = Array.from(list)
            const [recordedItems] = items.splice(source.index, 1)
            items.splice(destination.index, 0, recordedItems)
            setList(items)

            const sortedReduxList = [...reduxSource.list].sort((a, b) => a.order - b.order)
            const changesDetected = sortedReduxList.some((e, i) => e._id !== items[i]._id)
            setSaveIt(changesDetected)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        channel.on('broadcast', {event: `${pageId}:structureUpdate`}, payload => {
            try {
                const data = reduxSource.list
                console.log(payload.payload)
                
                data.map(item => {
                    const thisItem = item
                    const contain = payload.payload.newOrder.find(x => x._id === item._id)
                    if (contain) thisItem.order = contain.order
                    return thisItem
                })
                
                dispatch(setSource({...reduxSource, list: data}))
                
                blankToast(payload.payload.message)
            } catch (err) {}
        })
    }, [channel, dispatch, handleSourceToListSorted, pageId, reduxSource])
    
    async function handleSaveIt() {
        const dataToSend = {newOrder: list.map((data, index) => ({_id: data._id, order: index}))}
        const promise = loadingToast('Menyimpan susunan')
        try {
            await axios.put(API+`/order/list/${pageId}`, dataToSend)
            .then(res => {
                blankToast("Susunan berhasil disimpan")
                setSaveIt(false)
                channel.send({
                    type: 'broadcast',
                    event: `${pageId}:structureUpdate`,
                    payload: {...dataToSend, message: `${myNickname} mengubah susunan tugas`},
                })
            }).catch(err => {
                console.log(err)
                
            }).finally(() => toast.dismiss(promise))
        } catch (error) {
            toast.dismiss(promise)
        }
    }
    function handleCancelSaveIt() {
        handleSourceToListSorted(reduxSource.list)
        setSaveIt(false)
    }
    return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="dragArea">
            {saveIt && (
                <div className='flex bg-info shadow m-2 rounded items-center'>
                    <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]" onClick={handleSaveIt}>
                        <FontAwesomeIcon icon={faFloppyDisk}/>
                        <p>Simpan susunan</p>
                    </div>
                    <div className="h-[45px] flex justify-center shadow items-center gap-x-2 text-xs rounded m-2 pointer bg-no flex-1" onClick={handleCancelSaveIt}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                </div>
            )}
        <Droppable droppableId="todoModel">
            {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="list-none">
                    {
                    list?.map((data, index) => (
                        <Draggable key={data._id} draggableId={data._id} index={index}>
                            {(provided) => (
                                <li {...provided.draggableProps} ref={provided.innerRef} className="mb-2">
                                    <TodoModel item={data} handleAreaToDrag={provided.dragHandleProps}/>
                                </li>
                            )}
                        </Draggable>
                    ))||''}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
        </div>
    </DragDropContext>
    )
}

// [{_id: '63df978455d2a454448fc35d', order: 0},{_id: '63ee3901834418b6271d935d', order: 1},{_id: '63dcccddddd145764dc33915', order: 2},{_id: '63c24a7f6fc1b83f894ed8aa', order: 3},{_id: '63e3b2294157ce4230113d9d', order: 4},{_id: '63e438a6a28c4bebb8ffb0c0', order: 5},{_id: '63eb9cbc258fed8d64996309', order: 6},{_id: '63d3299fed7b8e98ae38b760', order: 7},{_id: '63ee0629c67bf01e135e56f3', order: 8},{_id: '63f0bdb30095c268d04e0625', order: 9},{_id: '64ccd367e6c7729cc44ad573', order: 10},{_id: '63ec29118408a990ea984e31', order: 11}]
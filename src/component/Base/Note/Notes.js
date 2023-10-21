import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faLock, faXmark } from '@fortawesome/free-solid-svg-icons'
import Note from "../../Model/Note"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState, useCallback, useEffect } from "react"
import { toast } from 'react-toastify'
import axios from 'axios'
import { API } from '../../../utils/variableGlobal'
import { blankToast, loadingToast } from '../../../utils/notif'
import { useDispatch } from 'react-redux'
import { setNotes } from '../../../redux/todo'

export default function Notes() {
    const pageId = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const pageType = useSelector(state => state.source.pageType)
    const sourceNotes = useSelector(state => state.source?.source?.noteList)
    const todoNotes = useSelector(state => state.todo.notes)
    const [list, setList] = useState(todoNotes)
    const [saveIt, setSaveIt] = useState(false)
    const channel = useSelector(state => state.channel.book)
    const myNickname = useSelector(state => state.source.profile.nickname)
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.source.isAdmin)

    const handleSourceToListSorted = useCallback(() => {
        let data
        if (pageType === 'faNoteSticky') {
            data = sourceNotes ? [...sourceNotes] : []
        } else {
            data = todoNotes ? [...todoNotes] : []
        }

        const sortedList = data ? data.sort((a, b) => a.order - b.order) : []
        setList(sortedList)
    }, [pageType, sourceNotes, todoNotes])

    useEffect(() => {
        handleSourceToListSorted()
    }, [handleSourceToListSorted, todoNotes])

    function handleOnDragEnd(result) {
        let data
        if (pageType === 'faNoteSticky') {
            data = [...sourceNotes]
        } else {
            data = [...todoNotes]
        }
        try {
            const { destination, source } = result
            if (source.index === destination.index) return
            
            const items = Array.from(list)
            const [recordedItems] = items.splice(source.index, 1)
            items.splice(destination.index, 0, recordedItems)
            setList(items)

            const sortedReduxList = data.sort((a, b) => a.order - b.order)
            const changesDetected = sortedReduxList.some((e, i) => e._id !== items[i]._id)
            setSaveIt(changesDetected)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleSaveIt() {
        let path
        let eventPath
        if (pageType === 'faNoteSticky') {
            path = API+`/order/notes/${pageId}`
            eventPath = `${pageId}:shouldUpdate`
        } else {
            path = API+`/order/todo-notes/${pageId}/${todoId}`
            eventPath = `${pageId}/${todoId}:notesUpdate`
        }
        const dataToSend = {newOrder: list.map((data, index) => ({_id: data._id, order: index}))}
        const promise = loadingToast('Menyimpan susunan')
        try {
            await axios.put(path, dataToSend)
            .then(res => {
                blankToast("Susunan berhasil disimpan")
                setSaveIt(false)
                channel.send({
                    type: 'broadcast',
                    event: eventPath,
                    payload: {...dataToSend, message: `${myNickname} mengubah susunan catatan`},
                })
            }).catch(err => {
                console.log(err)
                
            }).finally(() => toast.dismiss(promise))
        } catch (error) {
            console.log(error);
            toast.dismiss(promise)
        }
    }
    function handleCancelSaveIt() {
        handleSourceToListSorted(todoNotes)
        setSaveIt(false)
    }
    useEffect(() => {
        let eventPath
        if (pageType === 'faNoteSticky') {
            eventPath = `${pageId}:shouldUpdate`
        } else {
            eventPath = `${pageId}/${todoId}:notesUpdate`
        }
        channel.on('broadcast', {event: eventPath}, payload => {
            try {
                const data = todoNotes
                
                data.map(item => {
                    const thisItem = item
                    const contain = payload.payload.newOrder.find(x => x._id === item._id)
                    if (contain) thisItem.order = contain.order
                    return thisItem
                })
                
                dispatch(setNotes(data))
                
                blankToast(payload.payload.message)
            } catch (err) {}
        })
    }, [channel, dispatch, handleSourceToListSorted, pageId, pageType, todoId, todoNotes])
    

    return(
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {saveIt && (
                <div className='flex bg-info shadow m-2 rounded items-center'>
                    {isAdmin ?
                        <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]" onClick={handleSaveIt}>
                            <FontAwesomeIcon icon={faFloppyDisk}/>
                            <p>Simpan susunan</p>
                        </div>
                        :
                        <div className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]">
                            <FontAwesomeIcon icon={faLock}/>
                            <p>Admin</p>
                        </div>
                    }
                    <div className="h-[45px] flex justify-center shadow items-center gap-x-2 text-xs rounded m-2 pointer bg-no flex-1" onClick={handleCancelSaveIt}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                </div>
            )}
            <Droppable droppableId="noteModel">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className='list-none'>
                        {
                            list?.map((data, index) => (
                                <Draggable key={data._id} draggableId={data._id} index={index}>
                                    {(provided) => (
                                        <li {...provided.draggableProps} ref={provided.innerRef} className="mb-2">
                                            <Note data={data} handleAreaToDrag={provided.dragHandleProps}/>
                                        </li>
                                    )}
                                </Draggable>
                            ))||''
                        }
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}
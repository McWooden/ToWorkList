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
  const pageId = useSelector((state) => state.fetch.idPageOfBook)
  const reduxSource = useSelector((state) => state.source.source)
  const [list, setList] = useState([])
  const [saveIt, setSaveIt] = useState(false)
  const channel = useSelector((state) => state.channel.book)
  const myNickname = useSelector((state) => state.source.profile.nickname)
  const dispatch = useDispatch()

  const handleSourceToListSorted = useCallback((dataToSort) => {
    const sortedList = dataToSort
      ? [...dataToSort].sort((a, b) => a.order - b.order)
      : []
    setList(sortedList)
  }, [])

  useEffect(() => {
    if (reduxSource.list) {
      handleSourceToListSorted(reduxSource.list)
    }
  }, [handleSourceToListSorted, reduxSource])

  function handleOnDragEnd(result) {
    try {
      const { destination, source } = result
      if (!destination || source.index === destination.index) return

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
    channel.on('broadcast', { event: `${pageId}:structureUpdate` }, (payload) => {
      try {
        const data = [...reduxSource.list]
        console.log(payload.payload)

        data.forEach((item) => {
          const contain = payload.payload.newOrder.find(
            (x) => x._id === item._id
          )
          if (contain) item.order = contain.order
        })

        dispatch(setSource({ ...reduxSource, list: data }))

        blankToast(payload.payload.message)
      } catch (err) {}
    })
  }, [channel, dispatch, pageId, reduxSource])

  async function handleSaveIt() {
    const dataToSend = {
      newOrder: list.map((data, index) => ({ _id: data._id, order: index })),
    }
    const promise = loadingToast('Menyimpan susunan')
    try {
      await axios
        .put(API + `/order/list/${pageId}`, dataToSend)
        .then((res) => {
          blankToast('Susunan berhasil disimpan')
          setSaveIt(false)
          channel.send({
            type: 'broadcast',
            event: `${pageId}:structureUpdate`,
            payload: {
              ...dataToSend,
              message: `${myNickname} mengubah susunan tugas`,
            },
          })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => toast.dismiss(promise))
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
          <div className="flex bg-info shadow m-2 rounded items-center">
            <div
              className="h-[45px] flex justify-center items-center gap-x-2 text-xs pointer flex-[5_5_0%]"
              onClick={handleSaveIt}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
              <p>Simpan susunan</p>
            </div>
            <div
              className="h-[45px] flex justify-center shadow items-center gap-x-2 text-xs rounded m-2 pointer bg-no flex-1"
              onClick={handleCancelSaveIt}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        )}
        <Droppable droppableId="todoModel">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="list-none">
              {list.map((data, index) => (
                <Draggable key={data._id} draggableId={data._id} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} ref={provided.innerRef} className="mb-2">
                      <TodoModel item={data} handleAreaToDrag={provided.dragHandleProps} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

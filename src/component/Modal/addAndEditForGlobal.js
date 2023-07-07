import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "./Modal"
import Calendar from "react-calendar"
import { resetAddAndEdit } from "../../redux/addAndEditForGlobalStore"
import { useState, useRef, useMemo } from "react"
import axios from "axios"
import { API } from "../../utils/variableGlobal"
import { loadingToast, noteToast, saveToast, todoToast } from "../../utils/notif"
import { setSource } from "../../redux/sourceSlice"
import { convertDateToString } from "../../utils/convertDateFormat"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { setTodo } from '../../redux/todo'

export function AddAndEditForGlobal() {
    const addAndEdit = useSelector((state) => state.addAndEdit)
    const { type, item_title, desc, color, deadline, _id } = addAndEdit
    const profileNickname = useSelector(state => state.source.profile.nickname)

    const dispatch = useDispatch()
    const formRef = useRef()

  
    const colors = useMemo(() => ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow'], [])

    const [colorsTileSource, setColorsTileSource] = useState([
      { color, deadline: new Date(deadline) }
    ])
  
    const idPageOfBook = useSelector((state) => state.fetch.idPageOfBook)
    const pathPageOfBook = useSelector((state) => state.fetch.pathPageOfBook)
  
    const [currentColor, setCurrentColor] = useState(() => {
      if (type === 'ADD_TODO') {
        return colors[Math.floor(Math.random() * colors.length)]
      } else {
        return color
      }
    })
    
    const [inputTitle, setInputTitle] = useState(item_title)
    const [inputDesc, setInputDesc] = useState(desc)
  
    const borderStyle = { border: `1px solid ${currentColor}` }
  
    useEffect(() => {
      setInputTitle(item_title)
      setInputDesc(desc)
      if (type === 'ADD_TODO' || type === 'ADD_NOTE') {
        if (!currentColor) setCurrentColor(colors[Math.floor(Math.random() * colors.length)])
        setColorsTileSource([{ color: currentColor, deadline: new Date().toLocaleDateString('en-US', { 
          month: 'numeric', 
            day: 'numeric', 
            year: 'numeric' 
          })}])
      } else {
        setCurrentColor(color)
        setColorsTileSource([{ color, deadline: new Date(deadline) }])
      }
    }, [item_title, desc, color, deadline, type, colors, currentColor])
    
    function handleColor(e) {
      setCurrentColor(e.target.value)
    }
  
    function handleTitleChange(e) {
      setInputTitle(e.target.value)
    }
  
    async function handleSubmit(e) {
        e.preventDefault()
        const dataToSend = {
            color: e.target.color.value,
            desc: e.target.desc.value,
            deadline: colorsTileSource[0].deadline,
            item_title: e.target.title.value,
            returnPage: type === 'EDIT_TODO_INSIDE' ? false : true,
            by: profileNickname
        }
      try {
          if (type === 'ADD_TODO') {
          const promise = loadingToast('Membuat daftar baru')
          await axios.post(`${API}/source/addTodo/${idPageOfBook}`, dataToSend)
            .then((res) => {
              todoToast({item_title: dataToSend.item_title, color: dataToSend.color})
              dispatch(setSource(res.data))
              dispatch(resetAddAndEdit())
            })
            .catch((err) => {
              todoToast('data gagal dikirim')
            })
            .finally(() => {
              toast.dismiss(promise)
            })
        } else if (type === 'ADD_NOTE') {
          await axios.post(`${API}/notes/${idPageOfBook}/${_id}`, dataToSend)
            .then((res) => {
                noteToast(dataToSend)
                dispatch(setTodo(res.data))
                dispatch(resetAddAndEdit())
            })
            .catch(err => {
                noteToast({color : 'var(--danger)'})
            }) 
        } else {
          await axios.put(`${API}/source/addTodo/${idPageOfBook}/${_id}`, dataToSend)
            .then((res) => {
              saveToast(dataToSend.item_title)
                if (type === 'EDIT_TODO_INSIDE') {
                    dispatch(setTodo(res.data))
                }
                if (type === 'EDIT_TODO_OUTSIDE') {
                    dispatch(setSource(res.data))
                }
                console.log(res.data)
              dispatch(resetAddAndEdit())
            })
            .catch((err) => {
              noteToast({ color: 'var(--danger)' })
            })
        }
      } catch (err) {}
    }
  
    const colorsTile = colorsTileSource.map((x, index) => ({
      date: x.deadline,
      color: x.color,
      title:
        index === 0
          ? 'Deadline'
          : index === colorsTileSource.length - 1
          ? 'Deadline (Before)'
          : item_title || 'No Title',
    }))
  
    function dayTileClick(x) {
      const date = new Date(x).toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric' 
        })
      const newDate = {
        deadline: date,
        color: 'var(--purple-2)',
      }
      setColorsTileSource([newDate, { color, deadline: new Date(deadline) }])
    }
  
    return (
      <Modal open={type} close={() => dispatch(resetAddAndEdit())}>
        <div className="d-flex ai-center height-100">
          <div className="AE_main flex-1-1 d-grid pi-center">
            {
                type === 'ADD_NOTE' || type === 'EDIT_NOTE' ? <FontAwesomeIcon icon={faNoteSticky} className="icon-modal" style={{color: currentColor}}/> :
                <Calendar
                onClickDay={dayTileClick}
                className="calendar-dark"
                locale="id-ID"
                format="mm/dd/yyyy"
                next2Label={null}
                prev2Label={null}
                tileContent={({ date, view }) => {
                    const color = colorsTile.find((c) => {
                    const tileDate = new Date(c.date)
                    return tileDate.getTime() === date.getTime()
                    })
                    if (color) {
                        return (
                            <div
                            className="repalace"
                            style={{
                                border: `1px solid ${color.color}`,
                                borderRadius: '50px',
                            }}
                            title={color.title}
                            >
                            {date.getDate()}
                            </div>
                        )
                    }
                }}
                />
            }
            </div>
          <form
            className="AE_second d-flex fd-column flex-1-1 p-1 form-modal"
            ref={formRef}
            onSubmit={handleSubmit}
            id="addAndEditForm"
          >
            <div className="general-info" style={{ borderBottom: `1px solid ${currentColor}` }}>
              <h3>{item_title || pathPageOfBook}</h3>
              <p className="date">
                {deadline ? convertDateToString(deadline) : type === 'ADD_NOTE' ? 'Menambah catatan baru...' : 'Menambah tugas baru...'}
              </p>
            </div>
            <div className="input-left d-flex fd-row m-1">
                {type === 'ADD_NOTE' || type === 'EDIT_NOTE' ? null : 
                    <input
                        name="title"
                        type="text"
                        placeholder={item_title || 'Judul'}
                        style={borderStyle}
                        required
                        autoComplete="off"
                        value={inputTitle}
                        onChange={handleTitleChange}
                    />
                }
              <select style={borderStyle} onChange={handleColor} name="color">
                <option key="default" value={currentColor}>
                  {currentColor}
                </option>
                {colors
                  .filter((c) => c !== color)
                  .map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
              </select>
            </div>
            <textarea
              placeholder={desc || 'Deskripsi (opsional)'}
              rows="10"
              style={borderStyle}
              name="desc"
              value={inputDesc}
              onChange={(x) => setInputDesc(x.target.value)}
              className="flex-1-1 m-1"
            />
            <button type="submit" className="task-submit pointer" form="addAndEditForm">
              {type==='EDIT_TODO_INSIDE' || type==='EDIT_TODO_OUTSIDE' || type==='EDIT_NOTE' ? 'Simpan' : 'Tambah'}
            </button>
          </form>
        </div>
      </Modal>
    )
  }  
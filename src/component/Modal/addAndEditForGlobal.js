import { useDispatch, useSelector } from "react-redux"
import { Modal } from "./Modal"
import Calendar from "react-calendar"
import { resetAddAndEdit } from "../../redux/addAndEditForGlobalStore"
import { useState, useRef } from "react"
import axios from "axios"
import { API } from "../../utils/variableGlobal"
import { noteToast, saveToast } from "../../utils/notif"
import { setSource } from "../../redux/sourceSlice"
import { convertDateToString } from "../../utils/convertDateFormat"
import { useEffect } from "react"

export function AddAndEditForGlobal() {
    const addAndEdit = useSelector(state => state.addAndEdit)
    const {type, item_title, desc, color, date, deadline, _id} = addAndEdit
    const dispatch = useDispatch()
    const [colorsTileSource, setColorsTileSource] = useState([{color, deadline: new Date(deadline)}])
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const [currentColor, setCurrentColor] = useState(color)
    const borderStyle = {border: `1px solid ${currentColor}`}

    const [inputTitle, setInputTitle] = useState(item_title)
    const [inputDesc, setInputDesc] = useState(desc)

    useEffect(() => {
        setInputTitle(item_title);
        setInputDesc(desc);
        setCurrentColor(color);
        setColorsTileSource([{ color: color, deadline: new Date(deadline) }])
      }, [item_title, desc, color, deadline])    

    const colors = ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow']
    const formRef = useRef()

    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function handleTitleChange(e) {
        setInputTitle(e.target.value)
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        const date = colorsTileSource[0].deadline
        const dataToSend = {
            color: e.target.color.value,
            desc: e.target.desc.value,
            deadline: (date === deadline ? date : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`),
            item_title: e.target.title.value,
            returnPage: true,
        }
        try {
            await axios.put(`${API}/source/addTodo/${idPageOfBook}/${_id}`, dataToSend)
            .then((res) => {
                saveToast(dataToSend.item_title)
                dispatch(setSource(res.data))
                dispatch(resetAddAndEdit())
            })
            .catch(err => {
                noteToast({color : 'var(--danger)'})
            }) 
        } catch(err) {

        }
    }

    const colorsTile = colorsTileSource.map((x, index) => ({
        date: x.deadline,
        color: x.color,
        title: index === 0 ? 'Deadline' : index === colorsTileSource.length - 1 ? 'Deadline (Before)' : item_title || 'No Title',
    }))      

    function dayTileClick(x) {
        const date = new Date(x)
        const newDate = {
            deadline: date,
            color: 'var(--purple-2)',
        }
        setColorsTileSource([newDate, {color, deadline: new Date(deadline)}])
    }

    return (
        <Modal open={type} close={() => dispatch(resetAddAndEdit())}>
            <div className="d-flex ai-center height-100">
                <div className="AE_main flex-1-1">
                    <Calendar 
                        onClickDay={dayTileClick}
                        className="calendar-dark" 
                        locale='id-ID'
                        format='mm/dd/yyyy'
                        next2Label={null}
                        prev2Label={null}
                        tileContent={({ date, view }) => {
                            const color = colorsTile.find((c) => c.date.getTime() === date.getTime())
                            if (color) {
                                return (
                                    <div className='repalace' style={{ border: `1px solid ${color.color}`, borderRadius: '50px' }} title={color.title}>
                                    {date.getDate()}
                                    </div>
                                )
                            }
                        }}
                    />
                </div>
                <form className="AE_second d-flex fd-column flex-1-1 p-1 form-modal" ref={formRef} onSubmit={handleSubmit} id="addAndEditForm">
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{item_title}</h3>
                        <p className="date">{convertDateToString(deadline)}</p>
                    </div>
                    <div className="input-left d-flex fd-row m-1">
                    <input name='title' type="text" placeholder={item_title} style={borderStyle} required autoComplete='off' value={inputTitle} onChange={handleTitleChange}/>
                        <select style={borderStyle} onChange={handleColor} name='color'>
                            <option key='default' value={color}>
                                {color}
                            </option>
                            {colors.filter(c => c !== color).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>
                    <textarea placeholder={desc} rows="10" style={borderStyle} name='desc' value={inputDesc} onChange={x => setInputDesc(x.target.value)} className="flex-1-1 m-1"/>
                    <button type='submit' className='task-submit pointer' form='addAndEditForm'>Simpan</button>
                </form>
            </div>
        </Modal>
    );
}

import { useDispatch, useSelector } from "react-redux"
import { Modal } from "./Modal"
import Calendar from "react-calendar"
import { resetAddAndEdit } from "../../redux/addAndEditForGlobalStore"
import { useState, useRef } from "react"
import axios from "axios"
import { API } from "../../utils/variableGlobal"
import { noteToast } from "../../utils/notif"
import { setSource } from "../../redux/sourceSlice"
import { convertDateToString } from "../../utils/convertDateFormat"
import { useEffect } from "react"

export function AddAndEditForGlobal() {
    const type = useSelector(state => state.addAndEdit.type)
    const item = useSelector(state => state.addAndEdit.item)
    const dispatch = useDispatch()
    const [colorsTileSource, setColorsTileSource] = useState([item])
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const [currentColor, setCurrentColor] = useState(item?.details?.color)
    const borderStyle = {border: `1px solid ${currentColor}`}
    const [inputTitle, setInputTitle] = useState(item?.details?.item_title)
    const [inputDesc, setInputDesc] = useState(item?.details?.desc)
    const colors = ['grey', 'tomato', 'royalblue', 'goldenrod', 'greenyellow']
    const formRef = useRef()
    function handleColor(e) {
        setCurrentColor(e.target.value)
    }
    function handleTitleChange(e) {
        setInputTitle(e.target.value)
    }
    useEffect(() => {
        console.log(type, item)
    }, [type, item])
    if (!item) return null
    
    async function handleSubmit(e) {
        e.preventDefault()
        const date = colorsTileSource[0].details.deadline
        const dataToSend = {
            color: e.target.color.value,
            desc: e.target.desc.value,
            deadline: (date === item?.details?.deadline ? date : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`),
            item_title: e.target.title.value,
            returnPage: true,
        }
        try {
            await axios.put(`${API}/source/addTodo/${idPageOfBook}/${item._id}`, dataToSend)
            .then((res) => {
                noteToast(dataToSend)
                dispatch(setSource(res.data))
                dispatch(resetAddAndEdit())
            })
            .catch(err => {
                noteToast({color : 'var(--danger)'})
            }) 
        } catch(err) {

        }
    }
    const colorsTile = colorsTileSource.map(x => ({
        date: new Date(x?.details?.deadline),
        color: x?.details?.color,
        title: x?.details?.item_title ?? '',
    }))
    function dayTileClick(x) {
        const date = new Date(x)
        const newDate = {
            details: {
                deadline: date,
                color: 'var(--purple-2)',
                item_title: item?.details?.item_title,
            }
        }
        setColorsTileSource([newDate, item])
    }
    return (
        <Modal open={item} close={() => dispatch(resetAddAndEdit())}>
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
                <form className="AE_second d-flex fd-column flex-1-1 p-1 form-modal" ref={formRef} onSubmit={handleSubmit}>
                    <div className="general-info" style={{borderBottom: `1px solid ${currentColor}`}}>
                        <h3>{item?.details?.item_title}</h3>
                        <p className="date">{convertDateToString(item?.details?.deadline)}</p>
                    </div>
                    <div className="input-left d-flex fd-row m-1">
                    <input name='title' type="text" placeholder='Judul' style={borderStyle} required autoComplete='off' value={inputTitle} onChange={handleTitleChange}/>
                        <select style={borderStyle} onChange={handleColor} name='color'>
                            <option key='default' value={item?.details?.color}>
                                {item?.details?.color}
                            </option>
                            {colors.filter(c => c !== item?.details?.color).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>
                    <textarea placeholder={item?.details?.desc} rows="10" style={borderStyle} name='desc' value={inputDesc} onChange={x => setInputDesc(x.target.value)} className="flex-1-1 m-1"/>
                </form>
            </div>
        </Modal>
    );
}

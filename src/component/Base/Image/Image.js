import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import axios from "axios"
import { url, API } from "../../../utils/variableGlobal"
import { deleteToast } from "../../../utils/notif"
import { convertDateToString } from "../../../utils/convertDateFormat"
import { setTodo } from "../../../redux/todo"
import { Confirm } from "../../Modal/Confirm"

export function Image({data}) {
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const todoId = useSelector(state => state.todo.id)
    const dispatch = useDispatch()
    const [deleteOpen, setDeleteOpen] = useState(false)
    
    const pathSplit = data.pic.split('/')
    const [full, setFull] = useState(false)
    function handleFull() {
        setFull(!full)
    }
    async function deleteImage() {
        try {
            await axios.delete(`${API}/image/${idPageOfBook}/${todoId}/${data._id}`, {path: data.pic})
            .then((res) => {
                deleteToast('berhasil dihapus')
                dispatch(setTodo(res.data))
            })
            .catch(err => {
                deleteToast('gagal terhapus')
            })
        } catch(err) {

        }
    }
    return (
        <>
        <div className='card-img d-flex of-hidden'>
            <img alt={data.by} className={`card-img-pic pointer ${full&&'full p-fixed zi-3'}`} src={`${url}/${data.pic}`} onClick={handleFull}/>
            <div className='card-img-context d-flex fd-column'>
                <div className='card-img-context-deep'>
                    <div className="card-img-by">{data.by}</div>
                    <p className="card-img-desc">{data.desc}</p>
                </div>
                <div className="card-img-date pointer as-flex-end" onClick={() => setDeleteOpen(true)}>{convertDateToString(data.date)}</div>
            </div>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={pathSplit[pathSplit.length - 1]} metode='delete' color={'var(--danger)'} callback={deleteImage}/>
        </>
    )
}
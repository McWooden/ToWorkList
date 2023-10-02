import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import axios from "axios"
import { url, API } from "../../../utils/variableGlobal"
import { deleteToast } from "../../../utils/notif"
import { setTodo } from "../../../redux/todo"
import Confirm from "../../Modal/Confirm"
import { useEffect } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export function Image({data, handleAreaToDrag}) {
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
    useEffect(() => console.log(data),[data])
    return (
        <>
        <div className='card-img d-flex of-hidden bg-primary-dark-25' {...handleAreaToDrag}>
            <img alt={data?.by?.nickname || ''} className={`card-img-pic pointer ${full&&'full p-fixed zi-3'}`} src={`${url}/${data.pic}`} onClick={handleFull}/>
            <div className='card-img-context d-flex fd-column'>
                <div className='flex-1'>
                    <div className="card-img-by">{data?.by?.nickname || ''}</div>
                    <p className="card-img-desc text-xs">{data.desc}</p>
                </div>
                <div className="card-img-date pointer as-flex-end text-zinc-500" onClick={() => setDeleteOpen(true)}>{format(new Date(data.date), 'dd LLL yyyy', {locale: id})}</div>
            </div>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={pathSplit[pathSplit.length - 1]} metode='delete' color={'var(--danger)'} callback={deleteImage}/>
        </>
    )
}
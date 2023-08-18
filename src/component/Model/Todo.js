import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faEllipsisVertical, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import { Confirm } from "../Modal/Confirm"
import { setAllTodo } from "../../redux/todo"
import { checkToast, deleteToast } from "../../utils/notif"
import { setSource } from "../../redux/sourceSlice"
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { API } from '../../utils/variableGlobal'
import { setAddAndEdit } from '../../redux/addAndEditForGlobalStore'

export function TodoModel({item, handleAreaToDrag}) {
    const profile = useSelector(state => state.source.profile)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const [dones, setDones] = useState(item.dones)
    const dispatch = useDispatch()
    const myNickname = profile.nickname
    const [dropDown, setDropDown] = useState(false)
    let menuRef = useRef()
    let btnRef = useRef()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const title = item.details.item_title

    const channel = useSelector(state => state.channel.book)

    useEffect(() => {
        let handler = (e) => {
            try {
                if (menuRef.current.contains(e.target) || btnRef.current.contains(e.target)) {
                    return
                } else {
                    setDropDown(false)
                }
            } catch (error) {
                
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])
    function handleTextClick() {
        dispatch(setAllTodo(item))
    }
    async function deleteTodo() {
        try {
            await axios.delete(`${API}/source/addTodo/${idPageOfBook}/${item._id}?returnPage=true`)
            .then((res) => {
                deleteToast('berhasil dihapus')
                dispatch(setSource(res.data))
                channel.send({
                    type: 'broadcast',
                    event: `${idPageOfBook}:shouldUpdate`,
                    payload: `${myNickname} menghapus (${title})`
                })
            })
            .catch(err => {
                deleteToast('gagal terhapus')
            })
        } catch(err) {

        }
    }
    async function handleReverse() {
        const method = dones.includes(myNickname) ? 'uncheck' : 'checkTodo'
        try {
            await axios.get(`${API}/source/${method}/${idPageOfBook}/${item._id}/${myNickname}`)
            .then((res) => {
                checkToast({title: item.details.item_title, color: item.details.color})
                dispatch(setSource(res.data))
                if (method === 'checkTodo') {
                    setDones([...dones, myNickname])
                } else {
                    setDones(dones.filter((item) => item !== myNickname))
                }
            })
            .catch(err => {
                checkToast({title: item.details.item_title, color: 'var(--danger)'})
            }) 
        } catch(err) {

        }
    }
    return (
        <>
        <div className="todo-card d-flex fd-row  jc-space-between bg-zinc-900 shadow" {...handleAreaToDrag}>
            <div className="todo-left d-flex fd-row p-relative">
            <div className="card-color" style={{backgroundColor: item.details.color}}></div>
            <div className="card-text d-flex fd-column jc-center pointer" onClick={handleTextClick}>
                <div className="card-title">{title}</div>
                <div className="card-description">{item.details.desc.slice(0, 103)}</div>
            </div>
            </div>
            <div className="todo-right d-flex fd-row p-relative">
                <div className={`card-finish bg-zinc-800 pointer ${dones.includes(myNickname)?'finish-on':'finish-off'} shadow-inner`} onClick={handleReverse}>
                    <div className={`card-finish-value bg-zinc-300 shadow flex place-items-center`}>
                    <FontAwesomeIcon icon={faBars} className='w-full text-gray-100'/>
                    </div>
                </div>
                <div className="card-more d-flex ai-center" ref={btnRef}>
                    <FontAwesomeIcon icon={faEllipsisVertical} className='card-more-btn ai-center-btn pointer' onClick={() => setDropDown(!dropDown)}/>
                </div>
                <div className={`card-drop-down zi-1 ${dropDown?'active':'inactive'}`} ref={menuRef}>
                    <ul className='d-flex fd-column of-hidden p-absolute pointer bg-primary border-burlywood text-zinc-300 py-2'>
                        <li className='d-flex ai-center' onClick={() => dispatch(setAddAndEdit({type: 'EDIT_TODO_OUTSIDE', ...item}))}>
                            <FontAwesomeIcon icon={faPenToSquare} className='card-dd-btn' />
                            <span>edit</span>
                        </li>
                        <li className='d-flex ai-center' onClick={() => setDeleteOpen(true)}>
                            <FontAwesomeIcon icon={faTrash} className='card-dd-btn'/>
                            <span>delete</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Confirm open={deleteOpen} close={() => setDeleteOpen(false)} target={title} metode='delete' color={item.details.color} callback={deleteTodo}/>
        </>
    )
}
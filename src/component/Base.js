import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faFeather} from '@fortawesome/free-solid-svg-icons'
import './style/base.css'

export function Base() {
    return (
        <div className='base'>
            <BaseLeft/>
            <BaseCenter/>
            <BaseRight/>
        </div>
    )
}
function BaseLeft() {
    return (
        <div className="base-left base-left-hide">
            <div className="sidebar-left">
                <div className="progress">
                    <div className="progress-bar">
                        <div className="progress-value undone"></div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-value done"></div>
                    </div>
                </div>
            </div>
        </div>
    )

}
function BaseCenter() {
    return (
        <div className="base-center">
            <div className="center">
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
                <div className="todo-card"></div>
            </div>
        </div>
    )
}
function BaseRight() {
    return (
        <div className="base-right base-right-hide">
            <div className="sidebar-right">
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
                <div className="box-card-message"></div>
            </div>
            <FormBaseRight/>
        </div>
    )
}

function FormBaseRight() {
    const [msg, setMsg] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        setMsg('')
        console.log(msg)
    }
    function handleInput(e) {
        setMsg(e.target.value)
    }
    return (
        <form className='base-right-form' onSubmit={handleSubmit}>
            <input type="text" placeholder='messege main todo' name='msg' autoComplete='off' value={msg} onChange={handleInput}/>
            {
                msg ? 
                    <button className='pointer btn-on'>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                :
                    <button className='btn-off'>
                        <FontAwesomeIcon icon={faFeather}/>
                    </button>
            }
        </form>
    )
}

export default Base
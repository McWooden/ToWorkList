import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '@fortawesome/free-solid-svg-icons'
import './style/base.css'

export class Base extends Component {
    render() {
        return (
            <div className='base'>
                    <BaseLeft/>
                    <BaseCenter/>
                    <BaseRight/>
            </div>
        )
    }
}
class BaseLeft extends Component {
    render() {
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
}
class BaseCenter extends Component {
    render() {
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
}
class BaseRight extends Component {
    render() {
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
            </div>
        )
    }
}

export default Base
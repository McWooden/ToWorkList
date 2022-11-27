import React from 'react'
import './style/TodoApp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

export class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMinimize: true
        }
        this.toRight = '314px'
        this.color = 'var(--orange-2)'
        this.handleMinimize = this.handleMinimize.bind(this)
    }
    handleMinimize() {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }
    render() {
        return (
            // <div id='todoApp'style={{transform: `translateX(${this.state.isMinimize?'314px' : '0px'})`}}>
            <div id='todoApp'style={{left: `${this.state.isMinimize?'314px' : '0px'}`}}>
            <NavTop handleMinimize={this.handleMinimize} color={this.state.isMinimize?'var(--orange-2)' : 'var(--white-3)'}/>
                <div className='base'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perspiciatis repellendus, laborum laboriosam expedita laudantium incidunt accusantium illum est porro earum quo at? Sint quidem ipsa illum accusantium porro debitis!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi ullam voluptates harum, asperiores soluta error, iste voluptatem non commodi, molestias repellat cum saepe laborum deleniti. Repudiandae dolorum aperiam pariatur consequatur.</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus accusantium commodi quasi, laboriosam animi iusto repudiandae. Possimus veniam iusto magnam porro eum cumque adipisci quod, fuga non voluptatum velit. Nisi?</p>
                </div>
            </div>
        )
    }
}
export class NavTop extends React.Component {
    constructor(props) {
        super(props)
        this.handleMinimize = this.props.handleMinimize
    }
    render() {
        return (
            <section id='navTop'>
                <header className='pointer'>
                <FontAwesomeIcon icon={faBars} className={'bars pointer'} style={{color: this.props.color}} onClick={this.handleMinimize}/>
                <h4 className='pageTitle'>main todo</h4>
                </header>
            </section>
        )
    }
}

export default TodoApp
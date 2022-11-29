import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import './style/base.css'

export class Base extends Component {
  render() {
    return (
    <div className='base'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae perspiciatis repellendus, laborum laboriosam expedita laudantium incidunt accusantium illum est porro earum quo at? Sint quidem ipsa illum accusantium porro debitis!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi ullam voluptates harum, asperiores soluta error, iste voluptatem non commodi, molestias repellat cum saepe laborum deleniti. Repudiandae dolorum aperiam pariatur consequatur.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus accusantium commodi quasi, laboriosam animi iusto repudiandae. Possimus veniam iusto magnam porro eum cumque adipisci quod, fuga non voluptatum velit. Nisi?</p>
    </div>
    )
  }
}

export default Base
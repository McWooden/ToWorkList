import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../component/style/error.css'

export default function Error() {
    const err = useSelector(state => state.source.err)
    const [count, setCount] = useState(60)
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            if (!count) navigate('/')
            setCount(count - 1)
        }, 1000)
        
        return () => {
            clearInterval(interval)
        }
    })
    return (
        <div className='auth'>
            <div className="navigate_to">
            <div className="auth-context error_container">
                <p>{err.name || 'something is error'}</p>
                <p>{err.message || 'try report to huddin'}</p>
                <p>{err.code || ''}</p>
                <div className="auth_btn navigate_back" onClick={() => navigate('/')}>
                    <span>Kembali</span><span className='error_count'>({count})</span>
                </div>
            </div>
            </div>
        </div>
    )
}

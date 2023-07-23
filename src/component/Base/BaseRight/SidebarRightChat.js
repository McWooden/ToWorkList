import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useContext, useRef } from 'react'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { HideBase } from '../../TodoApp/TodoApp'
import { useState, useEffect } from 'react'
import { FormBaseRight } from './FormBaseRight'
import { ChatModel } from '../../Model/Chat'
import supabase from '../../../utils/supabase'

export function SidebarRightChat() {
    const chat = useSelector(state => state.todo.chat)
    const profile = useSelector(state => state.source.profile)
    const { hideRightBase } = useContext(HideBase)
    const myNickname = profile.nickname
    const [boxJson, setBoxJson] = useState([...chat])
    const [box, setBox] = useState([])

    const todoId = useSelector(state => state.todo.id)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)

    const chatRef = useRef(null)
    const [scrollToBottom, setScrollToBottom] = useState(true)

    useEffect(() => {
        if (scrollToBottom) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [chat, scrollToBottom])

    const handleScroll = () => {
        if (chatRef.current.scrollTop + chatRef.current.clientHeight !== chatRef.current.scrollHeight) {
            setScrollToBottom(false)
        } else {
            setScrollToBottom(true)
        }
    }
    
    useEffect(() => {
        let lastDate = null
        let lastNickname = null
        const newBox = []
    
            boxJson?.forEach((item, index) => {
                if (convertDateToString(item.date) !== lastDate) {
                    newBox.push(<div key={`${index}-${item.date}`} className='chat-card-date as-center'>{convertDateToString(item.date)}</div>)
                    lastDate = convertDateToString(item.date)
                    lastNickname = null
                }
                if (item.nickname !== lastNickname) {
                    item.nickname !== myNickname &&
                        newBox.push(<div key={`${index}-${item.nickname}`} className='chat-card-nickname'>{item.nickname}</div>)
                        lastNickname = item.nickname
                }
                newBox.push(<ChatModel key={index} item={item} />)
            })
        setBox(newBox)
    }, [boxJson, chat, myNickname])

    useEffect(() => {
        const channel = supabase.channel(`${idPageOfBook}/${todoId}`)
        channel.on('broadcast', { event: 'new_message' }, cb => {
            setBoxJson(prev => [...prev, cb.new])
        }).subscribe()
    }, [idPageOfBook, myNickname, todoId])
    
    return (
        <div className={`base-right of-auto ${hideRightBase?'base-right-hide':'base-right-show'} d-flex fd-column`}>
            <div className="sidebar-right d-flex fd-column of-auto" ref={chatRef} onScroll={handleScroll}>
            <FontAwesomeIcon icon={faChevronDown} onClick={() => setScrollToBottom(true)} className={`scrollToBottom zi-1 pointer ${scrollToBottom?'':'active'} p-fixed`}/>
                {box || ''}
            </div>
            <FormBaseRight/>
        </div>
    )
}
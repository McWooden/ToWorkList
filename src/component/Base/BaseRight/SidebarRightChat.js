import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { convertDateToString } from '../../../utils/convertDateFormat'
import { useState, useEffect } from 'react'
import { FormBaseRight } from './FormBaseRight'
import { ChatModel } from '../../Model/Chat'
import { setChat } from '../../../redux/todo'
import { Right } from '../BaseComponent'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export function SidebarRightChat() {
    const chat = useSelector(state => state.todo.chat)
    const profile = useSelector(state => state.source.profile)
    const myNickname = profile.nickname
    const [box, setBox] = useState([])

    const todoId = useSelector(state => state.todo.id)
    const idPageOfBook = useSelector(state => state.fetch.idPageOfBook)
    const dispatch = useDispatch()

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
    
            chat?.forEach((item, index) => {
                console.log(item);
                if (new Date(item.date).toLocaleDateString() !== lastDate) {
                    newBox.push(<div key={`${index}-${item.date}`} className='chat-card-date shadow as-center'>{format(new Date(item.date), 'EEE, d LLL yyyy', {locale: id})}</div>)
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
    }, [chat, myNickname])


    const channel = useSelector(state => state.channel.book)
    useEffect(() => {
        channel.on('broadcast', { event: `${idPageOfBook}/${todoId}:newMessage` }, payload => {
            dispatch(setChat(payload.payload))
        })
    }, [channel, dispatch, idPageOfBook, todoId]);    
    
    return (

        <Right>
            <div className="sidebar-right d-flex fd-column of-auto" ref={chatRef} onScroll={handleScroll}>
            <FontAwesomeIcon icon={faChevronDown} onClick={() => setScrollToBottom(true)} className={`scrollToBottom zi-1 pointer ${scrollToBottom?'':'active'} p-fixed`}/>
                {box || 'Tidak ada percakapan'}
            </div>
            <FormBaseRight/>
        </Right>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { Greeting } from "../../utils/greeting"
import { useState, useEffect, useRef } from "react"
import supabase from "../../utils/supabase"
import { useSelector } from 'react-redux'
import { isoToString } from '../../utils/convertDateFormat'
import { ChatModel } from '../Model/Chat'
import { sendToast } from '../../utils/notif'
import { useDispatch } from 'react-redux'
import { disableIcon, reverseNavbar, reverseRightSide } from '../../redux/hideAndShowSlice'
import { useSwipeable } from 'react-swipeable'

export function Welcome() {
  const dispatch = useDispatch()
  const taglines = [
    "Simplify your tasks",
    "Efficiently organize your life",
    "Elevate productivity",
    "Transform your to-do lists",
    "Next level task management"
  ]
  const handlers = useSwipeable({
    onSwipedRight: () => dispatch(reverseNavbar()),
    onSwipedLeft: () => dispatch(reverseRightSide()),
  })

  useEffect(() => {
    dispatch(disableIcon({left: true}))
    return () => {
      dispatch(disableIcon({left: false}))
    }
  },[dispatch])

  return (
    <div className="flex w-full sm:flex-row flex-col">
      <div className="welcome flex flex-col overflow-auto flex-3" {...handlers}>
        <Greeting />
        <div className="welcome_page d-flex fd-column ai-center jc-flex-start">
          <p className="welcome_name as-flex-start">Toworklist</p>
          <span className="welcome_tagline as-flex-start">
            {taglines[Math.floor(Math.random() * taglines.length)]}
          </span>
          <span
            className="tapToOpenNavbar as-flex-start d-block bg-burlywood text-primary shadow-lg"
            onClick={() => dispatch(reverseNavbar())}
          >
            Ketuk untuk membuka navbar
          </span>
        </div>
      </div>
      <GlobalChat/>
    </div>
  )
}

function GlobalChat() {
  const isRightSideShow = useSelector(state => state.show.rightSide)
  const profile = useSelector(state => state.source.profile)

  const [msg, setMsg] = useState('')
  const textarea = useRef()
  const myNickname = profile?.nickname || 'Anon'
  let box = []
  let lastDate = null
  let lastNickname = null

  const [chats, setChats] = useState([])
  const chatRef = useRef(null)

  const dispatch = useDispatch()

  const handlers = useSwipeable({
    onSwipedRight: () => dispatch(reverseRightSide()),
})

  const [scrollToBottom, setScrollToBottom] = useState(true)

  const handleScroll = () => {
    if (chatRef.current.scrollTop + chatRef.current.clientHeight !== chatRef.current.scrollHeight) {
      setScrollToBottom(false)
    } else {
      setScrollToBottom(true)
    }
  }

  useEffect(() => {
    const channel = supabase.channel('udin')
    channel.on('postgres_changes', { event: '*', table: 'broadcast' }, payload => {
      setChats((prev) => [...prev, payload.new.data])
    }).subscribe()

    return () => {
      channel.unsubscribe('postgres_changes')
    }
  }, [])

  useEffect(() => {
    if (scrollToBottom) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chats, scrollToBottom])    
  
  useEffect(() =>{
    async function fetchData() {
      const { data } = await supabase.from('broadcast').select()
      if (data) setChats(data.map(x => ({ nickname: x.data.nickname, msg: x.data.msg, date: x.data.date })))
    }
    fetchData()
  },[])

    chats?.forEach((item, index) => {
      if (!item) return
      if (isoToString(item?.date) !== lastDate) {
        box.push(
          <div key={`${index}-${item.date}`} className='chat-card-date as-center shadow'>{isoToString(item.date)}</div>
        )
        lastDate = isoToString(item.date)
        lastNickname = null
      }
      if (item.nickname !== lastNickname) {
        item.nickname !== myNickname &&
          box.push(
            <div key={`${index}-${item.nickname}`} className='chat-card-nickname'>{item.nickname}</div>
          )
        lastNickname = item.nickname
      }
      box.push(
        <ChatModel key={index} item={item} global={true} />
      )
    })

  async function handleSubmit(e) {
    e.preventDefault()
    textarea.current.style.height = '15px'
    sendToast(msg)
    const dataToSend = {
      nickname: myNickname,
      msg,
      date: +new Date()
    }
    try {
      await supabase.from('broadcast').insert({ data: dataToSend })
    } catch (error) {}
    setMsg('')
  }
  function handleInput(e) {
    setMsg(e.target.value)
    textarea.current.style.height = '15px'
    let height = textarea.current.scrollHeight
    textarea.current.style.height = height + 'px'
  }
  function clickToBottom() {
    const chatContainer = chatRef.current
    const lastChat = chatContainer.lastElementChild
    lastChat.scrollIntoView({ behavior: 'smooth' })
    setScrollToBottom(true)
  }  

  return (
    <div className={`base-right of-auto ${isRightSideShow ? 'base-right-show' : 'base-right-hide'} d-flex fd-column h-full flex-1 bg-indianred`} {...handlers}>
        <div className="sidebar-right d-flex fd-column of-auto scroll-smooth" ref={chatRef} onScroll={handleScroll}>
          <FontAwesomeIcon icon={faChevronDown} onClick={clickToBottom} className={`scrollToBottom zi-1 pointer ${scrollToBottom ? '' : 'active'} p-fixed`} />
          {box}
        </div>
        <form className='base-right-form zi-1 of-auto d-flex ai-center flex-col' onSubmit={handleSubmit}>
          <div className='flex w-full gap-x-1'>
            <div className="textarea-container d-flex ai-center of-auto shadow-lg rounded bg-primary w-full">
              <textarea id="myTextarea" rows="1" placeholder={`Obrolan global (${myNickname})`} name='msg' onChange={handleInput} value={msg} ref={textarea} style={{ height: '15px' }} className='d-flex bg-inherit text-white placeholder:text-zinc-400 ai-center of-auto' />
            </div>
            {
              msg ?
                <button className='pointer btn-on shadow' title='send'>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
                :
                null
            }
          </div>
          <p className='p-2 pt-0 text-stone-400 rounded text-[6px] text-center text-zinc-200'>
            Perhatikan privasi Anda! Jangan memposting informasi pribadi di pesan global.
          </p>
        </form>
      </div>
  )
}

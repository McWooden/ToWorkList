import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { Greeting } from "../../utils/greeting"
import { useState, useEffect, useRef } from "react"
import { AppContext } from "../../pages/App"
import { useContext } from "react"
import supabase from "../../utils/supabase"
import { useSelector } from 'react-redux'
import { HideBase } from '../TodoApp/TodoApp'
import { isoToString } from '../../utils/convertDateFormat'
import { ChatModel } from '../Model/Chat'
import { sendToast } from '../../utils/notif'
import { setChat } from '../../redux/todo'

// {
//   nickname: req.body.nickname,
//   msg: req.body.msg,
//   date: +new Date()
// }

export function Welcome() {
  const { handleNavbar, hideNavbar } = useContext(AppContext)
  const [displayText, setDisplayText] = useState('')
  const [chats, setChats] = useState([])
  const [scrollToBottom, setScrollToBottom] = useState(true)
  const chatRef = useRef(null)

  const profile = useSelector(state => state.source.profile)
  const { hideRightBase } = useContext(HideBase)
  const myNickname = profile.nickname
  let box = []
  let lastDate = null
  let lastNickname = null
  
  const handleScroll = () => {
    if (chatRef.current.scrollTop + chatRef.current.clientHeight !== chatRef.current.scrollHeight) {
      setScrollToBottom(false);
    } else {
      setScrollToBottom(true);
    }
  }
  useEffect(() => {
    if (scrollToBottom) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats, scrollToBottom])    

  const taglines = [
    "Simplify your tasks",
    "Efficiently organize your life",
    "Elevate productivity",
    "Transform your to-do lists",
    "Next level task management"
  ]

  const randomTags = () => setDisplayText(taglines[Math.floor(Math.random() * taglines.length)])
  useEffect(() => {
    const channel = supabase.channel('costum-all-channel')
    channel.on('postgres_changes', { event: '*', schema: 'public', table: 'broadcast' }, payload => {
      setChats((prev) => [...prev, payload.new.data])
    }).subscribe(state => console.log(state))

    return () => {
      channel.unsubscribe('postgres_changes')
    }
  }, [])

  useEffect(() =>{
    async function fetchData() {
      const { data } = await supabase.from('broadcast').select();
      if (data) setChats(data.map(x => ({ nickname: x.data.nickname, msg: x.data.msg, date: x.data.date })))
    }
    fetchData()
  },[])

    chats?.forEach((item, index) => {
      if (!item) return
      if (isoToString(item?.date) !== lastDate) {
        box.push(
          <div key={`${index}-${item.date}`} className='chat-card-date as-center'>{isoToString(item.date)}</div>
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
        <ChatModel key={index} item={item} />
      )
    })

  const [msg, setMsg] = useState('')
  const textarea = useRef()
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
      const { data } = await supabase.from('broadcast').insert({ data: dataToSend })
      if (data) {
        setChat((prev)=>[prev, data])
      }
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
    const chatContainer = chatRef.current;
    const lastChat = chatContainer.lastElementChild;
    // lastChat.scrollIntoView({ behavior: 'smooth' });
    setScrollToBottom(true);
  }  
  return (
    <div className="flex w-full sm:flex-row flex-col">
      <div className="welcome flex flex-col overflow-auto flex-3">
        <Greeting />
        <div className="welcome_page d-flex fd-column ai-center jc-flex-start" onClick={randomTags}>
          <p className="welcome_name as-flex-start">Toworklist</p>
          <span className="welcome_tagline as-flex-start">
            {displayText}
            <span className="cursor">|</span>
          </span>
          <span
            className="tapToOpenNavbar as-flex-start d-block"
            onClick={() => handleNavbar(hideNavbar)}
          >
            Ketuk untuk membuka navbar
          </span>
        </div>
      </div>
      <div className={`base-right of-auto ${hideRightBase ? 'base-right-hide' : 'base-right-show'} d-flex fd-column h-full flex-1`}>
        <div className='p-2 pb-0 bg-zinc-800'>
          <p className='inline bg-zinc-950 px-2 pt-1 rounded text-sm'>Obrolan Global</p>
        </div>
        <div className="sidebar-right d-flex fd-column of-auto scroll-smooth" ref={chatRef} onScroll={handleScroll}>
          <FontAwesomeIcon icon={faChevronDown} onClick={clickToBottom} className={`scrollToBottom zi-1 pointer ${scrollToBottom ? '' : 'active'} p-fixed`} />
          {box}
        </div>
        <form className='base-right-form zi-1 of-auto d-flex ai-flex-end' onSubmit={handleSubmit}>
          <div className="textarea-container d-flex ai-center of-auto">
            <textarea id="myTextarea" rows="1" placeholder='messege main todo' name='msg' onChange={handleInput} value={msg} ref={textarea} style={{ height: '15px' }} className='d-flex ai-center of-auto' />
          </div>
          {
            msg ?
              <button className='pointer btn-on' title='send'>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              :
              null
          }
        </form>
      </div>
    </div>
  )
}

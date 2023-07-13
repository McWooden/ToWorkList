import { Greeting } from "../../utils/greeting"
import { useState, useEffect } from "react"
import { AppContext } from "../../pages/App"
import { useContext } from "react"
import supabase from "../../utils/supabase"

export function Welcome() {
  const { handleNavbar, hideNavbar } = useContext(AppContext);
  const [displayText, setDisplayText] = useState('');

  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([]);

  const channel = supabase.channel('costum-all-channel')

  async function fetchData() {
    try {
      const { data } = await supabase.from('broadcast').select();
      if (data) setMsgs([...data]);
    } catch (error) {
      console.log(error);
    }
  }
  const taglines = [
    "Simplify your tasks",
    "Efficiently organize your life",
    "Elevate productivity",
    "Transform your to-do lists",
    "Next level task management"
  ]
  const randomTags = () => setDisplayText(taglines[Math.floor(Math.random() * taglines.length)])
  useEffect(() => {
  }, [])
  useEffect(() => {
    fetchData()
    channel.on('postgres_changes', { event: '*', schema: 'public', table: 'broadcast' }, payload => {
      setMsgs(prevMsgs => [...prevMsgs, payload])
    }).subscribe()
  }, [channel, msgs])
  

  async function sendMsg() {
    if (!msg) return;
    try {
      const { data } = await supabase.from('broadcast').insert({ data: { msg } });
      if (data) {
        setMsg('')
        setMsgs(prevMsgs => [...prevMsgs, ...data]);
        console.log('Terkirim')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full sm:flex-row flex-col">
      <div className="welcome flex flex-col overflow-auto flex-3">
        <Greeting />
        <div className="welcome_page d-flex fd-column ai-center jc-flex-start" onClick={() => randomTags}>
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
      <div className="flex-1">
        <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={sendMsg}>Send</button>
        <ul>
          {msgs.map((x, i) => (
            <li key={i}>{x?.data?.msg || ''}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

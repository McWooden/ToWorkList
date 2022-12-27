import './App.css';
import Navbar from '../component/Navbar';
import TodoApp from '../component/TodoApp';
import { useState, createContext, useRef, useEffect } from 'react';
import { myAccount } from '../utils/dataJSON';

export const GuildContext = createContext()
export const ItemData = createContext()
function App() {
  // force  update
  const [, setState] = useState(0)
  const forceUpdateHandler = () => {
    setState(prevState => prevState + 1)
  }
  // guild data
  const [guild, setGuild] = useState(myAccount)
  function handleGuild(guild) {
    setGuild(guild)
    setRoom(guild.rooms[0])
  }
  // rooms
  const [room, setRoom] = useState(guild.rooms[0])
  const [indexRoom, SetIndexRoom] = useState(0)
  function handleRoom(indexRoom) {
    setRoom(guild.rooms[indexRoom])
    SetIndexRoom(indexRoom)
  }
  // item
  const [item, setItem] = useState()
  function handleItem(itemIndex) {
    setItem(guild.rooms[indexRoom].items[itemIndex])
  }
  function reverseDone(itemIndex) {
    const newGuild = guild
    if (newGuild.rooms[indexRoom].items[itemIndex].dones.indexOf(myAccount.profile.nickname) === -1) {
      newGuild.rooms[indexRoom].items[itemIndex].dones = [...newGuild.rooms[indexRoom].items[itemIndex].dones, myAccount.profile.nickname]
    } else {
      newGuild.rooms[indexRoom].items[itemIndex].dones = newGuild.rooms[indexRoom].items[itemIndex].dones.filter(nickname => nickname !== myAccount.profile.nickname)
    }
    forceUpdateHandler()
  }
  // navbar
  const [hideNavbar, setHideNavbar] = useState(true)
  function handleNavbar(boolean) {
    setHideNavbar(!boolean)
  }
  // ref
  const navRef = useRef()
  const navTopRef = useRef()
  // useEffect
  useEffect(() => {
    let handler = (e) => {
        try {
            if (navRef.current.contains(e.target) || navTopRef.current.contains(e.target)) {
              return
            } else {
              handleNavbar(false)
            }
        } catch (error) {
            
        }
    }
    document.querySelector('title').innerText = guild.profile.nickname || guild.profile.guildName
    document.addEventListener('mousedown', handler)
    console.log('first')
  })
  // tracker

  
  return (
    <GuildContext.Provider value={{guild, room:guild.rooms[indexRoom], currentRoom: room.roomName, hideNavbar, handleNavbar, guildRooms : guild.rooms, guildName : guild.profile.guildName || guild.profile.nickname, handleGuild, handleRoom, navRef, navTopRef, users : guild.users, reverseDone}}>
      <ItemData.Provider value={{item, handleItem}}>
        <div id='app'>
          <Navbar/>
          <TodoApp/>
        </div>
      </ItemData.Provider>
    </GuildContext.Provider>
  )
}

export default App;

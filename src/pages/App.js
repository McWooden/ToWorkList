import './App.css';
import Navbar from '../component/Navbar';
import TodoApp from '../component/TodoApp';
import { useState, createContext } from 'react';
import { myAccount } from '../utils/dataJSON';
import { useRef, useEffect } from 'react';

export const GuildContext = createContext()
function App() {
  const [guild, setGuild] = useState(myAccount)
  const [room, setRoom] = useState(guild.rooms[0])
  const [hideNavbar, setHideNavbar] = useState(true)
  const navRef = useRef()
  const navTopRef = useRef()
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
    document.addEventListener('mousedown', handler)
  })
  function handleGuild(guild) {
    setGuild(guild)
    setRoom(guild.rooms[0])
  }
  function handleRoom(room) {
    setRoom(room)
  }
  function handleNavbar(boolean) {
    setHideNavbar(!boolean)
  }
  return (
    <GuildContext.Provider value={{guild, room, currentRoom: room.roomName, hideNavbar, handleNavbar, guildRooms : guild.rooms, guildName : guild.profile.guildName || guild.profile.nickname, handleGuild, handleRoom, navRef, navTopRef, users : guild.users}}>
      <div id='app'>
        <Navbar/>
        <TodoApp/>
      </div>
    </GuildContext.Provider>
  )
}

export default App;

import './App.css';
import Navbar from '../component/Navbar';
import TodoApp from '../component/TodoApp';
import { useState, createContext } from 'react';
import { myAccount } from '../component/dataJSON';


export const GuildContext = createContext()
function App() {
  const [guild, setGuild] = useState(myAccount)
  const [room, setRoom] = useState(guild.rooms[0])
  const [hideNavbar, setHideNavbar] = useState(true)
  function handleGuild(guild) {
    setGuild(guild)
    setRoom(guild.rooms[0])
  }
  function handleRoom(room) {
    setRoom(room)
  }
  function handleNavbar() {
    setHideNavbar(!hideNavbar)
  }
  return (
    <GuildContext.Provider value={{guild, room, hideNavbar, handleNavbar, guildRooms : guild.rooms, guildName : guild.profile.name || guild.profile.nickname, handleGuild, handleRoom}}>
      <div id='app'>
        <Navbar/>
        <TodoApp/>
      </div>
    </GuildContext.Provider>
  )
}

export default App;

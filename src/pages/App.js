import './App.css';
import Navbar from '../component/Navbar';
import TodoApp from '../component/TodoApp';
import { useState } from 'react';
import { myAccount } from '../component/dataJSON';



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
    <div id='app'>
      <Navbar handleGuild={handleGuild} handleRoom={handleRoom} guildName={guild.profile.name || guild.profile.nickname} guildRooms={guild.rooms} currentRoom={room} hideNavbar={hideNavbar}/>
      <TodoApp currentRoom={room} handleNavbar={handleNavbar} hideNavbar={hideNavbar}/>
    </div>
  )
}

export default App;

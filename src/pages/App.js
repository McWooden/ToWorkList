import './App.css';
import Navbar from '../component/Navbar';
import TodoApp from '../component/TodoApp';
import { useState } from 'react';
import { myAccount } from '../component/dataJSON';



function App() {
  const [guild, setGuild] = useState(myAccount)
  const [room, setRoom] = useState(guild.rooms[0])
  function handleGuild(guild) {
    setGuild(guild)
    setRoom(guild.rooms[0])
  }
  function handleRoom(room) {
    setRoom(room)
  }
  return (
    <div id='app'>
      <Navbar handleGuild={handleGuild} handleRoom={handleRoom} guildName={guild.profile.name || guild.profile.nickname} guildRooms={guild.rooms} currentRoom={room}/>
      <TodoApp currentRoom={room}/>
    </div>
  )
}

export default App;

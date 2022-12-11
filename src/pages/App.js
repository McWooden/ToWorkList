import './App.css';
import Navbar from '../component/Navbar';
import TodoApp from '../component/TodoApp';
import { useState } from 'react';
import noPic from '../assets/images/noPic.png';



function App() {
  const [guild, setGuild] = useState({
    profile: {
      name: 'Homes',
      src: noPic,
      by: 'You'
    },
    rooms: [
      'main',
      'oi',
      'main',
      'main',
    ],
    users: {
      admins: ['You'],
      members: ['You']
    }
  })
  const [room, setRoom] = useState(guild.rooms)
  function handleGuild(guild) {
    setGuild(guild)
    setRoom(guild.rooms)
  }
  function handleRoom(room) {
    setRoom(room)
  }
  return (
    <div id='app'>
      <Navbar handleGuild={handleGuild} handleRoom={handleRoom} guildName={guild.profile.name} rooms={room}/>
      <TodoApp room={room}/>
    </div>
  )
}

export default App;

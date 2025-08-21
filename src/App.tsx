import React, { useEffect, useState } from 'react'
import Menu from './components/Menu'
import SideBar from './components/sideBar'
import MainContent from './components/mainContent'
import Particles from './components/Particles'

interface Game {
  title: string;
  genre: string;
  thumbnail: string;
  id: number;
  platform: string;
}

const App = () => {
  const [game, setGames] = useState<Game[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>("")
  const [searhcTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=https://www.freetogame.com/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log("Genre is not found", err))
  }, [])

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      {/* particles background */}
      <div className="fixed inset-0 -z-10">
     <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.08}
    particleBaseSize={105}
    moveParticlesOnHover={true}
    alphaParticles={0.5}
    
    disableRotation={false}
  />
      </div>

      {/* menu */}
      <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <Menu setSearchTerm={setSearchTerm} />
      </div>

      {/* body */}
      <div className="mt-[5rem] flex">
        {/* sideBar */}``
        <div className="w-[15rem] p-4 fixed top-[80px] h-[calc(100vh-80px)] overflow-auto  border border-gray-800 border-b-0">
          <SideBar games={game} setSelectedGenre={setSelectedGenre} />
        </div>

        {/* main body */}
        <div className="ml-[14rem] flex-1 overflow-y-auto p-6  border border-gray-800">
          <MainContent content={game} selectedGenre={selectedGenre} searchTerm={searhcTerm} />
        </div>
      </div>
    </div>
  )
}

export default App

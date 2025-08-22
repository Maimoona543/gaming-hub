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
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [mode,setMode] = useState<boolean>(false)

    const toggleMode = () => setMode(!mode);

  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=https://www.freetogame.com/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log("Genre is not found", err))
  }, [])

  return (
    <div className={`relative z-60  min-h-screen w-screen overflow-hidden ${mode ? "light-mode" : "dark-mode"} `}>
      {/* particles background */}
      <div className="fixed inset-0 -z-1 pointer-events-none">
 <Particles
  key={mode ? "dark" : "light"}   // 👈 force remount on toggle
  particleColors={mode ? ['#503188', '#503188']:['#ffffff', '#ffffff']}
  particleCount={500}
  particleSpread={10}
  speed={0.06}
  particleBaseSize={100}
  moveParticlesOnHover={true}
  alphaParticles={0.2}
  disableRotation={false}
/>
      </div>
    
      {/* menu */}
      <div className={`${mode ? "bg-darkCustom" : "bg-lightCustom"}`}>
        <Menu setSearchTerm={setSearchTerm} mode ={mode} toggleMode={toggleMode}/>
      </div>

      {/* body */}
      <div className="pt-[80px] flex z-10">
        {/* sideBar */}
        <div className={`w-[13rem] p-4 fixed top-[80px] h-[calc(100vh-80px)] overflow-auto   border-t border-l border-r ${mode? "border-light":"border-dark" } `}>
          <SideBar games={game} setSelectedGenre={setSelectedGenre } mode = {mode}/>
        </div>

        {/* main body */}
        <div   className={`ml-[13rem] flex-1 overflow-auto p-6 pt-2 border-t border-l border-r ${
    mode ? "border-light" : "border-dark"
  }`}>
          <MainContent content={game} selectedGenre={selectedGenre} searchTerm={searchTerm} mode={mode}/>
        </div>
      </div>
    </div>
  )
}

export default App

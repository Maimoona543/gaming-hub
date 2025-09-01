import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { useEffect, useState } from 'react'
import Menu from './components/Menu'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import Particles from './components/Particles'
import GameDetail from "./components/GameDetail";

interface Game {
  title: string;
  genre: string;
  thumbnail: string;
  id: number;
  platform: string;
  game_url:string;
  developer:string;
  publisher:string;
  short_description:string;
  release_date:string;
}

const App = () => {
  const [game, setGames] = useState<Game[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [mode,setMode] = useState<boolean>(false)

    const toggleMode = () => setMode(!mode);

  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=https://www.freetogame.com/api/games?limit=200")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log("Genre is not found", err))
  }, [])

  return (
    <Router>
      <div className="relative z-60 min-h-screen w-screen overflow-hidden">
        {/* particles background → always shown */}
        <div
          className={`fixed top-0 left-0 w-full inset-0 -z-20 pointer-events-none ${
            mode ? "light-mode" : "dark-mode"
          }`}
        >
          <Particles
            key={mode ? "dark" : "light"} // 👈 force remount on toggle
            particleColors={mode ? ["#503188", "#503188"] : ["#ffffff", "#ffffff"]}
            particleCount={500}
            particleSpread={10}
            speed={0.06}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={0.2}
            disableRotation={false}
          />
        </div>

        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                {/* menu */}
                <div className={`${mode ? "bg-darkCustom" : "bg-lightCustom"}`}>
                  <Menu
                    setSearchTerm={setSearchTerm}
                    mode={mode}
                    toggleMode={toggleMode}
                  />
                </div>

                {/* body */}
                <div className="md:pt-[60px] pt-[67px] flex z-10">
                  {/* sideBar */}
                  <div
                    className={`hidden lg:block w-[12.5rem] p-4 fixed h-[calc(100vh-80px)] overflow-auto border-t border-l border-r ${
                      mode ? "border-light" : "border-dark"
                    }`}
                  >
                    <SideBar
                      games={game}
                      setSelectedGenre={setSelectedGenre}
                      mode={mode}
                    />
                  </div>

                  {/* main body */}
                  <div
                    className={`lg:ml-[12.4rem] flex-1 overflow-auto p-3 md:p-6 pt-2 border-t border-l border-r ${
                      mode ? "border-light" : "border-dark"
                    }`}
                  >
                    <MainContent
                      content={game}
                      selectedGenre={selectedGenre}
                      searchTerm={searchTerm}
                      mode={mode}
                    />
                  </div>
                </div>
              </>
            }
          />

          {/* Game detail page → only game detail + particles in background */}
          <Route path="/game/:id" element={ <GameDetail  game={game}  mode={mode}/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

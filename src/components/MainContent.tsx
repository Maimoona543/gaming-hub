import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from 'react'
import windows from '../assets/windows.png'
import web from '../assets/web.png'
import { TypeAnimation } from "react-type-animation";
import lightWeb from '../assets/lightWeb.png';
import lightWindow from '../assets/lightWindow.png';

interface ProfileProps{
id:number;
title:string;
thumbnail:string;
genre:string;
platform:string;
}

interface ContentProps{
content : ProfileProps[];
selectedGenre : string;
searchTerm:string;
mode:boolean
}

const MainContent = ({content , selectedGenre,searchTerm,mode} : ContentProps) => {
  const navigate = useNavigate();
      const [profile , setProfile]=useState<ProfileProps[]>([])
    const [sortOption , setSortOption] = useState("relevance")
    const [sortPlatform,setSortPlatform] = useState("all platform")

    useEffect(() => {
        setProfile(content)
    },[content])


    useEffect(() => {

        let filtered = content;

        if (selectedGenre !== ""){ 
            filtered = content.filter((p) => p.genre === selectedGenre)
        }


        if (searchTerm.trim() !== ""){
         const lower = searchTerm.toLowerCase();
         filtered = filtered.filter((p) => p.title.toLowerCase().includes(lower))
        }


        if (sortOption === "id"){
            filtered = [...filtered].sort((a,b) => a.id - b.id)
        }

        else if (sortOption === "name"){
            filtered = [...filtered].sort((a,b) => a.title.localeCompare(b.title))
        }

       if (sortPlatform === "pc games") {
      filtered = filtered.filter((p) => p.platform.toLowerCase().includes("pc"))
      } else if (sortPlatform === "web games") {
       filtered = filtered.filter((p) => p.platform.toLowerCase().includes("web"))
}
        setProfile(filtered)
    },[selectedGenre,content,searchTerm,sortOption,sortPlatform])
  return (
    <div className="">
     {/* welcome banner */}
    <div className="flex justify-center items-center  h-[20px] md:ml-[-3rem] max-xl:pb-[2rem] max-xl:pt-[0.8rem] pt-[1rem]">
      <TypeAnimation
        sequence={[
          "🎮 Welcome to Gaming Hub", 2500,
          "⚡ Explore Epic Games", 2500,
          "🔥 Level Up Your Skills", 2500,
          "👾 Let’s Play Together!", 2500,
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "white", // white text
          textShadow: "4px 4px 6px #3024D7", // glow only for text
          display: "inline-block",
        }}
      />
    </div>


{/* top content */}
<div className="flex flex-col  md:flex-row md:pb-[2rem] pb-[1rem] md:justify-between md:items-center md:gap-3 gap-1">
  
 {/* heading */}
  <div className="flex flex-col md:items-center items-start">
    <h1
      className={`
        text-2xl md:text-4xl lg:text-5xl 
        font-medium pb-[1rem]
        ${mode 
          ? "text-black text-shadow-black" 
          : "text-white text-shadow-white"}
      `}
    >
      {selectedGenre ? `${selectedGenre} Games` : "All Games"} ({profile.length})
    </h1>
  </div>

  {/* sorting/filtering (always row) */}
  <div className="flex flex-row md:gap-1 gap-3">
    {/* relevance sorting */}
    <div>

    <select
      className={`
        text-sm sm:text-base md:text-lg
        py-1 sm:py-2
        pl-2 sm:pl-4
        pr-6 sm:pr-10 md:pr-13
        rounded-md sm:rounded-xl
        shadow-md border
        ${ mode 
          ? "text-black bg-gray-300" 
          : "text-white bg-gray-800 border-gray-500"
        }
      `}
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="relevance">Relevance</option>
      <option value="id">ID</option>
      <option value="name">Name</option>
    </select>
    </div>

    {/* platform filtering */}
    <div>

    <select
      className={`
        text-sm sm:text-base md:text-lg
        py-1 sm:py-2
        pl-2 sm:pl-4
        pr-6 sm:pr-12 md:pr-11
        rounded-md sm:rounded-xl
        shadow-md border
        ${ mode 
          ? "text-black bg-gray-300" 
          : "text-white bg-gray-800 border-gray-500"
        }
      `}
      value={sortPlatform}
      onChange={(e) => setSortPlatform(e.target.value)}
    >
      <option value="all platform">All Platforms</option>
      <option value="pc games">PC Games</option>
      <option value="web games">Web Games</option>
    </select>
    </div>
  </div>

</div>





{/* maiin-content */}
  {profile.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-6xl mb-4">😢</span>
            <p className="text-lg">No games found</p>
          </div>
        </div>
      ) : (
        <div
   className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 md:p-3 ml-[-0.8rem] mr-[-0.9rem] rounded-xl transition duration-300 md:border
    md:hover:shadow-[0_0_25px_#3024D7] md:hover:border-[#3024D7]
    ${mode ? "border-light " : "border-dark-visible"}`}
>
  {profile.map((p) => (
    <div
      key={p.id}
      className="transition duration-300  hover:shadow-[0_0_25px_#3024D7] hover:border-[#3024D7] hover:scale-105 md:hover:shadow-[0_0_7px_#838383] hover:border-[#000000] rounded-md overflow-hidden"
     onClick={() => navigate(`/Game/${p.id}`)}
    >
      {/* card wrapper makes width consistent */}
      <div className="w-full">
        {/* game image */}
        <img
          className="w-full object-cover rounded-t-lg"
          src={p.thumbnail}
          alt={p.title}
        />

        {/* game info */}
        <div
          className={`w-full bg-opacity-100 rounded-b-lg ${
            mode ? "bg-gray-300" : "bg-[#212D48]"
          }`}
        >
          <div className="flex flex-row items-center p-2 relative pt-3">
            <strong
              className={`truncate block ${mode ? "text-black" : "text-white"}`}
            >
              {p.title}
            </strong>
            <p
              className={`absolute right-3 px-2 text-sm bg-opacity-15 rounded  
                ${
                  p.id <= 150
                    ? "bg-red-600 text-red-800"
                    : p.id <= 300
                    ? "bg-yellow-600 text-yellow-800"
                    : p.id <= 450
                    ? "bg-[#18BFDC] text-[#18BFDC]"
                    : "bg-green-600 text-green-800"
                }`}
            >
              {p.id}
            </p>
          </div>

          {/* genre + platform */}
          <div className="flex flex-row items-center pl-2 pb-2">
            <p
              className={`text-sm ${
                mode ? "text-gray-600" : "text-gray-200"
              }`}
            >
              {p.genre}
            </p>
            {p.platform.toLowerCase().includes("pc") && (
              <img
                className="h-[0.9rem] ml-2 object-cover"
                src={mode ? lightWindow : windows}
                alt="Windows"
              />
            )}
            {p.platform.toLowerCase().includes("web") && (
              <img
                className="h-[0.9rem] ml-2 object-cover"
                src={mode ? lightWeb : web}
                alt="Web"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  )
}

export default MainContent  
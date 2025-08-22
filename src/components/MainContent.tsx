import React, { use, useEffect, useState } from 'react'
import windows from '../assets/windows.png'
import web from '../assets/web.png'
import { TypeAnimation } from "react-type-animation";
import lightWeb from '../assets/lightWeb.png';
import ligthWindow from '../assets/lightWindow.png';

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
    <div className=" ">
     {/* welcome banner */}
    <div className="flex justify-center items-center  h-[20px] ml-[-3rem]">
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
          textShadow: "4px 4px 8px #3024D7]", // glow only for text
          display: "inline-block",
        }}
      />
    </div>


      {/* top content */}
<div className="flex flex-row justify-between items-start">
  {/* heading*/}
  <div>
    <h1 className={` text-5xl font-medium pb-[1rem] ${mode ? "text-black" : "text-white"}` }>
      {selectedGenre ? `${selectedGenre} Games` : "All Games"} ({profile.length})
    </h1>
  </div>

  {/* sorting/filtering */}
  <div className="flex flex-row space-x-2">
    {/* relevance sorting */}
    <div>
      <select
        className={`  text-base py-2 pl-4 pr-[5rem] rounded-xl shadow-md border  
  ${ mode 
      ? "text-black bg-gray-300"   // ✅ Light mode
      : "text-white bg-gray-800 border-gray-500" // ✅ Dark mode
  }
`}
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="relevance" className="text-xl">Relevance</option>
        <option value="id" className="text-xl">ID</option>
        <option value="name" className="text-xl">Name</option>
      </select>
    </div>

    {/* platform filtering */}
    <div>
      <select
        className={`  text-base py-2 pl-4 pr-[4rem] rounded-xl shadow-md border  
  ${ mode 
      ? "text-black bg-gray-300"   // ✅ Light mode
      : "text-white bg-gray-800 border-gray-500" // ✅ Dark mode
  }
`}
        value={sortPlatform}
        onChange={(e) => setSortPlatform(e.target.value)}
      >
        <option value="all platform" className="text-xl">All Platforms</option>
        <option value="pc games" className="text-xl">PC Games</option>
        <option value="web games" className="text-xl">Web Games</option>
      </select>
    </div>
  </div>
</div>





    {/* maiin-content */}
    <div className={` grid grid-cols-4 gap-3 relative     p-4 rounded-xl transition duration-300 
    border 
    hover:shadow-[0_0_25px_#3024D7]
    hover:border-[#3024D7]   ${mode ? "border-light" : "border-dark"}`}>
    {profile.length > 0 ?(
    profile.map((p) => (
        <div key={p.id} className={` transition duration-300 
    border 
    rounded-2xl
    hover:scale-105 
    ${mode ? "border-light" : "border-dark"}`}>

            {/* games-Profile-Img */}
            <div>
                <img className={`rounded-tl-lg rounded-tr-lg `} src={p.thumbnail} alt={p.title}/>
            </div>

            {/* Profile-Data */}
            <div className={`   bg-opacity-100 rounded-br-lg rounded-bl-lg ${mode ? "bg-gray-300":"bg-[#212D48]"}`}>
            <div className="flex flex-row items-center p-2 relative pt-3">
                <strong  className={`truncate block w-40 ${mode ? "text-black":"text-white"}`}>{p.title}</strong>
                <p className={`absolute right-3 px-2 text-sm bg-opacity-15 rounded  ${p.id <= 150 ?" bg-red-600 text-red-800 " :p.id <= 300 ? "bg-yellow-600 text-yellow-800" :p.id <= 450  ? "bg-[#18BFDC] text-[#18BFDC]":  "bg-green-600 text-green-800"}`}>{p.id}</p>
            </div>

            {/* genre */}
            <div className="flex flex-row items-center pl-2 pb-2">
                <p className="text-gray-200 text-sm">{p.genre}</p>
                <div>
              {p.platform.toLowerCase().includes("pc") && (
   <img className="h-[0.9rem] color-gray-200 ml-[10px] object-cover" src={mode ? ligthWindow:windows} alt="Windows" />
)}
{p.platform.toLowerCase().includes("web") && (
   <img className="h-[0.9rem] ml-[10px] object-cover"  src={mode ? lightWeb:web} alt="Web"  />
)}
                </div>
            </div>
            </div>
        </div>
    ))  ) : (
     <div className="fixed inset-0 flex flex-col items-center justify-center text-gray-400">
  <span className="text-6xl mb-4">😢</span>
  <p className="text-lg">No games found</p>
</div>

    )}
    </div>
    </div>
  )
}

export default MainContent  
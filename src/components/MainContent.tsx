import React, { use, useEffect, useState } from 'react'
import windows from '../assets/windows.png'
import web from '../assets/web.png'
import { TypeAnimation } from "react-type-animation";

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
}

const MainContent = ({content , selectedGenre,searchTerm} : ContentProps) => {
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

          {/* top content */}
         <div className="flex flex-row justify-between py-8">
            <h1 className="text-5xl font-medium text-white  ">
              {selectedGenre ? `${selectedGenre} Games`  : "All Games"} ({profile.length})
          </h1>
  
     <div className="flex flex-row">
   {/*relevance sorting/filtering*/}
      <div className="mr-[1rem]" >
         <select
    className="bg-gray-800 text-white text-base py-2 pl-4 pr-[8rem] rounded-xl shadow-md border border-gray-500"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="relevance" className="text-xl">Relevance</option>
    <option value="id" className="text-xl">ID</option>
    <option value="name" className="text-xl">Name</option>
  </select>
      </div>
  
  
      {/* {plateform filtering} */}
  
      <div>
       <select className="bg-gray-800 text-white text-base py-2 pl-4 pr-[8rem] rounded-xl shadow-md border border-gray-500" value={sortPlatform} onChange={(e) => setSortPlatform(e.target.value)} name="" id="">
          <option value="all platform" className="text-xl">All Platfroms</option>
          <option value="pc games" className="text-xl">PC Games</option>
          <option value="web games" className="text-xl">Web Games</option>
       </select>
      </div>
  
      </div> 
  
  
         </div>
         


        {/* welcome banner */}
<div className="flex justify-center items-center h-[100px] pl-[-50px]">
  <h1 className="text-5xl font-bold text-white ml-[-50px]">
    <span role="img" aria-label="game" className="mr-2">🎮</span>
    <span
      style={{
        textShadow: "4px 4px 8px #001C8C", // ✅ force glow on text
      }}
    >
      <TypeAnimation
        sequence={[
          "Welcome to Gaming Hub", 2500,
          "Explore Epic Games", 2500,
          "Level Up Your Skills", 2500,
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{
          color: "#ffffff", // ✅ white text
          display: "inline-block",
        }}
      />
    </span>
  </h1>
</div>



    {/* maiin-content */}
    <div className=" grid grid-cols-4 gap-4 relative ">
    {profile.length > 0 ?(
    profile.map((p) => (
        <div key={p.id} className="">

            {/* games-Profile-Img */}
            <div>
                <img className={`rounded-tl-lg rounded-tr-lg `} src={p.thumbnail} alt={p.title}/>
            </div>

            {/* Profile-Data */}
            <div className={`  bg-gray-800 bg-opacity-100 rounded-br-lg rounded-bl-lg`}>
            <div className="flex flex-row items-center p-2 relative pt-5">
                <strong  className="truncate block w-40 text-white">{p.title}</strong>
                <p className={`absolute right-3 px-1 text-sm bg-opacity-40  ${p.id <= 150 ?" bg-green-600 text-green-800 " :p.id <= 300 ? "bg-yellow-600 text-yellow-800" : "bg-red-600 text-red-800"}`}>{p.id}</p>
            </div>

            {/* genre */}
            <div className="flex flex-row items-center pl-2 pb-2">
                <p className="text-gray-200 text-sm">{p.genre}</p>
                <div>
              {p.platform.toLowerCase().includes("pc") && (
   <img className="h-[0.9rem] color-gray-200 ml-[10px] object-cover" src={windows} alt="Windows" />
)}
{p.platform.toLowerCase().includes("web") && (
   <img className="h-[0.9rem] ml-[10px] object-cover"  src={web} alt="Web"  />
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
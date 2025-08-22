import React from 'react'
import menuIcon from '../assets/menuIcon.png'  // exact file name here
import magnifier from '../assets/magnifier.png'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'
import lightMenuIcon from '../assets/lightMenuIcon.png'
interface MenuProps{
      setSearchTerm:(term:string) => void;
      mode:boolean;
      toggleMode: () => void;
}


const Menu = ({setSearchTerm ,mode , toggleMode} : MenuProps) => {
  return (
<div
  className={`fixed top-0 left-0 w-full flex items-center h-[80px] border z-50 backdrop-blur-md bg-opacity-70
    ${mode ? " bg-[#e5e5e5] border-light" : "bg-[#15101b] border-dark"}`}
>        <div>
<img
  className="h-[50px] ml-4"
  src={mode ? lightMenuIcon : menuIcon}
  alt="gaming-hub icon"
/>        </div>
        <div className="relative w-[100%]">
       
             <img
    className="absolute left-[25px] top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-50"
    src={magnifier}
    alt="magnifying glass"
  />


            <input
  className={`
    text-white  
    w-[93%] h-[45px] ml-2 rounded-full pl-[40px] 
     bg-opacity-100
    relative z-10              /* put input above other content */
    focus:outline-none
    focus:ring-2 focus:ring-[#0B074D] focus:ring-offset-1 focus:ring-offset-[#0B074D] focus:shadow-[0_0_25px_#3024D7]
    hover:shadow-[0_0_25px_#3024D7]
    transition duration-300
    ${mode? "bg-gray-300":"bg-gray-700" }
  `}
  type="text"
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search Games..."
/>
        </div>

<div className="pb-3">
  <button
    onClick={toggleMode}
    className={`absolute right-[2.4rem] w-[2.8rem] h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
      mode ? "bg-gray-300" : "bg-green-200"
    }`}
  >
    <div
      className={`w-5 h-5 bg-gray-400 rounded-full shadow-md transform transition-transform duration-300 ${
        mode ? "translate-x-5" : "translate-x-0"
      }`}
    ></div>
  </button>

  <div className="absolute right-2  pl-2">
    {mode ? (
        <>
        <img  src={sun} alt="Light mode" />
        </>
    ) : (
        <>
        <img src={moon} alt="Dark mode" />
        </>
    )}
  </div>
</div>

        </div>
  )
}

export default Menu
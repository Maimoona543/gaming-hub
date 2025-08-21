import React from 'react'
import menuIcon from '../assets/menuIcon.png'  // exact file name here
import magnifier from '../assets/magnifier.png'
interface MenuProps{
      setSearchTerm:(term:string) => void;
}


const Menu = ({setSearchTerm} : MenuProps) => {
  return (
    <div className=" fixed top-0 left-0 w-full flex items-center h-[80px] border border-gray-800  z-50 ">
        <div>
                  <img className='h-[50px]  ml-4' src={menuIcon} alt="menu icon" />
        </div>
        <div>

            <img className="absolute left-[90px] top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" src={magnifier} alt="magnifying glass" />



            <input
  className="
    text-white  
    w-[1330px] h-[45px] ml-3 rounded-full pl-[40px] 
    bg-gray-700 bg-opacity-100
    relative z-50              /* put input above other content */
    focus:outline-none
    focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-gray-600
    hover:shadow-[0_0_25px_#a855f7]
    transition duration-300
  "
  type="text"
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search Games..."
/>
        </div>
    </div>
  )
}

export default Menu
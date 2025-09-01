
import menuIcon from '../assets/menuIcon.png'
import magnifier from '../assets/magnifier.png'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'
import lightMenuIcon from '../assets/lightMenuIcon.png'

interface MenuProps {
  setSearchTerm: (term: string) => void;
  mode: boolean;
  toggleMode: () => void;
}

const Menu = ({ setSearchTerm, mode, toggleMode }: MenuProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full flex items-center h-[70px] md:px-4 pl-1 border z-50 backdrop-blur-md bg-opacity-70
        ${mode ? "bg-[#e5e5e5] border-light" : "bg-[#15101b] border-dark"}`}
    >
      {/* Logo */}
      <div className="flex-shrink-0 w-[40px] md:w-[40px]">
        <img
          className="w-full h-auto"
          src={mode ? lightMenuIcon : menuIcon}
          alt="gaming-hub icon"
        />
      </div>

      {/* Search bar (expands naturally) */}
     <div className="relative flex-grow mx-4">
  <img
    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
    src={magnifier}
    alt="magnifying glass"
  />
  <input
    className={`
      w-full h-[42px] md:h-[48px] rounded-full 
      pl-10 sm:pl-12 md:pl-12 pr-4       /* increased padding-left on small+ screens */
      focus:outline-none focus:ring-2 focus:ring-[#0B074D]
      focus:shadow-[0_0_20px_#3024D7]
      hover:shadow-[0_0_20px_#3024D7]
      transition-all duration-300 ease-in-out
      ${mode ? "bg-gray-300 text-black" : "bg-gray-700 text-white"}
    `}
    type="text"
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search Games..."
  />
</div>


      {/* Toggle + icon */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={toggleMode}
          className={`relative w-[45px] h-[25px] flex items-center rounded-full p-1 transition-colors duration-300
            ${mode ? "bg-gray-300" : "bg-green-200"}`}
        >
          <div
            className={`w-[18px] h-[18px] bg-gray-400 rounded-full shadow-md transform transition-transform duration-300 
              ${mode ? "translate-x-6" : "translate-x-0"}`}
          ></div>
        </button>

        <img
          className="w-[28px] h-[28px] object-contain"
          src={mode ? sun : moon}
          alt="Light mode / Dark mode"
        />
      </div>
    </div>
  )
}

export default Menu

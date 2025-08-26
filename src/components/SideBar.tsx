
import layer from '../assets/layer.png'
import lightLayer from '../assets/lightLayer.png'
interface GameGenre{
    id:number;
    genre:string;
    thumbnail:string;

}
interface SideBarProps{
    games:GameGenre[]
  setSelectedGenre: (genre: string) => void;
  mode:boolean

}
const SideBar = ({games, setSelectedGenre , mode}:SideBarProps ) => {
     const gameMap = new Map<string, GameGenre>();
  games.forEach(game => {
    if (!gameMap.has(game.genre)) {
      gameMap.set(game.genre, game);
    }
  });
  return (

<div>
    <div className="flex flex-row items-center my-2" onClick={() => setSelectedGenre("")}>
    <img className="w-8 h-15 object-cover ml-[-3px] mr-2" src={ mode ? lightLayer:layer} alt="" />
    <h2 className={` text-xl my-class hover:underline cursor-pointer ${mode ? "text-gray-800":"text-white" } `}>All Genres</h2>
    </div>
   
<ul>
  {games.length === 0 ? (
    <li className="text-white opacity-50">Loading genres...</li>
  ) : (
    [...gameMap.values()].map((game, index) => (
      <li key={index} className="flex flex-row items-center   cursor-pointer my-class" onClick={() => setSelectedGenre(game.genre)}>
        <img
          className="w-10 h-10 object-cover my-3 mr-2"
          src={game.thumbnail}
          alt={game.genre}
        />
        <span className={` hover:underline ${mode ? "text-gray-500":"text-gray-300 " }`}>{game.genre}</span>
      </li>
    ))
  )}
</ul>
</div>

  )
}

export default SideBar
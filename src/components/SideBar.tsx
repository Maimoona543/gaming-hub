import React from 'react'
import layer from '../assets/layer.png'
interface GameGenre{
    id:number;
    genre:string;
    thumbnail:string;

}
interface SideBarProps{
    games:GameGenre[]
  setSelectedGenre: (genre: string) => void;

}
const SideBar = ({games, setSelectedGenre}:SideBarProps ) => {
     const gameMap = new Map<string, GameGenre>();
  games.forEach(game => {
    if (!gameMap.has(game.genre)) {
      gameMap.set(game.genre, game);
    }
  });
  return (

<div className=''>
    <div className="flex flex-row items-center my-2" onClick={() => setSelectedGenre("")}>
    <img className="w-8 h-15 object-cover ml-[-3px] mr-2" src={layer} alt="" />
    <h2 className="text-white text-xl my-class hover:underline">All Genres</h2>
    </div>
   
<ul>
  {games.length === 0 ? (
    <li className="text-white opacity-50">Loading genres...</li>
  ) : (
    [...gameMap.values()].map((game, index) => (
      <li key={index} className="flex flex-row items-center cursor-pointer" onClick={() => setSelectedGenre(game.genre)}>
        <img
          className="w-10 h-10 object-cover my-3 mr-2"
          src={game.thumbnail}
          alt={game.genre}
        />
        <span className="text-white">{game.genre}</span>
      </li>
    ))
  )}
</ul>
</div>

  )
}

export default SideBar
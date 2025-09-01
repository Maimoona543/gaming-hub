
import { useParams } from 'react-router-dom';

interface Game{
    id:number;
    title:string;
    short_description:string;
    genre:string;
    platform:string;
    publisher:string;
    release_date:string;
    thumbnail:string;
    game_url:string;
    developer:string;
}

interface Props{
    game:Game[];
    mode:boolean;
}

const GameDetail = ({game,mode} : Props) => {
const { id } = useParams<{ id: string }>();
const selectedGame = game.find(g => g.id === Number(id))

if (!selectedGame){
    return <h1 className="z-10 ">Game not Found</h1>
}
return (
<div className="flex justify-center items-center flex-col min-h-screen px-4 sm:px-6">
  {/* Title */}
  <div>
    <h1
      className={`sm:text-3xl    largeMobile:pt-2 text-xl pt-2 lg:text-5xl font-bold pb-10 lg:pb-20 
        ${mode ? "text-black text-shadow-black" : "text-white text-shadow-white"}`}
    >
      {selectedGame.title}
    </h1>
  </div>

  {/* Main Content */}
  <div
    className={`flex flex-col md:flex-row p-2 sm:p-4 rounded-xl 
      ${mode ? "text-gray-600 bg-[#212D48]" : "text-white bg-[#212D48]"} 
      w-full sm:w-[90%] lg:w-[70%] 2xl:w-[90%] h-auto box-shadow`}
  >
    {/* Thumbnail */}
    <div className="flex-shrink-0 w-full md:w-[50%] lg:w-[60%] z-20">
      <img
        className="rounded-lg rounded-bl-none rounded-br-none md:rounded-br-none md:rounded-tr-none object-cover w-full h-full"
        src={selectedGame.thumbnail}
        alt={selectedGame.title}
      />
    </div>

    {/* Details */}
    <div
      className={` flex  justify-center items-center md:block md:justify-start md:items-start flex-col w-full text-base sm:text-lg lg:text-lg   xl:text-xl md:ml-[-2rem] md:pl-[4rem]  py-5 rounded-xl md:rounded-tl-lg  md:rounded-tr-lg rounded-tl-none rounded-tr-none 2xl:text-5xl
        ${mode ? "bg-gray-300" : "bg-black"}`}
    >
      <h2 className="my-2 sm:my-3 "><strong>Rating:</strong> {selectedGame.id}</h2>
      <h2 className="my-2 sm:my-3 "><strong>Platform:</strong> {selectedGame.platform}</h2>
      <h2 className="my-2 sm:my-3"><strong>Publisher:</strong> {selectedGame.publisher}</h2>
      <h2 className="my-2 sm:my-3"><strong>Release Date:</strong> {selectedGame.release_date}</h2>
      <h2 className="my-2 sm:my-3"><strong>Developer:</strong> {selectedGame.developer}</h2>
      <h2 className="my-2 sm:my-3 "><strong>Genre:</strong> {selectedGame.genre}</h2>
      <a
        href={selectedGame.game_url}
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-gray-200"
      >
        <strong>Link</strong> {selectedGame.title}
      </a>
    </div>
  </div>

  {/* Description */}
  <div
    className={`mt-6 sm:mt-10 max-w-lg sm:max-w-2xl text-center underline 
      ${mode ? "text-black" : "text-white"}`}
  >
    <h2><strong>{selectedGame.short_description}</strong></h2>
  </div>
</div>



  )
}

export default GameDetail
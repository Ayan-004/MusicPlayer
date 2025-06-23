import { useParams, useNavigate } from "react-router-dom";
import { useSong } from "../components/context/SongContext";
import { AnimatedItem } from "../components/AnimateItem";
import { ListPlus, ListMusic, CircleMinus, ListEnd } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function PlaylistDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { playlists, setCurrentSong, removeSongFromPlaylist, addToQueue } =
    useSong();

  const playlist = playlists.find((p) => decodeURIComponent(p.name) === name);

  if (!playlist) {
    return (
      <div className="p-6">
        <p className="text-red-500">Playlist not found.</p>
        <button
          onClick={() => navigate("/playlists")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Playlists
        </button>
      </div>
    );
  }

  return (
    <div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-calsans ml-5 md:pl-10 pb-5 md:p-0 break-words max-w-full md:max-w-[40%] lg:max-w-[70%]">
          {playlist.name}
        </h1>

      {playlist.songs.length === 0 ? (
        <p className="flex items-center justify-center md:w-2xl bg-[#efefef] font-montserrat-medium ml-3 mr-3 md:ml-72 p-10 rounded-4xl">
          This playlist is empty
        </p>
      ) : (
        <div className="flex flex-col gap-2 bg-[#efefef] p-10 rounded-4xl m-3 md:m-6 mb-56 md:mb-36">
          {playlist.songs.map((song, index) => (
            <AnimatedItem
              key={index}
              index={index}
              onClick={() => setCurrentSong(song)}
            >
              {song.image?.trim() && (
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full"
                />
              )}
              <div className="flex flex-col min-w-0 max-w-xs md:max-w-md overflow-hidden">
                <p className="text-sm md:text-md font-montserrat-medium truncate">
                  {song.title}
                </p>
                <p className="text-xs md:text-sm font-montserrat-medium truncate text-[#979797]">
                  {song.artist}
                </p>
              </div>
              <button
              title="add to queue"
                onClick={(e) => {
                  e.stopPropagation();
                  addToQueue(song);
                }}
                className="ml-auto -mr-6 md:-mr-0 text-sm px-3 py-1 text-black hover:scale-110 transition-all cursor-pointer"
              >
                <ListEnd />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSongFromPlaylist(playlist.name, index);
                }}
                className="-mr-12 md:-mr-0 text-sm px-3 py-1 text-black hover:scale-110 transition-all cursor-pointer"
              >
                <CircleMinus />
              </button>
            </AnimatedItem>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistDetail;

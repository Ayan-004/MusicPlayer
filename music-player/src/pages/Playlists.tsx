import { useSong } from "../components/context/SongContext";
import { Link } from "react-router-dom";

function Playlists() {
  const { playlists } = useSong();

  return (
    <div>
      <h1 className="text-3xl font-calsans ml-6">Your Playlists</h1>
      {playlists.length === 0 || playlists.every(p => p.songs.length === 0)? (
        <p className="text-center mt-10 text-gray-500 font-montserrat-medium">
          No playlist created yet.
        </p>
      ) : (
        <ul>
          {playlists.map((playlist) => 
            playlist.songs.length > 0 ? (
              <li key={playlist.name} className="font-montserrat-medium">
              <Link
                  to={encodeURIComponent(playlist.name)}
                  className="block m-5 bg-gray-100 hover:bg-gray-200 rounded-3xl p-4 shadow transition-all"
                >
                  <h2 className="text-xl font-montserrat-medium">
                    {playlist.name}
                  </h2>
                  <p className="text-gray-500">{playlist.songs.length}</p>
                </Link>
            </li>
            ): null
          )}
        </ul>
      )}
    </div>
  );
}

export default Playlists;

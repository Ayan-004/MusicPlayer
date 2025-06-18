import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSong } from "./context/SongContext";
import { AnimatedItem } from "./AnimateItem";
import { ListPlus } from 'lucide-react'

interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}

function decodeHTMLEntities(text: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

const SearchResults = () => {
  const { setCurrentSong, addToQueue } = useSong();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(
      `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}&page=1&limit=50`
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data?.data?.results || [];
        const formatted = results.map((song: any) => ({
          title: decodeHTMLEntities(song.name || song.title),
          artist:
            song.artists?.primary?.map((a: any) => a.name).join(", ") ||
            "Unknown",
          image: song.image?.[2].url || "",
          url:
            song.downloadUrl?.find((d: any) => d.quality === "320kbps")?.url ||
            "",
        }));
        setSongs(formatted);
      })
      .catch(() => setSongs([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="m-3 p-4 md:m-6 md:p-6 mb-56 md:pb-28 rounded-4xl bg-[#efefef] ">
      <h2 className="text-2xl font-calsans pt-2 pl-2 mb-10">
        Search Result for "{query}"
      </h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-60 gap-3">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
        </div>
        <p className="text-gray-600 font-montserrat-medium ml-3">Loading...</p>
      </div>
      ) : songs.length === 0 ? (
        <p className="flex justify-center font-montserrat-medium">
          😕No songs found.
        </p>
      ) : (
        <div className="space-y-4">
          {songs.map((song, index) => (
            <AnimatedItem
              key={index}
              index={index}
              onClick={() =>
                setCurrentSong({
                  title: song.title,
                  artist: song.artist,
                  image: song.image,
                  url: song.url,
                })
              }
            >
              <img
                src={song.image}
                alt={song.title}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
              />
              <div className="flex flex-col min-w-0 max-w-xs md:max-w-md overflow-hidden">
                <p className="text-sm md:text-md font-montserrat-medium truncate">
                  {song.title}
                </p>
                <p className="text-xs md:text-sm font-montserrat-medium truncate text-[#979797]">
                  {song.artist}
                </p>
              </div>
              <button 
              onClick={(e) => {
                e.stopPropagation();
                addToQueue(song)
              }}
              className="ml-auto -mr-3 md:-mr-0 text-sm px-3 py-1 text-black hover:scale-110 transition-all cursor-pointer"
              >
                <ListPlus />
              </button>
            </AnimatedItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

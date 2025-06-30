import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSong } from "./context/SongContext";
import { AnimatedItem } from "./AnimateItem";
import { CirclePlus, ListEnd } from "lucide-react";

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
  const { setCurrentSong, addToQueue, addSongToPlaylist } = useSong();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);

    const fetchSongs = async () => {
      try {
        const res = await fetch(
          `https://saavn.dev/api/search/songs?query=${encodeURIComponent(
            query
          )}&page=1&limit=50`
        );
        const data = await res.json();

        const formatted: Song[] = (data?.data?.results || []).map(
          (song: any) => ({
            title: decodeHTMLEntities(song.name || song.title),
            artist: song.artists?.primary?.length
              ? decodeHTMLEntities(
                  song.artists?.primary?.map((a: any) => a.name).join(", ")
                )
              : "Unknown",
            image: song.image?.[2].url || "",
            url:
              song.downloadUrl?.find((d: any) => d.quality === "320kbps")
                ?.url || "",
          })
        );

        setSongs(formatted);
      } catch (e) {
        console.error("Fetch failed", e);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [query]);

  return (
    <div className="m-3 p-6 md:m-6 md:p-6 mb-56 md:pb-28 rounded-4xl bg-[#efefef] ">
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
          <p className="text-gray-600 font-montserrat-medium ml-3">
            Loading...
          </p>
        </div>
      ) : songs.length === 0 ? (
        <p className="flex justify-center font-montserrat-medium">
          😕No songs found for "{query}".
        </p>
      ) : (
        <div className="space-y-4">
          {songs.map((song, index) => (
            <AnimatedItem
              key={index}
              index={index}
              onClick={() => setCurrentSong(song)}
            >
              <img
                src={song.image}
                alt={song.title}
                loading="lazy"
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
                aria-label="Add To Queue"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!song.url) return;
                  addToQueue(song);
                }}
                className="ml-auto -mr-6 md:-mr-0 text-sm px-3 py-1 text-black hover:scale-110 transition-all cursor-pointer"
              >
                <ListEnd />
              </button>
              <button
                aria-label="Add To Playlist"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!song.url) return;
                  addSongToPlaylist("My Playlist", song);
                }}
                className="-mr-7 md:-mr-0 text-sm px-3 py-1 text-black hover:scale-110 transition-all cursor-pointer"
              >
                <CirclePlus />
              </button>
            </AnimatedItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

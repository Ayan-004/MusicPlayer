import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSong } from "../components/context/SongContext";
import { AnimatedItem } from "../components/AnimateItem";

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

function ArtistProfile() {
  const { setCurrentSong } = useSong();
  const { artistName } = useParams();
  const location = useLocation();
  const passedImage = location.state?.artistImage;

  const [songs, setSongs] = useState<Song[]>([]);
  const [artistImage] = useState<string>(passedImage || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistName) return;
    setLoading(true);

    fetch(
      `https://saavn.dev/api/search/songs?query=${encodeURIComponent(
        artistName
      )}&page=1&limit=50`
    )
      .then((res) => res.json())
      .then((data) => {
        const songList = data?.data?.results || [];
        const songData = songList
          .filter((song: any) => {
            const allArtists = [
              ...(song.artists?.primary || []),
              ...(song.artists?.all || []),
            ];
            return allArtists.some((a: any) =>
              a.name.toLowerCase().includes(artistName.toLowerCase())
            );
          })
          .map((song: any) => ({
            title: decodeHTMLEntities(
              song.name || song.title || "Unknown title"
            ),
            image: song.image?.[2]?.url || "",
            artist:
              song.artists?.primary?.map((a: any) => a.name).join(",") ||
              "Unknown Artist",
            url:
              song.downloadUrl?.find((d: any) => d.quality === "320kbps")
                ?.url || "",
          }));
        setSongs(songData);
      })
      .catch(() => {
        setSongs([]);
      })
      .finally(() => setLoading(false));
    return;
  }, [artistName]);

  return (
    <div className="artist-profile">
      <div className="flex flex-col md:flex-row items-center m-3 md:m-6 bg-[#efefef] rounded-4xl ">
        {artistImage && (
          <img
            src={artistImage}
            alt={artistName}
            className="w-full h-60 md:w-96 md:h-80 rounded-t-4xl md:rounded-l-4xl md:rounded-t-none object-cover shadow-2xl fade-img"
          />
        )}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-calsans text-center md:pl-10 pb-5 md:pb-0 break-words max-w-full md:max-w-[40%] lg:max-w-[70%]">
          {artistName}
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-black"></div>
          <p className="text-cente font-montserrat-medium text-sm">
            Loading songs...
          </p>
        </div>
      ) : songs.length === 0 ? (
        <p className="flex items-center justify-center md:w-2xl bg-[#efefef] font-montserrat-medium ml-3 mr-3 md:ml-72 p-10 rounded-4xl">
          😕 Couldn't find songs by {artistName}. Try again later
        </p>
      ) : (
        <div className="flex flex-col gap-2 bg-[#efefef] p-10 rounded-4xl m-3 md:m-6 mb-56 md:pb-24">
          {songs.map((song, index) => (
            <AnimatedItem
              key={index}
              index={index}
              delay={0}
              onClick={() =>
                setCurrentSong({
                  title: song.title,
                  artist: song.artist,
                  image: song.image,
                  url: song.url,
                })
              }
            >
              {song.image?.trim() && (
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full"
                />
              )}
              <div>
                <p className="text-sm md:text-md font-montserrat-medium">
                  {song.title}
                </p>
                <p className="text-xs md:text-sm font-montserrat-medium text-[#979797]">
                  {song.artist}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtistProfile;

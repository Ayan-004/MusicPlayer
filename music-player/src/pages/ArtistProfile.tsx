import { useState, useEffect } from "react";
import { decryptUrl } from "../utils/crypto";
import { useLocation, useParams } from "react-router-dom";
import { useSong } from "../components/context/SongContext";
import { AnimatedItem } from "../components/AnimateItem";
import { ListPlus } from "lucide-react";

interface Song {
  title: string;
  artist: string;
  image: string | null;
  encryptedUrl: string;
}

function decodeHTMLEntities(text: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function ArtistProfile() {
  const { name } = useParams();
  const { setCurrentSong, addToQueue } = useSong();

  const location = useLocation();
  const passedImage = location.state?.artistImage;

  const [songs, setSongs] = useState<Song[]>([]);
  const [artistImage, setArtistImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ArtistProfile useEffect triggered with name:", name);

    if (!name) return;

    const fetchSongsByArtist = async () => {
      setLoading(true);
      const encodedName = encodeURIComponent(name);
      const proxyUrl = "https://galibproxy.fly.dev/";
      const apiUrl = `https://www.jiosaavn.com/api.php?p=1&q=${encodedName}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=30&__call=search.getResults`;

      try {
        const res = await fetch(proxyUrl + apiUrl, {
          headers: {
            "x-requested-with": "XMLHttpRequest",
          },
        });

        const rawText = await res.text();
        const jsonText = rawText.replace(/^[^{\[]+/, "");

        const data = JSON.parse(jsonText);

        const results = data?.results || [];
        const formattedSongs: Song[] = results.map((song: any) => {
          let image = song.image || "";
          image = image.replace(/150x150/, "500x500");
          image = image.replace(/^http:\/\//, "https://");
          return {
            title: decodeHTMLEntities(song.title || ""),
            artist: decodeHTMLEntities(song.subtitle || ""),
            image: image || null,
            encryptedUrl: song.more_info?.encrypted_media_url || "",
          };
        });
        setArtistImage(passedImage);

        setSongs(formattedSongs);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
        setArtistImage(""); // fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchSongsByArtist();
  }, [name]);

  useEffect(() => {
    if(process.env.NODE_ENV === "production") {
      console.log("🔍 Encrypted URL samples:", songs.map((s) => s.encryptedUrl));
      
    }
  }, [songs])

  const handlePlay = async (song: Song) => {
    if (!song.encryptedUrl || song.encryptedUrl.length < 20) {
      console.warn("Invalid encrypted URL in production", song.encryptedUrl);
      return;
    }

    let finalUrl = "";
    try {
      finalUrl = decryptUrl(song.encryptedUrl);
      if (!finalUrl) throw new Error("Decryption failed: empty result");
    } catch (error) {
      console.error("Decryption error:", error);
    }

    setCurrentSong({
      title: song.title,
      artist: song.artist,
      image: song.image || "",
      url: finalUrl,
    });
  };

  return (
    <div className="artist-profile">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-60 gap-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          </div>
          <p className="text-gray-600 font- montserrat-medium ml-3">
            Loading...
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center m-3 md:m-6 bg-[#efefef] rounded-4xl ">
            {artistImage && (
              <img
                src={artistImage}
                alt={name}
                className="w-full h-60 md:w-96 md:h-80 rounded-t-4xl md:rounded-l-4xl md:rounded-t-none object-cover shadow-2xl fade-img"
              />
            )}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-calsans text-center md:pl-10 pb-5 md:pb-0 break-words max-w-full md:max-w-[40%] lg:max-w-[70%]">
              {name}
            </h1>
          </div>
          {songs.length === 0 ? (
            <p className="flex items-center justify-center md:w-2xl bg-[#efefef] font-montserrat-medium ml-3 mr-3 md:ml-72 p-10 rounded-4xl">
              😕 Couldn't find songs by {name}. Try again later
            </p>
          ) : (
            <div className="flex flex-col gap-2 bg-[#efefef] p-10 rounded-4xl m-3 md:m-6 mb-56 md:mb-36">
              {songs.map((song, index) => (
                <AnimatedItem
                  key={index}
                  index={index}
                  onClick={() => handlePlay(song)}
                >
                  {song.image ? (
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-300 rounded-full flex item-center justify-center text-sm text-white">
                      🎵
                    </div>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!song.encryptedUrl || song.encryptedUrl.length < 20) {
                        console.warn(
                          "Invalid encrypted URL in production",
                          song.encryptedUrl
                        );
                        return;
                      }

                      let finalUrl = "";
                      try {
                        finalUrl = decryptUrl(song.encryptedUrl);
                        if (!finalUrl)
                          throw new Error("Decryption failed: empty result");
                      } catch (error) {
                        console.error("Decryption error:", error);
                      }

                      addToQueue({
                        title: song.title,
                        artist: song.artist,
                        image: song.image || "",
                        url: finalUrl,
                      });
                    }}
                    className="ml-auto -mr-9 md:-mr-0 text-sm px-3 py-1 text-black hover:scale-110 transition-all cursor-pointer"
                  >
                    <ListPlus />
                  </button>
                </AnimatedItem>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ArtistProfile;

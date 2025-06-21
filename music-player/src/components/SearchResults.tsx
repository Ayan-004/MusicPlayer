import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSong } from "./context/SongContext";
import { AnimatedItem } from "./AnimateItem";
import { ListPlus } from "lucide-react";
// import CryptoJS from "crypto-js";
import { decryptUrl } from "../utils/crypto";

interface Song {
  title: string;
  artist: string;
  image: string;
  encryptedUrl: string;
}

function decodeHTMLEntities(text: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

// function decryptMediaUrl(
//   encryptedUrl: string,
//   key: string = "38346591"
// ): string {
//   const keyHex = CryptoJS.enc.Utf8.parse(key);
//   const decrypted = CryptoJS.DES.decrypt(encryptedUrl, keyHex, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }

const SearchResults = () => {
  const { setCurrentSong, addToQueue } = useSong();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    const proxyUrl = "https://galibproxy.fly.dev/";
    const apiUrl = `https://www.jiosaavn.com/api.php?p=1&q=${encodeURIComponent(
      query
    )}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=20&__call=search.getResults`;

    console.log("Proxy Api called with query:", query);

    fetch(proxyUrl + apiUrl, {
      headers: {
        "x-requested-with": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data?.results || [];

        const formatted = results.map((song: any) => {
          const title = decodeHTMLEntities(song.title || song.name);
          const artistRaw =
            song.more_info?.music ||
            song.more_info?.primary_artists ||
            song.more_info?.singers ||
            "Unknown";
          const artist = decodeHTMLEntities(artistRaw).trim() || "Unknown";
          let image = song.image || "";
          image = image.replace(/150x150/, "500x500");
          image = image.replace(/^http:\/\//, 'https://')
          const encryptedUrl = song.more_info?.encrypted_media_url || "";

          return {
            title,
            artist,
            image,
            encryptedUrl,
          };
        });
        setSongs(formatted.filter((s: any) => s.encryptedUrl));
      })
      .catch((err) => {
        console.error("API Error:", err);
        setSongs([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const galibCache = new Map<string, any>();

  const handlePlaySong = async (song: Song) => {
    try {
      let finalUrl = decryptUrl(song.encryptedUrl);
      if(!finalUrl) return;
      setCurrentSong({
        title: song.title,
        artist: song.artist,
        image: song.image,
        url: finalUrl,
      });

      if (!galibCache.has(song.encryptedUrl)) {
        const response = await fetch(
          `https://stillkonfuzed.com/Music/Galib.php?play=${encodeURIComponent(
            song.encryptedUrl
          )}`
        );
        const data = await response.json();
        galibCache.set(song.encryptedUrl, data);
      }

      const details = Object.values(galibCache.get(song.encryptedUrl))[0] as {
        song?: string;
        primary_artists?: string;
        singers?: string;
        image?: string;
        "320kbps"?: string;
      };

      if (details["320kbps"]) {
        finalUrl = details["320kbps"];
      }
    } catch (error) {
      console.error("Playback Error:", error);
    }
  };

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
          <p className="text-gray-600 font-montserrat-medium ml-3">
            Loading...
          </p>
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
              onClick={() => handlePlaySong(song)}
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
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    let finalUrl = decryptUrl(song.encryptedUrl);

                    if (!galibCache.has(song.encryptedUrl)) {
                      const res = await fetch(
                        `https://stillkonfuzed.com/Music/Galib.php?play=${encodeURIComponent(
                          song.encryptedUrl
                        )}`
                      );
                      const data = await res.json();
                      galibCache.set(song.encryptedUrl, data);
                    }

                    const details = Object.values(
                      galibCache.get(song.encryptedUrl)
                    )[0] as {
                      song?: string;
                      primary_artists?: string;
                      singers?: string;
                      image?: string;
                      "320kbps"?: string;
                    };

                    if (details["320kbps"]) {
                      finalUrl = details["320kbps"];
                    }

                    addToQueue({
                      title: details.song || song.title,
                      artist:
                        details.primary_artists ||
                        details.singers ||
                        song.artist ||
                        "Unknown",
                      image: details.image || song.image,
                      url: finalUrl,
                    });
                  } catch (error) {
                    console.error("Failed to decrypt and queue song:", error);
                  }
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

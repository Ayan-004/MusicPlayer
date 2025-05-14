import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSong } from "../SongContext";
import { motion } from "framer-motion";

interface Song {
    title: string;
    artist: string;
    image: string;
    url: string;
}

function decodeHTMLEntities(text: string): string {
    const txt = document.createElement("textarea")
    txt.innerHTML = text;
    return txt.value;
}

const SearchResults = () => {
    const { setCurrentSong } = useSong();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") || "";

    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!query) return;

        setLoading(true);
        fetch(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
            const results = data?.data?.results || [];
            const formatted = results.map((song: any) => ({
                title: decodeHTMLEntities(song.name || song.title),
                artist: song.artists?.primary?.map((a: any) => a.name).join(", ") || "Unknown",
                image: song.image?.[2].url || "",
                url: song.downloadUrl?.find((d: any) => d.quality === "320kbps")?.url || "",
            }));
            setSongs(formatted)
        })
        .catch(() => setSongs([]))
        .finally(() => setLoading(false))
    }, [query])

    return (
        <div className="m-3 p-4 md:m-6 md:p-6 mb-56 md:pb-28 rounded-4xl bg-[#efefef] ">
            <h2 className="text-2xl font-calsans pt-2 pl-2 mb-10">Search Result for "{query}"</h2>
            {loading ? (
                <p>Loading...</p>
            ) : songs.length === 0 ? (
                <p className="flex justify-center font-montserrat-medium">😕No songs found.</p>
            ) : (
                <div className="space-y-4">
                    {songs.map((song, index) => (
                        <motion.div 
                        key={index}
                        onClick={() => 
                            setCurrentSong({
                                title: song.title,
                                artist: song.artist,
                                image: song.image,
                                url: song.url,
                            })
                        }
                        initial={{ opacity: 0, scale: 0.9, y: 50}}
                        whileInView={{opacity: 1, scale: 1, y:0}}
                        transition={{ duration: 0.1, ease:"easeInOut"}}
                        viewport={{ once: true, amount: 0.5}}
                        className="flex items-center gap-4 p-4 pl-0 md:pl-10 rounded-3xl shadow=sm hover:bg-[#cecece] transition hover:cursor-pointer"
                        >

                            <img src={song.image} alt={song.title} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"/>
                            <div>
                                <p className="text-sm md:text-md font-montserrat-medium">{song.title}</p>
                                <p className="text-xs md:text-sm font-montserrat-medium text-[#979797]">{song.artist}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )
        }
        </div>
    )
}

export default SearchResults;
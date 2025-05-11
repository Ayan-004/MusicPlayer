import { useState, useEffect } from "react";
import { useLocation,useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSong } from "../SongContext";

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
    const [artistImage, setArtistImage] = useState<string>(passedImage || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!artistName) return;
        setLoading(true);

        fetch(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(artistName)}`)
        .then(res => res.json())
        .then(data => {
            console.log("JioDaavn Api Data:", data);
            
            const songList = data?.data?.results || [];
            const songData = songList.filter((song: any) => {
                const allArtists = [...(song.artists?.primary || []), ...(song.artists?.all || [])];
                return allArtists.some(
                    (a: any) => 
                        a.name.toLowerCase().includes(artistName.toLowerCase())
                )
            })
            .map((song: any) => ({
                title: decodeHTMLEntities(song.name || song.title || "Unknown title"),
                image: song.image?.[2]?.url || "",
                artist: song.artists?.primary?.map((a: any) => a.name).join(",") || "Unknown Artist",
                url: song.downloadUrl?.find((d: any) => d.quality === "320kbps")?.url || "",
            }))    
                setSongs(songData);
            })
            .catch(() => {
                setSongs([])
            })
            .finally(() => setLoading(false))
            return;
    
}, [artistName]);

return (
        <div className="artist-profile">
            <div className="flex items-center m-6 bg-[#efefef] rounded-4xl ">
                {artistImage && (
                    <img
                     src={artistImage} 
                     alt={artistName}
                     className="w-96 h-80 rounded-l-4xl object-cover shadow-2xl fade-right"
                     />
                )}
                <h1 className="text-7xl font-calsans pl-10">{artistName}</h1>
            </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-black"></div>
                        <p className="text-cente font-montserrat-medium text-sm">Loading songs...</p>
                    </div>
                ) : songs.length === 0 ? (
                    <p className="flex items-center justify-center w-2xl bg-[#efefef] font-montserrat-medium ml-72 p-10 rounded-4xl">😕 Couldn't find songs by {artistName}. Try again later</p>
                ) : (
                    <div className="flex flex-col gap-2 bg-[#efefef] p-10 rounded-4xl m-6 pb-24">
                    {songs.map((song, index) => (
                        
                        <motion.div
                            key={index}
                            onClick={() => setCurrentSong({
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
                            className="flex items-center gap-4 p-4 pl-10 rounded-3xl shadow=sm hover:bg-[#cecece] transition hover:cursor-pointer"
                            >
                            
                            {song.image?.trim() && (
                                <img 
                                src={song.image} 
                                alt={song.title}
                                className="w-16 h-16 object-cover rounded-full" />
                            )}
                            <h3 className="text-center font-montserrat-medium">{song.title}</h3>
                            <p className="text-center text-sm text-[#979797]">{song.artist}</p>

                        </motion.div>
                ))}
        </div>
        
    )}
    </div>
    );
}

export default ArtistProfile;


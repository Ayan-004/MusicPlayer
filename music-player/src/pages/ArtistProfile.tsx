import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Song {
    title: string;
    artist: string;
    image: string;
    url: string;
}


function ArtistProfile() {
    const { artistName } = useParams();
    const [songs, setSongs] = useState<Song[]>([]);
    const [artistImage, setArtistImage] = useState<string>("");

    useEffect(() => {
        if(artistName) {
        fetch(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(artistName)}`)
        .then((res) => res.json())
        .then((data) => {
            const songList = data?.data?.results || [];
            console.log("Full song object:", songList[0])
            

            const songData = songList.map((song: any) => ({
                title: song.name || song.title || "Unknown Title",
                image: song.image?.[2]?.url || "",
                artist: song.artists?.primary?.map((a: any) => a.name).join(",") || "Unknown Artist",
                url: song?.perma_url || song.url || "",
            }))

            setSongs(songData);

            const imageUrl = songList[0]?.artists?.primary?.[0]?.image?.[2]?.url || "";
            setArtistImage(imageUrl);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    }, [artistName]);

    return (
        <div className="aritst-profile">
            <div className="flex items-center  mb-6 px-10">
                {artistImage && (
                    <img
                     src={artistImage} 
                     alt={artistName}
                     className="w-72 h-72 rounded-full object-cover" />
                )}
                <h1 className="text-5xl font-calsans pl-10">{artistName} Songs</h1>
            </div>

                {songs.length === 0 ? (
                    <p>No song found for {artistName}</p>
                ) : (
                    <div className="flex flex-col gap-4">
                    {songs.map((song, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 pl-10 shadow=sm hover:bg-gray-50 transition">
                            <img 
                            src={song.image} 
                            alt={song.title}
                            className="w-16 h-16 object-cover rounded" />
                            <h3 className="text-center font-montserrat-medium">{song.title}</h3>
                            <p className="text-center text-sm text-gray-500">{song.artist}</p>
                            <a 
                            href={song.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center text-blue-500 block mt-2">
                                Listen
                            </a>
                        </div>
                ))}
        </div>
    )}
    </div>
    );
}

export default ArtistProfile;
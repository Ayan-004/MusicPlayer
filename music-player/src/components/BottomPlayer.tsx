import { useSong } from "../SongContext";
import { faBackward, faPlay, faPause, faForward, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const BottomPlayer = () => {
    const { currentSong } = useSong();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if(currentSong && audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
    }, [currentSong])

    const togglePlay = () => {
        if(!audioRef.current) return;
        if(isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying)
    };

    const handleTimeUpdate = () => {
        if(audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    };

    const handleLoadedMetadata = () => {
        if(audioRef.current) {
            setDuration(audioRef.current.duration)
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if(audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value)
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time%60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
    
if(!currentSong || !currentSong?.url) return null;

return(

<div className="fixed bottom-5 w-auto md:max-w-3xl mx-3 md:mx-auto md:left-52 right-0 px-6 py-4 backdrop-blur-3xl shadow-xl rounded-3xl border-gray-300 z-50">
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-1">
                {currentSong.image && (
                    <img 
                    src={currentSong.image} 
                    alt={currentSong.title} 
                    className="w-12 h-12 rounded-md object-cover" />
                )}
        <div className="w-[150px] mr-2 md:w-auto">
            {/* {Mobile marquee} */}
            <div className="block md:hidden">
            <div className="marquee font-montserrat-medium mr-2 text-sm"><span>{currentSong.title}</span></div>
            <div className="marquee text-xs font-montserrat-medium mr-2 text-gray-500"><span>{currentSong.artist}</span></div>
            </div>
        </div>

            {/* {Desktop: Static Text} */}
        <div className="hidden md:block">
            <p className="marquee font-montserrat-medium text-sm">{currentSong.title}</p>
            <p className="marquee text-xs font-montserrat-medium text-gray-500">{currentSong.artist}</p>
        </div>

    </div>

    <div className="flex items-center gap-6 md:pr-4">
        <button className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={ faBackward } />
        </button>
        <button onClick={togglePlay} className="text-gray-600 hover:text-black text-xl">
            <FontAwesomeIcon icon={ isPlaying ? faPause : faPlay } />
        </button>
        <button className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={ faForward } />
        </button>
    </div>
    </div>

    <div className="flex items-center justify-between mt-2">
    <p className="text-sm font-montserrat-medium pr-3 text-gray-600">{formatTime(currentTime)}</p>
    <input 
    type="range" 
    min="0"
    max={duration}
    value={currentTime}
    onChange={handleSeek}
    className="w-full appearance-none rounded-full h-0.5 mt-1  bg-black accent-black cursor-pointer"
    />
    <p className="text-sm font-montserrat-medium pl-3 text-gray-600">{formatTime(duration)}</p>
    </div>
    </div>

    <audio 
    ref={audioRef}
    onTimeUpdate={handleTimeUpdate}
    onLoadedMetadata={handleLoadedMetadata}
    >
        <source src={currentSong.url} type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
</div>
)
}


export default BottomPlayer;
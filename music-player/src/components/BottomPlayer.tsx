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

<div className="fixed bottom-5 w-3xl mx-auto left-52 right-0 px-6 py-4 backdrop-blur-3xl shadow-xl rounded-3xl border-gray-300 z-50">
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {currentSong.image && (
                    <img 
                    src={currentSong.image} 
                    alt={currentSong.title} 
                    className="w-12 h-12 rounded-md object-cover" />
                )}
        <div>
            <p className="font-semibold text-sm pr-4">{currentSong.title}</p>
            <p className="text-xs text-gray-500">{currentSong.artist}</p>
        </div>
    </div>

    <div className="flex items-center gap-6 pr-4">
        <button className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={ faBackward } />
        </button>
        <button onClick={togglePlay} className="text-gray-600 hover:text-black text-xl">
            <FontAwesomeIcon icon={ isPlaying ? faPause : faPlay } />
        </button>
        <button className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={ faForward } />
        </button>
        <p className="text-sm text-gray-600">{formatTime(currentTime)} / {formatTime(duration)}</p>
    </div>
    </div>


    <input 
    type="range" 
    min="0"
    max={duration}
    value={currentTime}
    onChange={handleSeek}
    className="w-full appearance-none rounded-full h-1 bg-black accent-black cursor-pointer"
    />
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
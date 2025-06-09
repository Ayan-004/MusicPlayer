import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";

export interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}

interface SongContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  showFullPlayer: boolean;
  setShowFullPlayer: (value: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  currentTime: number;
  setCurrentTime: (value: number) => void;
  duration: number;
  setDuration: (value: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  volume: number;
  setVolume: (value: number) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

// const SongContext = createContext<SongContextType>({
//   currentSong: null,
//   setCurrentSong: () => {},
//   showFullPlayer: false,
//   setShowFullPlayer: () => {},
// });

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const savedVolume = parseFloat(localStorage.getItem("volume") ?? "0.5")
  const [volume, setVolume] = useState(savedVolume);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.volume = volume;
    }
    localStorage.setItem("volume", volume.toString())
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  }, [currentSong]);

  

  return (
    <SongContext.Provider
      value={{ currentSong, setCurrentSong, showFullPlayer, setShowFullPlayer, isPlaying, setIsPlaying, currentTime, setCurrentTime, duration, setDuration, audioRef, volume, setVolume }}
    >
        <audio
        ref={audioRef}
        onTimeUpdate={() => {
            if(audioRef.current) setCurrentTime(audioRef.current.currentTime)
        }}
        onLoadedMetadata={() => {
            if(audioRef.current) setDuration(audioRef.current.duration)
        }}
      >
        {currentSong?.url && <source src={currentSong?.url} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>

      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
    const context = useContext(SongContext);
    if(!context) {
        throw new Error("useSong must be used within a SongProvider")
    }
    return context;
}
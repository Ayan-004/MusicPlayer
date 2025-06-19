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
  allSongs: Song[];
  setAllSongs: (song: Song[]) => void;
  queue: Song[];
  setQueue: (songs: Song[]) => void;
  addToQueue: (song: Song) => void;
  playNext: () => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const savedVolume = parseFloat(localStorage.getItem("volume") ?? "0.5");
  const [volume, setVolume] = useState(savedVolume);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [queue, setQueue] = useState<Song[]>(() => {
    try {
      const storedQueue = localStorage.getItem("songQueue");
      if (storedQueue) {
        const parsed = JSON.parse(storedQueue);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse queue from localStorage:", e);
    }
    return [];
  });

  const addToQueue = (song: Song) => {
    setQueue((prev) => [...prev, song]);

    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const removeFromQueue = (index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const playNext = () => {
    if (queue.length > 0) {
      const [nextSong, ...rest] = queue;
      setCurrentSong(nextSong);
      setQueue(rest);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

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

  useEffect(() => {
    localStorage.setItem("songQueue", JSON.stringify(queue));
  }, [queue]);

  return (
    <SongContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        showFullPlayer,
        setShowFullPlayer,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        audioRef,
        volume,
        setVolume,
        allSongs,
        setAllSongs,
        queue,
        setQueue,
        addToQueue,
        playNext,
        removeFromQueue,
        clearQueue,
      }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={playNext}
      >
        {currentSong?.url && (
          <source src={currentSong?.url} type="audio/mpeg" />
        )}
        Your browser does not support the audio element.
      </audio>

      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }
  return context;
};

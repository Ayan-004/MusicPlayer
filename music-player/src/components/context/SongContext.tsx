import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";

export interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}
interface Playlist {
  name: string;
  songs: Song[];
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
  playlists: Playlist[];
  setPlaylists: (playlists: Playlist[]) => void;
  createPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistName: string, song: Song) => void;
  removeSongFromPlaylist: (playlistName: string, songIndex: number) => void;
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
  const previousSongUrl = useRef<string | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);

  useEffect(() => {
    try {
      const storedQueue = localStorage.getItem("songQueue");
      if (storedQueue) {
        const parsed = JSON.parse(storedQueue);
        if (Array.isArray(parsed)) setQueue(parsed);
      }
    } catch (e) {
      console.error("Failed to parse queue from localStorage:", e);
    }
  }, []);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("playlists");
      if (stored) setPlaylists(JSON.parse(stored));
    } catch (error) {
      console.error("Failed to parse playlists:", error);
    }
  }, []);

  const createPlaylist = (name: string) => {
    if (playlists.find((p) => p.name === name)) return;
    setPlaylists([...playlists, { name, songs: [] }]);
  };

  const addSongToPlaylist = (playlistsName: string, song: Song) => {
    const existing = playlists.find((p) => p.name === playlistsName);
    if (existing) {
      toast.success(`Added to ${playlistsName}`, {
        style: {
          border: "1px solid #d1d5dc",
          padding: "16px",
          backdropFilter: "blur(7px)",
          WebkitBackdropFilter: "blur(7px)",
          background: "rgba(255, 255, 255, 0.5)",
          fontFamily: "montserrat-medium",
          borderRadius: "20px",
        },
        iconTheme: {
          primary: "#000000",
          secondary: "#f0f0f0",
        },
      });
      setPlaylists((prev) =>
        prev.map((p) =>
          p.name === playlistsName ? { ...p, songs: [song, ...p.songs] } : p
        )
      );
    } else {
      toast.success(`${playlistsName} created and song added`);
      setPlaylists((prev) => [...prev, { name: playlistsName, songs: [song] }]);
    }
  };

  const removeSongFromPlaylist = (playlistsName: string, songIndex: number) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.name === playlistsName
          ? { ...p, songs: p.songs.filter((_, i) => i !== songIndex) }
          : p
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const addToQueue = (song: Song) => {
    toast.success(`Added to queue`, {
      style: {
        border: "1px solid #d1d5dc",
        padding: "16px",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        background: "rgba(255, 255, 255, 0.5)",
        fontFamily: "montserrat-medium",
        borderRadius: "20px",
      },
      iconTheme: {
        primary: "#000000",
        secondary: "#f0f0f0",
      },
    });
    setQueue((prev) => [...prev, song]);

    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    localStorage.setItem("songQueue", JSON.stringify(queue));
  }, [queue]);

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

  const debouncedSavedVolume = debounce((v: number) => {
    localStorage.setItem("volume", v.toString())
  }, 500)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    debouncedSavedVolume(volume);
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
      if (previousSongUrl.current === currentSong.url) return;

      previousSongUrl.current = currentSong.url;

      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("currentSong", JSON.stringify(currentSong));
    }
  }, [currentSong]);

  useEffect(() => {
    const stored = localStorage.getItem("currentSong");
    if (stored && !currentSong) {
      const parsedSong = JSON.parse(stored);
      setCurrentSong(parsedSong);
      previousSongUrl.current = parsedSong.url;
    }
  }, []);

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
        playlists,
        setPlaylists,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
      }}
    >
      {currentSong?.url && (
        <audio
          ref={audioRef}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={playNext}
          crossOrigin="anonymous"
        >
          <source src={currentSong.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

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

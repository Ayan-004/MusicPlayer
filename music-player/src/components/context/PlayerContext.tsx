import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  url: string;
}

interface PlayerContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  showFullPlayer: boolean;
  setShowFullPlayer: (show: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showFullPlayer, setShowFullPlayer] = useState<boolean>(false);

  return (
    <PlayerContext.Provider
      value={{ currentSong, setCurrentSong, showFullPlayer, setShowFullPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

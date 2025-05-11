import { createContext, useContext, useState, ReactNode } from "react";

export interface Song {
    title: string;
    artist: string;
    image: string;
    url: string;
}

interface SongContextType {
    currentSong: Song | null;
    setCurrentSong: (song: Song) => void;
}

const SongContext = createContext<SongContextType>({
    currentSong: null,
    setCurrentSong: () => {},
});

export const SongProvider = ({children}: {children: ReactNode}) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    return (
        <SongContext.Provider value={{currentSong, setCurrentSong}}>
            {children}
        </SongContext.Provider>
    )
}

export const useSong = () => useContext(SongContext);
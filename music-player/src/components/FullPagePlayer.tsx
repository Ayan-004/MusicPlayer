import { useSong } from "./context/SongContext";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  XCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import ElasticSlider from "./ElasticSlider";
import { lazy, Suspense } from "react";
import { useIsMobile } from "../hooks/IsMobile";
import { motion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import {} from "lucide-react";
import {
  QueueListIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
const QueuePanel = lazy(() => import("./QueuePanel"));

type FullPagePlayerProps = {
  showQueue: boolean;
  setShowQueue: (val: boolean) => void;
  onClose: () => void;
};

const FullPagePlayer = ({
  showQueue,
  setShowQueue,
  onClose,
}: FullPagePlayerProps) => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    audioRef,
    volume,
    setVolume,
    addSongToPlaylist,
  } = useSong();

  const isMobile = useIsMobile();
  const exitY = isMobile ? "100vh" : "100vh";

  const titleRefs = useRef<HTMLDivElement | null>(null);
  const artistRefs = useRef<HTMLDivElement | null>(null);
  const [isTitleOverfowing, setIsTitleOverflowing] = useState(false);
  const [isArtistsOverflowing, setIsArtistsOverfowing] = useState(false);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      // audioRef.current.load();
      if (isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (!titleRefs.current || !artistRefs.current) return;

    setIsTitleOverflowing(
      titleRefs.current.scrollWidth > titleRefs.current.clientWidth
    );
    setIsArtistsOverfowing(
      artistRefs.current.scrollWidth > artistRefs.current.clientWidth
    );
  }, [currentSong?.title, currentSong?.artist]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: "100vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        y: exitY,
        opacity: 0,
        transition: { duration: 0.4, ease: easeInOut },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ willChange: "tranform, opacity" }}
      className={`fixed top-0 min-w-full xl:min-w-min xl:left-[230px] right-0 bottom-0 xl:rounded-l-4xl backdrop-blur-xl xl:backdrop-blur-2xl text-black z-40 p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out`}
    >
      <button aria-label="Close player" onClick={onClose}>
        <XCircleIcon className="absolute top-10 right-10 w-8 h-8 xl:w-12 xl:h-12 hover:cursor-pointer" />
      </button>

      <AnimatePresence>
        {showQueue && (
          <Suspense fallback={<div>Loading...</div>}>
            <QueuePanel onClose={() => setShowQueue(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ scale: 0.8, transition: { duration: 0.1, ease: easeInOut } }}
        transition={{ delay: 0.15, duration: 0.4, ease: easeOut }}
        className={`flex flex-col items-center justify-center mt-4 space-y-3 transition-all duration-500 ease-in-out ${
          showQueue
            ? "blur-sm scale-95 pointer-events-none"
            : "blur-0 scale-100"
        } `}
      >
        <img
          src={currentSong.image}
          alt={`Cover art of ${currentSong.title} by ${currentSong.artist}`}
          className="w-70 h-70 sm:w-50 sm:h-50 md:w-60 md:h-60 xl:w-80 xl:h-80 2xl:w-[350px] 2xl:h-[350px] rounded-4xl shadow-2xl "
        />

        <div className="flex flex-col min-w-0 max-w-[200px] md:max-w-[330px] overflow-hidden hover:cursor-pointer">
          <div
            ref={titleRefs}
            className={`text-xl xl:text-xl 2xl:text-2xl text-center font-montserrat-medium ${
              isTitleOverfowing ? "marquee fade-marquee" : "truncate"
            }`}
          >
            {isTitleOverfowing ? (
              <span>{currentSong.title}</span>
            ) : (
              currentSong.title
            )}
          </div>

          <div
            ref={artistRefs}
            className={`text-sm 2xl:text-[16px] mt-1 text-center font-montserrat-medium text-gray-500 ${
              isArtistsOverflowing ? "marquee fade-marquee" : "truncate"
            }`}
          >
            {isArtistsOverflowing ? (
              <span>{currentSong.artist}</span>
            ) : (
              currentSong.artist
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-">
          <p className="w-10 text-sm 2xl:w-16 2xl:text-xl font-montserrat-medium text-gray-700">
            {formatTime(currentTime)}
          </p>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar w-56 md:w-72 2xl:w-96 appearance-none rounded-full h-1 mt-1 cursor-grab"
            style={
              {
                "--progress": `${(currentTime / duration) * 100 || 0}%`,
              } as React.CSSProperties
            }
          />
          <p className="w-10 text-sm 2xl:w-16 2xl:text-xl font-montserrat-medium ml-3 2xl:ml-6 text-gray-700">
            {formatTime(duration)}
          </p>
        </div>

        <div className="flex mt-3 text-xl xl:text-2xl 2xl:text-3xl">
          <button aria-label="Previous">
            <BackwardIcon className="w-8 h-8 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer" />
          </button>
          <button
            aria-label="Play/Pause"
            onClick={togglePlay}
            style={{
              borderRadius: isPlaying ? "19px" : "50%",
              transition: "border-radius 0.3s ease-in-out",
            }}
            className="w-14 h-14 2xl:w-16 2xl:h-16 mx-10 flex items-center justify-center bg-black text-white hover:cursor-pointer"
          >
            {isPlaying ? (
              <PauseIcon className="w-7 h-7 xl:w-8 xl:h-8" />
            ) : (
              <PlayIcon className="w-7 h-7 xl:w-8 xl:h-8 ml-0.5" />
            )}
          </button>
          <button aria-label="Next">
            <ForwardIcon className="w-7 h-7 xl:w-8 xl:h-8 hover:text-black hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer" />
          </button>
        </div>

        <ElasticSlider
          value={volume * 100}
          leftIcon={<SpeakerXMarkIcon className="w-5 h-5" />}
          rightIcon={<SpeakerWaveIcon className="w-5 h-5" />}
          maxValue={100}
          isStepped
          stepSize={1}
          onChange={(val) => {
            setVolume(val / 100);

            if ("vibrate" in navigator) {
              navigator.vibrate(10);
            }
          }}
          className="mt-6 2xl:scale-125 2xl:mt-7"
        />

        <div className="flex mr-6 xl:mr-8">
          <button
            aria-label="Open queue panel"
            onClick={() => setShowQueue(true)}
            className="text-black hover:scale-110 transition-transform cursor-pointer ml-6 xl:ml-8"
          >
            <QueueListIcon className="w-7 h-7" />
          </button>
          <button
            aria-label="Add song to playlist"
            onClick={() =>
              currentSong && addSongToPlaylist("My Playlist", currentSong)
            }
            className="text-black hover:scale-110 transition-transform cursor-pointer ml-6 xl:ml-8"
          >
            <PlusCircleIcon className="w-7 h-7" />
          </button>
          <button
            aria-label="Add song to favourite"
            onClick={() =>
              currentSong && addSongToPlaylist("My Favourite", currentSong)
            }
            className="text-black hover:scale-110 transition-transform cursor-pointer ml-6 xl:ml-8"
          >
            <HeartIcon className="w-7 h-7" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullPagePlayer;

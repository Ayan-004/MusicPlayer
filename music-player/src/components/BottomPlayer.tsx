import { useSong } from "./context/SongContext";
import { useState, useEffect, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon
} from "@heroicons/react/24/solid";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const BottomPlayer = ({
  onOpenFullPlayer,
}: {
  onOpenFullPlayer: () => void;
}) => {
  const {
    currentSong,
    showFullPlayer,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    audioRef,
  } = useSong();

  const titleRefs = useRef<HTMLDivElement | null>(null);
  const artistRefs = useRef<HTMLDivElement | null>(null);
  const [isTitleOverlfowing, setIsTitleOverlflowing] = useState(false);
  const [isArtistsOverflowing, setIsArtistsOverlfowing] = useState(false);

  // useEffect(() => {
  //   if (!titleRefs.current || !artistRefs.current) return;
  //   const newIsTitleOverflowing =
  //     titleRefs.current.scrollWidth > titleRefs.current.clientWidth;

  //   const newIsArtistsOverflowing =
  //     artistRefs.current.scrollWidth > artistRefs.current.clientWidth;

  //   setIsTitleOverlflowing(newIsTitleOverflowing);
  //   setIsArtistsOverlfowing(newIsArtistsOverflowing);
  // }, [currentSong]);

  useEffect(() => {
    if (!titleRefs.current || !artistRefs.current) return;

    const checkOverflow = () => {
      setIsTitleOverlflowing(
        titleRefs.current!.scrollWidth > titleRefs.current!.clientWidth
      );
      setIsArtistsOverlfowing(
        artistRefs.current!.scrollWidth > artistRefs.current!.clientWidth
      );
    };

    requestAnimationFrame(checkOverflow);
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  // };

  useEffect(() => {
    if (!currentSong || !("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.title,
      artist: currentSong.artist,
      artwork: [
        {
          src: currentSong.image,
          sizes: "512x512",
          type: "image/jpeg",
        },
      ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      audioRef.current?.play();
      setIsPlaying(true);
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    });
  }, [currentSong, audioRef, setIsPlaying]);

  if (!currentSong?.url) return null;

  return (
    <div
      className={`fixed bottom-5 min-w-11/12 xl:mx-52 xl:left-52 xl:min-w-fit mx-4 md:left-0 md:mx-5 right-0 px-6 py-4 backdrop-blur-md xl:backdrop-blur-xl shadow-2xl border border-gray-300/50 rounded-3xl z-40 transition-normal duration-700 ease-in-out ${
        showFullPlayer
          ? "opacity-0 translate-y-5 blur-sm scale-95 pointer-events-none"
          : "opacity-100 translate-y-0 blur-0 scale-100"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div
            onClick={onOpenFullPlayer}
            className="flex items-center gap-4 md:gap-1 min-w-0"
          >
            {currentSong.image && (
              <img
                src={currentSong.image}
                alt={currentSong.title}
                loading="lazy"
                className="w-12 h-12 rounded-md object-cover"
              />
            )}
            <div className="flex flex-col min-w-0 max-w-[130px] md:max-w-[250px] overflow-hidden lg:ml-3 hover:cursor-pointer">
              <div
                ref={titleRefs}
                className={`text-sm font-montserrat-medium whitespace-nowrap overflow-hidden ${
                  isTitleOverlfowing ? "marquee fade-marquee" : "truncate"
                }`}
              >
                {isTitleOverlfowing ? (
                  <span>{currentSong.title}</span>
                ) : (
                  currentSong.title
                )}
              </div>

              <div
                ref={artistRefs}
                className={`text-xs font-montserrat-medium text-gray-500 whitespace-nowrap overflow-hidden ${
                  isArtistsOverflowing ? "marquee fade-marquee" : "truncate"
                }`}
              >
                {isArtistsOverflowing ? (
                  <span>{currentSong.artist}</span>
                ) : (
                  currentSong.artist
                )}
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="flex items-center gap-4 xl:gap-6 md:pr-4">
            <button aria-label="Previous">
              <BackwardIcon className="w-6 xl:w-8 text-gray-900 hover:text-black cursor-pointer" />
            </button>
            <button
            aria-label="Play or Pause"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseIcon className="w-6 xl:w-8 text-gray-900 hover:text-black cursor-pointer text-xl" />
              ) : (
                <PlayIcon className="w-6 xl:w-8 text-gray-900 hover:text-black cursor-pointer text-xl" />
              )}
            </button>
            <button aria-label="Next">
              <ForwardIcon className="w-6 xl:w-8 text-gray-900 hover:text-black cursor-pointer text-xl" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="w-10 text-sm font-montserrat-medium pr-3 text-gray-600">
            {formatTime(currentTime)}
          </p>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar w-full appearance-none rounded-full h-1 mt-1 cursor-grab"
            style={
              {
                "--progress": `${(currentTime / duration) * 100 || 0}%`,
              } as React.CSSProperties
            }
          />
          <p className="text-sm font-montserrat-medium pl-3 text-gray-600">
            {formatTime(duration)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;

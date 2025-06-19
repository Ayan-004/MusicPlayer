import { useSong } from "./context/SongContext";
import {
  faBackward,
  faPlay,
  faPause,
  faForward,
  faCircleXmark,
  faVolumeLow,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ElasticSlider from "./ElasticSlider";
import QueuePanel from "./QueuePanel";
import { useIsMobile } from "../hooks/IsMobile";
import { motion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import { ListMusic } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FullPagePlayerProps = {
  showQueue: boolean;
  setShowQueue: (val: boolean) => void;
};

const FullPagePlayer = ({ showQueue, setShowQueue }: FullPagePlayerProps) => {
  const {
    currentSong,
    setShowFullPlayer,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    audioRef,
    volume,
    setVolume,
  } = useSong();

  const isMobile = useIsMobile();
  const exitY = isMobile ? "2000vh" : "9000vh";

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
    const newIsTitleOverflowing =
      titleRefs.current.scrollWidth > titleRefs.current.clientWidth;

    const newIsArtistsOverflowing =
      artistRefs.current.scrollWidth > artistRefs.current.clientWidth;

    setIsTitleOverflowing(newIsTitleOverflowing);
    setIsArtistsOverfowing(newIsArtistsOverflowing);
  }, [currentSong]);

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
      initial={{ opacity: 0, y: 900 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        translateY: exitY,
        transition: { duration: 0.5, ease: easeInOut },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 min-w-full xl:min-w-min xl:left-[230px] right-0 bottom-0 xl:rounded-l-4xl backdrop-blur-xl xl:backdrop-blur-2xl text-black z-40 p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out`}
    >
      <button
        className="absolute top-10 right-10 text-3xl xl:text-4xl hover:cursor-pointer"
        onClick={() => setShowFullPlayer(false)}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>

      <AnimatePresence>
        {showQueue && <QueuePanel onClose={() => setShowQueue(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ scale: 0.8, transition: { duration: 0.1, ease: easeInOut } }}
        transition={{ delay: 0.15, duration: 0.4, ease: easeOut }}
        className={`flex flex-col items-center justify-center mt-9 space-y-3 transition-all duration-500 ease-in-out ${
          showQueue
            ? "blur-sm scale-95 pointer-events-none"
            : "blur-0 scale-100"
        } `}
      >
        <img
          src={currentSong.image}
          alt={currentSong.title}
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
          {/* </div> */}
        </div>

        <div className="flex items-center justify-between mt-2">
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

        <div className="flex mt-3 -mr-12 text-xl xl:text-2xl 2xl:text-3xl">
          <button className="text-gray-900 hover:text-black hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button
            onClick={togglePlay}
            style={{
              borderRadius: isPlaying ? "19px" : "50%",
              transition: "border-radius 0.3s ease-in-out",
            }}
            className="w-14 h-14 2xl:w-16 2xl:h-16 mx-10 flex items-center justify-center bg-black text-white hover:cursor-pointer"
          >
            <FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              size="1x"
              className="flex items-center justify-center"
              style={{
                paddingLeft: isPlaying ? "0px" : "2px",
              }}
            />
          </button>
          <button className="text-gray-900 hover:text-black hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
            <FontAwesomeIcon icon={faForward} />
          </button>
          <button
            onClick={() => setShowQueue(true)}
            className="text-black hover:scale-110 transition-all cursor-pointer ml-6 xl:ml-8"
          >
            <ListMusic />
          </button>
        </div>

        <ElasticSlider
          value={volume * 100}
          leftIcon={<FontAwesomeIcon icon={faVolumeLow} />}
          rightIcon={<FontAwesomeIcon icon={faVolumeHigh} />}
          maxValue={100}
          isStepped
          stepSize={1}
          onChange={(val) => {
            setVolume(val / 100);

            if ("vibrate" in navigator) {
              navigator.vibrate(10);
            }
          }}
          className="mt-6 2xl:scale-125 2xl:mt-10"
        />
      </motion.div>
    </motion.div>
  );
};

export default FullPagePlayer;

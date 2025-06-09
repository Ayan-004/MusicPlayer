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
import { useEffect, useRef, useState } from "react";

const FullPagePlayer = () => {
  const {
    currentSong,
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
    setVolume
  } = useSong();

  // const [volume, setVolume] = useState(0.5);

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

  if (!showFullPlayer || !currentSong) return null;

  return (
    <div className="fixed top-0 w-full sm:w-auto md:left-[230px] right-0 bottom-0 md:rounded-l-4xl backdrop-blur-3xl text-black z-50 p-6 flex flex-col items-center justify-center overflow-hidden">
      <ElasticSlider
        value={volume * 100}
        leftIcon={<FontAwesomeIcon icon={faVolumeLow} />}
        rightIcon={<FontAwesomeIcon icon={faVolumeHigh} />}
        // startingValue={0}
        // defaultValue={volume}
        maxValue={100}
        isStepped
        stepSize={1}
        onChange={(val) => setVolume(val / 100)}
      />
      <button
        className="absolute top-10 right-10 text-4xl hover:cursor-pointer"
        onClick={() => setShowFullPlayer(false)}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>

      <div className="flex flex-col items-center justify-center mt-9 space-y-3">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-70 h-70 sm:w-50 sm:h-50 md:w-100 md:h-100 rounded-4xl shadow-2xl object-cover"
        />

        <h1 className="text-sm font-montserrat-medium">{currentSong.title}</h1>
        <p className="w-2xs text-center text-xs text-wrap font-montserrat-medium text-gray-500">
          {currentSong.artist}
        </p>

        <div className="flex space-x-6 mt-6 text-2xl">
          <button className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button
            onClick={togglePlay}
            className="text-gray-600 hover:text-black text-xl"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button className="text-gray-600 hover:text-black">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-montserrat-medium pr-3 text-gray-600">
            {formatTime(currentTime)}
          </p>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-56  md:w-5xl appearance-none rounded-full h-0.5 mt-1  bg-black accent-black cursor-pointer"
          />
          <p className="text-sm font-montserrat-medium pl-3 text-gray-600">
            {formatTime(duration)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullPagePlayer;

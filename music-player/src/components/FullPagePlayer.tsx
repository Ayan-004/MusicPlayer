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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    audioRef,
    volume,
    setVolume,
  } = useSong();

  const navigate = useNavigate();


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
    <div
      className={`fixed top-0 min-w-full lg:min-w-min lg:left-[230px] right-0 bottom-0 lg:rounded-l-4xl backdrop-blur-xl lg:backdrop-blur-2xl text-black z-50 p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${
        showFullPlayer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <button
        className="absolute top-10 right-10 text-3xl lg:text-4xl hover:cursor-pointer"
        onClick={() => {
          setShowFullPlayer(false);
          navigate("/");
        }}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>

      <div className="flex flex-col items-center justify-center mt-9 space-y-3">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-70 h-70 sm:w-50 sm:h-50 md:w-60 md:h-60 lg:w-80 lg:h-80 rounded-4xl shadow-2xl object-cover"
        />

        <h1 className="text-sm lg:text-xl text-center font-montserrat-medium">
          {currentSong.title}
        </h1>
        <p className="w-2xs text-center text-xs text-wrap font-montserrat-medium text-gray-700">
          {currentSong.artist}
        </p>

        <div className="flex items-center justify-between  mt-2">
          <p className="w-10 text-sm font-montserrat-medium pr-3 text-gray-700">
            {formatTime(currentTime)}
          </p>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar w-56 md:w-72 appearance-none rounded-full h-1 mt-1 cursor-grab"
            style={
              {
                "--progress": `${(currentTime / duration) * 100 || 0}%`,
              } as React.CSSProperties
            }
          />
          <p className="text-sm font-montserrat-medium pl-3 text-gray-700">
            {formatTime(duration)}
          </p>
        </div>

        <div className="flex mt-3 text-xl lg:text-2xl">
          <button className="text-gray-900 hover:text-black hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button
            onClick={togglePlay}
            style={{
              borderRadius: isPlaying ? "19px" : "50%",
              transition: "border-radius 0.3s ease-in-out",
            }}
            className="w-14 h-14 mx-10 flex items-center justify-center bg-black text-white hover:cursor-pointer"
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
        </div>

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
          className="mt-6"
        />
      </div>
    </div>
  );
};

export default FullPagePlayer;

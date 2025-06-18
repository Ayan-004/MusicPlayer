import { useSong } from "./context/SongContext";
import {
  faBackward,
  faPlay,
  faPause,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomPlayer = () => {
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
  } = useSong();

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  if (!currentSong || !currentSong?.url) return null;

  return (
    <div
      className={`fixed bottom-5 min-w-11/12 xl:mx-52 xl:left-52 xl:min-w-fit mx-4 md:left-0 md:mx-5 right-0 px-6 py-4 backdrop-blur-xl shadow-2xl border border-gray-300/50 rounded-3xl z-40 transition-all duration-500 ease-in-out ${
        showFullPlayer
          ? "opacity-0 translate-y-5 blur-sm scale-95 pointer-events-none"
          : "opacity-100 translate-y-0 blur-0 scale-100"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setShowFullPlayer(true)}
            className="flex items-center gap-4 md:gap-1"
          >
            {currentSong.image && (
              <img
                src={currentSong.image}
                alt={currentSong.title}
                className="w-12 h-12 rounded-md object-cover"
              />
            )}
            <div className="xs w-[130px] md:w-auto mr-2">
              {/* {Mobile marquee} */}
              <div className="block md:hidden">
                <div className="marquee font-calsans mr-2 text-sm">
                  <span>{currentSong.title}</span>
                </div>
                <div className="marquee text-xs font-calsans mr-2 text-gray-700">
                  <span>{currentSong.artist}</span>
                </div>
              </div>
            </div>

            {/* {Desktop: Static Text} */}
            <div className="hidden md:block hover:cursor-pointer">
              <p className="marquee font-montserrat-medium text-sm">
                {currentSong.title}
              </p>
              <p className="marquee text-xs font-montserrat-medium text-gray-700">
                {currentSong.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 md:pr-4">
            <button className="text-gray-900 hover:text-black cursor-pointer text-xl">
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button
              onClick={togglePlay}
              className="w-5 text-gray-900 hover:text-black cursor-pointer text-xl"
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button className="text-gray-900 hover:text-black cursor-pointer text-xl">
              <FontAwesomeIcon icon={faForward} />
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

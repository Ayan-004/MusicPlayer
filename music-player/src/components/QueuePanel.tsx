import { Song, useSong } from "./context/SongContext";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { CircleMinus } from "lucide-react";

interface Props {
  onClose: () => void;
}

const QueuePanel = ({ onClose }: Props) => {
  const { queue, removeFromQueue, setCurrentSong, setIsPlaying, clearQueue } =
    useSong();

  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    onClose();
  };

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    removeFromQueue(index);
  };

  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      exit={{ translateX: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed right-0 top-0 h-full w-[90%] md:w-[400px] backdrop-blur-md xl:backdrop-blur-lg z-[100] rounded-l-4xl border-l border-gray-300 p-5 overflow-y-auto"
    >
      <div className="flex justify-between item-center mb-7">
        <button
          onClick={clearQueue}
          className="text-xs bg-white/35 p-3 rounded-full font-montserrat-medium hover:cursor-pointer"
        >
          Clear All
        </button>
        <h2 className="text-3xl font-calsans mr-6">Queue</h2>
        <button
          aria-label="Close queue panel"
          onClick={onClose}
          className="text-3xl xl:text-4xl hover:cursor-pointer"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      </div>

      {queue.length === 0 ? (
        <p className="text-gray-500 font-montserrat-medium">
          No songs in queue
        </p>
      ) : (
        <div className="flex flex-col gap-2 rounded-4xl m-3 md:m-6 mb-56 md:pb-24">
          {queue.map((song, index) => (
            <div
              key={song.url}
              className="flex items-center justify-between gap-4 cursor-pointer bg-white/35 p-3 rounded-2xl hover:scale-105 hover:bg-white/50 transition"
              onClick={() => handleSongClick(song)}
            >
              <div className="flex items-center gap-3 ">
                <img
                  src={song.image}
                  alt={`$Cover art for {song.title} by ${song.artist}`}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="w-36">
                  <p className="font-montserrat-medium text-sm truncate">
                    {song.title}
                  </p>
                  <p className="font-montserrat-medium text-xs truncate text-gray-500">
                    {song.artist}
                  </p>
                </div>
              </div>
              <button
                aria-label={`Remove ${song.title} from queue`}
                onClick={(e) => handleRemove(e, index)}
                className="text-xl cursor-pointer"
              >
                <CircleMinus />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default QueuePanel;

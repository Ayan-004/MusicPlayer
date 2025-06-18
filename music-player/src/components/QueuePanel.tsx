import { useSong } from "./context/SongContext";
import { faCircleXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

interface Props {
    onClose: () => void;
}

const QueuePanel = ({ onClose }: Props) => {
    const { queue, removeFromQueue, setCurrentSong, setIsPlaying, clearQueue } = useSong();

    return (
        <motion.div
        initial={{ translateX: "100%"}}
        animate={{ translateX: 0 }}
        exit={{ translateX: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed right-0 top-0 h-full w-[90%] md:w-[400px] backdrop-blur-md xl:backdrop-blur-lg z-[100] rounded-l-4xl border-l border-gray-300 p-5 overflow-y-auto"
        >
            <div className="flex justify-between item-center mb-7">
                <button onClick={clearQueue} className="text-xs bg-white/35 p-3 rounded-full font-montserrat-medium hover:cursor-pointer">
                    Clear All
                </button>
                <h2 className="text-3xl font-calsans mr-6">Queue</h2>
                <button onClick={onClose} className="text-3xl xl:text-4xl hover:cursor-pointer">
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div>

            {queue.length === 0 ? (
                <p className="text-gray-500 font-montserrat-medium">No songs in queue</p>
            ) : (
                <div className="flex flex-col gap-2 rounded-4xl m-3 md:m-6 mb-56 md:pb-24">
                    {queue.map((song, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-4 cursor-pointer bg-white/35 p-3 rounded-2xl hover:scale-105 transition"
                            onClick={() => {
                                setCurrentSong(song);
                                setIsPlaying(true);
                                onClose();
                            }}
                        >
                            <div className="flex items-center gap-3 ">
                                <img src={song.image} alt={song.title} className="w-12 h-12 rounded-full object-cover"/>
                                <div className="w-36">
                                    <p className="font-montserrat-medium text-sm truncate">{song.title}</p>
                                    <p className="font-montserrat-medium text-xs truncate text-gray-500">{song.artist}</p>
                                </div>
                            </div>
                            <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFromQueue(index);
                            }}
                            className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}

export default QueuePanel;
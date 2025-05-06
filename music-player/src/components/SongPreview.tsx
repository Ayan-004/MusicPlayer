import {useState, useEffect, useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { Navigation } from "swiper/modules";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

function SongPreview() {
    const [track, setTrack] = useState<any[]>([]);
    const [isMuted, setIsMuted] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<any>(null);
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
    const artists = ['arijit singh', 'atif aslam', 'the weeknd','shreya ghoshal', 'bruno mars', 'ed sheeran']

    useEffect(() => {
    const fetchTracks = async () => {
        try {
            const response = await axios.get('/api/rss/in/rss/topsongs/limit=10/json')
            const entries = response.data.feed.entry;
            const parasedSongs = entries.map((entry: any) => ({
                trackName: entry["im:name"]?.label || "Unknown Title",
                artistName: entry["im:artist"]?.label || "Unknown artist",
                artworkUrl100: entry["im:image"]?.[2].label || entry ["im:image"]?.[0]?.label || "",
                previewUrl: entry.link?.find((link: any) => link?.attributes?.type === "audio/x-m4a")?.attributes?.href || "",
            }));
            setTrack(parasedSongs)
            console.log(parasedSongs);
            
        } catch (error) {
            console.error('Error fetching tracks',error);
        }
    };
        fetchTracks();
    }, []);

    const handleMuteToggle = () => {
    setIsMuted((prev) => {
        const newMutedState = !prev;

        const currentAudio = audioRefs.current[activeIndex];

        if (currentAudio) {
            currentAudio.muted = newMutedState;
        }

        if (!newMutedState) {
            audioRefs.current.forEach((audio, index) => {
                if (audio && index !== activeIndex) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });

            currentAudio?.play().catch((err) =>
                console.error('Error playing audio:', err)
            );
        } else {
            currentAudio?.pause();
        }

        return newMutedState;
    });
    };

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);

        audioRefs.current.forEach((audio) => {
            if(audio){
                audio.pause();
                audio.currentTime = 0;
            }
        });

        const currentAudio = audioRefs.current[swiper.activeIndex];
        if (currentAudio) {
            currentAudio.muted = isMuted;

            if(!isMuted){
                currentAudio.play().catch((err) =>
                    console.error('Error playing audio:', err)
                );
            }
            
        }

    }



    return (
    <div className="song-item w-96 bg-[#efefef] p-6 rounded-4xl">
        <h2 className="text-2xl font-calsans mb-4">Top Tracks</h2>

        <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        className="w-full max-w-md"

        onSwiper={(swiper) => {
            swiperRef.current = swiper;
        }}

        onSlideChange={handleSlideChange}
        >
                {track.map((items, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col items-center">      
                            <img 
                            src={items['im:image'][2].label} 
                            alt={items['im:name'].label}  
                            className="w-36 h-36 rounded-4xl "
                            />                      
                            <p className="font-montserrat-medium text-xs pt-5">{items['im:name'].label}</p>

                            <p className="font-montserrat-medium text-xs text-[#979797] pt-1">{items['im:artist'].label}</p>

                            {items.previewUrl ? (
                                <div className="relative">
                                <audio 
                                    controls
                                    ref={(el) => {audioRefs.current[index] = el}}
                                    muted={isMuted}
                                    src={items.previewUrl} className="w-full mt-2">
                                </audio>
                                <button
                                onClick={handleMuteToggle}
                                className="absolute top-3 -right-4 bg-[#cbcbcb] rounded-full p-2 text-xs hover:cursor-pointer"
                                >
                                   <FontAwesomeIcon icon= {isMuted ? faVolumeMute : faVolumeHigh}/>
                                </button>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500">No preview available</p>
                            )}
                    </div>

                    </SwiperSlide> 
                ))}
            </Swiper>
        </div>
    )
}

export default SongPreview;
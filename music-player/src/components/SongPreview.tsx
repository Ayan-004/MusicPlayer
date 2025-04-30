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
            const response = await Promise.all(
                artists.map(artist => 
                    axios.get('https://thingproxy.freeboard.io/fetch/https://itunes.apple.com/search',{
                        params: {
                            term: artist,
                            media: 'music',
                            limit: 5,
                            entity: 'song'
                        }
                    })
                )
            );

            const combinedResults = response.flatMap(res => res.data.results)
            setTrack(combinedResults);
            console.log(combinedResults);
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
    <div className="song-item w-96 bg-gray-200 p-6 rounded-4xl">
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
                            <img src={items.artworkUrl100} alt={items.trackName}  
                            className="w-36 h-36 rounded-4xl "
                            />                      
                            <p className="font-montserrat-medium text-xs pt-5">{items.trackName} - {items.artistName}</p>
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
                                className="absolute top-2 -right-3 bg-gray-300 rounded-full p-2 text-xs hover:cursor-pointer"
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
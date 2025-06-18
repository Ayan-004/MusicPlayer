import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

function SongPreview() {
  const [track, setTrack] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<any>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const artistRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [overflowingTitles, setOverflowingTitles] = useState<boolean[]>([]);
  const [overflowingArtists, setOverflowingArtists] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          "https://itunes.apple.com/in/rss/topsongs/limit=10/json"
        );
        const entries = response.data.feed.entry;
        const parsedSongs = entries.map((entry: any) => ({
          trackName: entry["im:name"]?.label || "Unknown Title",
          artistName: entry["im:artist"]?.label || "Unknown artist",
          artworkUrl100: (
            entry["im:image"]?.[2]?.label ||
            entry["im:image"]?.[0]?.label ||
            ""
          ).replace(/\/\d+x\d+bb/, "/500x500bb"),
          previewUrl:
            entry.link?.find(
              (link: any) => link?.attributes?.type === "audio/x-m4a"
            )?.attributes?.href || "",
        }));
        setTrack(parsedSongs);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tracks", error);
      }
    };
    fetchTracks();
  }, []);

  useEffect(() => {
    if (track.length === 0) return;

    const newOverflowingTitles = titleRefs.current.map((el) =>
      el ? el.scrollWidth > el.clientWidth : false
    );
    const newOverflowingArtists = artistRefs.current.map((el) =>
      el ? el.scrollWidth > el.clientWidth : false
    );

    setOverflowingTitles(newOverflowingTitles);
    setOverflowingArtists(newOverflowingArtists);
  }, [track]);

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

        currentAudio
          ?.play()
          .catch((err) => console.error("Error playing audio:", err));
      } else {
        currentAudio?.pause();
      }

      return newMutedState;
    });
  };

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);

    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    const currentAudio = audioRefs.current[swiper.activeIndex];
    if (currentAudio) {
      currentAudio.muted = isMuted;

      if (!isMuted) {
        currentAudio
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      }
    }
  };

  return (
    <div className="song-item min-h-auto xl:h-11/12 xl:mt-10 xl:ml-3 md:w-2xl md:mt-5 md:ml-7 lg:w-full lg:-ml-1 lg:max-w-sm bg-[#efefef] p-6 rounded-4xl">
      <h2 className="text-2xl md:text-2xl lg:text-3xl font-calsans mb-4">
        Top Tracks
      </h2>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-60 gap-3">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
        </div>
        <p className="text-gray-600 font-montserrat-medium ml-3">Loading...</p>
      </div>
      ) : (
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
                  src={items.artworkUrl100}
                  alt={items.trackName}
                  className="w-40 h-40 md:w-52 md:h-52 lg:w-44 lg:h-44 rounded-4xl shadow-2xl shadow-gray-700"
                  onError={(e) => {
                    e.currentTarget.src = "path/to/fallback-image.jpg";
                  }}
                />
                <div
                    ref={(el) => {
                        (titleRefs.current[index] = el)
                    }}
                    className={`w-40 text-xs pt-5 font-montserrat-medium text-center truncate ${ overflowingTitles[index] ? 'marquee fade-marquee' : '' }`}
                >
                    {overflowingTitles[index] ? <span>{items.trackName}</span> : items.trackName}
                </div>

                <div
                    ref={(el) => {
                        (artistRefs.current[index] = el)
                    }}
                    className={`w-40 text-xs pt-1 text-[#979797] font-montserrat-medium text-center truncate ${ overflowingArtists[index] ? 'marquee fade-marquee' : '' }`}
                >
                    {overflowingArtists[index] ? <span>{items.artistName}</span> : items.artistName}
                </div>

                {items.previewUrl ? (
                  <div className="relative">
                    <audio
                      controls
                      ref={(el) => {
                        audioRefs.current[index] = el;
                      }}
                      muted={isMuted}
                      src={items.previewUrl}
                      className="w-full mt-2"
                    ></audio>
                    <button
                      onClick={handleMuteToggle}
                      className="absolute w-10 top-3 text-center -right-5 bg-[#cbcbcb] rounded-full p-3 text-xs  hover:cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={isMuted ? faVolumeMute : faVolumeHigh}
                        className=""
                      />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No preview available</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default SongPreview;

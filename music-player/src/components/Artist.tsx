import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

interface ArtistProps {
    name: string;
    image: string;
}

function Artist() {
    const [artists, setArtists] = useState<ArtistProps[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    }

    useEffect(() => {
        fetch("https://saavn.dev/api/search/artists?query=topartist")
            .then(res => res.json())
            .then(data => {
                const results = data?.data?.results || [];

                const artistsData = results.map((artist: any) => ({
                    name: artist.name,
                    image: artist.image?.[1]?.url || "",
                }))
                setArtists(artistsData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="relative">
            {/* LeftScroll buttons */}
            <button
                onClick={scrollLeft}
                className="absolute top-36 left-3 transform -translate-y-1/2 backdrop-blur-lg rounded-full p-2 hover:shadow-lg transition-all cursor-pointer z-10">
                    <ChevronLeft />
            </button>

            <h2 className="font-calsans ml-12 text-3xl">Top Artist</h2>

        <div 
        ref={scrollRef}
        className="custom-scrollbar whitespace-nowrap flex overflow-x-auto gap-3 p-4 pl-12 pr-12">
            {artists.map((artist, index) => (
                <div
                    key={index}
                    className="min-w-[150px] rounded-2xl p-3 flex-shrink-0 flex flex-col items-center" 
                >

                    <img 
                        src={artist.image}
                        alt={artist.name} 
                        className="w-40 h-40 object-cover rounded-full mx-auto mb-3 shadow-lg shadow-gray-300 hover:cursor-pointer hover:mb-1 transition-all duration-300 ease-in-out"/>

                    <h2 className="text-lg font-montserrat-medium text-center text-gray-800">{artist.name}</h2>
                </div>
            ))}

        </div>


        {/* RightScroll buttons */}
        <button
            className="absolute top-36 right-3 transform -translate-y-1/2 backdrop-blur-lg rounded-full p-2 hover:shadow-lg cursor-pointer z-10"
            onClick={scrollRight}>
                <ChevronRight />
        </button>
        </div>

    );
};

export default Artist;
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";

// interface CardItem {
//     name: string;
//     image: string;
// }

interface CardSliderProps {
    title?: string;
    items?: any[];
    artists?: any[];
    loading?: boolean;
}

function CardSlider({ title, items = [], artists = [], loading=false }: CardSliderProps) {
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-60">
                <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-black"></div>
                <p className="ml-4 text-gray-600">Loading...</p>
            </div>
        );
    }

    if(!loading && artists.length === 0 && items.length === 0) {
        return (
            <div className="font-montserrat-medium text-center py-10 text-gray-500">
                No data found. Please try again later.
            </div>
        )
    }

    

    return (
        <div className="relative">
            {/* LeftScroll buttons */}
            <button
                onClick={scrollLeft}
                className="hidden xl:block absolute top-44 left-3 transform -translate-y-1/2 backdrop-blur-lg rounded-full p-2 hover:shadow-lg transition-all cursor-pointer z-10">
                    <ChevronLeft />
            </button>

            <h2 className="font-calsans ml-7 md:ml-12 mt-10 md:mt-0 text-2xl md:text-3xl">{title}</h2>

        <div 
        ref={scrollRef}
        className="custom-scrollbar whitespace-nowrap flex overflow-x-auto md:gap-3 p-1 md:p-4 pl-3 md:pl-12 pr-1 md:pr-12">
            {(artists.length > 0 ? artists : items).map((items: any, index: number) => (
                <div
                    key={index}
                    className="min-w-[150px] rounded-2xl p-3 flex-shrink-0 flex flex-col items-center" 
                >
                    <Link to={`/artist/${items.name}`} state={{ artistImage: items.image, isGlobal: items.isGlobal }} className="block">
                    <div className="card">
                    <img 
                        src={items.image}
                        alt={items.name} 
                        className="w-32 h-32 md:w-50 md:h-50 object-cover rounded-full mx-auto mb-3 shadow-lg shadow-gray-300 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                        />

                    <h2 className="truncate max-w-[120px] ml-2 md:ml-10 text-md md:text-lg font-montserrat-medium text-center text-black">{items.name}</h2>
                    </div>
                    </Link>
                </div>
            ))}

        </div>


        {/* RightScroll buttons */}
        <button
            className="hidden xl:block absolute top-44 right-3 transform -translate-y-1/2 backdrop-blur-lg rounded-full p-2 hover:shadow-lg cursor-pointer z-10"
            onClick={scrollRight}>
                <ChevronRight />
        </button>
        </div>

    );
};

export default CardSlider;
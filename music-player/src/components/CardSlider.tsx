import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";

interface CardItem {
    name: string;
    image: string;
}

interface CardSliderProps {
    title: string;
    items: CardItem[];
}

function CardSlider({ title, items }: CardSliderProps) {
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

    return (
        <div className="relative">
            {/* LeftScroll buttons */}
            <button
                onClick={scrollLeft}
                className="absolute top-36 left-3 transform -translate-y-1/2 backdrop-blur-lg rounded-full p-2 hover:shadow-lg transition-all cursor-pointer z-10">
                    <ChevronLeft />
            </button>

            <h2 className="font-calsans ml-12 text-3xl">{title}</h2>

        <div 
        ref={scrollRef}
        className="custom-scrollbar whitespace-nowrap flex overflow-x-auto gap-3 p-4 pl-12 pr-12">
            {items.map((items: any, index: number) => (
                <div
                    key={index}
                    className="min-w-[150px] rounded-2xl p-3 flex-shrink-0 flex flex-col items-center" 
                >
                    <Link key={index} to={`/artist/${items.name}`} className="block">
                    <div className="card">
                    <img 
                        src={items.image}
                        alt={items.name} 
                        className="w-40 h-40 object-cover rounded-full mx-auto mb-3 shadow-lg shadow-gray-300 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"/>

                    <h2 className="text-lg font-montserrat-medium text-center text-black">{items.name}</h2>
                    </div>
                    </Link>
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

export default CardSlider;
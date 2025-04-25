import { useEffect, useState } from "react";

interface Image {
    ['#text']: string;
    size: string;
}

interface ArtistProps {
    name: string;
    image: Image[];
}

function Artist() {
    const [artists, setArtist] = useState<ArtistProps[]>([]);

    const getValidImage = (images: Image[]) => {
        const image = images.find((img) => img['#text'].trim() !== '');
        return image ? image['#text'] : '/fallback.jpg'; // Fallback image if none found
    }

    useEffect(() => {
        fetch("https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=029f1ee4792d347d613adcabd9b949d8&format=json")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setArtist(data?.topartists?.artist || []);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="grid grid-col-2 sm:grid-col-3 md:grid-col-4 gap-6 p-6">
            {artists.map((artist, index) => (
                <div
                    key={index}
                    className="bg-white rounded-3xl shadow-lg p-4 flex flex-col items-center"    
                >

                    <img 
                        src={getValidImage(artist.image)}
                        alt={artist.name} 
                        className="w-32 h-32 object-cover rounded-xl mx-auto mb-3"/>

                    <h2 className="text-lg font-semibold text-center text-gray-800">{artist.name}</h2>
                </div>
            ))}

        </div>
    );
};


export default Artist;
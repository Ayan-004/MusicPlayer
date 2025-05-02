import { useEffect, useState } from "react"
import CardSlider from "../components/CardSlider"
import Banner from "../components/Banner"
import SongPreview from "../components/SongPreview"
import NavBar from "../components/NavBar";

function Home() {

  const [artists, setArtists] = useState([]);
  const [album, setAlbum] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://saavn.dev/api/search/artists?query=topartist")
        .then(res => res.json())
        .then(data => {
            const results = data?.data?.results || [];

            const formatted = results.map((artist: any) => ({
                name: artist.name,
                image: artist.image?.[2]?.url || "",
            }))
            setArtists(formatted);
        })
        .catch((error) => console.error("Error fetching data:", error));
}, []);

useEffect(() => {
  fetch("https://saavn.dev/api/search/albums?query=hindi+punjabi+albums")
    .then((res) => res.json())
    .then((data) => {
      
      const entries = data?.data?.results || [];

      const formatted = entries.map((album: any) => ({
        name: album.name,
        image: album.image?.[2]?.url || "",
      }));

      setAlbum(formatted);
    })
}, []);

return (
    <>
    <div className="flex item-start justify-between gap-8">
        <div className="w-1/2">
            <Banner />
        </div>

        <div className="pt-11 pr-7">    
            <SongPreview />
        </div>
        </div>

        <CardSlider title="Top Artist" items={artists}/>
        <CardSlider title="Top Albums" items={album}/>
    </>
  );

};

export default Home

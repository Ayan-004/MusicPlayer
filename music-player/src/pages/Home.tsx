import { useEffect, useState } from "react"
import CardSlider from "../components/CardSlider"
import Banner from "../components/Banner"
import SongPreview from "../components/SongPreview"
import Footer from "../components/Footer"

interface Artist {
  name: string,
  image: string
}

function Home() {

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalArtist, setGlobalArtist] = useState<Artist[]>([]);
  const [loadingGlobal, setLoadingGlobal] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://saavn.dev/api/search/artists?query=topartist")
        .then((res) => {
          if(!res.ok) {
            throw new Error("Failed to fetch artists");
          }
          return res.json();
        })
        .then(data => {
            const results = data?.data?.results || [];

            const formatted = results.map((artist: any) => ({
                name: artist.name,
                image: artist.image?.[2]?.url || "",
            }))
            setArtists(formatted);
            setLoading(false);

          })
            .catch((error) => {
              console.error("Error fetching data:", error);
              setLoading(false);
              setArtists([]);
            })
        }, []);
        

useEffect(() => {
  setLoadingGlobal(true);

  fetch("https://itunes.apple.com/rss/topsongs/limit=10/json")
    .then((res) => res.json())
    .then((data) => {
      const entries = data.feed.entry || [];
      const artistMap:Record<string, { name: string; image: string }> = {};

      entries.forEach((entry: any) => {
        const name = entry["im:artist"]?.label;
        const imageArr = entry["im:image"];
        const image = imageArr?.[imageArr.length - 1]?.label || "";

        if(name && !artistMap[name]) {
          artistMap[name] = { name, image };
        }
      });

      setGlobalArtist(Object.values(artistMap))
      setLoadingGlobal(false)
      })
      .catch((error) => {
        console.error("Error fetching global artist", error)
        setGlobalArtist([]);
        setLoadingGlobal(false);
    });
}, []);

return (
    <>
    <div className="flex flex-col lg:flex-row item-start gap-6 m-6">
        <div className="w-full lg:w-2/3">
            <Banner />
        </div>

        <div className="w-full lg:w-1/3">    
            <SongPreview />
        </div>
        </div>

        <CardSlider title="Top Artist" items={artists} loading={loading}/>
        <CardSlider title="Top Global Artist" artists={globalArtist} loading={loadingGlobal}/>

        <div>
          <Footer/>
        </div>
        
    </>
  );

};

export default Home
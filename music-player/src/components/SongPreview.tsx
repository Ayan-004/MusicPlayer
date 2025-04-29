import React, {useState, useEffect} from "react";
import axios from "axios";

function SongPreview() {
    const [track, setTrack] = useState([]);

    const fetchTrack = async () => {
        const option = {
            method : 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q: 'arijit singh',
                type: 'tracks',
                offset: '0',
                limit: '10',
                numberOfTopResults: '5'
            },
            
            headers: {
                'X-RapidAPI-Key': '354fee5300msh9b6302e47722025p19b35bjsnd8d1b6982d8d',
                'X-RapidAPI-Host' : 'spotify23.p.rapidapi.com'
            },
        };

        try {
            const response = await axios.request(option);        
            const trackItems = response.data.tracks.items;
            setTrack(trackItems);
        } catch (error) {
            console.error('Error fetching tracks:',error);
        }
    };

    useEffect(() => {
        fetchTrack();
    }, []);

    return (
        <div>
            <h2>Track Previews</h2>
            {track.map((item, index) => {
                const track = item.data;
                return (
                    <div key={index}>
                        <p>{track.name} - {track.artists.items.map((a: { profile: { name: any; }; }) => a.profile.name).join(', ')}</p>
                        {track.preview_url ? (
                            <audio controls src="{track.preview_url}"></audio>
                        ) : (
                            <p>No preview available</p>
                        )
                    }
                    </div>
                )
            })}
        </div>
    )
}

export default SongPreview;
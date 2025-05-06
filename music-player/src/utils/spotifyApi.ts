import axios from "axios";

export async function fetchPlaylistWithPreviews(playlistId: string, accesstoken: string) {

    try {
    const spotifyResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {

        headers: {
            Authorization: `Bearer ${accesstoken}`,

        },
    }
);    

    const spotifyTracks = spotifyResponse.data.items;

    const previewdTracks = await Promise.all (
        spotifyTracks.map(async(item: any) => {
            const name = item.track.name;
            const artist = item.track.artist?.[0]?.name;

            const iTunesUrl =`/api/itunes/search?term=${encodeURIComponent(`${artist} ${name}`)}&media=music&limit=1&entity=song`

            try {
                const iTunesResponse = await axios.get(iTunesUrl);
                const iTunesTracks = iTunesResponse.data.results?.[0];

                return {
                    name,
                    artist,
                    image: item.track.album.images?.[0]?.url || "",
                    previewUrl: iTunesTracks?.previewUrl || null,
                };
            } catch {
                return {
                    name,
                    artist,
                    image: item.track.album.images?.[0]?.url || "",
                    previewUrl: null
                }
            }
        })
    );

    return previewdTracks;
} catch(error) {
    console.log("Error fetching playlist with previews", error);
    return[];
 }
}
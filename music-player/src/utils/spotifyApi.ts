const TOP_50_GLOBAL_PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M"

export async function getTopGlobalPlaylistTracks(token: any) {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${TOP_50_GLOBAL_PLAYLIST_ID}/tracks?limit=10`, {

        headers: { Authorization: `Bearer ${token}` },
    
        }
    );
    const data = await res.json();
    return data.items;
}

export function extractUniqueArtist(tracks: any[]) {
    const artistMap: { [key: string]: string } = {};
    tracks.forEach(item => {
        item.track.artists.forEach((artist: { id: string | number; name: any; }) => {
            artistMap[artist.id] = artist.name
        })
    })

    return Object.entries(artistMap).map(([id, name]) => ({id, name}));
}

export async function getArtistDetailToken(token: any, artistIds: any[]) {
    const ids = artistIds.slice(0, 20).join(",")
    const res = await fetch (
        `https://api.spotify.com/v1/artists?ids=${ids}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    const data = await res.json();
    return data.artist.map((artist: { name: any; image: any; }) => ({
        name: artist.name,
        image: artist.image[0]?.url || "",
    }));
}
function base64(clientId: string, clientSecret: string): string {
    return btoa(`${clientId}:${clientSecret}`)
}

export async function getSpotifyToken() {

    try {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);

    const authString = base64(clientId, clientSecret)

    
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${authString}`,
        },
        body: "grant_type=client_credentials",
    });
    
    const data = await res.json();
    console.log("Spotify Token Response", data);
    return data.access_token;
    } catch (err) {
        console.error("Error in getSpotifyToken", err)
        throw err;
    }
}

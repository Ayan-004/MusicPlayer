export async function getSpotifyToken() {
    const clientId = "23eec544a4ab47dea456fc3b4ff50ee1"
    const clientSecret = "28e2733c0ae34619b6ac799a21b15520"

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: "grant_type=client_credentials",
    });
    
    const data = await response.json();
    
    return data.access_token;
}
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import ArtistProfile from "../pages/ArtistProfile";
import SearchResults from "../components/SearchResults";
import Playlists from "../pages/Playlists";
import PlaylistsDetail from "../pages/PlaylistsDetail";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="/artist/:artistName" element={<ArtistProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:name" element={<PlaylistsDetail />} />
      </Route>
    </Routes>
  );
};

export default AllRoute;

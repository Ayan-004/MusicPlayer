import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import ArtistProfile from "./pages/ArtistProfile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/artist/:artistName" element={<ArtistProfile />} />
      </Route>
    </Routes>
  )
}

export default App


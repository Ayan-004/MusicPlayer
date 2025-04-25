import Banner from "./components/Banner"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"

function App() {

  return (
    <div className="flex h-screen">
      <div className="w-[220px]">
      <SideBar />
      </div>

      <div className="absolute top-0 left-[260px] w-[calc(100%-260px)] h-full bg-white rounded-l-4xl z-10">
      
      {/* NavBar */}
      <div className="flex-1 z-10">
      <NavBar />
      </div>

      <div>
        <Banner />
      </div>
      </div>

    </div>
  )
}

export default App

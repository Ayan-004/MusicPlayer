import Artist from "./components/Artist"
import Banner from "./components/Banner"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import SongPreview from "./components/SongPreview"

function App() {

  return (
    <div className="flex w-full h-screen">
      <div className="w-[220px]">
      <SideBar />
      </div>

      <div className="absolute top-0 left-[260px] w-[calc(100%-260px)] h-full bg-white rounded-l-4xl z-10">
        <div className="h-full overflow-y-auto">

        {/* NavBar */}
          <div className="flex-1 z-10">
            <NavBar />
          </div>

          <div className="flex item-start justify-between gap-8">
            <div className="w-1/2">
              <Banner />
            </div>

            <div className="pt-11 pr-7">
              <SongPreview />
            </div>
          </div>


          <div className="z-0">
            <Artist />
          </div>

        </div>
      
      
    </div>

    </div>
  )
}

export default App

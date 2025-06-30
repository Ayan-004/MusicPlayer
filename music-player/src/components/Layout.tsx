import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import BottomPlayer from "./BottomPlayer";
import { Menu } from "lucide-react";
import FullPagePlayer from "./FullPagePlayer";
import QueuePanel from "./QueuePanel";
import { useSong } from "./context/SongContext";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1440);
  const { showFullPlayer, setShowFullPlayer } = useSong();
  const [showQueue, setShowQueue] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setShowFullPlayer(searchParams.get("player") === "open");
  }, [searchParams, setShowFullPlayer])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1440) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openFullPlayer = () => {
    setSearchParams({player: "open"})
  };

  const closeFullPlayer = () => {
    setSearchParams({});
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 xl:z-30 transition-transform duration-300 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        } w-[230px] xl:translate-x-0 xl:static xl:block`}
      >
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div
        className={`flex flex-col flex-1 bg-white shadow-2xl xl:rounded-l-4xl overflow-hidden z-30 transition-all`}
      >
        <div className="flex-1 relative overflow-y-auto">
          {collapsed && !showFullPlayer && (
            <button
            aria-label="Open sidebar"
              className="absolute top-6 left-4 md:left-11 z-50 text-2xl xl:hidden p-2 "
              onClick={() => setCollapsed(false)}
            >
              <Menu size={30}/>
            </button>
          )}
          <NavBar />
          <Outlet />
          <BottomPlayer onOpenFullPlayer={openFullPlayer} />
          <AnimatePresence mode="wait">
            {showFullPlayer && (
              <FullPagePlayer
                showQueue={showQueue}
                setShowQueue={setShowQueue}
                onClose={closeFullPlayer}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showQueue && (
                <QueuePanel onClose={() => setShowQueue(false)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import BottomPlayer from "./BottomPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import FullPagePlayer from "./FullPagePlayer";
import QueuePanel from "./QueuePanel";
import { useSong } from "./context/SongContext";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1440);
  const { showFullPlayer } = useSong();
  const [showQueue, setShowQueue] = useState(false);

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
        className={`flex flex-col flex-1 bg-white shadow-2xl xl:rounded-l-4xl overflow-hidden xl:opacity-100 z-30 transition-all`}
      >
        <div className="flex-1 relative overflow-y-auto">
          {collapsed && !showFullPlayer && (
            <button
              className="absolute top-6 left-4 md:left-11 z-50 text-2xl xl:hidden p-2 "
              onClick={() => setCollapsed(false)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}
          <NavBar />
          <Outlet />
          <BottomPlayer />
          {showFullPlayer && (
            <FullPagePlayer showQueue={showQueue} setShowQueue={setShowQueue} />
          )}

          <AnimatePresence>
            {showQueue && (
              <div>
                <QueuePanel onClose={() => setShowQueue(false)} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import BottomPlayer from "./BottomPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import FullPagePlayer from "./FullPagePlayer";
import { useSong } from "./context/SongContext";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const { showFullPlayer } = useSong();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => 
      window.removeEventListener("resize", handleResize)
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 lg:z-30 transition-transform duration-300 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        } w-[230px] lg:translate-x-0 lg:static lg:block`}
      >
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div
        className={`flex flex-col flex-1 bg-white shadow-2xl lg:rounded-l-4xl overflow-hidden lg:opacity-100 z-30 transition-all`}
      >
        <div className="flex-1 relative overflow-y-auto">
          {collapsed && (
            <button
              className="absolute top-6 left-4 md:left-11 z-50 text-2xl lg:hidden p-2 "
              onClick={() => setCollapsed(false)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}
          <NavBar />
          <Outlet />
          <BottomPlayer />
          {showFullPlayer && <FullPagePlayer />}
        </div>
      </div>
    </div>
  );
};

export default Layout;

{
  /* <div className={`transition-all duration-500 ease-in-out ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}></div> */
}

// sm:hidden fixed top-0 left-0 w-full bg-[#b4b4b4] flex items-center justify-between p-4 shadow-md z-50

{
  /* <div className="flex flex-col flex-1 bg-white shadow-2xl rounded-l-4xl overflow-hidden z-40"></div> */
}

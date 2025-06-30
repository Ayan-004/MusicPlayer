import logo from "../assets/logo.png";
import {
  Home,
  List,
  Music,
  Settings,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

type SideBarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

function SideBar({ collapsed, setCollapsed }: SideBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-full bg-gray-00 rounded-r-4xl xl:rounded-r-none border border-gray-300/50 backdrop-blur-xl xl:backdrop-blur-none xl:bg-gray-300 text-black pt-4 shadow-xl w-64 transition-all ease-in-out duration-500 xl:static xl:translate-x-0  ${
        collapsed ? "-translate-x-full xl:translate-x-0" : "translate-x-0"
      }`}
    >
      <div className="font-calsans">
        <div className="flex items-center pl-3 md:pl-3">
          <img src={logo} alt="Logo" className="w-14 h-14 rounded-md" />
          <h2 className="sidebar-title text-5xl font-bold">
            <span
              className={`hidden sm:inline ${collapsed ? "hidden" : "inline"}`}
            >
              Audizi
            </span>
          </h2>
        </div>
        <div className="absolute top-8 right-4 xl:hidden">
          <button onClick={() => setCollapsed(true)}>
            <X size={24}/>
          </button>
        </div>
        <ul className="sidebar-menu pt-12 pl-6 md:pl-6 text-2xl font-montserrat-medium text-[#464646]">
          <Link to="/home"
            className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3"
          >
            <Home size={20}/>
            <span>Home</span>
          </Link>
          <Link to="/playlists" className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3">
            <List size={20}/>
            <span>Playlists</span>
          </Link>
          <li className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3">
            <Music size={20} />
            <span>Radio</span>
          </li>
          <li className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3">
            <Settings size={20}/>
            <span>Settings</span>
          </li>
        </ul>

        <ul className="sidebar-menu pt-5 pl-6 md:pl-6 font-montserrat-medium text-2xl text-[#464646]">
          <li className="menu-item flex items-center hover:backdrop-blur-md gap-2 hover:bg-[#3d3b3b] hover:text-[#cdd084] transition-all rounded-full w-40 cursor-pointer hover:shadow-lg p-3">
            <LogIn size={20}/>
            <span>Login</span>
          </li>

          <li className="menu-item flex items-center hover:backdrop-blur-md gap-2 hover:bg-[#3d3b3b] hover:text-[#cdd084] transition-all rounded-full w-40 cursor-pointer hover:shadow-lg p-3">
            <UserPlus size={20}/>
            <span>Sign Up</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

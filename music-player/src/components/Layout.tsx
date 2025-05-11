import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import BottomPlayer from "./BottomPlayer";

const Layout = () => {
    return (
        <div className="flex w-full h-full">
            <div className="w-[220px]">
                <SideBar />
            </div>
            
            <div className="absolute top-0 left-[260px] w-[calc(100%-260px)] h-screen z-10">
                <div className="bg-white rounded-l-4xl h-screen overflow-y-auto">
                    <NavBar />
                    <Outlet />
                    <BottomPlayer />
                    
                        
                </div>
            </div>
        </div>
    )
}

export default Layout;
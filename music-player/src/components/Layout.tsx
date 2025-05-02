import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="w-[220px]">
                <SideBar />
            </div>
            
            <div className="absolute top-0 left-[260px] w-[calc(100%-260px)] h-full bg-white rounded-l-4xl z-10">
                <div className="h-full overflow-y-auto">
                    <NavBar />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;
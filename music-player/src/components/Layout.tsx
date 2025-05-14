import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import BottomPlayer from "./BottomPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 640) {
                setCollapsed(true);
            } else {
                setCollapsed(false)
            }
        };
        handleResize();
    }, [])
    
    return (
        <div className="flex h-screen overflow-hidden">
            <div className={`fixed top-0 left-0 h-full z-50 sm:z-40 bg-[#b4b4b4] transition-transform duration-300 ${collapsed ? '-translate-x-full' : 'translate-x-0'} w-[230px] sm:translate-x-0 sm:static sm:block`}>
                <SideBar 
                collapsed = {collapsed}
                setCollapsed = {setCollapsed}
                />
            </div>
            
            <div className={`flex flex-col flex-1 bg-white shadow-2xl md:rounded-l-4xl overflow-hidden md:opacity-100 z-40 transition-all ${collapsed ? 'opacity-100' : 'opacity-10'}`}>
                <div className="flex-1 overflow-y-auto relative">
                {collapsed && (
                    <button className="absolute top-6 left-4 z-50 text-2xl sm:hidden p-2 " onClick={() => setCollapsed(false)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                )}
                    <NavBar />
                    <Outlet />
                    <BottomPlayer />
                    
                        
                </div>
            </div>
        </div>
    )
}

export default Layout;

{/* <div className={`transition-all duration-500 ease-in-out ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}></div> */}

// sm:hidden fixed top-0 left-0 w-full bg-[#b4b4b4] flex items-center justify-between p-4 shadow-md z-50

{/* <div className="flex flex-col flex-1 bg-white shadow-2xl rounded-l-4xl overflow-hidden z-40"></div> */}
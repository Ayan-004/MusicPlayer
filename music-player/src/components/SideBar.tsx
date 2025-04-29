import logo from "../assets/logo.png";

function SideBar() {
    return (
        <div className="sidebar fixed w-2xs h-screen bg-[#605c5b] backdrop-blur-lg border-r text-[#eeebea] pl-10 pt-4 shadow-xl">
            <div className="sidebar-header flex items-center font-calsans gap-1">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-md text-[#eeebea]" />
            <h2 className="sidebar-title text-5xl font-semibold">Audizi</h2>
            </div>
            <h2 className="sidebar-title text-3xl pt-15 font-calsans">Library</h2>
            <ul className="sidebar-menu pt-5 text-xl font-montserrat text-[#eeebea]">
                <li className="menu-item hover:bg-[#3d3b3b] backdrop-blur-md hover:text-[#cdd084] transition-all hover:rounded-full w-28 cursor-pointer hover:shadow-lg p-3">Songs</li>
                <li className="menu-item hover:bg-[#3d3b3b] backdrop-blur-md hover:text-[#cdd084] transition-all hover:rounded-full w-28 cursor-pointer hover:shadow-lg p-3">Albums</li>
                <li className="menu-item hover:bg-[#3d3b3b] backdrop-blur-md hover:text-[#cdd084] transition-all hover:rounded-full w-28 cursor-pointer hover:shadow-lg p-3">Artists</li>
                <li className="menu-item hover:bg-[#3d3b3b] backdrop-blur-md hover:text-[#cdd084] transition-all hover:rounded-full w-28 cursor-pointer hover:shadow-lg p-3">Radio</li>
            </ul>

            <h2 className="sidebar-title font-calsans text-3xl pt-10">My music</h2>
            <ul className="sidebar-menu pt-5 font-montserrat text-xl text-[#eeebea]">
                <li className="menu-item hover:backdrop-blur-md hover:bg-[#3d3b3b] hover:text-[#cdd084] transition-all rounded-full w-48 cursor-pointer hover:shadow-lg p-3">Recently Played</li>
                <li className="menu-item hover:backdrop-blur-md hover:bg-[#3d3b3b] hover:text-[#cdd084] transition-all rounded-full w-48 cursor-pointer hover:shadow-lg p-3">Favorite Songs</li>
                <li className="menu-item hover:backdrop-blur-md hover:bg-[#3d3b3b] hover:text-[#cdd084] transition-all rounded-full w-40 cursor-pointer hover:shadow-lg p-3">Local Files</li>
            </ul>
        </div>
    );
};

export default SideBar;
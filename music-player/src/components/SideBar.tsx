

function SideBar() {
    return (
        <div className="sidebar w-2xs h-screen bg-gray-900/30 backdrop-blur-lg border-r border-white/10 text-black font-calsans pl-10 pt-4 shadow-xl ">
            <h2 className="sidebar-title text-5xl">Audizi</h2>
            <h2 className="sidebar-title text-3xl pt-10 ">Library</h2>
            <ul className="sidebar-menu pt-5 text-xl text-black/70">
                <li className="menu-item hover:backdrop-blur-md hover:rounded-2xl w-28 cursor-pointer hover:shadow-lg p-2">Songs</li>
                <li className="menu-item hover:backdrop-blur-md hover:rounded-2xl w-28 cursor-pointer hover:shadow-lg p-2">Albums</li>
                <li className="menu-item hover:backdrop-blur-md hover:rounded-2xl w-28 cursor-pointer hover:shadow-lg p-2">Artists</li>
                <li className="menu-item hover:backdrop-blur-md hover:rounded-2xl w-28 cursor-pointer hover:shadow-lg p-2">Radio</li>
            </ul>

            <h2 className="sidebar-title text-3xl pt-10">My music</h2>
            <ul className="sidebar-menu pt-5 text-xl text-black/70">
                <li className="menu-item hover:backdrop-blur-md hover:rounded-2xl w-40 cursor-pointer hover:shadow-lg p-2">Recently Played</li>
                <li className="menu-item hover:backdrop-blur-md hover:rounded-2xl w-40 cursor-pointer hover:shadow-lg p-2">Favorite Songs</li>
                <li className="menu-item hover:backdrop-blur-md hover:rounded-2xl w-40 cursor-pointer hover:shadow-lg p-2">Local Files</li>
            </ul>
        </div>
    );
};

export default SideBar;
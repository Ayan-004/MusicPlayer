import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes, faCog, faMusic, faBookOpen, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

type SideBarProps = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}


function SideBar({collapsed, setCollapsed}: SideBarProps) {
    
    return (
    
        <div className={`fixed top-0 left-0 z-40 h-full bg-gray-00 border border-gray-300/50 backdrop-blur-xl lg:backdrop-blur-none lg:bg-gray-300 text-black pt-4 shadow-xl w-64 transition-transform duration-300 lg:static lg:translate-x-0  ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>


            <div className="font-calsans">
                <div className="flex items-center pl-3 md:pl-3 gap-2">
                <img src={logo} alt="Logo" className="w-12 h-12 rounded-md" />
                <h2 className="sidebar-title text-5xl font-bold">
                   <span className={`hidden sm:inline ${collapsed ? 'hidden' : 'inline'}`}>Audizi</span>
                </h2>
                </div>
                <div className="absolute top-8 right-4 lg:hidden">
                <button onClick={() => setCollapsed(true)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                </div>
            <ul className="sidebar-menu pt-12 pl-6 md:pl-6 text-2xl font-montserrat-medium text-[#464646]">
                <li className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3"> 
                    <FontAwesomeIcon icon={faHome} size="xs"/>
                    <span className={`hidden sm:inline ${collapsed ? 'hidden' : 'inline'}`}>Home</span>
                </li>
                <li className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3">
                     <FontAwesomeIcon icon={faBookOpen} size="xs"/>
                     <span className={`hidden sm:inline ${collapsed ? 'hidden' : 'inline'}`}>Library</span>
                </li>
                <li className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3"> 
                    <FontAwesomeIcon icon={faMusic} size="xs"/>
                    <span className={`hidden sm:inline ${collapsed ? 'hidden' : 'inline'}`}>Radio</span>
                </li>
                <li className="menu-item flex items-center hover:bg-[#3d3b3b] backdrop-blur-md gap-2 hover:text-[#cdd084] transition-all hover:rounded-full w-40 cursor-pointer hover:shadow-lg p-3"> 
                    <FontAwesomeIcon icon={faCog} size="xs"/>
                    <span className={`hidden sm:inline ${collapsed ? 'hidden' : 'inline'}`}>Settings</span>
                </li>
            </ul>

            <ul className="sidebar-menu pt-5 pl-6 md:pl-6 font-montserrat-medium text-2xl text-[#464646]">
                <li className="menu-item flex items-center hover:backdrop-blur-md gap-2 hover:bg-[#3d3b3b] hover:text-[#cdd084] transition-all rounded-full w-40 cursor-pointer hover:shadow-lg p-3"> 
                    <FontAwesomeIcon icon={faSignInAlt} size="xs"/>
                   <span className={`hidden sm:inline ${collapsed ? 'hidden' : 'inline'}`}>Login</span>
                </li>

                <li className="menu-item flex items-center hover:backdrop-blur-md gap-2 hover:bg-[#3d3b3b] hover:text-[#cdd084] transition-all rounded-full w-40 cursor-pointer hover:shadow-lg p-3"> 
                    <FontAwesomeIcon icon={faUserPlus} size="xs" />
                    <span className={`hidden sm:inline ${collapsed ? 'hidden' : 'inline'}`}>Sign Up</span>
                </li>
            </ul>
             </div>
        </div>
    );
};

export default SideBar;
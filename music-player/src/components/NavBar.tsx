import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



function NavBar(){
    return (
        <nav>
            <div className="flex items-center justify-center bg-[#efefef]  mx-96 mt-5 mb-5 rounded-4xl p-2">
                <button className="py-2 px-4 hover:cursor-pointer"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500"/></button>
                <input 
                type="Search"
                placeholder="Search"
                className="flex-grow font-montserrat-medium py-2 bg-transparent outline-none text-sm"
                 />

            </div>
        </nav>
    );
};

export default NavBar;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: any) => {
        e.preventDefault();
        if(searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`)
        }
    };


    return (
        
        <form onSubmit={handleSearch} className="flex justify-center w-full">
            <div className="flex items-center bg-[#efefef] ml-16 sm:ml-0 m-5 mt-5 mb-5 rounded-4xl p-2 w-full max-w-md">
            <input 
            type="text" 
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 outline-none focus:ring-0 focus:outline-none w-full bg-transparent"
            />
            <button className="py-2 px-4 hover:cursor-pointer"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500"/></button>

            </div>
        </form>
    );
};

export default NavBar;
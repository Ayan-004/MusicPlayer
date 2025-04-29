import search from "../assets/search.png";

function NavBar(){
    return (
        <nav>
            <div className="flex items-center justify-center p-4">
                <div className="flex space-x-4">
                <button className="py-2 px-4 rounded hover:cursor-pointer"><img src={search} alt="search icon" /></button>
                    <button className="text-gray-500 text-lg font-montserrat-medium py-2 px-4 rounded hover:text-black transition-all cursor-pointer duration-300 ease-in-out">Home</button>
                    <button className="text-gray-500 text-lg font-montserrat-medium py-2 px-4 rounded hover:text-black transition-all cursor-pointer duration-300 ease-in-out">Library</button>
                    <button className="text-gray-500 text-lg font-montserrat-medium py-2 px-4 rounded hover:text-black transition-all cursor-pointer duration-300 ease-in-out">Settings</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
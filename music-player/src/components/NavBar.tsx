import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center w-full">
      <div className="flex items-center bg-[#efefef] ml-16 sm:ml-0 m-5 mt-5 mb-5 rounded-4xl p-2 w-full max-w-md md:max-w-xl md:ml-16">
        <input
          type="text"
          placeholder="Search songs..."
          aria-label="Search songs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 outline-none focus:ring-0 focus:outline-none w-full bg-transparent"
        />
        <button type="submit" className="py-2 px-4 hover:cursor-pointer">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 " />
        </button>
      </div>
    </form>
  );
};

export default NavBar;

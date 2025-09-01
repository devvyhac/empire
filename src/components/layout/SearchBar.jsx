import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="p-2 rounded-full hover:shadow-md transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faSearch} className="text-gray-700 text-xl" />
      </div>
      <div
        className={`absolute top-12 right-17 w-64 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
}

export default SearchBar;

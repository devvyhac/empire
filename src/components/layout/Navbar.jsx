import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStore,
  faShoppingCart,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchBar from "./SearchBar"; // Your previous search bar component

function Navbar() {
  const cartItems = 3; // Replace with dynamic cart count
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-gray-800">MyStore</div>
      <ul className="flex space-x-6 items-center">
        <li>
          <a
            href="/"
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            <FontAwesomeIcon icon={faHome} className="ml-2" /> Home
          </a>
        </li>
        <li>
          <a
            href="/shop"
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            <FontAwesomeIcon icon={faStore} className="ml-2" /> Shop
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            Contact
          </a>
        </li>
        <li className="relative">
          <a
            href="/cart"
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
            Cart
          </a>
        </li>
        <li>
          <a
            href="/account"
            className="text-gray-700 hover:text-blue-500 flex items-center"
          >
            <FontAwesomeIcon icon={faUser} className="ml-2" /> Account
          </a>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setIsSearchOpen(true)}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-700 hover:text-blue-500 ml-2 cursor-pointer"
          />
          <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

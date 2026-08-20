import { useState, useRef } from "react";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileDropDown = ({ children, isLoggedIn, logout }) => {
  // State to control the visibility of the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // A ref to store the timeout ID so we can clear it
  const timeoutRef = useRef(null);

  // Function to handle the mouse entering the dropdown area
  const handleMouseEnter = () => {
    // Clear any existing timeout to prevent the dropdown from closing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  // Function to handle the mouse leaving the dropdown area
  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after 100ms
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Conditional rendering for the dropdown menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden z-20
              transform transition-all duration-200 ease-out origin-top-right
              ${
                isDropdownOpen
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0 pointer-events-none"
              }`}
      >
        {!isLoggedIn ? (
          <ul className="py-1">
            <li className="text-gray-700 dark:text-gray-200">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </li>
            <li className="text-gray-700 dark:text-gray-200">
              <Link
                to="/register"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="py-1 text-gray-700 dark:text-gray-200">
            <li onClick={logout}>
              <button
                type="button"
                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;

import { useState, useRef } from "react";
import { LogIn, UserPlus } from "lucide-react";
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
    // Set a timeout to close the dropdown after 1 second (1000ms)
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Conditional rendering for the dropdown menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-20
              transform transition-all duration-200 ease-out origin-top-right
              ${
                isDropdownOpen
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0"
              }`}
      >
        {!isLoggedIn ? (
          <ul>
            <li className="py-2 text-gray-700">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="py-2 text-gray-700">
            <li onClick={logout}>
              <Link
                href=""
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <UserPlus size={18} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;

import React, { useState, useRef } from "react";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileDropDown = ({ children, isLoggedIn, logout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-30 transition-all duration-200 ease-out origin-top-right ${
          isDropdownOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {isLoggedIn ? (
          <div className="py-1">
            <button
              type="button"
              onClick={(e) => {
                setIsDropdownOpen(false);
                logout(e);
              }}
              className="w-full flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium text-left transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="py-1">
            <Link
              to="/login"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;

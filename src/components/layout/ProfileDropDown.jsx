import React, { useState, useRef, useContext } from "react";
import { LogIn, UserPlus, LogOut, User, Heart, ShoppingCart, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const ProfileDropDown = ({ children, isLoggedIn, logout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const { user } = useContext(AuthContext) || {};

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

      {/* Dropdown Menu with Smooth Animation */}
      <div
        className={`absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-30 transition-all duration-200 ease-out origin-top-right ${
          isDropdownOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {isLoggedIn ? (
          <div className="py-2">
            {/* User Info Header */}
            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-900/50">
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                {user?.name || "Welcome Back"}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {user?.email || "Account Holder"}
              </p>
            </div>

            <ul className="pt-1.5 space-y-0.5 text-xs font-medium text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Heart className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>My Wishlist</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>My Cart</span>
                </Link>
              </li>

              <li className="pt-1 border-t border-gray-100 dark:border-gray-700/60 mt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    setIsDropdownOpen(false);
                    logout(e);
                  }}
                  className="w-full flex items-center space-x-2.5 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700/60">
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                Welcome to Empire
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Sign in to manage your account
              </p>
            </div>

            <ul className="pt-1.5 space-y-0.5 text-xs font-medium text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>Log In</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>Create Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2.5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Heart className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>My Wishlist</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;

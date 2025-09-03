import { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProfileDropDown from "./ProfileDropDown";
import CartSummary from "./CartSummary";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import {
  ShoppingCart,
  ShoppingBag,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Heart,
  User,
  Sparkles,
} from "lucide-react";
const Header = () => {
  const { cartQuantity } = useContext(CartContext);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount] = useState(3);
  const location = useLocation();
  const { pathname: page } = location;
  const { server, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // ####################################################################################
  // PROFILE DROPDOWN FUNCTIONALITY

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Function to toggle the dropdown's visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  // ####################################################################################

  // Theme toggle functionality
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // useEffect(() => {
  //   setCartQuantity(cartItems.length);
  //   console.log(cartQuantity);
  // }, [cartItems]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${server}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        setIsLoggedIn(false);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          {/* Logo and Nav (Desktop) */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="font-poppins text-2xl font-bold">Gadgets</span>
            </div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors font-medium"
              >
                Shop
              </Link>
              <Link
                to="/blogs"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors font-medium"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors font-medium"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Search Bar and Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors"
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer"
            >
              <Link
                to="/wishlist"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute p-[10px] -top-2 -right-2 flex items-center justify-center leading-none tracking-tight w-4 h-4 text-[12px] font-light text-white bg-red-500 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </motion.div>
            <ProfileDropDown isLoggedIn={isLoggedIn} logout={handleLogout}>
              <motion.div
                className="cursor-pointer relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>
                  {isLoggedIn ? (
                    <Link
                      to="/profile"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                    >
                      <User className="w-6 h-6" />
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      style={{ pointerEvents: "none" }}
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                    >
                      <User className="w-6 h-6" />
                    </Link>
                  )}
                </span>
              </motion.div>
            </ProfileDropDown>

            <CartSummary>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer"
              >
                <Link
                  to="/cart"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute p-[10px] -top-2 -right-2 flex items-center justify-center leading-none tracking-tight w-4 h-4 text-[12px] font-light text-white bg-red-500 rounded-full">
                    {cartQuantity}
                  </span>
                </Link>
              </motion.div>
            </CartSummary>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6 text-accent-light dark:text-accent-dark" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-300" />
                )}
              </button>
            </motion.div>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-gray-600 dark:text-gray-300"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-white dark:bg-gray-900 shadow-lg p-6 z-50 md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-poppins text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block py-2 text-lg font-medium hover:text-indigo-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="block py-2 text-lg font-medium hover:text-indigo-600 transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="blogs"
                    className="block py-2 text-lg font-medium hover:text-indigo-600 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="about"
                    className="block py-2 text-lg font-medium hover:text-indigo-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="contact"
                    className="block py-2 text-lg font-medium hover:text-indigo-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <li>
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="w-6 h-6" />
                      <span className="text-lg">Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/profile"
                    className="flex items-center justify-between"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-lg">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center justify-between"
                    to="/cart"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="w-6 h-6" />
                      <span className="flex-grow text-lg">Cart</span>
                    </div>
                    <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                      {cartQuantity}
                    </span>
                  </Link>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-lg">Dark Mode</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {isDarkMode ? (
                      <Sun className="w-6 h-6 text-accent-light dark:text-accent-dark" />
                    ) : (
                      <Moon className="w-6 h-6 text-gray-300" />
                    )}
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;

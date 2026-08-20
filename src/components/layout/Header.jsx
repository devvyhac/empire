import { useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProfileDropDown from "./ProfileDropDown";
import CartSummary from "./CartSummary";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import ThemeToggle from "../common/ThemeToggle.jsx";
import Logo from "../common/Logo.jsx";
import { toast } from "react-toastify";
const { VITE_LOGOUT_URL } = import.meta.env;

import {
  Home,
  ShoppingBag,
  BookOpen,
  Info,
  Mail,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  Search,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const Header = () => {
  const { cartQuantity } = useContext(CartContext);
  const { wishListQuantity } = useContext(WishlistContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { pathname: page } = location;
  const { user, isLoggedIn, setUserData, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      e?.preventDefault?.();
      if (VITE_LOGOUT_URL) {
        await axios.post(
          VITE_LOGOUT_URL,
          {},
          { withCredentials: true }
        );
      }
      setIsLoggedIn(false);
      setUserData(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      toast.info("Logged out");
      navigate("/");
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home, match: (p) => p === "/" },
    {
      name: "Shop",
      path: "/shop",
      icon: ShoppingBag,
      match: (p) => p === "/shop" || p.startsWith("/product"),
    },
    {
      name: "Blog",
      path: "/blogs",
      icon: BookOpen,
      match: (p) => p === "/blogs" || p.startsWith("/blog"),
    },
    { name: "About Us", path: "/about", icon: Info, match: (p) => p === "/about" },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
      match: (p) => p === "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-between py-3.5 px-4">
        {/* Logo and Nav (Desktop) */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="flex items-center group transition-transform duration-200 hover:opacity-95"
            aria-label="Empire Home"
          >
            <Logo size="md" showTagline={true} />
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const isActive = item.match(page);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/80 dark:bg-indigo-950/60"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/60"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Bar and Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-5">
          <div className="relative w-56 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-1.5 pl-9 pr-4 text-sm rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <Link
            to="/wishlist"
            className={`relative p-2 rounded-lg transition-colors ${
              page === "/wishlist"
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
                : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/70"
            }`}
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishListQuantity > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm">
                {wishListQuantity}
              </span>
            )}
          </Link>

          <ProfileDropDown isLoggedIn={isLoggedIn} logout={handleLogout}>
            <div
              className={`cursor-pointer p-2 rounded-lg transition-colors ${
                page === "/profile" || page === "/login"
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
                  : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/70"
              }`}
            >
              <User className="w-5 h-5" />
            </div>
          </ProfileDropDown>

          <CartSummary>
            <Link
              to="/cart"
              className={`relative p-2 rounded-lg transition-colors ${
                page === "/cart"
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
                  : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/70"
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm">
                  {cartQuantity}
                </span>
              )}
            </Link>
          </CartSummary>

          <ThemeToggle />
        </div>

        {/* Mobile Right Action Bar */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Link
            to="/cart"
            className={`relative p-2 rounded-lg transition-colors ${
              page === "/cart"
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
                : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}
            aria-label="View Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartQuantity > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm">
                {cartQuantity}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Side Nav) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Side Navigation Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-y-0 right-0 h-screen max-h-screen w-[85%] max-w-xs bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-50 md:hidden flex flex-col"
              aria-label="Mobile Navigation Menu"
            >
              {/* Top Drawer Header (Fixed) */}
              <div className="shrink-0 p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex items-center">
                  <Logo size="sm" showTagline={true} />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                  className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Nav Content */}
              <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-6">
                {/* Main Navigation Section */}
                <div>
                  <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Navigation
                  </span>
                  <nav className="mt-2 space-y-1">
                    {navLinks.map((item) => {
                      const isActive = item.match(page);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon
                              className={`w-4 h-4 transition-colors ${
                                isActive
                                  ? "text-indigo-600 dark:text-indigo-400"
                                  : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                              }`}
                            />
                            <span>{item.name}</span>
                          </div>
                          {isActive ? (
                            <span className="w-1.5 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Account & Quick Actions Section */}
                <div>
                  <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Account & Cart
                  </span>
                  <div className="mt-2 space-y-1">
                    {/* Wishlist Link */}
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        page === "/wishlist"
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            page === "/wishlist"
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                          }`}
                        />
                        <span>Wishlist</span>
                      </div>
                      {wishListQuantity > 0 ? (
                        <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full shadow-sm">
                          {wishListQuantity}
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>

                    {/* Cart Link */}
                    <Link
                      to="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        page === "/cart"
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <ShoppingCart
                          className={`w-4 h-4 transition-colors ${
                            page === "/cart"
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                          }`}
                        />
                        <span>Cart</span>
                      </div>
                      {cartQuantity > 0 ? (
                        <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full shadow-sm">
                          {cartQuantity}
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>

                    {/* Profile / Authentication */}
                    <Link
                      to={isLoggedIn ? "/profile" : "/login"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        page === "/profile" || page === "/login" || page === "/register"
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <User
                          className={`w-4 h-4 transition-colors ${
                            page === "/profile" || page === "/login"
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                          }`}
                        />
                        <span>{isLoggedIn ? "My Profile" : "Sign In / Register"}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Footer (Fixed) */}
              <div className="shrink-0 p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/50 space-y-2.5">
                <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Dark Mode
                  </span>
                  <ThemeToggle variant="switch" />
                </div>

                {isLoggedIn && (
                  <button
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleLogout(e);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

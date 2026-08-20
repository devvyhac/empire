import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = ({ variant = "icon", className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  if (variant === "switch") {
    // Pill / Switch layout (ideal for mobile menu / settings)
    return (
      <button
        onClick={toggleTheme}
        type="button"
        role="switch"
        aria-checked={isDarkMode}
        aria-label="Toggle dark mode"
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isDarkMode ? "bg-indigo-600" : "bg-gray-300"
        } ${className}`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md flex items-center justify-center ${
            isDarkMode ? "translate-x-8" : "translate-x-1"
          }`}
        >
          {isDarkMode ? (
            <Moon className="h-3 w-3 text-indigo-600" />
          ) : (
            <Sun className="h-3 w-3 text-amber-500" />
          )}
        </motion.span>
      </button>
    );
  }

  // Premium Animated Icon Button (for Header)
  return (
    <motion.button
      onClick={toggleTheme}
      type="button"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-10 h-10 rounded-full bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 overflow-hidden flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.div
            key="sun"
            initial={{ y: -16, opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 16, opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center justify-center text-amber-400"
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -16, opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 16, opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center justify-center text-gray-700"
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;

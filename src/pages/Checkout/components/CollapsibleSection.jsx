import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

// Reusable Collapsible Section for Checkout Steps
const CollapsibleSection = ({
  stepNumber,
  title,
  subtitle,
  children,
  isOpen,
  onToggle,
  icon,
  isComplete = false,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80 overflow-hidden transition-all duration-200">
      <button
        type="button"
        className="flex items-center justify-between w-full p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3.5 sm:space-x-4">
          {/* Step Icon Badge */}
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-poppins font-bold text-sm transition-all duration-200 shrink-0 ${
              isComplete
                ? "bg-emerald-500 text-white shadow-sm"
                : isOpen
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            {isComplete ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            ) : icon ? (
              icon
            ) : (
              <span>{stepNumber}</span>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-poppins text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              {isComplete && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                  Ready
                </span>
              )}
            </div>
            {subtitle && (
              <p className="font-inter text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700/60 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0 ml-2"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6 pt-0 sm:pt-0 border-t border-gray-100 dark:border-gray-700/60 mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
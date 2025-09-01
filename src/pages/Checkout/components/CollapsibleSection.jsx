import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";


// A reusable collapsible section component for the checkout form
const CollapsibleSection = ({ title, children, isOpen, onToggle, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
      <motion.button
        type="button"
        className="flex items-center justify-between w-full p-4 font-semibold text-left"
        onClick={onToggle}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="flex items-center text-gray-900 dark:text-gray-100">
          {icon}
          <span className="ml-2 font-poppins text-lg">{title}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default CollapsibleSection;
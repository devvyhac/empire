import React from "react";
import { motion } from "framer-motion";

export const SocialButton = ({
  icon: Icon,
  label,
  bgColor = "bg-gray-50/70 dark:bg-gray-800/70",
  textColor = "text-gray-700 dark:text-gray-200",
  hoverColor = "hover:bg-gray-100 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600",
  onClick,
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-xs sm:text-sm font-medium ${bgColor} ${textColor} transition-all duration-150 ${hoverColor}`}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <Icon className="w-4 h-4 mr-2.5 shrink-0" />
    <span>{label}</span>
  </motion.button>
);

export default SocialButton;

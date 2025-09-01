import { motion } from "framer-motion";

// A reusable component for social sign-up/login buttons
export const SocialButton = ({
  icon: Icon,
  label,
  bgColor,
  textColor,
  hoverColor,
}) => (
  <motion.button
    type="button"
    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium ${bgColor} ${textColor} transition-colors ${hoverColor}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </motion.button>
);

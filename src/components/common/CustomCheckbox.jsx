import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

// Custom checkbox component
export const CustomCheckbox = ({ id, label, isChecked, onChange }) => {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => onChange(id)}
    >
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
          isChecked
            ? "bg-[#4c51bf] border-[#4c51bf]"
            : "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
        }`}
      >
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
};
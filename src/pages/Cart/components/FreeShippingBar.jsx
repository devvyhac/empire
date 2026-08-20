import React from "react";
import { motion } from "framer-motion";
import { Truck, Sparkles, CheckCircle2 } from "lucide-react";

export const FREE_SHIPPING_THRESHOLD = 100;

export const FreeShippingBar = ({ subtotal = 0 }) => {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const isUnlocked = remaining === 0 && subtotal > 0;

  return (
    <div className="bg-gradient-to-r from-indigo-50/90 via-blue-50/80 to-sky-50/90 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-gray-800/90 border border-indigo-100/80 dark:border-indigo-900/40 rounded-2xl p-4 sm:p-4.5 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between gap-2.5 sm:gap-3 mb-2.5">
        <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
              isUnlocked
                ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                : "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
            }`}
          >
            {isUnlocked ? (
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
            {isUnlocked ? (
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center flex-wrap gap-1">
                <Sparkles className="w-3.5 h-3.5 inline-block text-amber-500 shrink-0" />
                <span>You unlocked <strong className="font-bold">FREE Shipping</strong>!</span>
              </span>
            ) : (
              <span>
                Add{" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  ${remaining.toFixed(2)}
                </span>{" "}
                for <strong className="font-semibold">FREE Shipping</strong>
              </span>
            )}
          </p>
        </div>

        <span className="text-[11px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0 tabular-nums">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-gray-200 dark:bg-gray-700/80 h-2 rounded-full overflow-hidden p-0.5">
        <motion.div
          className={`h-full rounded-full transition-colors duration-300 ${
            isUnlocked
              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
              : "bg-gradient-to-r from-indigo-500 to-blue-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default FreeShippingBar;

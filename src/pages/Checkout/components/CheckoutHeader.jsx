import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Lock, User, UserCheck } from "lucide-react";

const CheckoutHeader = ({ isLoggedIn, userEmail }) => {
  return (
    <div className="space-y-4 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="font-poppins text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight flex items-center gap-2.5">
              <span>Checkout</span>
            </h1>
            <span className="inline-flex items-center space-x-1 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
              <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>SSL 256-Bit Encrypted</span>
            </span>
          </div>
          <p className="font-inter text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter your shipping details and select your preferred payment method.
          </p>
        </div>

        <Link
          to="/cart"
          className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
      </div>

      {/* Guest vs Logged In Status Banner */}
      {!isLoggedIn ? (
        <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-3 sm:p-4 flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
          <div className="flex items-center space-x-2.5 text-gray-700 dark:text-gray-300">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>
              Checking out as <strong>Guest</strong>. Have an account?
            </span>
          </div>
          <Link
            to="/login?redirect=/checkout"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-indigo-200 dark:border-indigo-700/60 transition-all"
          >
            Log In for Fast Checkout &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/70 rounded-xl p-3 sm:p-3.5 flex items-center space-x-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Signed in as <strong className="text-gray-900 dark:text-gray-100">{userEmail}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default CheckoutHeader;

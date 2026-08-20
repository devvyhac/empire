import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On all qualifying orders over $100",
  },
  {
    icon: RotateCcw,
    title: "30-Day Easy Returns",
    desc: "Hassle-free refunds & exchanges",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Checkout",
    desc: "Bank-grade encrypted payments",
  },
  {
    icon: Headphones,
    title: "24/7 Priority Support",
    desc: "Dedicated help whenever you need",
  },
];

const POPULAR_TAGS = [
  "New Arrivals",
  "Best Sellers",
  "Headphones",
  "Smartphones",
  "Smart Watches",
  "Accessories",
];

export const EmptyCartState = () => {
  return (
    <div className="space-y-8 sm:space-y-12 py-2 sm:py-6">
      {/* Clean Minimal Empty State */}
      <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-3xl p-6 sm:p-12 text-center shadow-sm">
        <div className="max-w-lg mx-auto flex flex-col items-center">
          {/* Static Clean Icon (No floating, no glow, no border) */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4 sm:mb-5">
            <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 dark:text-gray-300" />
          </div>

          <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Your Shopping Cart is Empty
          </h2>
          <p className="font-inter text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2.5 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Explore our curated collections, discover top-rated gadgets, and find the perfect match.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-7 w-full sm:w-auto">
            <Link to="/shop" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto py-3 px-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-poppins font-semibold text-sm shadow-sm flex items-center justify-center space-x-2 transition-all duration-150"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/wishlist" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-poppins font-semibold text-sm border border-gray-200 dark:border-gray-600/60 flex items-center justify-center space-x-2 transition-all duration-150"
              >
                <Heart className="w-4 h-4 text-red-500" />
                <span>View Wishlist</span>
              </button>
            </Link>
          </div>

          {/* Quick Category Chips */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/60 w-full">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Popular Searches
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {POPULAR_TAGS.map((tag) => (
                <Link
                  key={tag}
                  to={`/shop?search=${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-150"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Shop With Us Perks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VALUE_PROPS.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 shadow-sm flex items-start space-x-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/40">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-poppins font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {prop.title}
                </h4>
                <p className="font-inter text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {prop.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmptyCartState;

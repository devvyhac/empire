import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Trash2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { WishlistContext } from "../context/WishlistContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { getProductPrices, getProductImage } from "../utils/productUtils.js";

// Wishlist Item Card Component
const WishlistItemCard = ({ item, onRemove, onAddToCart }) => {
  const { unitPrice, originalPrice, hasDiscount, discountPercent } =
    getProductPrices(item);
  const imageUrl = getProductImage(item);
  const isInStock = item?.inStock !== false && (item?.stock === undefined || item?.stock > 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900/60 mb-3.5">
          <img
            src={imageUrl}
            alt={item?.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Tag */}
          {hasDiscount && discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-red-600 text-white text-[11px] font-bold shadow-sm">
              -{discountPercent}%
            </span>
          )}

          {/* Remove from Wishlist Button */}
          <button
            type="button"
            onClick={() => {
              onRemove(item);
              toast.info(`Removed ${item?.name || "item"} from wishlist`);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-800 shadow-sm flex items-center justify-center transition-colors"
            title="Remove from wishlist"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          {item?.brand && (
            <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {item.brand}
            </p>
          )}

          <Link
            to={`/product/${item?.slug || item?._id || item?.id}`}
            className="block font-poppins text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {item?.name}
          </Link>

          {/* Price Row */}
          <div className="flex items-baseline space-x-2 pt-1">
            <span className="font-poppins text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              ${unitPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="pt-1">
            {isInStock ? (
              <span className="inline-flex items-center text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center text-[11px] font-medium text-amber-600 dark:text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart CTA */}
      <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700/60">
        <motion.button
          type="button"
          disabled={!isInStock}
          onClick={() => {
            onAddToCart(item);
            toast.success(`Added ${item?.name || "item"} to cart!`);
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-all"
          whileHover={{ scale: isInStock ? 1.01 : 1 }}
          whileTap={{ scale: isInStock ? 0.99 : 1 }}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function WishlistPage() {
  const {
    removeFromWishlist,
    wishlistItems: wishlist = [],
    clearWishlist,
  } = useContext(WishlistContext) || {};

  const { addToCart } = useContext(CartContext) || {};

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      addToCart(item);
    });
    toast.success(`Added all ${wishlist.length} items to your cart!`);
  };

  const isWishlistEmpty = wishlist.length === 0;

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 font-inter py-4 sm:py-8 lg:py-10 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Bar */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5 flex items-center space-x-1.5"
            >
              <Link
                to="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-700 dark:text-gray-300">Wishlist</span>
            </nav>
            <div className="flex items-center space-x-2.5">
              <h1 className="font-poppins text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                My Wishlist
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800/60">
                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>

          {!isWishlistEmpty && (
            <div className="flex items-center space-x-3 self-end sm:self-auto">
              <button
                type="button"
                onClick={clearWishlist}
                className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold shadow-sm transition-all"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center space-x-1.5"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add All to Cart</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        {isWishlistEmpty ? (
          <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-8 sm:p-12 text-center shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-500 flex items-center justify-center mx-auto border border-red-100 dark:border-red-900/40 shadow-sm">
              <Heart className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h2 className="font-poppins text-xl font-bold text-gray-900 dark:text-white">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Explore our catalog and save your favorite items to purchase anytime.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/25 transition-all"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {wishlist.map((item) => (
                <WishlistItemCard
                  key={item._id || item.id}
                  item={item}
                  onRemove={removeFromWishlist}
                  onAddToCart={addToCart}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
}

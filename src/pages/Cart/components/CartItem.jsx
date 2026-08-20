import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2, Heart, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { CartContext } from "../../../context/CartContext.jsx";
import { WishlistContext } from "../../../context/WishlistContext.jsx";

const CartItem = ({ item }) => {
  const { removeFromCart, addToCart, deleteFromCart, updateItemQuantity } =
    useContext(CartContext);
  const { addToWishlist, wishlistItems = [] } =
    useContext(WishlistContext) || {};

  const itemId = item?._id || item?.id;
  const isWishlisted = Boolean(
    itemId && wishlistItems?.some((w) => (w._id || w.id) === itemId)
  );

  const unitPrice = Number(
    item?.discountPrice ?? item?.discountedPrice ?? item?.originalPrice ?? item?.price ?? 0
  );
  const originalPrice = Number(item?.originalPrice ?? 0);
  const hasDiscount = originalPrice > 0 && originalPrice > unitPrice;
  const savingsPerItem = hasDiscount ? originalPrice - unitPrice : 0;
  const quantity = Math.max(1, Number(item?.quantity) || 1);
  const lineTotal = unitPrice * quantity;

  const imageUrl =
    item?.images?.[0]?.url ||
    item?.image ||
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&h=500&fit=crop";

  const categoryName =
    typeof item?.category === "object"
      ? item?.category?.name
      : item?.category || "General";

  const handleMoveToWishlist = () => {
    if (addToWishlist) {
      addToWishlist(item);
      deleteFromCart(item);
      toast.success(`"${item.name || "Item"}" saved to your wishlist!`);
    }
  };

  const handleRemove = () => {
    deleteFromCart(item);
    toast.info(`Removed "${item.name || "Item"}" from cart`);
  };

  const handleQuantityInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= 1 && val <= 99) {
        updateItemQuantity(item, val);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-5">
        {/* Main Details Row (Thumbnail + Info) */}
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto flex-grow min-w-0">
          {/* Product Image Thumbnail */}
          <Link
            to={`/product/${itemId}`}
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0 border border-gray-100 dark:border-gray-800"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={imageUrl}
              alt={item?.name || "Product"}
              loading="lazy"
            />
            {hasDiscount && (
              <span className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                Save ${(savingsPerItem * quantity).toFixed(0)}
              </span>
            )}
          </Link>

          {/* Product Meta & Details */}
          <div className="flex-grow min-w-0">
            <span className="inline-block text-[10px] sm:text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full uppercase tracking-wider mb-0.5 sm:mb-1">
              {categoryName}
            </span>
            <Link
              to={`/product/${itemId}`}
              className="font-poppins font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 sm:line-clamp-1 block leading-snug"
            >
              {item.name}
            </Link>

            {/* Unit Price & Stock */}
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-1">
              <div className="flex items-baseline space-x-1.5">
                <span className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-100">
                  ${unitPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-[11px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <Check className="w-3 h-3" /> In Stock
              </span>
            </div>

            {/* Desktop Action Row */}
            <div className="hidden sm:flex items-center space-x-4 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700/60">
              <button
                onClick={handleMoveToWishlist}
                className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/btn"
              >
                <Heart
                  className={`w-3.5 h-3.5 mr-1.5 transition-transform group-hover/btn:scale-110 ${
                    isWishlisted ? "text-red-500 fill-red-500" : ""
                  }`}
                />
                <span>{isWishlisted ? "In Wishlist" : "Save for Later"}</span>
              </button>

              <span className="text-gray-200 dark:text-gray-700">|</span>

              <button
                onClick={handleRemove}
                className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors group/del"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover/del:scale-110 text-gray-400 group-hover/del:text-red-500" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Controls & Stepper (Responsive Mobile/Desktop) */}
        <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end pt-2.5 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700/60 gap-3 shrink-0">
          {/* Mobile Action Buttons */}
          <div className="flex sm:hidden items-center space-x-1">
            <button
              onClick={handleMoveToWishlist}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isWishlisted ? "text-red-500 fill-red-500" : ""
                }`}
              />
              <span className="text-[11px]">{isWishlisted ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleRemove}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Remove</span>
            </button>
          </div>

          {/* Stepper + Subtotal */}
          <div className="flex items-center sm:flex-col sm:items-end gap-2.5 sm:gap-2 ml-auto sm:ml-0">
            {/* Line Total */}
            <div className="text-right">
              <span className="font-poppins font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-100">
                ${lineTotal.toFixed(2)}
              </span>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center bg-gray-50 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-xl p-0.5 sm:p-1 shadow-inner">
              <motion.button
                type="button"
                onClick={() => removeFromCart(item)}
                aria-label="Decrease quantity"
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-90 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.85 }}
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>

              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={handleQuantityInputChange}
                aria-label="Item quantity"
                className="w-7 sm:w-10 text-center bg-transparent border-0 font-semibold text-xs sm:text-sm text-gray-900 dark:text-gray-100 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <motion.button
                type="button"
                onClick={() => addToCart(item)}
                aria-label="Increase quantity"
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-90 transition-all shadow-sm"
                whileTap={{ scale: 0.85 }}
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;

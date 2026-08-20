import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { WishlistContext } from "../../context/WishlistContext";

// Reusable ProductCard component for the grid
export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { addToWishlist, removeFromWishlist, wishlistItems = [] } =
    useContext(WishlistContext) || {};

  const isWishlisted = Boolean(
    product?._id && wishlistItems.some((item) => item._id === product._id)
  );

  const handleBuy = () => {
    addToCart(product);
    if (isLoggedIn) {
      navigate("/checkout");
      return;
    }
    toast.info("Please log in to proceed to checkout");
  };

  const handleAddToCart = () => {
    toast.success(`${product.name || "Item"} Added to Cart`);
    addToCart(product);
  };

  const categoryName =
    typeof product?.category === "object"
      ? product?.category?.name
      : product?.category || "General";

  const imageUrl =
    product?.images?.[0]?.url ||
    product?.image ||
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&h=500&fit=crop";

  const price =
    product?.discountPrice ?? product?.discountedPrice ?? product?.originalPrice ?? 0;

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl shadow-sm hover:shadow-md flex flex-col group overflow-hidden transition-all duration-300"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Discount/Special Tag */}
      {product?.tag && (
        <span
          className={`absolute top-3.5 left-3.5 z-10 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm ${
            product.tag === "-50%" ? "bg-red-500" : "bg-indigo-600"
          }`}
        >
          {product.tag}
        </span>
      )}

      {/* Wishlist Button */}
      <motion.button
        onClick={() => {
          if (isWishlisted) {
            removeFromWishlist(product);
          } else {
            addToWishlist(product);
          }
        }}
        className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm flex items-center justify-center transition-colors ${
          isWishlisted
            ? "text-red-500"
            : "text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle wishlist"
      >
        <Heart
          className="w-4 h-4"
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </motion.button>

      {/* Product Image with Zoom Preview */}
      <div
        onClick={() => navigate(`/product/${product?._id || product?.id}`)}
        className="relative w-full h-52 sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer"
      >
        <motion.img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      </div>

      {/* Product Info: Title, Category, Price & Mobile Add-to-Cart Icon */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3
            onClick={() => navigate(`/product/${product?._id || product?.id}`)}
            className="font-poppins text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors line-clamp-1"
          >
            {product?.name}
          </h3>
          <p className="font-inter text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {categoryName}
          </p>
        </div>

        {/* Price Row + Mobile Cart Action */}
        <div className="flex items-center justify-between mt-3">
          {/* Price Display */}
          <div className="flex items-baseline space-x-1.5 transition-opacity duration-300 md:group-hover:opacity-0">
            {product?.discountPrice ? (
              <>
                <p className="font-inter text-lg font-bold text-gray-900 dark:text-gray-100">
                  ${Number(product.discountPrice).toFixed(2)}
                </p>
                <p className="font-inter text-xs text-gray-400 dark:text-gray-500 line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="font-inter text-lg font-bold text-gray-900 dark:text-gray-100">
                ${Number(price).toFixed(2)}
              </p>
            )}
          </div>

          {/* Mobile-Only Always-Visible Add to Cart Rounded Icon Button */}
          <motion.button
            onClick={handleAddToCart}
            className="md:hidden w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-90 text-white shadow-md flex items-center justify-center transition-all duration-200"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Desktop-Only Slide-Up Action Bar on Hover (Buy Button with Price + Rounded Cart Button) */}
      <div className="hidden md:flex absolute inset-x-0 bottom-0 p-4 pt-2 space-x-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <motion.button
          onClick={handleBuy}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-sm font-medium transition-colors shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy{" "}
          <span className="ml-1.5 font-bold">
            ${Number(price).toFixed(2)}
          </span>
        </motion.button>
        <motion.button
          onClick={handleAddToCart}
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-gray-700 dark:text-gray-200 transition-colors shadow-sm flex items-center justify-center shrink-0"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Skeleton loader component
export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl shadow-sm overflow-hidden p-4 animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
    <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md mt-4"></div>
  </div>
);

export default ProductCard;

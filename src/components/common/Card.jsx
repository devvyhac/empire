import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { WishlistContext } from "../../context/WishlistContext";
import { getProductPrices, getProductImage } from "../../utils/productUtils";

// Reusable ProductCard component with smooth slide-up hover action
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
    toast.success(`${product?.name || "Item"} Added to Cart`);
    addToCart(product);
  };

  const categoryName =
    typeof product?.category === "object"
      ? product?.category?.name
      : product?.category || "General";

  const imageUrl = getProductImage(product);
  const { unitPrice, originalPrice, hasDiscount } = getProductPrices(product);

  return (
    <div className="relative bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1.5 flex flex-col group overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform">
      {/* Discount/Special Tag */}
      {product?.tag && (
        <span
          className={`absolute top-3.5 left-3.5 z-10 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            product.tag === "-50%" ? "bg-red-500" : "bg-indigo-600"
          }`}
        >
          {product.tag}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => {
          if (isWishlisted) {
            removeFromWishlist(product);
          } else {
            addToWishlist(product);
          }
        }}
        className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-90 ${
          isWishlisted
            ? "text-red-500"
            : "text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
        }`}
        aria-label="Toggle wishlist"
      >
        <Heart
          className="w-4 h-4 transition-transform duration-200"
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </button>

      {/* Product Image with Zoom Preview */}
      <div
        onClick={() => navigate(`/product/${product?._id || product?.id}`)}
        className="relative w-full h-52 sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Product Info: Title, Category, and Bottom Action Row */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3
            onClick={() => navigate(`/product/${product?._id || product?.id}`)}
            className="font-poppins text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors duration-200 line-clamp-1"
          >
            {product?.name}
          </h3>
          <p className="font-inter text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {categoryName}
          </p>
        </div>

        {/* Price & Action Container with Slide-Up Animation */}
        <div className="relative mt-3 min-h-[38px] overflow-hidden flex items-center">
          {/* Default Price Row: Slides up out of view on desktop hover */}
          <div className="w-full flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-translate-y-full md:group-hover:opacity-0">
            {/* Price Display */}
            <div className="flex items-baseline space-x-1.5">
              {hasDiscount ? (
                <>
                  <p className="font-inter text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${unitPrice.toFixed(2)}
                  </p>
                  <p className="font-inter text-xs text-gray-400 dark:text-gray-500 line-through">
                    ${originalPrice.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="font-inter text-lg font-bold text-gray-900 dark:text-gray-100">
                  ${unitPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Mobile-Only Always-Visible Add to Cart Rounded Icon Button */}
            <button
              onClick={handleAddToCart}
              className="md:hidden w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-90 text-white shadow-md flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Hover Action: Slides UP smoothly into view on hover from bottom */}
          <div className="hidden md:flex absolute inset-0 items-center space-x-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 pointer-events-none md:group-hover:pointer-events-auto">
            <button
              onClick={handleBuy}
              className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white flex items-center justify-center text-xs font-semibold shadow-sm transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Buy <span className="ml-1 font-bold">${unitPrice.toFixed(2)}</span>
            </button>
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white active:scale-90 text-gray-700 dark:text-gray-200 shadow-sm flex items-center justify-center shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
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

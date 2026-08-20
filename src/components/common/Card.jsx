import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
      className="relative bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg flex flex-col group overflow-hidden"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Discount/Special Tag */}
      {product?.tag && (
        <span
          className={`absolute top-4 left-4 z-10 text-white text-xs font-bold px-2 py-1 rounded-full ${
            product.tag === "-50%" ? "bg-red-500" : "bg-[#ff69b4]"
          }`}
        >
          {product.tag}
        </span>
      )}

      {/* Wishlist Button - now toggles fill on click */}
      <motion.button
        onClick={() => {
          if (isWishlisted) {
            removeFromWishlist(product);
          } else {
            addToWishlist(product);
          }
        }}
        className={`absolute top-4 right-4 z-10 p-1 flex items-center justify-center transition-colors ${
          isWishlisted ? "text-red-500" : "text-gray-500 dark:text-gray-400"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          className="w-6 h-6"
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </motion.button>

      {/* Image with zoom effect */}
      <div
        onClick={() => navigate(`/product/${product?._id || product?.id}`)}
        className="relative w-full h-48 overflow-hidden rounded-t-xl mb-4 cursor-pointer"
      >
        <motion.img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Product Info - always visible title and category */}
      <div className="px-4 pt-0 pb-4">
        <h3 className="font-poppins text-lg font-semibold text-gray-900 dark:text-gray-100">
          {product?.name}
        </h3>
        <p className="font-inter text-sm text-gray-500 dark:text-gray-400 mt-1">
          {categoryName}
        </p>

        {/* Price Display - fades out on hover */}
        <div className="flex items-center space-x-2 my-2 transition-opacity duration-300 group-hover:opacity-0">
          {product?.discountPrice ? (
            <>
              <p className="font-inter text-xl font-bold text-gray-900 dark:text-gray-100">
                ${Number(product.discountPrice).toFixed(2)}
              </p>
              <p className="font-inter text-sm text-gray-400 dark:text-gray-500 line-through">
                ${Number(product.originalPrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-inter text-xl font-bold text-gray-900 dark:text-gray-100">
              ${Number(price).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Buy and Add to Cart Buttons - hidden by default, slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-2 flex space-x-2 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <motion.button
          onClick={handleBuy}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-sm font-medium transition-colors shadow-sm"
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
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors shadow-sm flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add to cart"
        >
          <ShoppingBag className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Skeleton loader component
export const SkeletonCard = () => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-4 animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl mb-4"></div>
    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md mt-4"></div>
  </div>
);

import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { Heart, ShoppingCart, ShoppingBag } from "lucide-react";

import { CartContext } from "../../context/CartContext";

// Reusable ProductCard component for the grid
export const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // State to manage the heart icon's fill status
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleBuy = () => console.log(`Buying ${product.name}.`);
  const handleAddToCart = () => {
    product.count = 1;
    addToCart(product);
  };

  // Function to toggle the wishlist state and log the action
  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(
      `${isWishlisted ? "Removing" : "Adding"} ${product.name} ${
        isWishlisted ? "from" : "to"
      } wishlist.`
    );
  };

  return (
    <motion.div
      className="relative bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg flex flex-col group overflow-hidden"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Discount/Special Tag */}
      {product.tag && (
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
        onClick={handleAddToWishlist}
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
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl mb-4">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Product Info - always visible title and category */}
      <div className="px-4 pt-0 pb-4">
        <h3 className="font-poppins text-lg font-semibold text-gray-900 dark:text-gray-100">
          {product.name}
        </h3>
        <p className="font-inter text-sm text-gray-500 dark:text-gray-400 mt-1">
          {product.category}
        </p>

        {/* Price Display - fades out on hover */}
        <div className="flex items-center space-x-2 my-2 transition-opacity duration-300 group-hover:opacity-0">
          {product.salePrice ? (
            <>
              <p className="font-inter text-xl font-bold text-gray-900 dark:text-gray-100">
                ${product.salePrice.toFixed(2)}
              </p>
              <p className="font-inter text-sm text-gray-400 dark:text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-inter text-xl font-bold text-gray-900 dark:text-gray-100">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Buy and Add to Cart Buttons - hidden by default, slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 flex space-x-2 bg-gray-50 dark:bg-gray-800 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
        <motion.button
          onClick={handleBuy}
          className="w-full py-2 rounded-lg bg-[#3a41a3] text-white flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy{" "}
          <span className="ml-2 font-bold">
            ${(product.salePrice || product.originalPrice).toFixed(2)}
          </span>
        </motion.button>
        <motion.button
          onClick={handleAddToCart}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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

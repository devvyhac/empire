import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  X,
  Star,
  StarHalf,
  ArrowRight,
  Package,
} from "lucide-react";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { WishlistContext } from "../context/WishlistContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

// Reusable StarRating component for product cards
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className="w-4 h-4 text-amber-400 dark:text-amber-300 fill-current"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className="w-4 h-4 text-amber-400 dark:text-amber-300 fill-current"
        />
      );
    } else {
      stars.push(
        <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-700" />
      );
    }
  }
  return <div className="flex items-center space-x-1">{stars}</div>;
};

// Wishlist Item Card Component
const WishlistItemCard = ({ item, onRemove, onAddToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-lg group overflow-hidden"
    >
      {/* Remove Button */}
      <motion.button
        onClick={() => {
          onRemove(item);
          toast.info(`Removed ${item.name} from wishlist!`);
        }}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Product Image */}
      <img
        src={item.images[0].url}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="font-poppins text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          SKU: {item.sku}
        </p>

        <div className="flex items-center space-x-2 my-2">
          {item.discountPrice ? (
            <>
              <p className="font-bold text-xl text-gray-900 dark:text-gray-100">
                ${item.discountPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 line-through">
                ${item.originalPrice.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-bold text-xl text-gray-900 dark:text-gray-100">
              ${item.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.button
        onClick={() => {
          onAddToCart(item);
          toast.success(`Added ${item.name} to cart!`);
        }}
        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center space-x-2 mt-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart</span>
      </motion.button>
    </motion.div>
  );
};

export default function WishlistPage() {
  // const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { removeFromWishlist, wishlistItems: wishlist } =
    useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  const isWishlistEmpty = wishlist?.length === 0 && !loading;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col items-center justify-center">
        <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Your Wishlist
        </h1>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
          Keep track of your favorite items.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 max-w-7xl mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <AnimatePresence>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
                <p className="mt-4">Loading your wishlist...</p>
              </div>
            ) : isWishlistEmpty ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="text-gray-700 dark:text-gray-300">
                  <Package className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  Wishlist Empty
                </h2>
                <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-2">
                  Start adding your favorites now!
                </p>
                <motion.button
                  className="mt-6 py-3 px-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Browse Products</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {wishlist.map((item) => (
                  <WishlistItemCard
                    key={item._id}
                    item={item}
                    onRemove={removeFromWishlist}
                    onAddToCart={addToCart}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
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
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Product Image */}
      <img
        src={item.image}
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
          {item.salePrice ? (
            <>
              <p className="font-bold text-xl text-gray-900 dark:text-gray-100">
                ${item.salePrice.toFixed(2)}
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
        onClick={() => onAddToCart(item)}
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

// Mock data for wishlisted products, now including an SKU
const initialWishlistItems = [
  {
    id: "2",
    name: "Wireless Headphones",
    sku: "WHP-101",
    originalPrice: 99.99,
    salePrice: 71.99,
    tag: "-50%",
    category: "Electronics",
    brand: "AudioPlus",
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Headphones",
  },
  {
    id: "5",
    name: "Running Shoes Pro",
    sku: "RSP-202",
    originalPrice: 120.0,
    salePrice: null,
    tag: "Special",
    category: "Footwear",
    brand: "RunFast",
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Running+Shoes",
  },
  {
    id: "9",
    name: "Designer T-Shirt",
    sku: "DTS-303",
    originalPrice: 45.0,
    salePrice: 30.0,
    tag: "-50%",
    category: "Apparel",
    brand: "UrbanStyle",
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Designer+T-shirt",
  },
  {
    id: "10",
    name: "Smartwatch V2",
    sku: "SW-V2",
    originalPrice: 199.99,
    salePrice: 159.99,
    category: "Electronics",
    brand: "TechGear",
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Smartwatch",
  },
  {
    id: "11",
    name: "Premium Backpack",
    sku: "PB-404",
    originalPrice: 85.0,
    salePrice: null,
    category: "Apparel",
    brand: "AdventureCo",
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Backpack",
  },
  {
    id: "12",
    name: "Wireless Mouse",
    sku: "WM-505",
    originalPrice: 25.0,
    salePrice: null,
    category: "Electronics",
    brand: "AudioPlus",
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Mouse",
  },
];

// Mock API functions
const fetchWishlist = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(initialWishlistItems);
    }, 1000)
  );
};

const removeItemApi = (id) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Simulating API call: removeItem(${id})`);
      resolve({ success: true });
    }, 500)
  );
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching and analytics tracking
  useEffect(() => {
    // Analytics tracking
    console.log("Analytics event tracked: view_wishlist");

    // SEO meta tags
    const metaTitle = "Your Wishlist - Gadgets Shop";
    const metaDescription =
      "Keep track of your favorite items from Gadgets Shop. Add to cart or remove them from your personal list.";
    console.log(`SEO Title: ${metaTitle}`);
    console.log(`SEO Description: ${metaDescription}`);

    // Simulate API call to get wishlist items
    const getWishlist = async () => {
      setLoading(true);
      try {
        const items = await fetchWishlist();
        setWishlist(items);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    getWishlist();
  }, []);

  const handleRemoveItem = async (id) => {
    await removeItemApi(id);
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    console.log(`Added ${item.name} to cart.`);
    // In a real app, you would dispatch a cart-related action or call a cart API.
    // For this example, we'll just remove it from the wishlist to simulate a common flow.
    handleRemoveItem(item.id);
  };

  const isWishlistEmpty = wishlist.length === 0 && !loading;

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
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Simple Page Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2024 Gadgets Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

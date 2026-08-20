import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
} from "lucide-react";
// Reusable Button components for consistent styling
const PrimaryButton = ({ children, ...props }) => (
  <motion.button
    className="flex-1 py-3 px-6 rounded-lg shadow-sm text-base font-inter flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    {children}
  </motion.button>
);

const OutlineButton = ({ children, ...props }) => (
  <motion.button
    className="md:flex-grow-0 py-3 px-6 rounded-lg shadow-sm text-base font-inter bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    {children}
  </motion.button>
);

import StarRating from "./StarRating.jsx";
import { Link } from "react-router-dom";

const ProductInfo = ({
  product,
  handleAddToCart,
  handleRemoveFromCart,
  updateItemQuantity,
  handleAddToWishlist,
  quantity,
  setQuantity,
}) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantSelect = (type, option) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: option }));
  };

  const handleQuantityChange = (e) => {
    updateItemQuantity(cartItem, parseInt(e.target.value));
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const handleImageNav = (delta) => {
    setActiveImageIndex(
      (prevIndex) =>
        (prevIndex + delta + product.images.length) % product.images.length
    );
  };

  useEffect(() => {}, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
      {/* Left Column: Image Gallery */}
      <div className="flex flex-col items-center">
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg group">
          <motion.img
            key={activeImageIndex}
            src={product.images[activeImageIndex].url}
            alt={`${product.name} - Image ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
            onClick={() => handleImageNav(-1)}
            className="absolute left-3 p-2 rounded-full shadow-md backdrop-blur-sm text-gray-900 dark:text-gray-100 bg-white/70 dark:bg-gray-800/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            initial={{ y: "-50%" }}
            animate={{ y: "-50%" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ top: "50%" }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => handleImageNav(1)}
            className="absolute right-3 p-2 rounded-full shadow-md backdrop-blur-sm text-gray-900 dark:text-gray-100 bg-white/70 dark:bg-gray-800/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            initial={{ y: "-50%" }}
            animate={{ y: "-50%" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ top: "50%" }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide w-full">
          {product.images.map((img, index) => (
            <motion.img
              key={index}
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setActiveImageIndex(index)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                activeImageIndex === index
                  ? "border-2 border-primary-light dark:border-primary-dark shadow-md"
                  : "border-2 border-transparent"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Product Info */}

      <div className="flex flex-col space-y-6">
        <h1 className="font-poppins text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          {product.name}
        </h1>
        <p className="font-inter text-sm text-gray-700 dark:text-gray-300">
          SKU: {product.sku}
        </p>

        <div className="flex items-center space-x-2">
          <StarRating rating={(Math.random() * (5 - 4) + 4).toFixed(1)} />
          <span className="text-gray-700 dark:text-gray-300">
            ({(Math.random() * (5 - 4) + 4).toFixed(1)})
          </span>
          <Link
            to="#reviews"
            className="text-sm text-primary-light dark:text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            Read all {7} reviews
          </Link>
        </div>

        <p className="font-inter text-2xl font-bold text-primary-light dark:text-primary-dark">
          $
          {product.discountPrice
            ? product.discountPrice.toFixed(2)
            : product.originalPrice.toFixed(2)}
        </p>

        {product.variants.map((variant) => (
          <div key={variant.type}>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
              {variant.type}:
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {variant.options.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleVariantSelect(variant.type, option)}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light ${
                    selectedVariants[variant.type] === option
                      ? "bg-primary-light dark:bg-primary-dark text-white border-primary-light dark:border-primary-dark"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              product.stock > 10 ? "bg-success-light" : "bg-error-light"
            }`}
          ></div>
          <span
            className={`text-sm ${
              product.stock > 10
                ? "text-success-light dark:text-success-dark"
                : "text-error-light dark:text-error-dark"
            }`}
          >
            {product.stock > 10 ? "In Stock" : "Low Stock"}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Quantity:
          </h3>
          <div className="flex items-center space-x-2 border border-gray-300 dark:border-gray-700 rounded-lg p-1">
            <motion.button
              onClick={() => {
                handleRemoveFromCart(product);
                // setQuantity((prev) => prev - 1);
              }}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-12 text-center bg-transparent p-0 m-0 text-gray-900 dark:text-gray-100 font-medium focus:outline-none"
              min="1"
            />
            <motion.button
              onClick={() => {
                handleAddToCart(product);
                // setQuantity((prev) => prev + 1);
              }}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
          <PrimaryButton
            onClick={() => handleAddToCart(product)}
            disabled={product.quantity <= 0 || product.stock < product.quantity}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </PrimaryButton>
          <OutlineButton onClick={() => handleAddToWishlist(product)}>
            <Heart className="w-5 h-5 mr-2" />
            Wishlist
          </OutlineButton>
        </div>

        <div className="flex items-center space-x-2 mt-4 text-gray-700 dark:text-gray-300">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Share this product</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

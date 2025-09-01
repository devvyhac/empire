import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  StarHalf,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";

// Custom Tailwind CSS colors from the design brief
const customColors = {
  "primary-light": "#4c51bf",
  "primary-dark": "#3a41a3",
  "secondary-light": "#60a5fa",
  "secondary-dark": "#3b82f6",
  "success-light": "#10b981",
  "success-dark": "#059669",
  "error-light": "#ef4444",
  "error-dark": "#dc2626",
};

// Mock product data - includes images, variants, and other details
const mockProduct = {
  id: "PROD-001",
  name: "Mechanical Keyboard with RGB Lighting",
  sku: "KB-101-BLK-MX",
  price: 129.99,
  rating: 4.5,
  images: [
    "https://placehold.co/800x600/E5E7EB/1F2937?text=Product+Image+1",
    "https://placehold.co/800x600/E5E7EB/1F2937?text=Product+Image+2",
    "https://placehold.co/800x600/E5E7EB/1F2937?text=Product+Image+3",
  ],
  description: `This high-performance mechanical keyboard is designed for gamers and professionals. It features a durable aluminum chassis, customizable RGB backlighting, and your choice of Cherry MX switches. The ergonomic design ensures comfortable use during long sessions, and its anti-ghosting technology guarantees every keystroke is registered accurately.
  
  **Key Features:**
  * Durable aluminum construction
  * Full RGB customizable backlighting
  * Choice of Cherry MX mechanical switches
  * Full N-key rollover and anti-ghosting
  * Ergonomic key layout`,
  specifications: {
    dimensions: '17.5" x 5.5" x 1.5"',
    weight: "2.5 lbs",
    connectivity: "USB-C",
    material: "Aluminum, ABS plastic",
    switches: "Cherry MX Red, Blue, Brown",
  },
  variants: [
    { type: "color", options: ["Black", "White"] },
    {
      type: "switches",
      options: ["Cherry MX Red", "Cherry MX Blue", "Cherry MX Brown"],
    },
  ],
  stock: 25,
};

// Mock review data
const mockReviews = [
  {
    id: 1,
    author: "Jane Doe",
    rating: 5,
    comment:
      "Absolutely love this keyboard! The RGB is amazing and the Cherry MX Red switches feel fantastic for gaming.",
    date: "2024-08-01",
  },
  {
    id: 2,
    author: "John Smith",
    rating: 4,
    comment:
      "A very solid keyboard for the price. The build quality is excellent. The only minor complaint is the software can be a bit clunky.",
    date: "2024-07-28",
  },
];

// Mock related products data
const mockRelatedProducts = [
  {
    id: "RELATED-1",
    name: "Gaming Mouse",
    price: 59.99,
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Gaming+Mouse",
  },
  {
    id: "RELATED-2",
    name: "Large Mouse Pad",
    price: 24.99,
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Mouse+Pad",
  },
  {
    id: "RELATED-3",
    name: "Headphones",
    price: 99.99,
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Headphones",
  },
  {
    id: "RELATED-4",
    name: "Monitor Stand",
    price: 39.99,
    image: "https://placehold.co/400x300/E5E7EB/1F2937?text=Monitor+Stand",
  },
];

// Reusable Product Card component for related products
const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden p-4 text-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover rounded-md mb-2"
    />
    <h3 className="font-poppins text-lg font-semibold text-gray-900 dark:text-gray-100">
      {product.name}
    </h3>
    <p className="font-inter text-md text-primary-light dark:text-primary-dark">
      ${product.price.toFixed(2)}
    </p>
  </motion.div>
);

// Star rating component
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className="w-5 h-5 text-amber-400 dark:text-amber-300 fill-current"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className="w-5 h-5 text-amber-400 dark:text-amber-300 fill-current"
        />
      );
    } else {
      stars.push(
        <Star key={i} className="w-5 h-5 text-gray-300 dark:text-gray-700" />
      );
    }
  }
  return <div className="flex items-center space-x-1">{stars}</div>;
};

// Main App component
export default function App() {
  const [activeImage, setActiveImage] = useState(mockProduct.images[0]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: "",
    images: [],
  });

  // Mock authentication state for review form
  const isAuthenticated = true;

  // Simulate analytics tracking when the component mounts
  useEffect(() => {
    console.log(
      `Analytics event tracked: view_product - Product ID: ${mockProduct.id}`
    );
  }, []);

  // Handle variant selection
  const handleVariantSelect = (type, option) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: option }));
  };

  // Handle quantity change
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    console.log(
      `Adding ${quantity} of ${mockProduct.name} to cart with variants:`,
      selectedVariants
    );
  };

  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    console.log(`Adding ${mockProduct.name} to wishlist.`);
  };

  // Handle review form changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setUserReview((prev) => ({ ...prev, [name]: value }));
  };

  // Handle star rating selection
  const handleStarSelect = (rating) => {
    setUserReview((prev) => ({ ...prev, rating }));
  };

  // Handle review form submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting review:", userReview);
    // In a real app, you'd send this to an API
    setIsReviewModalOpen(false);
    setUserReview({ rating: 0, comment: "", images: [] });
  };

  return (
    <main className="flex min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 font-inter">
      <div className="w-full max-w-7xl mx-auto">
        {/* Product Header & Main Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col items-center">
            {/* Main Image with Zoom */}
            <motion.div
              className="relative w-full overflow-hidden rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={activeImage}
                alt={mockProduct.name}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </motion.div>

            {/* Thumbnail Carousel */}
            <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide w-full">
              {mockProduct.images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                    activeImage === img
                      ? "border-2 border-primary-light dark:border-primary-dark shadow-md"
                      : "border-2 border-transparent"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col space-y-4">
            <h1 className="font-poppins text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {mockProduct.name}
            </h1>
            <p className="font-inter text-sm text-gray-700 dark:text-gray-300">
              SKU: {mockProduct.sku}
            </p>

            {/* Star Rating */}
            <div className="flex items-center space-x-2">
              <StarRating rating={mockProduct.rating} />
              <span className="text-gray-700 dark:text-gray-300">
                ({mockProduct.rating})
              </span>
            </div>

            <p className="font-inter text-2xl font-bold text-primary-light dark:text-primary-dark">
              ${mockProduct.price.toFixed(2)}
            </p>

            {/* Variant Selectors */}
            {mockProduct.variants.map((variant) => (
              <div key={variant.type}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                  {variant.type}:
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {variant.options.map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleVariantSelect(variant.type, option)}
                      className={`py-2 px-4 rounded-md text-sm font-medium transition-colors border ${
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

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  mockProduct.stock > 10 ? "bg-success-light" : "bg-error-light"
                }`}
              ></div>
              <span
                className={`text-sm ${
                  mockProduct.stock > 10
                    ? "text-success-light dark:text-success-dark"
                    : "text-error-light dark:text-error-dark"
                }`}
              >
                {mockProduct.stock > 10 ? "In Stock" : "Low Stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Quantity:
              </h3>
              <div className="flex items-center space-x-2 border border-gray-300 dark:border-gray-700 rounded-lg p-1">
                <motion.button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="w-8 text-center text-gray-900 dark:text-gray-100">
                  {quantity}
                </span>
                <motion.button
                  onClick={() => handleQuantityChange(1)}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-lg shadow-sm text-base font-inter text-white bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </motion.button>
              <motion.button
                onClick={handleAddToWishlist}
                className="md:flex-grow-0 py-3 px-6 rounded-lg shadow-sm text-base font-inter text-primary-light dark:text-primary-dark bg-transparent border-2 border-primary-light dark:border-primary-dark hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </motion.button>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center space-x-2 mt-4 text-gray-700 dark:text-gray-300">
              <Share2 className="w-5 h-5" />
              <span className="text-sm">Share this product</span>
            </div>
          </div>
        </div>

        {/* --- */}

        {/* Tabbed Content Section */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <motion.button
              onClick={() => setActiveTab("description")}
              className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                activeTab === "description"
                  ? "border-b-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              whileHover={{ y: -2 }}
            >
              Description
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("specifications")}
              className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                activeTab === "specifications"
                  ? "border-b-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              whileHover={{ y: -2 }}
            >
              Specifications
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("reviews")}
              className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                activeTab === "reviews"
                  ? "border-b-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              whileHover={{ y: -2 }}
            >
              Reviews
            </motion.button>
          </div>

          {/* Tab Content */}
          <div className="prose dark:prose-invert max-w-none">
            {activeTab === "description" && (
              <div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Product Details
                </h2>
                <p>{mockProduct.description}</p>
              </div>
            )}
            {activeTab === "specifications" && (
              <div className="space-y-2">
                <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Specifications
                </h2>
                <ul className="list-disc list-inside">
                  {Object.entries(mockProduct.specifications).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
                  What Customers Say
                </h2>
                <p className="font-inter text-base text-gray-700 dark:text-gray-300">
                  Share your experience.
                </p>

                {/* Review Form (for authenticated users) */}
                {isAuthenticated && (
                  <div className="mt-6 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <form onSubmit={handleReviewSubmit}>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Write a Review
                      </h3>
                      <div className="flex space-x-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer transition-colors ${
                              star <= userReview.rating
                                ? "text-amber-400 dark:text-amber-300 fill-current"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            onClick={() => handleStarSelect(star)}
                          />
                        ))}
                      </div>
                      <textarea
                        name="comment"
                        value={userReview.comment}
                        onChange={handleReviewChange}
                        placeholder="Your review..."
                        className="w-full mt-4 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        rows="4"
                        required
                      ></textarea>
                      <motion.button
                        type="submit"
                        className="mt-4 py-2 px-4 rounded-lg bg-primary-light dark:bg-primary-dark text-white font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit Review
                      </motion.button>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                <div className="mt-8 space-y-6">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} />
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {review.author}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          - {review.date}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- */}

        {/* Related Products Section */}
        <div>
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Explore Similar Items
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockRelatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

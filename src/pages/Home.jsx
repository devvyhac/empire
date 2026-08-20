import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Sparkles, ChevronRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { ProductCard, SkeletonCard } from "../components/common/Card";

const mockData = {
  featuredProducts: [
    {
      id: 1,
      headline: "Unleash Your Style with Top Picks!",
      subtext: "Shop exclusive deals on electronics, fashion, and more.",
      ctaText: "Shop Now",
      image:
        "https://images.pexels.com/photos/1093236/pexels-photo-1093236.jpeg",
    },
    {
      id: 2,
      headline: "The Latest Tech is Here",
      subtext: "Explore our new collection of cutting-edge gadgets.",
      ctaText: "Discover Now",
      image:
        "https://images.pexels.com/photos/2686903/pexels-photo-2686903.jpeg",
    },
    {
      id: 3,
      headline: "Level Up Your Gear",
      subtext: "Find powerful new devices for work and play.",
      ctaText: "Explore Gear",
      image:
        "https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://images.pexels.com/photos/14438772/pexels-photo-14438772.jpeg",
    },
    {
      id: 2,
      name: "Clothing",
      image: "https://images.pexels.com/photos/934069/pexels-photo-934069.jpeg",
    },
    {
      id: 3,
      name: "Home Goods",
      image:
        "https://images.pexels.com/photos/12285888/pexels-photo-12285888.jpeg",
    },
    {
      id: 4,
      name: "Books",
      image: "https://images.pexels.com/photos/45717/pexels-photo-45717.jpeg",
    },
  ],
  promotions: {
    code: "SAVE10",
    message: "for 10% off your first order.",
  },
};

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={() => navigate("/shop")}
      className="relative w-full h-52 rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-gray-200/80 dark:border-gray-700/80 bg-gray-100 dark:bg-gray-800"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 transition-opacity duration-300">
        <h3 className="text-xl font-poppins font-bold text-white drop-shadow-sm flex items-center justify-between">
          <span>{category.name}</span>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
        </h3>
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();

  const { products, loading } = useContext(ProductContext);

  // Carousel autoplay logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % mockData.featuredProducts.length
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [mockData.featuredProducts.length]);

  // Handle touch swipe for carousel
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % mockData.featuredProducts.length
      );
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setCurrentSlide(
        (prevSlide) =>
          (prevSlide - 1 + mockData.featuredProducts.length) %
          mockData.featuredProducts.length
      );
    }
  };

  const handleCopyCode = () => {
    const codeToCopy = mockData.promotions.code;
    const tempInput = document.createElement("textarea");
    tempInput.value = codeToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(tempInput);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[75vh] md:h-[82vh] overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={currentSlide}>
              {mockData.featuredProducts.map(
                (slide, index) =>
                  currentSlide === index && (
                    <motion.div
                      key={slide.id}
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={slide.image}
                        alt={`Slide ${slide.id}`}
                        className="w-full h-full object-cover brightness-[0.65] dark:brightness-[0.55]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-black/30" />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center text-white">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 dark:bg-gray-800/60 backdrop-blur-md text-white mb-4 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Featured Collection</span>
              </span>
              <h1 className="font-poppins text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
                {mockData.featuredProducts[currentSlide].headline}
              </h1>
              <p className="font-inter text-base sm:text-lg md:text-xl text-gray-200 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                {mockData.featuredProducts[currentSlide].subtext}
              </p>
              <motion.button
                onClick={() => navigate("/shop")}
                className="inline-flex items-center space-x-2.5 mt-8 py-3.5 px-8 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{mockData.featuredProducts[currentSlide].ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* Carousel Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-10">
            {mockData.featuredProducts.map((_, index) => (
              <button
                key={index}
                aria-label={`Slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-indigo-500 shadow-md"
                    : "w-2.5 bg-white/60 hover:bg-white/90"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Categories
              </span>
              <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-1">
                Explore Our Collections
              </h2>
              <p className="font-inter text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Discover quality products across electronics, apparel, and modern essentials.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {mockData.categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotions Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-900/80 dark:via-indigo-900/80 dark:to-blue-950/90 text-white py-14 sm:py-16 border-y border-indigo-500/20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-3">
              Limited Offer
            </span>
            <h2 className="font-poppins text-2xl sm:text-4xl font-extrabold text-white">
              Special Discount For You!
            </h2>
            <p className="font-inter text-sm sm:text-base text-blue-100 mt-2">
              Use code{" "}
              <motion.button
                className="font-mono font-bold tracking-widest bg-white text-indigo-600 dark:bg-gray-800 dark:text-indigo-300 px-3 py-1 rounded-lg inline-flex items-center space-x-1.5 cursor-pointer shadow-sm mx-1.5"
                onClick={handleCopyCode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Click to copy promo code"
              >
                <span>{mockData.promotions.code}</span>
                <Copy className="w-3.5 h-3.5" />
              </motion.button>{" "}
              {mockData.promotions.message}
            </p>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs font-semibold mt-3 text-green-300 bg-green-950/60 inline-block px-3 py-1 rounded-full border border-green-700/50"
                >
                  Promo code copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Fresh Arrivals Section */}
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  New In Store
                </span>
                <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-1">
                  Fresh Arrivals Await
                </h2>
                <p className="font-inter text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  Check out our handpicked latest additions.
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <span>View all products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(products || []).slice(0, 6).map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

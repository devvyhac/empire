import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Facebook, Instagram, Twitter } from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

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

const ProductCard = ({ product, addToCart }) => {
  const imageUrl =
    product?.images?.[0]?.url ||
    product?.image ||
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&h=500&fit=crop";

  const price =
    product?.discountedPrice ?? product?.discountPrice ?? product?.originalPrice ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden text-left"
    >
      <img
        src={imageUrl}
        alt={product?.altText || product?.name || "Product"}
        className="w-full h-48 object-cover object-center"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-poppins font-bold text-gray-900 dark:text-gray-100">
          {product?.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {product?.sku || "SKU-001"}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            ${Number(price).toFixed(2)}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400">★★★★</span>
            <span className="text-gray-400">★</span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              4.5
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product);
            toast.success("Product added to cart!");
          }}
          className="mt-4 w-full py-2 px-4 rounded-full text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

const CategoryCard = ({ category }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative w-full h-48 rounded-xl overflow-hidden group cursor-pointer shadow-md"
    whileHover={{ scale: 1.05 }}
  >
    <img
      src={category.image}
      alt={category.name}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-60">
      <h3 className="text-2xl font-poppins font-bold text-white drop-shadow-md">
        {category.name}
      </h3>
    </div>
  </motion.div>
);

const SocialIcon = ({ icon: Icon, href }) => (
  <a
    href={href}
    className="text-secondary-light dark:text-secondary-dark hover:text-white transition-colors"
  >
    <Icon className="w-6 h-6" />
  </a>
);

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNewsletterCollapsed, setIsNewsletterCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

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
      // Swipe left
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % mockData.featuredProducts.length
      );
    }
    if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      setCurrentSlide(
        (prevSlide) =>
          (prevSlide - 1 + mockData.featuredProducts.length) %
          mockData.featuredProducts.length
      );
    }
  };

  // Simulate API calls and analytics
  useEffect(() => {
    const link = document.createElement("link");
    document.head.appendChild(link);
  }, []);

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
      console.log("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(tempInput);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] overflow-hidden">
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
                    <motion.img
                      key={slide.id}
                      src={slide.image}
                      alt={`Slide ${slide.id}`}
                      className="absolute inset-0 w-full h-full object-cover brightness-75"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )
              )}
            </AnimatePresence>
          </div>
          <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full text-center text-white p-4">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white dark:text-gray-100">
                {mockData.featuredProducts[currentSlide].headline}
              </h1>
              <p className="font-inter text-lg md:text-xl text-white dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                {mockData.featuredProducts[currentSlide].subtext}
              </p>
              <motion.a
                href="#"
                className="inline-flex items-center space-x-2 mt-8 py-4 px-8 rounded-full text-lg font-bold text-black bg-white dark:bg-primary-dark hover:bg-black hover:text-white dark:hover:bg-primary-light transition-colors duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{mockData.featuredProducts[currentSlide].ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {mockData.featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? "bg-indigo-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-poppins text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Explore Our Collections
            </h2>
            <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-2">
              Discover products across Electronics, Clothing, and more.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {mockData.categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotions Banner - FIX APPLIED HERE */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white dark:from-indigo-800 dark:to-purple-800 dark:text-white py-16 lg:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4"
          >
            <h2 className="font-poppins text-2xl md:text-4xl font-extrabold">
              Limited Time Offer!
            </h2>
            <p className="font-inter text-base md:text-lg mt-2">
              Use code{" "}
              <motion.span
                className="font-bold tracking-widest bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-md inline-flex items-center space-x-2 cursor-pointer"
                onClick={handleCopyCode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{mockData.promotions.code}</span>
                <Copy className="w-4 h-4" />
              </motion.span>{" "}
              {mockData.promotions.message}
            </p>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm mt-4 text-green-300"
                >
                  Code copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-poppins text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Fresh Arrivals Await
            </h2>
            <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-2">
              Check out our latest additions.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {(products || []).slice(0, 6).map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

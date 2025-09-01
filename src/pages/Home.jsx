import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Facebook, Instagram, Twitter } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

// Custom colors for the design rules
const accentLight = "#6366F1"; // indigo-500
const accentDark = "#A5B4FC"; // indigo-300
const primaryLight = "#4F46E5"; // indigo-600
const primaryDark = "#818CF8"; // indigo-400
const secondaryLight = "#A855F7"; // purple-500
const secondaryDark = "#C084FC"; // purple-400

const mockData = {
  featuredProducts: [
    {
      id: 1,
      headline: "Unleash Your Style with Top Picks!",
      subtext: "Shop exclusive deals on electronics, fashion, and more.",
      ctaText: "Shop Now",
      image:
        "https://placehold.co/1920x1080/4F46E5/FFFFFF?text=Featured+Product+1",
    },
    {
      id: 2,
      headline: "The Latest Tech is Here",
      subtext: "Explore our new collection of cutting-edge gadgets.",
      ctaText: "Discover Now",
      image:
        "https://placehold.co/1920x1080/6366F1/FFFFFF?text=Featured+Product+2",
    },
    {
      id: 3,
      headline: "Level Up Your Gear",
      subtext: "Find powerful new devices for work and play.",
      ctaText: "Explore Gear",
      image:
        "https://placehold.co/1920x1080/818CF8/FFFFFF?text=Featured+Product+3",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Electronics",
      image: "https://placehold.co/600x400/FEE2E2/EF4444?text=Electronics",
    },
    {
      id: 2,
      name: "Clothing",
      image: "https://placehold.co/600x400/E0E7FF/4F46E5?text=Clothing",
    },
    {
      id: 3,
      name: "Home Goods",
      image: "https://placehold.co/600x400/D1FAE5/10B981?text=Home+Goods",
    },
    {
      id: 4,
      name: "Books",
      image: "https://placehold.co/600x400/F5E6CC/F97316?text=Books",
    },
  ],
  promotions: {
    code: "SAVE10",
    message: "for 10% off your first order.",
  },
  newArrivals: [
    {
      id: 1,
      name: "Wireless Headphones",
      sku: "WHP-001",
      price: 99.99,
      rating: 4.5,
      image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Headphones",
      alt: "Wireless Headphones",
    },
    {
      id: 2,
      name: "Smart Watch",
      sku: "SW-002",
      price: 199.99,
      rating: 4.8,
      image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Smart+Watch",
      alt: "Smart Watch",
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      sku: "MK-003",
      price: 129.99,
      rating: 4.7,
      image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Keyboard",
      alt: "Mechanical Keyboard",
    },
    {
      id: 4,
      name: "Ergonomic Mouse",
      sku: "EM-004",
      price: 49.99,
      rating: 4.2,
      image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Mouse",
      alt: "Ergonomic Mouse",
    },
    {
      id: 5,
      name: "Portable Speaker",
      sku: "PS-005",
      price: 79.99,
      rating: 4.6,
      image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Speaker",
      alt: "Portable Speaker",
    },
    {
      id: 6,
      name: "Power Bank",
      sku: "PB-006",
      price: 39.99,
      rating: 4.3,
      image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Power+Bank",
      alt: "Power Bank",
    },
  ],
};

const ProductCard = ({ product }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
  >
    <img
      src={product.image}
      alt={product.alt}
      className="w-full h-48 object-cover object-center"
      loading="lazy"
    />
    <div className="p-4">
      <h3 className="text-lg font-poppins font-bold text-gray-900 dark:text-gray-100">
        {product.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {product.sku}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          ${product.price}
        </span>
        <div className="flex items-center">
          <span className="text-yellow-400">
            {"★".repeat(Math.floor(product.rating))}
          </span>
          <span className="text-gray-400">
            {"★".repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
            {product.rating}
          </span>
        </div>
      </div>
      <button className="mt-4 w-full py-2 px-4 rounded-full text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition-colors">
        Add to Cart
      </button>
    </div>
  </motion.div>
);

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

  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);

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
                      className="absolute inset-0 w-full h-full object-cover"
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
              <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                {mockData.featuredProducts[currentSlide].headline}
              </h1>
              <p className="font-inter text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                {mockData.featuredProducts[currentSlide].subtext}
              </p>
              <motion.a
                href="#"
                className="inline-flex items-center space-x-2 mt-8 py-4 px-8 rounded-full text-lg font-bold text-white bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-300 transform hover:scale-105 shadow-lg"
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
              {mockData.newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { ShoppingCart, ArrowRight, TrendingUp, Sparkles, Zap, Headphones, Watch, Camera } from 'lucide-react';

// // Reusable Product Card component for featured products
// const FeaturedProductCard = ({ product }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
//     >
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-56 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
//       />
//       <div className="p-5 flex-grow flex flex-col justify-between">
//         <div>
//           <h3 className="font-poppins text-xl font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
//           <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
//             {product.description}
//           </p>
//         </div>
//         <div className="mt-4 flex items-center justify-between">
//           <p className="font-poppins text-2xl font-bold text-indigo-600 dark:text-indigo-400">${product.price.toFixed(2)}</p>
//           <motion.button
//             className="p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <ShoppingCart className="w-5 h-5" />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Mock data for the Home Page
// const featuredProducts = [
//   { id: 1, name: 'Wireless Headphones Pro', description: 'Experience crystal-clear sound with active noise cancellation.', price: 199.99, image: 'https://placehold.co/600x400/E5E7EB/1F2937?text=Headphones' },
//   { id: 2, name: '4K Smart TV', description: 'Immersive viewing with vibrant colors and deep blacks.', price: 799.99, image: 'https://placehold.co/600x400/E5E7EB/1F2937?text=Smart+TV' },
//   { id: 3, name: 'Smartwatch Series 5', description: 'Track your fitness, notifications, and more in style.', price: 299.99, image: 'https://placehold.co/600x400/E5E7EB/1F2937?text=Smartwatch' },
// ];

// const categories = [
//   { name: 'Audio', icon: Headphones, href: '#' },
//   { name: 'Wearables', icon: Watch, href: '#' },
//   { name: 'Cameras', icon: Camera, href: '#' },
//   { name: 'Trending', icon: TrendingUp, href: '#' },
// ];

// export default function HomePage() {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, 200]);

//   // Simulate analytics and SEO data on component mount
//   useEffect(() => {
//     console.log("Analytics event tracked: view_homepage");
//     const metaTitle = "Gadgets Shop - Home";
//     const metaDescription = "Shop the latest gadgets and electronics, from headphones to smartwatches. Discover new arrivals and featured products.";
//     console.log(`SEO Title: ${metaTitle}`);
//     console.log(`SEO Description: ${metaDescription}`);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 flex flex-col">
//       {/* Hero Section */}
//       <div className="relative w-full h-[80vh] overflow-hidden bg-gray-900 dark:bg-gray-800">
//         <motion.div
//           style={{ y }}
//           className="absolute inset-0 w-full h-full"
//         >
//           <img
//             src="https://placehold.co/1920x1080/1F2937/D1D5DB?text=Hero+Background"
//             alt="Hero Background"
//             className="w-full h-full object-cover opacity-60"
//           />
//         </motion.div>
//         <div className="relative z-10 container mx-auto flex items-center justify-center h-full px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-white dark:text-gray-100"
//           >
//             <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
//               Discover the Future of Tech
//             </h1>
//             <p className="font-inter text-lg md:text-xl text-gray-200 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
//               Explore the latest in innovation, design, and performance with our curated collection of gadgets.
//             </p>
//             <a href="#" className="inline-flex items-center space-x-2 mt-8 py-4 px-8 rounded-full text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 shadow-lg">
//               <span>Shop Now</span>
//               <ArrowRight className="w-5 h-5" />
//             </a>
//           </motion.div>
//         </div>
//       </div>

//       <main className="flex-grow">
//         {/* Featured Products Section */}
//         <section className="container mx-auto px-4 py-16 lg:py-24">
//           <div className="text-center mb-12">
//             <h2 className="font-poppins text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
//               Featured Products
//             </h2>
//             <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
//               Our top picks and best sellers, hand-picked for you.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredProducts.map(product => (
//               <FeaturedProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </section>

//         {/* CTA Banners Section */}
//         <section className="bg-gray-200 dark:bg-gray-800 py-16 lg:py-24">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Left Banner */}
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8 }}
//                 className="relative bg-white dark:bg-gray-700 rounded-2xl p-8 md:p-12 text-center overflow-hidden"
//               >
//                 <div className="relative z-10">
//                   <h3 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     Next-Gen Gaming
//                   </h3>
//                   <p className="font-inter text-gray-700 dark:text-gray-300 mt-2">
//                     Level up your play with our powerful consoles and accessories.
//                   </p>
//                   <a href="#" className="inline-flex items-center space-x-2 mt-6 py-3 px-6 rounded-full text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
//                     <span>Shop Now</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </a>
//                 </div>
//                 <img src="https://placehold.co/600x400/93C5FD/1E3A8A?text=Gaming+Banner" alt="Gaming Banner" className="absolute inset-0 w-full h-full object-cover opacity-20" />
//               </motion.div>

//               {/* Right Banner */}
//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8 }}
//                 className="relative bg-white dark:bg-gray-700 rounded-2xl p-8 md:p-12 text-center overflow-hidden"
//               >
//                 <div className="relative z-10">
//                   <h3 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     Smart Home, Simplified
//                   </h3>
//                   <p className="font-inter text-gray-700 dark:text-gray-300 mt-2">
//                     Discover smart devices that make life easier and more connected.
//                   </p>
//                   <a href="#" className="inline-flex items-center space-x-2 mt-6 py-3 px-6 rounded-full text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
//                     <span>Shop Now</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </a>
//                 </div>
//                 <img src="https://placehold.co/600x400/C7D2FE/374151?text=Smart+Home+Banner" alt="Smart Home Banner" className="absolute inset-0 w-full h-full object-cover opacity-20" />
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Categories Section */}
//         <section className="container mx-auto px-4 py-16 lg:py-24">
//           <div className="text-center mb-12">
//             <h2 className="font-poppins text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
//               Browse by Category
//             </h2>
//             <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
//               Find exactly what you're looking for.
//             </p>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             {categories.map((category, index) => (
//               <motion.a
//                 key={index}
//                 href={category.href}
//                 className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//               >
//                 <category.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
//                 <p className="mt-4 font-semibold text-lg text-gray-900 dark:text-gray-100">{category.name}</p>
//               </motion.a>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-12">
//         <div className="container mx-auto text-center px-4">
//           <p className="text-lg font-poppins font-bold">Gadgets Shop</p>
//           <p className="text-sm mt-2">&copy; 2024. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

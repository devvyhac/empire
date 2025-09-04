import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
} from "lucide-react";

import { ProductCard, SkeletonCard } from "../../components/common/Card.jsx";
import { CustomCheckbox } from "../../components/common/CustomCheckbox.jsx";
import { mockColors } from "../../context/mockData.jsx";
import { ProductContext } from "../../context/ProductContext.jsx";

import { FilterSection } from "./components/FilterSection.jsx";

const Catalog = () => {
  const { products: rawProducts, productLoading } = useContext(ProductContext);

  const categories = [
    "All",
    ...new Set(rawProducts.map((item) => item.category.name)),
  ];
  const brands = ["All", ...new Set(rawProducts.map((item) => item.brand))];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 1000],
    brand: "All",
    color: "All",
    inStock: false,
  });
  const [sortOrder, setSortOrder] = useState("newness");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState({
    category: true,
    priceRange: true,
    brand: false,
    color: false,
  });

  const productsPerPage = 6;
  const totalPages = Math.ceil(rawProducts.length / productsPerPage);

  useEffect(() => {
    if (productLoading) {
      return;
    }
    setLoading(true);
    let filteredProducts = rawProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filters.category === "All" || product.category === filters.category;
      const matchesBrand =
        filters.brand === "All" || product.brand === filters.brand;
      const matchesPrice =
        product.originalPrice >= filters.priceRange[0] &&
        product.originalPrice <= filters.priceRange[1];
      const matchesColor = filters.color === "All" || filters.color === "Blue";
      const matchesInStock = !filters.inStock || product.inStock;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesColor &&
        matchesInStock
      );
    });

    switch (sortOrder) {
      case "price_asc":
        filteredProducts.sort((a, b) => a.originalPrice - b.originalPrice);
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => b.originalPrice - a.originalPrice);
        break;
      case "rating_desc":
      default:
        break;
    }

    setProducts(filteredProducts);
    setLoading(false);
  }, [searchQuery, filters, sortOrder, rawProducts]);

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      priceRange:
        name === "min"
          ? [Number(value), prev.priceRange[1]]
          : [prev.priceRange[0], Number(value)],
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalFilteredItems = products.length;

  return (
    <div className="container mx-auto min-h-screen bg-white dark:bg-gray-900 font-inter sm:px-4 text-gray-900 dark:text-gray-100">
      {/* Sticky Search Bar */}
      <div className=" dark:bg-gray-800 p-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center w-full md:w-auto">
          <h1 className="font-poppins text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex-shrink-0">
            <span className="text-base text-gray-400">Home/ </span>Catalog
          </h1>
          {/* Mobile Filter Button */}
          <motion.button
            onClick={() => setIsFiltersModalOpen(true)}
            className="md:hidden ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4c51bf]"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4c51bf] appearance-none"
          >
            <option value="newness">Sort by: Newest</option>
            <option value="price_asc">Sort by: Price, Low to High</option>
            <option value="price_desc">Sort by: Price, High to Low</option>
            <option value="rating_desc">Sort by: Rating</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-4  mx-auto">
        {/* Filter Sidebar - Desktop */}
        <aside className="hidden md:block w-[200px] md:w-1/4 lg:w-1/4 md:pr-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg sticky top-24">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Filters
            </h2>

            <FilterSection
              title="Category"
              open={openFilters.category}
              onToggle={() =>
                setOpenFilters((prev) => ({
                  ...prev,
                  category: !prev.category,
                }))
              }
            >
              <div className="flex flex-col space-y-2">
                {categories.map((category, index) => (
                  <CustomCheckbox
                    key={index}
                    id={category}
                    label={category}
                    isChecked={filters.category === category}
                    onChange={() =>
                      setFilters((prev) => ({ ...prev, category }))
                    }
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Price Range"
              open={openFilters.priceRange}
              onToggle={() =>
                setOpenFilters((prev) => ({
                  ...prev,
                  priceRange: !prev.priceRange,
                }))
              }
            >
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="min"
                  value={filters.priceRange[0]}
                  onChange={handlePriceRangeChange}
                  className="w-1/2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
                <span>-</span>
                <input
                  type="number"
                  name="max"
                  value={filters.priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className="w-1/2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
              </div>
              <p className="font-inter text-xs text-gray-400 mt-2">
                Filter based on price range
              </p>
            </FilterSection>

            <FilterSection
              title="Brand"
              open={openFilters.brand}
              onToggle={() =>
                setOpenFilters((prev) => ({ ...prev, brand: !prev.brand }))
              }
            >
              <div className="flex flex-col space-y-2">
                {brands.map((brand) => (
                  <CustomCheckbox
                    key={brand}
                    id={brand}
                    label={brand}
                    isChecked={filters.brand === brand}
                    onChange={() => setFilters((prev) => ({ ...prev, brand }))}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Color"
              open={openFilters.color}
              onToggle={() =>
                setOpenFilters((prev) => ({ ...prev, color: !prev.color }))
              }
            >
              <div className="flex flex-col space-y-2">
                {mockColors.map((color) => (
                  <CustomCheckbox
                    key={color}
                    id={color}
                    label={color}
                    isChecked={filters.color === color}
                    onChange={() => setFilters((prev) => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </FilterSection>

            {/* In Stock Toggle */}
            <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold">Only in Stock</h3>
              <div
                onClick={() =>
                  setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))
                }
                className={`relative w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  filters.inStock
                    ? "bg-[#4c51bf]"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
                    filters.inStock ? "translate-x-4" : ""
                  }`}
                ></div>
              </div>
            </div>

            {/* Filter Count Button */}
            <motion.button
              className="mt-6 w-full py-3 rounded-lg bg-[#4c51bf] text-white font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Loading..." : `${totalFilteredItems} Items`}
            </motion.button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4 lg:w-3/4 ">
          {productLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 space-x-2">
                <motion.button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg text-white ${
                    currentPage === 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4c51bf] dark:bg-[#3a41a3]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`py-2 px-4 rounded-lg font-bold ${
                      currentPage === i + 1
                        ? "bg-[#4c51bf] dark:bg-[#3a41a3] text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {i + 1}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg text-white ${
                    currentPage === totalPages
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4c51bf] dark:bg-[#3a41a3]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No Products Found
              </h2>
              <p className="font-inter text-base text-gray-700 dark:text-gray-300">
                Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isFiltersModalOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFiltersModalOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-11/12 max-w-sm relative"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFiltersModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Refine Your Search
              </h2>
              <p className="font-inter text-base text-gray-700 dark:text-gray-300 mb-6">
                Narrow down by category, price, or brand.
              </p>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <div className="flex flex-col space-y-2">
                    {categories.map((category) => (
                      <CustomCheckbox
                        key={category}
                        id={`mobile-${category}`}
                        label={category}
                        isChecked={filters.category === category}
                        onChange={() =>
                          setFilters((prev) => ({ ...prev, category }))
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="min"
                      value={filters.priceRange[0]}
                      onChange={handlePriceRangeChange}
                      className="w-1/2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      name="max"
                      value={filters.priceRange[1]}
                      onChange={handlePriceRangeChange}
                      className="w-1/2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Brand</h3>
                  <div className="flex flex-col space-y-2">
                    {brands.map((brand) => (
                      <CustomCheckbox
                        key={brand}
                        id={`mobile-${brand}`}
                        label={brand}
                        isChecked={filters.brand === brand}
                        onChange={() =>
                          setFilters((prev) => ({ ...prev, brand }))
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsFiltersModalOpen(false)}
                className="w-full mt-6 py-2 rounded-lg bg-[#4c51bf] dark:bg-[#3a41a3] text-white font-bold"
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;

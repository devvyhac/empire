import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

import { ProductContext } from "../../context/ProductContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import { allProducts } from "../../context/mockData.jsx";
import ProductInfo from "./components/ProductInfo.jsx";

const { VITE_BACKEND_URL } = import.meta.env;

const fetchReviews = async () => {
  return [
    {
      id: 1,
      author: "Jane Doe",
      rating: 5,
      comment:
        "Absolutely love this item! The build quality and design feel fantastic.",
      date: "2025-08-01",
    },
    {
      id: 2,
      author: "John Smith",
      rating: 4,
      comment:
        "A very solid product for the price. Fast shipping and great packaging.",
      date: "2025-07-28",
    },
  ];
};

const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden p-2 text-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <img
      src={
        product?.images?.[0]?.url ||
        product?.image ||
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&h=500&fit=crop"
      }
      alt={product?.name || "Product"}
      className="w-full h-40 object-cover rounded-md mb-2"
    />
    <h3 className="font-poppins text-lg font-semibold text-gray-900 dark:text-gray-100">
      {product?.name}
    </h3>
    <p className="font-inter text-md text-indigo-600 dark:text-indigo-400 font-bold">
      $
      {Number(
        product?.discountPrice ?? product?.discountedPrice ?? product?.originalPrice ?? 0
      ).toFixed(2)}
    </p>
  </motion.div>
);

export default function ProductDetails() {
  const { slug } = useParams();

  const { products = [] } = useContext(ProductContext) || {};
  const { addToCart, removeFromCart, updateItemQuantity, cartItems = [] } =
    useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const matchedProduct =
    products.find((p) => p._id === slug || p.id === slug || p.sku === slug) ||
    allProducts.find((p) => p._id === slug || p.id === slug || p.sku === slug) ||
    allProducts[0];

  const mergeData = (data) => {
    const item = data || matchedProduct;
    return {
      _id: item?._id || item?.id || "1",
      name: item?.name || "Product Name",
      sku: item?.sku || "SKU-101",
      originalPrice: item?.originalPrice || 99.99,
      discountPrice: item?.discountPrice || item?.discountedPrice || 79.99,
      images: item?.images || [
        {
          url:
            item?.image ||
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&h=500&fit=crop",
        },
      ],
      rating: 4.5,
      description:
        item?.description ||
        `This premium product is designed for daily performance and style. It features durable construction and ergonomic engineering.`,
      specifications: {
        dimensions: '10" x 5" x 2"',
        weight: "1.2 lbs",
        connectivity: "USB-C / Wireless",
        material: "Premium composite",
      },
      variants: [
        {
          type: "color",
          options: ["Black", "White", "Blue"],
        },
      ],
      stock: item?.stock || 25,
    };
  };

  const [product, setProduct] = useState(() => mergeData(matchedProduct));
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setReviews(await fetchReviews());
      setRelatedProducts(products.slice(0, 4));

      if (!VITE_BACKEND_URL) {
        setProduct(mergeData(matchedProduct));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${VITE_BACKEND_URL}/products/${slug}`
        );
        if (response.data && response.data.product) {
          const fetchedItem = mergeData(response.data.product);
          setProduct(fetchedItem);
          const cartItem = cartItems.find(
            (item) => item._id === fetchedItem._id
          );
          if (cartItem) {
            setQuantity(cartItem.quantity);
          }
        }
      } catch (err) {
        console.warn("Could not fetch product from backend, using fallback data");
        setProduct(mergeData(matchedProduct));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, products]);

  const handleAddToCart = (item) => {
    setQuantity((prev) => prev + 1);
    addToCart(item || product);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  const handleRemoveFromCart = (item) => {
    setQuantity((prev) => Math.max(1, prev - 1));
    removeFromCart(item || product);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-400">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-between min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 font-inter">
      <ProductInfo
        product={product}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        updateItemQuantity={updateItemQuantity}
        handleAddToWishlist={handleAddToWishlist}
        setQuantity={setQuantity}
        quantity={quantity}
      />
      <div>
        <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Explore Similar Items
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {(products || allProducts).slice(0, 4).map((item) => (
            <ProductCard key={item._id || item.id} product={item} />
          ))}
        </div>
      </div>
    </main>
  );
}

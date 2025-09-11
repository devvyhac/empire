import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

import { ProductContext } from "../../context/ProductContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { WishlistContext } from "../../context/WishlistContext.jsx";
import ProductInfo from "./components/ProductInfo.jsx";

const { VITE_BACKEND_URL } = import.meta.env;

const fetchReviews = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 300);
  });
};

const fetchRelatedProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
          image:
            "https://placehold.co/400x300/E5E7EB/1F2937?text=Monitor+Stand",
        },
      ]);
    }, 400);
  });
};

const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden p-2 text-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <img
      src={product.images[0].url}
      alt={product.name}
      className="w-full h-40 object-cover rounded-md mb-2"
    />
    <h3 className="font-poppins text-lg font-semibold text-gray-900 dark:text-gray-100">
      {product.name}
    </h3>
    <p className="font-inter text-md text-primary-light dark:text-primary-dark">
      $
      {product.discountPrice
        ? product.discountPrice.toFixed(2)
        : product.originalPrice.toFixed(2)}
    </p>
  </motion.div>
);

export default function ProductDetails() {
  const { slug } = useParams();

  //   ##### Getting Product from Context API ######
  const { products } = useContext(ProductContext);
  const itemFromState = products.find((p) => p._id === slug) || {};
  //   ###################################################

  const { addToCart, removeFromCart, updateItemQuantity, cartItems } =
    useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);

  const mergeData = (data) => {
    return {
      _id: data._id,
      name: data.name,
      sku: data.sku,
      originalPrice: data.originalPrice,
      discountPrice: data.discountPrice,
      images: data.images,
      rating: 4.5,
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
        {
          type: "color",
          options: ["Black", "White"],
        },
        {
          type: "switches",
          options: ["Cherry MX Red", "Cherry MX Blue", "Cherry MX Brown"],
        },
      ],
      stock: 25,
    };
  };

  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchProduct = async (slug) => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_URL}/products/${slug}`
        );
        const { data } = response;
        const fetchedItem = mergeData(data.product);
        setLoading(false);
        setProduct(fetchedItem);
        setReviews(await fetchReviews());
        setRelatedProducts(await fetchRelatedProducts());
        const cartItem = cartItems.find((item) => item._id === fetchedItem._id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (Object.entries(itemFromState) > 0) {
      setProduct(mergeData(itemFromState));
      setLoading(false);
      return;
    }

    fetchProduct(slug);
  }, []);

  const handleAddToCart = (product) => {
    setQuantity((prev) => prev + 1);
    addToCart(product);
    // toast.success(`${product.name} added to cart.`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    // toast.success(`${product.name} added to wishlist.`);
  };

  const handleRemoveFromCart = (product) => {
    setQuantity((prev) => prev - 1);
    removeFromCart(product);
    // toast.success(`${product.name} removed from cart.`);
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
      <div className="flex justify-center items-center min-h-screen text-error-light dark:text-error-dark">
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
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

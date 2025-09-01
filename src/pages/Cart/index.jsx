import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { CartContext } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
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

import CartItem from "./components/CartItem.jsx";

// Checkout progress steps
const progressSteps = ["Cart", "Checkout", "Confirmation"];

const Cart = () => {
  const { removeFromCart, addToCart, deleteFromCart, cartItems } =
    useContext(CartContext);
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState({ text: "", type: "" });

  // Use a useEffect hook for analytics and SEO
  // useEffect(() => {
  //   console.log("Analytics event tracked: view_cart");
  //   // In a real application, you would set SEO meta tags here
  //   // Example: document.title = "Your Shopping Cart";
  // }, []);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.salePrice !== null ? item.salePrice : item.originalPrice) *
        item.count,
    0
  );
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08; // Example 8% tax rate
  const total = subtotal + shipping + tax;

  // Handle item quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: newQuantity } : item
      )
    );
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  // Handle promo code application (mocked)
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoMessage({
        text: "Promo code applied successfully!",
        type: "success",
      });
    } else {
      setPromoMessage({ text: "Invalid promo code.", type: "error" });
    }
  };

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout with current cart items:", cartItems);
  };

  // Conditional rendering for empty cart state
  const isCartEmpty = cartItems.length === 0;

  return (
    <main className="flex items-start justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 font-inter">
      <div className="w-full max-w-6xl">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          {progressSteps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0
                    ? "bg-primary-light dark:bg-primary-dark"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm hidden md:block ${
                  index === 0
                    ? "text-primary-light dark:text-primary-dark"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step}
              </span>
              {index < progressSteps.length - 1 && (
                <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block"></div>
              )}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center md:text-left mb-8">
          <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Your Shopping Cart
          </h1>
          <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
            Review your items before checkout.
          </p>
        </div>

        {isCartEmpty ? (
          /* Empty Cart State */
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <ShoppingCart className="w-20 h-20 mx-auto text-gray-700 dark:text-gray-300" />
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
              Cart is Empty
            </h2>
            <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-2">
              Looks like you haven't added anything to your cart yet.
            </p>
            <motion.button
              type="button"
              onClick={() => console.log("Navigating to shopping page")}
              className="mt-6 py-3 px-8 rounded-lg shadow-sm text-base font-inter text-white bg-indigo-500 dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="/shop">Shop Now</a>
            </motion.button>
          </div>
        ) : (
          /* Main Cart Content */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Cart Items List */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="relative md:sticky md:top-8 h-full">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="font-poppins text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <div className="mt-4 pt-4">
                  <label
                    htmlFor="promo-code"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Apply Promo Code
                  </label>
                  <p className="font-inter text-base text-gray-700 dark:text-gray-300 mb-2">
                    Enter code for discounts.
                  </p>
                  <div className="flex mt-1">
                    <input
                      type="text"
                      id="promo-code"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-2 flex-grow rounded-l-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-white dark:text-gray-900"
                    />
                    <motion.button
                      type="button"
                      onClick={handleApplyPromo}
                      className="py-2 px-4 rounded-r-md bg-indigo-500 dark:bg-secondary-dark text-white text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply
                    </motion.button>
                  </div>
                  {promoMessage.text && (
                    <p
                      className={`mt-2 text-sm ${
                        promoMessage.type === "success"
                          ? "text-success-light dark:text-success-dark"
                          : "text-error-light dark:text-error-dark"
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Order Totals */}
                <div className="mt-4 space-y-2 text-sm pt-4 border-t border-gray-300 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-gray-300 dark:border-gray-700 flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl font-poppins text-primary-light dark:text-primary-dark">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Proceed to Checkout Button */}
                <motion.button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="mt-6 w-full py-3 px-6 rounded-lg shadow-sm text-base font-inter bg-green-500 text-white bg-success-light dark:bg-success-dark hover:bg-success-dark dark:hover:bg-success-light transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to="/checkout">Proceed to Checkout</Link>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;

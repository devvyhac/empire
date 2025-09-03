import React from "react";
import { motion } from "framer-motion";

const OrderSummary = ({ cartItems, subtotal, shipping, tax, total }) => {
  return (
    <>
      <div className="relative md:sticky md:top-8 h-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="font-poppins text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Order Summary
          </h2>
          <div className="divide-y divide-gray-300 dark:divide-gray-700">
            {/* Cart Items */}
            {cartItems &&
              cartItems.map((item) => (
                <div key={item._id} className="py-4 flex items-center">
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    $
                    {(item.discountPrice
                      ? item.discountPrice
                      : item.originalPrice * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
          </div>

          {/* Promo Code Input */}
          <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
            <label
              htmlFor="promo-code"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Have a promo code?
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                id="promo-code"
                placeholder="Enter code"
                className="pl-2 flex-grow rounded-l-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 bg-gray-100"
              />
              <motion.button
                type="button"
                className="py-2 px-4 rounded-r-md bg-indigo-500 dark:bg-secondary-dark text-white text-sm font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply
              </motion.button>
            </div>
          </div>

          {/* Order Totals */}
          <div className="mt-4 space-y-2 text-sm">
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
        </div>
      </div>
    </>
  );
};

export default OrderSummary;

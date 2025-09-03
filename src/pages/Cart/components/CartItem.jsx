import React, { useContext } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { CartContext } from "../../../context/CartContext.jsx";

// Cart item component for reusability and clean code
const CartItem = ({ item }) => {
  const { removeFromCart, addToCart, deleteFromCart, updateItemQuantity } =
    useContext(CartContext);

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          className="h-20 w-20 object-cover rounded-md"
          src={item.images[0].url}
          alt={item.name}
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          {item.name}
        </h3>
        {/* <p className="text-sm text-gray-500 dark:text-gray-400">
          SKU: {item.sku}
        </p> */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          $
          {item.discountPrice
            ? item.discountPrice.toFixed(2)
            : item.originalPrice.toFixed(2)}
        </p>
      </div>

      {/* Quantity Selector and Remove Button */}
      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center space-x-2">
          {/* Quantity selector */}
          <div className="flex items-center space-x-1">
            <motion.button
              type="button"
              onClick={() => removeFromCart(item)}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={item.count <= 1}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <input
              type="number"
              value={item.quantity || 1}
              onChange={(e) =>
                updateItemQuantity(item, parseInt(e.target.value))
              }
              className="w-12 text-center rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm text-sm"
              min="1"
            />
            <motion.button
              type="button"
              onClick={() => addToCart(item)}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
          {/* Item total */}
          <p className="font-bold text-lg text-gray-900 dark:text-gray-100 w-20 text-right">
            $
            {(
              (item.discountPrice ? item.discountPrice : item.originalPrice) *
              item.quantity
            ).toFixed(2)}
          </p>
        </div>
        {/* Remove button */}
        <motion.button
          type="button"
          onClick={() => deleteFromCart(item)}
          className="text-error-light dark:text-error-dark p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default CartItem;

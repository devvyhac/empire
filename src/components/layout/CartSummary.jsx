import { useState, useRef, useEffect, useContext } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CartContext } from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Cart Summary Component"

const CartSummary = ({ children }) => {
  // Constant for the delay before the dropdown disappears (1000ms = 1 second)
  // const DISAPPEAR_DELAY_MS = 1000;

  // State to control if the dropdown should be rendered in the DOM
  const [isVisible, setIsVisible] = useState(false);
  // State to trigger the "in" or "out" animation
  const [isAnimating, setIsAnimating] = useState(false);
  // Ref to store the timer ID for the mouse leave delay
  const leaveTimeoutRef = useRef(null);
  // Ref to store the timer ID for the animation start delay
  const enterTimeoutRef = useRef(null);

  const { cartItems, removeFromCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);


  // Function to remove an item from the cart by its ID
  const removeItem = (item) => {
    removeFromCart(item);
  };

  // Function to handle showing the dropdown
  const handleMouseEnter = () => {
    // Clear the leave timer if it's active
    clearTimeout(leaveTimeoutRef.current);
    // Clear the enter timer
    clearTimeout(enterTimeoutRef.current);

    // Render the dropdown in the DOM
    setIsVisible(true);

    // Use a small delay to ensure the component is rendered before starting the transition
    enterTimeoutRef.current = setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  // Function to handle hiding the dropdown with a delay and animation
  const handleMouseLeave = () => {
    // Clear any existing enter timeout
    clearTimeout(enterTimeoutRef.current);

    // Start the fade-out animation immediately
    setIsAnimating(false);

    // Set a timeout to remove the dropdown from the DOM after the animation completes.
    // The total time is the disappear delay plus the CSS transition duration (300ms).
    leaveTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  // Cleanup effect to clear timers when the component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(leaveTimeoutRef.current);
      clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  // Calculate the total salePrice of all items in the cart
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + (item.salePrice || item.originalPrice) * item.count,
    0
  );

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Conditional rendering for the dropdown cart with animations */}
      {isVisible && (
        <div
          className={`absolute top-full right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-20 
              transform transition-all duration-300 ease-in-out
              ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Shopping Cart
            </h3>

            {/* List of cart items */}
            <ul className="divide-y divide-gray-200">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="py-3 flex items-center justify-between"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0"
                    />

                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-700">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.count}</p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm font-semibold text-gray-900 mr-2">
                        $
                        {item.salePrice !== null
                          ? item.salePrice.toFixed(2)
                          : item.originalPrice.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-4 text-center text-gray-500">
                  Your cart is empty.
                </li>
              )}
            </ul>

            {/* Cart total and checkout button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-semibold text-gray-800">
                  Total:
                </span>
                <span className="text-base font-bold text-gray-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <span>
                {cartItems.length > 0 ? (
                  <Link
                    to="/checkout"
                    className="disabled flex items-center justify-center w-full py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
                  >
                    Checkout
                  </Link>
                ) : (<Link
                    onClick={() => toast.error("Your cart is empty!")}
                    className="disabled flex items-center justify-center w-full py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
                  >
                    Checkout
                  </Link>)
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;

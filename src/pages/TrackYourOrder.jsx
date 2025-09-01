import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  CheckCircle,
  Package,
  Box,
  Search,
  ArrowRight,
} from "lucide-react";

const orderStatusSteps = [
  "Order Placed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

// Stepper component for visual tracking
const OrderStepper = ({ currentStatus }) => {
  const currentIndex = orderStatusSteps.indexOf(currentStatus);
  return (
    <div className="flex justify-between items-center relative py-8">
      {/* Connector line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 mx-10 -translate-y-1/2" />
      <div
        className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-400 mx-10 -translate-y-1/2"
        style={{
          width: `${(currentIndex / (orderStatusSteps.length - 1)) * 100}%`,
        }}
      />

      {orderStatusSteps.map((step, index) => (
        <div key={step} className="relative z-10 flex flex-col items-center">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              index <= currentIndex
                ? "bg-indigo-600"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {index <= currentIndex ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <div className="w-3 h-3 bg-white rounded-full" />
            )}
          </motion.div>
          <p
            className={`mt-2 text-center text-sm font-medium transition-colors duration-300 ${
              index <= currentIndex
                ? "text-indigo-600 dark:text-indigo-400 font-bold"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  // The state to store the fetched order data. It's initially null.
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simulate analytics and SEO data on component mount
  useEffect(() => {
    console.log("Analytics event tracked: view_track_order_page");
    const metaTitle = "Track Your Order - Gadgets Shop";
    const metaDescription =
      "Check the real-time status and delivery information for your recent orders.";
    console.log(`SEO Title: ${metaTitle}`);
    console.log(`SEO Description: ${metaDescription}`);
  }, []);

  // Mock API call to track the order
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrderData(null);

    // Simulated API response
    const mockOrder = {
      orderNumber: "G123456789",
      email: "john.doe@example.com",
      status: "Out for Delivery",
      estimatedDelivery: "August 15, 2024",
      items: [
        {
          id: "1",
          name: "Wireless Headphones",
          quantity: 1,
          price: 71.99,
          image: "https://placehold.co/100x100/E5E7EB/1F2937?text=Headphones",
        },
        {
          id: "2",
          name: "Smart Watch X-1",
          quantity: 1,
          price: 299.5,
          image: "https://placehold.co/100x100/E5E7EB/1F2937?text=Smart+Watch",
        },
      ],
      shippingAddress: "123 Main St, Anytown, USA 12345",
    };

    setTimeout(() => {
      if (orderNumber === mockOrder.orderNumber && email === mockOrder.email) {
        // If the order is valid, the orderData state is populated.
        setOrderData(mockOrder);
      } else {
        setError("Order not found. Please check your order number and email.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter mt-1 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col items-center justify-center">
        <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Track Your Order
        </h1>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
          Enter your order details to view its status.
        </p>
      </header>

      <main className="flex-grow p-4 max-w-4xl mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          {/* Tracking Form */}
          <form
            onSubmit={handleTrackOrder}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="flex-grow">
              <label htmlFor="orderNumber" className="sr-only">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                placeholder="Order Number (e.g., G123456789)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
                className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full md:w-auto py-3 px-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Track Order</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Loading, Error, or Results display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg text-center"
            >
              <p>{error}</p>
            </motion.div>
          )}

          {/* This block is only rendered if orderData is not null, which means a valid order was found. */}
          {orderData && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4">
                <Truck className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h2 className="font-poppins text-2xl font-bold">
                    Order #{orderData.orderNumber}
                  </h2>
                  <p className="font-inter text-gray-700 dark:text-gray-300">
                    Status:{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {orderData.status}
                    </span>
                  </p>
                  <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
                    Estimated Delivery: {orderData.estimatedDelivery}
                  </p>
                </div>
              </div>

              <OrderStepper currentStatus={orderData.status} />

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner space-y-4">
                <h3 className="font-poppins text-xl font-bold">
                  Shipping Details
                </h3>
                <p className="font-inter text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Shipping to:</span>{" "}
                  {orderData.shippingAddress}
                </p>
                <h3 className="font-poppins text-xl font-bold mt-6">
                  Order Items
                </h3>
                <ul className="space-y-4">
                  {orderData.items.map((item) => (
                    <li key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold">${item.price.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Simple Page Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2024 Gadgets Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  User,
  ShoppingCart,
  MapPin,
  CreditCard,
  FileUp,
  CheckCircle,
  Package,
  ReceiptText,
  Banknote,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

// Configure Tailwind CSS custom colors to match the design request
// This is for demonstration purposes. In a real project, this would be in the tailwind.config.js file.
const customColors = {
  "primary-light": "#4c51bf", // A shade of indigo/blue
  "primary-dark": "#3a41a3",
  "success-light": "#10b981", // A shade of green
  "success-dark": "#059669",
};

// Mock data for order history
const mockOrders = [
  { id: "ORD-001", date: "2024-05-15", total: "$125.00", status: "Shipped" },
  { id: "ORD-002", date: "2024-05-10", total: "$45.50", status: "Delivered" },
  { id: "ORD-003", date: "2024-04-28", total: "$210.75", status: "Processing" },
];

// Mock data for addresses
const mockAddresses = [
  { id: "addr-1", label: "Home", address: "123 Main St, Anytown, USA 12345" },
  {
    id: "addr-2",
    label: "Work",
    address: "456 Business Blvd, Cityville, USA 54321",
  },
];

// Mock data for payment methods
const mockPayments = [
  { id: "card-1", label: "Visa ending in 1234", expiry: "12/26" },
  { id: "card-2", label: "Mastercard ending in 5678", expiry: "08/25" },
];

// Mock data for a newly placed order with more details
const mockNewOrder = {
  id: "ORD-004",
  date: "2024-08-11",
  email: "johndoe@example.com",
  total: "$89.99",
  status: "Processing",
  items: [
    {
      name: "Ergonomic Keyboard",
      sku: "KB-101",
      quantity: 1,
      price: 50.0,
      image: "https://placehold.co/100x100/A0AEC0/FFFFFF?text=Keyboard",
    },
    {
      name: "Wireless Mouse",
      sku: "MS-202",
      quantity: 2,
      price: 19.99,
      image: "https://placehold.co/100x100/A0AEC0/FFFFFF?text=Mouse",
    },
  ],
  shippingAddress: "789 Commerce St, Anothercity, USA 67890",
  trackingInfo: "1Z999AA10123456789",
};

// A reusable tab button component
const TabButton = ({ name, activeTab, setActiveTab, children }) => {
  const isActive = name === activeTab;
  return (
    <motion.button
      type="button"
      onClick={() => setActiveTab(name)}
      className={`py-4 px-6 text-sm font-medium transition-colors border-b-2
        ${
          isActive
            ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
            : "text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
        } flex items-center whitespace-nowrap`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// A component for the order confirmation page
const OrderConfirmation = ({ order, onContinueShopping }) => {
  // Mocking analytics event tracking
  useEffect(() => {
    console.log(`Analytics event tracked: purchase - Order ID: ${order.id}`);
  }, [order.id]);

  return (
    <div className="flex flex-col items-center p-6 text-center">
      {/* SEO meta tags would be added to the document head in a real application */}
      <div className="bg-success-light dark:bg-success-dark p-3 rounded-full inline-flex">
        <CheckCircle className="w-16 h-16 text-white" />
      </div>

      <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-4">
        Thank You for Your Order!
      </h1>
      <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
        Order #{order.id} has been placed.
      </p>
      <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-1">
        A confirmation has been sent to {order.email}.
      </p>

      <div className="w-full max-w-4xl mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Order Summary
        </h2>

        {/* Order Details Table */}
        <div className="overflow-x-auto rounded-lg shadow-md mb-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  SKU
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-200">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shipping & Tracking Info */}
        <div className="md:grid md:grid-cols-2 md:gap-8 text-left mt-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-4 md:mb-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Shipping Address
            </h3>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {order.shippingAddress}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Tracking Information
            </h3>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Tracking Number: {order.trackingInfo}
            </p>
            <p className="text-sm mt-1">
              <a
                href="#"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-500"
              >
                View on courier website
              </a>
            </p>
          </div>
        </div>
      </div>

      <motion.button
        onClick={onContinueShopping}
        className="mt-8 py-3 px-6 rounded-lg shadow-sm text-base font-inter text-white bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Keep Shopping
      </motion.button>
    </div>
  );
};

// A single component to render the different tab content
const TabContent = ({
  activeTab,
  onNewOrder,
  newOrder,
  onContinueShopping,
}) => {
  const { user } = useContext(AuthContext);
  const Accronym = user.firstName[0] + user.lastName[0];
  const [profileData, setProfileData] = useState({
    name: user.fullName,
    email: user.email,
    phone: "",
    profilePicture: `https://placehold.co/100x100/A0AEC0/FFFFFF?text=${Accronym}`,
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [profileStatus, setProfileStatus] = useState("idle");
  const [profileMessage, setProfileMessage] = useState("");

  const validateProfile = () => {
    let newErrors = {};
    if (!profileData.name) newErrors.name = "Name is required.";
    if (!profileData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevState) => ({
          ...prevState,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProfileData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) {
      return;
    }
    setProfileStatus("submitting");
    setProfileMessage("");
    console.log("Analytics event tracked: update_profile");

    // Express backend API call would go here: /api/users/:id
    // This call would need to include a JWT for authentication
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Updated profile data:", profileData);
      setProfileStatus("success");
      setProfileMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      setProfileStatus("error");
      setProfileMessage("Failed to update profile. Please try again.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "settings":
        return (
          <>
            <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Profile Settings
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
                />
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                >
                  <FileUp className="w-4 h-4 mr-1" />
                  Upload new picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className="hidden"
                  onChange={handleProfileChange}
                  accept="image/*"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors ${
                    profileErrors.name ? "border-red-500" : ""
                  }`}
                />
                {profileErrors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors ${
                    profileErrors.email ? "border-red-500" : ""
                  }`}
                />
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>

              {profileStatus === "success" && (
                <div className="text-center text-green-500 font-semibold">
                  {profileMessage}
                </div>
              )}
              {profileStatus === "error" && (
                <div className="text-center text-red-500 font-semibold">
                  {profileMessage}
                </div>
              )}

              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                  disabled={profileStatus === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {profileStatus === "submitting" ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    "Save Changes"
                  )}
                </motion.button>
              </div>
            </form>
          </>
        );
      case "orders":
        return (
          <>
            <h2 className="font-poppins text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Order History
            </h2>
            <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-1 mb-6">
              Track your recent purchases.
            </p>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <motion.button
              onClick={() => onNewOrder(mockNewOrder)}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Simulate Placing a New Order
            </motion.button>
          </>
        );

      case "transactions":
        return (
          <>
            <h2 className="font-poppins text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Transactions
            </h2>
            <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-1 mb-6">
              View your past payment transactions.
            </p>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {order.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <motion.button
              onClick={() => onNewOrder(mockNewOrder)}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Simulate Placing a New Order
            </motion.button>
          </>
        );
      case "addresses":
        return (
          <>
            <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Addresses
            </h2>
            <ul className="space-y-4">
              {mockAddresses.map((address) => (
                <li
                  key={address.id}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {address.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {address.address}
                    </p>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                    Edit
                  </button>
                </li>
              ))}
            </ul>
            <motion.button
              className="mt-6 w-full py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Address
            </motion.button>
          </>
        );
      case "payments":
        return (
          <>
            <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Payments
            </h2>
            <ul className="space-y-4">
              {mockPayments.map((payment) => (
                <li
                  key={payment.id}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {payment.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Expires: {payment.expiry}
                    </p>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                    Edit
                  </button>
                </li>
              ))}
            </ul>
            <motion.button
              className="mt-6 w-full py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Payment Method
            </motion.button>
          </>
        );
      case "confirmation":
        if (!newOrder) {
          return (
            <div className="text-center p-6 text-gray-500 dark:text-gray-400">
              No recent order to display.
            </div>
          );
        }
        return (
          <OrderConfirmation
            order={newOrder}
            onContinueShopping={onContinueShopping}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("settings");
  const [lastOrder, setLastOrder] = useState(null);

  const handleNewOrder = (order) => {
    setLastOrder(order);
    setActiveTab("confirmation");
  };

  const handleContinueShopping = () => {
    setLastOrder(null);
    setActiveTab("orders");
  };

  useEffect(() => {
    console.log(`Analytics event tracked: view_profile - ${activeTab}`);
  }, [activeTab]);

  return (
    <main className="flex items-center justify-center min-h-auto bg-gray-100 dark:bg-gray-900 px-4 py-10 bg-white">
      <div className="w-full container dark:bg-gray-800 rounded-xl px-8 md:px-10 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Your Account
          </h1>
          <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
            Manage your personal details and orders.
          </p>
        </div>

        {/* Desktop & Tablet Tabs */}
        <div className="hidden md:flex justify-around border-b border-gray-200 dark:border-gray-700 mb-8">
          <TabButton
            name="settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <User className="mr-2" /> Settings
          </TabButton>
          <TabButton
            name="orders"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <ShoppingCart className="mr-2" /> Orders
          </TabButton>
          <TabButton
            name="transactions"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <Banknote className="mr-2" /> Transactions
          </TabButton>
          <TabButton
            name="addresses"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <MapPin className="mr-2" /> Addresses
          </TabButton>
          <TabButton
            name="payments"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <CreditCard className="mr-2" /> Payments
          </TabButton>
          {lastOrder && (
            <TabButton
              name="confirmation"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              <CheckCircle className="mr-2" /> Confirmation
            </TabButton>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden mb-8">
          <label htmlFor="tab-select" className="sr-only">
            Select a tab
          </label>
          <select
            id="tab-select"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-100 transition-colors"
          >
            <option value="settings">Settings</option>
            <option value="orders">Orders</option>
            <option value="addresses">Addresses</option>
            <option value="payments">Payments</option>
            {lastOrder && <option value="confirmation">Confirmation</option>}
          </select>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          <TabContent
            activeTab={activeTab}
            onNewOrder={handleNewOrder}
            newOrder={lastOrder}
            onContinueShopping={handleContinueShopping}
          />
        </div>
      </div>
    </main>
  );
}

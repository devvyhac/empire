import React, { useState, useEffect, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  User,
  ShoppingCart,
  MapPin,
  CreditCard,
  CheckCircle,
  Package,
  Clock,
  ShieldCheck,
  ChevronRight,
  LogOut,
  FileUp,
  Mail,
  Phone,
  LayoutDashboard,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  AlertCircle,
  Search,
  Sparkles,
  Heart,
} from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { WishlistContext } from "../context/WishlistContext.jsx";

// Initial Mock data for fallbacks when API orders are empty
const defaultMockOrders = [
  {
    id: "ORD-9281",
    orderId: "ORD-9281",
    updatedAt: "2025-05-18T14:32:00Z",
    totalAmount: 14999, // in cents ($149.99)
    status: "Delivered",
    itemsCount: 2,
    shippingDetails: {
      address: "742 Evergreen Terrace",
      city: "Springfield",
      country: "United States",
      zipCode: "97477",
    },
  },
  {
    id: "ORD-8412",
    orderId: "ORD-8412",
    updatedAt: "2025-05-10T09:15:00Z",
    totalAmount: 8950,
    status: "Shipped",
    itemsCount: 1,
    shippingDetails: {
      address: "742 Evergreen Terrace",
      city: "Springfield",
      country: "United States",
      zipCode: "97477",
    },
  },
  {
    id: "ORD-7193",
    orderId: "ORD-7193",
    updatedAt: "2025-04-29T18:40:00Z",
    totalAmount: 24900,
    status: "Processing",
    itemsCount: 3,
    shippingDetails: {
      address: "123 Business Plaza, Suite 400",
      city: "New York",
      country: "United States",
      zipCode: "10001",
    },
  },
];

const defaultMockAddresses = [
  {
    id: "addr-1",
    type: "Home",
    isDefault: true,
    recipient: "John Doe",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "OR",
    zipCode: "97477",
    country: "United States",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "addr-2",
    type: "Office",
    isDefault: false,
    recipient: "John Doe (Work)",
    street: "123 Business Plaza, Suite 400",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (555) 987-6543",
  },
];

const defaultMockPayments = [
  {
    id: "pm-1",
    brand: "Visa",
    last4: "4242",
    expiry: "12/28",
    isDefault: true,
    holderName: "John Doe",
  },
  {
    id: "pm-2",
    brand: "Mastercard",
    last4: "8891",
    expiry: "09/27",
    isDefault: false,
    holderName: "John Doe",
  },
];

export default function ProfileDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState(initialTab);
  const { user, orders: apiOrders, setUserData, VITE_LOGOUT_URL } =
    useContext(AuthContext) || {};
  const { cartItems = [], cartQuantity = 0 } = useContext(CartContext) || {};
  const { wishlistItems = [], wishListQuantity = 0 } =
    useContext(WishlistContext) || {};

  const totalCartCount = useMemo(() => {
    if (typeof cartQuantity === "number" && cartQuantity > 0) return cartQuantity;
    return cartItems.reduce(
      (acc, item) => acc + (Number(item.quantity) || 1),
      0
    );
  }, [cartQuantity, cartItems]);

  const totalWishlistCount = useMemo(() => {
    if (typeof wishListQuantity === "number" && wishListQuantity > 0)
      return wishListQuantity;
    return wishlistItems.length;
  }, [wishListQuantity, wishlistItems]);

  // Sync tab with URL
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Safe user displayName & acronym
  const displayName = useMemo(() => {
    if (!user) return "Customer";
    if (user.fullName) return user.fullName;
    if (user.name) return user.name;
    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user.email?.split("@")[0] || "Customer";
  }, [user]);

  const userInitials = useMemo(() => {
    if (!user) return "EM";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (displayName) {
      const parts = displayName.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return displayName.substring(0, 2).toUpperCase();
    }
    return "EM";
  }, [user, displayName]);

  // Combined orders list sorted by date (most recent to oldest)
  const ordersList = useMemo(() => {
    const list =
      Array.isArray(apiOrders) && apiOrders.length > 0
        ? [...apiOrders]
        : [...defaultMockOrders];

    return list.sort((a, b) => {
      const dateA = new Date(
        a.updatedAt || a.createdAt || a.date || 0
      ).getTime();
      const dateB = new Date(
        b.updatedAt || b.createdAt || b.date || 0
      ).getTime();
      return dateB - dateA;
    });
  }, [apiOrders]);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: displayName,
    email: user?.email || "",
    phone: user?.phone || "+1 (555) 019-2834",
    avatar:
      user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName
      )}&background=6366F1&color=fff&size=128`,
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [addresses, setAddresses] = useState(defaultMockAddresses);
  const [payments, setPayments] = useState(defaultMockPayments);

  // Handle Profile Update
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (setUserData && user) {
        setUserData({
          ...user,
          fullName: profileForm.name,
          email: profileForm.email,
          phone: profileForm.phone,
        });
      }
      toast.success("Profile details updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle Avatar Change
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm((prev) => ({ ...prev, avatar: reader.result }));
        toast.success("Profile photo updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      if (VITE_LOGOUT_URL) {
        // optionally call logout endpoint
      }
      if (setUserData) setUserData(null);
      localStorage.removeItem("token");
      toast.info("Logged out successfully");
      window.location.href = "/";
    } catch {
      window.location.href = "/";
    }
  };

  // Total spent calculation
  const totalSpent = useMemo(() => {
    return ordersList.reduce((acc, curr) => {
      const val = curr.totalAmount ? curr.totalAmount / 100 : 0;
      return acc + val;
    }, 0);
  }, [ordersList]);

  // Sidebar Menu Items
  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
      badge: ordersList.length > 0 ? ordersList.length : undefined,
    },
    { id: "settings", label: "Account Settings", icon: User },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 font-inter py-4 sm:py-8 lg:py-10 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-8">
        {/* Breadcrumb & Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profileForm.avatar}
                alt={displayName}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-indigo-500/30 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-poppins text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome, {displayName}
                </h1>
                <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold border border-indigo-200 dark:border-indigo-800/60">
                  <Sparkles className="w-3 h-3" />
                  <span>Verified Member</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {user?.email || "Manage your account, track orders, and configure settings."}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end md:self-auto">
            <Link
              to="/shop"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Dashboard Main Grid (Sidebar + Content Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Sidebar (3.5 cols) */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl shadow-sm p-4 sm:p-5 sticky top-[76px] lg:top-[84px] space-y-4">
              {/* Navigation Menu */}
              <div className="space-y-1">
                <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Navigation
                </span>
                <nav className="mt-2 space-y-1">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isActive
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isActive
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Links Section */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60 space-y-1">
                <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Quick Access
                </span>
                <div className="mt-2 space-y-1 text-xs sm:text-sm font-medium">
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>My Wishlist</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-bold text-xs">
                      {totalWishlistCount}
                    </span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <ShoppingCart className="w-4 h-4 text-indigo-500" />
                      <span>Active Cart</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                      {totalCartCount}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Logout Action */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Content Area (8.5 cols) */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-6">
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* 4 Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                        <Package className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Orders</p>
                      <h3 className="text-xl sm:text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                        {ordersList.length}
                      </h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Spent</p>
                      <h3 className="text-xl sm:text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                        ${totalSpent.toFixed(2)}
                      </h3>
                    </div>

                    <Link
                      to="/wishlist"
                      className="group bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-red-300 dark:hover:border-red-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-500 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <Heart className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center justify-between">
                        <span>Wishlist</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500" />
                      </p>
                      <h3 className="text-xl sm:text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                        {totalWishlistCount}
                      </h3>
                    </Link>

                    <Link
                      to="/cart"
                      className="group bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-300 dark:hover:border-indigo-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-1 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center justify-between">
                        <span>Active Cart</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500" />
                      </p>
                      <h3 className="text-xl sm:text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                        {totalCartCount}
                      </h3>
                    </Link>
                  </div>

                  {/* Recent Orders Overview Card */}
                  <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700/60">
                      <div>
                        <h2 className="font-poppins text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                          Recent Orders
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Track your latest purchases and delivery status.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTabChange("orders")}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
                      >
                        <span>View All ({ordersList.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="text-gray-400 border-b border-gray-100 dark:border-gray-700/60">
                            <th className="pb-3 font-semibold">Order ID</th>
                            <th className="pb-3 font-semibold">Date</th>
                            <th className="pb-3 font-semibold">Total</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                          {ordersList.slice(0, 3).map((order) => {
                            const formattedTotal = order.totalAmount
                              ? `$${(order.totalAmount / 100).toFixed(2)}`
                              : "$0.00";
                            const formattedDate = order.updatedAt
                              ? order.updatedAt.split("T")[0]
                              : "Recently";
                            return (
                              <tr key={order.id || order.orderId} className="group">
                                <td className="py-3.5 font-semibold text-gray-900 dark:text-white">
                                  #{order.orderId || order.id}
                                </td>
                                <td className="py-3.5 text-gray-500 dark:text-gray-400">
                                  {formattedDate}
                                </td>
                                <td className="py-3.5 font-semibold text-gray-900 dark:text-white">
                                  {formattedTotal}
                                </td>
                                <td className="py-3.5">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                      order.status === "Delivered"
                                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                                        : order.status === "Shipped"
                                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40"
                                        : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40"
                                    }`}
                                  >
                                    {order.status || "Processing"}
                                  </span>
                                </td>
                                <td className="py-3.5 text-right">
                                  <Link
                                    to={`/track-order?id=${order.orderId || order.id}`}
                                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center"
                                  >
                                    <span>Track</span>
                                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 2-Column Info Summary (Default Address & Security) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Default Address Snippet */}
                    <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <h3 className="font-poppins text-sm font-bold text-gray-900 dark:text-white">
                            Default Shipping Address
                          </h3>
                        </div>
                        <button
                          onClick={() => handleTabChange("addresses")}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Manage
                        </button>
                      </div>
                      {addresses[0] && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 bg-gray-50/70 dark:bg-gray-900/60 p-3 rounded-xl">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {addresses[0].recipient} ({addresses[0].type})
                          </p>
                          <p>{addresses[0].street}</p>
                          <p>
                            {addresses[0].city}, {addresses[0].state} {addresses[0].zipCode},{" "}
                            {addresses[0].country}
                          </p>
                          <p>{addresses[0].phone}</p>
                        </div>
                      )}
                    </div>

                    {/* Account Security Info */}
                    <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <h3 className="font-poppins text-sm font-bold text-gray-900 dark:text-white">
                          Account Protection
                        </h3>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2 bg-gray-50/70 dark:bg-gray-900/60 p-3 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span>Email Status:</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Verified</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Password Status:</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Protected</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Active Sessions:</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">1 (This browser)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MY ORDERS */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-700/60">
                    <div>
                      <h2 className="font-poppins text-lg font-bold text-gray-900 dark:text-white">
                        Order History
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        View and track all past orders and invoices.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      Showing {ordersList.length} orders
                    </span>
                  </div>

                  <div className="space-y-4">
                    {ordersList.map((order) => {
                      const formattedTotal = order.totalAmount
                        ? `$${(order.totalAmount / 100).toFixed(2)}`
                        : "$0.00";
                      const formattedDate = order.updatedAt
                        ? new Date(order.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Recent";

                      return (
                        <div
                          key={order.id || order.orderId}
                          className="border border-gray-200 dark:border-gray-700/80 rounded-xl p-4 sm:p-5 bg-gray-50/50 dark:bg-gray-900/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200/60 dark:border-gray-700/60 text-xs">
                            <div className="flex items-center space-x-3">
                              <span className="font-poppins font-bold text-sm text-gray-900 dark:text-white">
                                #{order.orderId || order.id}
                              </span>
                              <span className="text-gray-400">&bull;</span>
                              <span className="text-gray-500 dark:text-gray-400">
                                Placed on {formattedDate}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  order.status === "Delivered"
                                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200"
                                    : order.status === "Shipped"
                                    ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200"
                                    : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200"
                                }`}
                              >
                                {order.status || "Processing"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                            <div className="space-y-1">
                              <p className="text-gray-600 dark:text-gray-400">
                                Total Paid:{" "}
                                <strong className="text-gray-900 dark:text-white">
                                  {formattedTotal}
                                </strong>
                              </p>
                              {order.shippingDetails?.address && (
                                <p className="text-gray-500 text-xs truncate max-w-md">
                                  Shipping to: {order.shippingDetails.address},{" "}
                                  {order.shippingDetails.city}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/track-order?id=${order.orderId || order.id}`}
                                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center space-x-1"
                              >
                                <span>Track Package</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: ACCOUNT SETTINGS */}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6"
                >
                  <div className="pb-4 border-b border-gray-100 dark:border-gray-700/60">
                    <h2 className="font-poppins text-lg font-bold text-gray-900 dark:text-white">
                      Profile Settings
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Update your account photo, name, and contact information.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    {/* Avatar Upload Field */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={profileForm.avatar}
                        alt="Profile Avatar"
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-sm"
                      />
                      <div>
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <FileUp className="w-3.5 h-3.5" />
                          <span>Change Photo</span>
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <p className="text-[11px] text-gray-400 mt-1">
                          PNG, JPG or GIF up to 5MB
                        </p>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSavingProfile}
                        className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center space-x-2"
                      >
                        {isSavingProfile ? (
                          <>
                            <ClipLoader size={16} color="white" />
                            <span>Saving Changes...</span>
                          </>
                        ) : (
                          <span>Save Changes</span>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* TAB 4: SAVED ADDRESSES */}
              {activeTab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700/60">
                    <div>
                      <h2 className="font-poppins text-lg font-bold text-gray-900 dark:text-white">
                        Saved Addresses
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Manage your delivery addresses for quick checkout.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast.info("Add new address modal coming soon")}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm inline-flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`border rounded-2xl p-4 sm:p-5 relative space-y-2 ${
                          addr.isDefault
                            ? "border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20"
                            : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-poppins font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                              {addr.type}
                            </span>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                                Default
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {addr.recipient}
                          </p>
                          <p>{addr.street}</p>
                          <p>
                            {addr.city}, {addr.state} {addr.zipCode}, {addr.country}
                          </p>
                          <p>{addr.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 5: PAYMENT METHODS */}
              {activeTab === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700/60">
                    <div>
                      <h2 className="font-poppins text-lg font-bold text-gray-900 dark:text-white">
                        Payment Methods
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Securely manage credit cards and payment gateways.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast.info("Add new card modal coming soon")}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm inline-flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {payments.map((pm) => (
                      <div
                        key={pm.id}
                        className={`border rounded-2xl p-5 relative space-y-3 ${
                          pm.isDefault
                            ? "border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20"
                            : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-poppins font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-indigo-600" />
                            <span>{pm.brand}</span>
                          </span>
                          {pm.isDefault && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          <p className="font-mono text-sm tracking-wider font-semibold text-gray-900 dark:text-white">
                            •••• •••• •••• {pm.last4}
                          </p>
                          <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                            <span>Holder: {pm.holderName}</span>
                            <span>Expires: {pm.expiry}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}

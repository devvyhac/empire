import React, { useState, useEffect, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import {
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertCircle,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext.jsx";
import { allProducts } from "../context/mockData.jsx";
import { getProductImage } from "../utils/productUtils.js";

const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80";

// Pre-defined demo orders with exact realistic item definitions
const sampleTrackingDatabase = {
  "ORD-9281": {
    orderId: "ORD-9281",
    status: "Delivered",
    courier: "Empire Express",
    trackingNumber: "EMP-9281-99201",
    estimatedDelivery: "May 18, 2025",
    deliveredAt: "May 18, 2025 at 2:32 PM",
    shippingAddress: {
      recipient: "John Doe",
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      zipCode: "97477",
      country: "United States",
    },
    items: [
      {
        id: "item-1",
        name: "Wireless Noise-Cancelling Headphones Pro",
        quantity: 1,
        price: 99.99,
        image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg",
      },
      {
        id: "item-2",
        name: "Fast Charging USB-C Dock 100W",
        quantity: 1,
        price: 50.0,
        image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg",
      },
    ],
    timeline: [
      {
        title: "Delivered",
        desc: "Package left at front door / reception",
        location: "Springfield, OR",
        date: "May 18, 2:32 PM",
        completed: true,
      },
      {
        title: "Out for Delivery",
        desc: "Courier is on the way to delivery address",
        location: "Springfield Regional Hub",
        date: "May 18, 8:15 AM",
        completed: true,
      },
      {
        title: "In Transit",
        desc: "Arrived at distribution sorting facility",
        location: "Portland Depot",
        date: "May 17, 11:40 PM",
        completed: true,
      },
      {
        title: "Shipped",
        desc: "Package picked up by courier service",
        location: "Central Warehouse, CA",
        date: "May 16, 4:20 PM",
        completed: true,
      },
      {
        title: "Order Placed & Verified",
        desc: "Payment confirmed, invoice generated",
        location: "Empire System",
        date: "May 15, 10:14 AM",
        completed: true,
      },
    ],
  },
  "ORD-8412": {
    orderId: "ORD-8412",
    status: "Shipped",
    courier: "DHL Express",
    trackingNumber: "DHL-8412-44102",
    estimatedDelivery: "In 2 business days",
    deliveredAt: null,
    shippingAddress: {
      recipient: "John Doe",
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      zipCode: "97477",
      country: "United States",
    },
    items: [
      {
        id: "item-3",
        name: "Ergonomic Mechanical Keyboard RGB",
        quantity: 1,
        price: 89.5,
        image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
      },
    ],
    timeline: [
      {
        title: "Delivered",
        desc: "Estimated arrival in 2 days",
        location: "Destination",
        date: "Pending",
        completed: false,
      },
      {
        title: "Out for Delivery",
        desc: "Scheduled for local courier route",
        location: "Regional Hub",
        date: "Pending",
        completed: false,
      },
      {
        title: "In Transit",
        desc: "Departed sorting hub towards destination",
        location: "Salt Lake Facility",
        date: "May 11, 6:00 AM",
        completed: true,
      },
      {
        title: "Shipped",
        desc: "Package dispatched from fulfillment center",
        location: "San Jose Center, CA",
        date: "May 10, 9:15 AM",
        completed: true,
      },
      {
        title: "Order Placed & Verified",
        desc: "Payment processed successfully",
        location: "Empire System",
        date: "May 09, 7:30 PM",
        completed: true,
      },
    ],
  },
  "ORD-7193": {
    orderId: "ORD-7193",
    status: "Processing",
    courier: "Empire Logistics",
    trackingNumber: "EMP-7193-11048",
    estimatedDelivery: "Preparing for dispatch",
    deliveredAt: null,
    shippingAddress: {
      recipient: "John Doe",
      street: "123 Business Plaza, Suite 400",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    items: [
      {
        id: "item-4",
        name: "Ultra-Wide Gaming Monitor 34-inch",
        quantity: 1,
        price: 249.0,
        image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
      },
    ],
    timeline: [
      {
        title: "Delivered",
        desc: "Pending fulfillment and dispatch",
        location: "Destination",
        date: "Pending",
        completed: false,
      },
      {
        title: "Out for Delivery",
        desc: "Pending courier route",
        location: "Regional Hub",
        date: "Pending",
        completed: false,
      },
      {
        title: "In Transit",
        desc: "Awaiting carrier pickup",
        location: "Origin Hub",
        date: "Pending",
        completed: false,
      },
      {
        title: "Shipped",
        desc: "Being packed at warehouse facility",
        location: "Distribution Center",
        date: "In Progress",
        completed: false,
      },
      {
        title: "Order Placed & Verified",
        desc: "Order received & items reserved",
        location: "Empire System",
        date: "Apr 29, 6:40 PM",
        completed: true,
      },
    ],
  },
};

// Helper to resolve product images, titles, and prices from any order payload schema
const resolveOrderItems = (rawItems, totalAmount, orderId) => {
  if (Array.isArray(rawItems) && rawItems.length > 0) {
    return rawItems.map((rawItem, idx) => {
      const rawProd = rawItem.product || rawItem;
      let matchedProduct = null;

      if (typeof rawProd === "string") {
        matchedProduct = allProducts.find(
          (p) => p._id === rawProd || p.id === rawProd
        );
      } else if (rawProd && typeof rawProd === "object") {
        matchedProduct = rawProd;
      }

      if (!matchedProduct) {
        matchedProduct = allProducts[idx % allProducts.length];
      }

      const name =
        rawItem.name ||
        matchedProduct?.name ||
        `Item #${idx + 1}`;

      const image =
        (typeof rawItem.image === "string" && rawItem.image.trim()
          ? rawItem.image.trim()
          : null) ||
        getProductImage(matchedProduct, DEFAULT_FALLBACK_IMAGE);

      const price =
        typeof rawItem.price === "number"
          ? rawItem.price
          : typeof rawItem.unitPrice === "number"
          ? rawItem.unitPrice
          : matchedProduct?.discountPrice || matchedProduct?.price || 49.99;

      const quantity = Number(rawItem.quantity) || 1;

      return {
        id: rawItem.id || rawItem._id || `item-${idx}`,
        name,
        image,
        price,
        quantity,
      };
    });
  }

  // If orderId matches a demo order in database
  if (orderId && sampleTrackingDatabase[orderId]?.items) {
    return sampleTrackingDatabase[orderId].items;
  }

  // Clean fallback for custom order ID
  const defaultItem = allProducts[0];
  return [
    {
      id: `pkg-${orderId || "item"}`,
      name: defaultItem?.name || `Order Package Item`,
      quantity: 1,
      price: totalAmount ? totalAmount / 100 : 99.99,
      image: getProductImage(defaultItem, DEFAULT_FALLBACK_IMAGE),
    },
  ];
};

const statusOrder = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

export default function TrackOrderPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const { user, orders: authOrders } = useContext(AuthContext) || {};
  const [orderQuery, setOrderQuery] = useState(initialId);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Function to look up an order by ID or orderNumber
  const findOrder = (lookupId) => {
    if (!lookupId) return null;
    const cleanId = lookupId.trim().toUpperCase();

    // 1. Check live auth orders first
    const ordersList = Array.isArray(authOrders)
      ? authOrders
      : Array.isArray(authOrders?.orders)
      ? authOrders.orders
      : [];

    if (ordersList.length > 0) {
      const match = ordersList.find(
        (o) =>
          (o.orderId && o.orderId.toUpperCase() === cleanId) ||
          (o.id && o.id.toString().toUpperCase() === cleanId) ||
          (o._id && o._id.toString().toUpperCase() === cleanId)
      );
      if (match) {
        return {
          orderId: match.orderId || match.id || cleanId,
          status: match.status || "Processing",
          courier: "Empire Express",
          trackingNumber: `EMP-${(match.orderId || match.id || cleanId).replace(/[^0-9]/g, "") || "8821"}`,
          estimatedDelivery: match.updatedAt
            ? new Date(match.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Estimated 3-5 business days",
          deliveredAt: match.status === "Delivered" ? "Delivered" : null,
          shippingAddress: match.shippingDetails || {
            recipient: user?.fullName || user?.name || "Customer",
            street: "742 Evergreen Terrace",
            city: "Springfield",
            state: "OR",
            zipCode: "97477",
            country: "United States",
          },
          items: resolveOrderItems(match.items, match.totalAmount, cleanId),
          timeline: [
            {
              title: "Delivered",
              desc:
                match.status === "Delivered"
                  ? "Package delivered successfully"
                  : "Pending delivery",
              location: match.shippingDetails?.city || "Destination",
              date: match.status === "Delivered" ? "Completed" : "Pending",
              completed: match.status === "Delivered",
            },
            {
              title: "Out for Delivery",
              desc: "Package out for delivery with local courier",
              location: "Local Sorting Center",
              date:
                match.status === "Delivered" || match.status === "Out for Delivery"
                  ? "In Transit"
                  : "Pending",
              completed:
                match.status === "Delivered" ||
                match.status === "Out for Delivery",
            },
            {
              title: "In Transit",
              desc: "Arrived at distribution facility",
              location: "Regional Hub",
              date:
                match.status !== "Processing" ? "Completed" : "Pending",
              completed: match.status !== "Processing",
            },
            {
              title: "Shipped",
              desc: "Dispatched from fulfillment center",
              location: "Empire Fulfillment",
              date:
                match.status !== "Processing" ? "Completed" : "Pending",
              completed: match.status !== "Processing",
            },
            {
              title: "Order Placed & Verified",
              desc: "Order confirmed & payment verified",
              location: "Empire System",
              date: match.updatedAt
                ? new Date(match.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Confirmed",
              completed: true,
            },
          ],
        };
      }
    }

    // 2. Check sample tracking database
    if (sampleTrackingDatabase[cleanId]) {
      const order = sampleTrackingDatabase[cleanId];
      return {
        ...order,
        items: resolveOrderItems(order.items, null, cleanId),
      };
    }

    // 3. Fallback dynamic order for any custom entered ID
    return {
      orderId: cleanId,
      status: "In Transit",
      courier: "Empire Express",
      trackingNumber: `EMP-${cleanId.replace(/[^0-9]/g, "") || "48102"}`,
      estimatedDelivery: "In 2-3 business days",
      deliveredAt: null,
      shippingAddress: {
        recipient: user?.fullName || user?.name || "Customer",
        street: "742 Evergreen Terrace",
        city: "Springfield",
        state: "OR",
        zipCode: "97477",
        country: "United States",
      },
      items: resolveOrderItems([], null, cleanId),
      timeline: [
        {
          title: "Delivered",
          desc: "Scheduled for local delivery",
          location: "Destination",
          date: "Pending",
          completed: false,
        },
        {
          title: "Out for Delivery",
          desc: "Package arriving at local hub",
          location: "Local Hub",
          date: "Pending",
          completed: false,
        },
        {
          title: "In Transit",
          desc: "Package in transit across regional distribution",
          location: "Regional Hub",
          date: "Today, 7:30 AM",
          completed: true,
        },
        {
          title: "Shipped",
          desc: "Dispatched from central warehouse",
          location: "Main Warehouse",
          date: "Yesterday",
          completed: true,
        },
        {
          title: "Order Placed & Verified",
          desc: "Payment verified and order registered",
          location: "Empire System",
          date: "2 days ago",
          completed: true,
        },
      ],
    };
  };

  // Perform search
  const handleSearch = (targetId) => {
    const idToSearch = targetId || orderQuery;
    if (!idToSearch || !idToSearch.trim()) {
      setSearchError("Please enter an Order ID or Tracking Number.");
      return;
    }

    setIsLoading(true);
    setSearchError("");

    setTimeout(() => {
      const result = findOrder(idToSearch);
      if (result) {
        setActiveOrder(result);
        setSearchParams({ id: result.orderId });
      } else {
        setSearchError("No tracking data found for this Order ID.");
      }
      setIsLoading(false);
    }, 250);
  };

  // Auto-search on page load if ?id= is in the query params
  useEffect(() => {
    if (initialId) {
      setOrderQuery(initialId);
      handleSearch(initialId);
    } else {
      // Default to the first order so page is never blank
      const defaultOrder = sampleTrackingDatabase["ORD-9281"];
      setActiveOrder({
        ...defaultOrder,
        items: resolveOrderItems(defaultOrder.items, null, "ORD-9281"),
      });
      setOrderQuery("ORD-9281");
    }
  }, [initialId]);

  // Order status progression index
  const activeStatusIndex = useMemo(() => {
    if (!activeOrder) return 0;
    const idx = statusOrder.indexOf(activeOrder.status);
    return idx >= 0 ? idx : 1;
  }, [activeOrder]);

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 font-inter py-4 sm:py-8 lg:py-10 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Breadcrumb & Page Banner */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1 flex items-center space-x-1.5"
            >
              <Link
                to="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                to="/profile?tab=orders"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                My Orders
              </Link>
              <span>/</span>
              <span className="text-gray-700 dark:text-gray-300">Track Order</span>
            </nav>
            <div className="flex items-center space-x-2.5">
              <h1 className="font-poppins text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Real-Time Order Tracking
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enter your order ID or tracking code to monitor real-time shipment milestones.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <Link
              to="/profile?tab=orders"
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-xs"
            >
              View All Orders
            </Link>
          </div>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-9281, ORD-8412, ORD-7193)..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-2 shrink-0"
            >
              {isLoading ? (
                <>
                  <ClipLoader size={16} color="white" />
                  <span>Locating Order...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track Status</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Order Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              Quick select orders:
            </span>
            {["ORD-9281", "ORD-8412", "ORD-7193"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setOrderQuery(id);
                  handleSearch(id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  activeOrder?.orderId === id
                    ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                }`}
              >
                #{id}
              </button>
            ))}
          </div>

          {searchError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Tracking Details View */}
        {activeOrder && (
          <div className="space-y-6 sm:space-y-8">
            {/* Shipment Status Banner */}
            <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-poppins text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                        Order #{activeOrder.orderId}
                      </h2>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          activeOrder.status === "Delivered"
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                            : activeOrder.status === "Shipped"
                            ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40"
                            : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40"
                        }`}
                      >
                        {activeOrder.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Carrier: <strong className="text-gray-700 dark:text-gray-300">{activeOrder.courier}</strong> &bull; Tracking ID:{" "}
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{activeOrder.trackingNumber}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-3 text-right sm:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Estimated Delivery
                  </span>
                  <p className="font-poppins text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {activeOrder.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Responsive Progress Stepper */}
              <div className="py-2">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 rounded-full" />
                  <div
                    className="hidden sm:block absolute top-5 left-8 h-1 bg-indigo-600 dark:bg-indigo-500 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{
                      width: `calc(${
                        (activeStatusIndex / (statusOrder.length - 1)) * 100
                      }% - 4rem)`,
                    }}
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                    {statusOrder.map((step, idx) => {
                      const isComplete = idx <= activeStatusIndex;
                      const isCurrent = idx === activeStatusIndex;
                      return (
                        <div
                          key={step}
                          className="flex flex-col sm:items-center text-left sm:text-center space-y-2 p-2 sm:p-0 rounded-xl bg-gray-50/50 sm:bg-transparent dark:bg-gray-900/30 sm:dark:bg-transparent"
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isCurrent
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-110"
                                : isComplete
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                            }`}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-xs font-semibold ${
                                isComplete
                                  ? "text-gray-900 dark:text-white font-bold"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            >
                              {step}
                            </p>
                            {isCurrent && (
                              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                                Current Status
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 2-Column Details (Milestone Activity Log + Order Summary) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Tracking Activity Timeline (7 cols) */}
              <div className="lg:col-span-7 bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700/60">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-poppins text-base font-bold text-gray-900 dark:text-white">
                      Tracking History
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    Updated Live
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                  {activeOrder.timeline.map((event, i) => (
                    <div key={i} className="relative group">
                      {/* Timeline Node */}
                      <div
                        className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
                          event.completed
                            ? "bg-indigo-600 dark:bg-indigo-400 ring-4 ring-indigo-50 dark:ring-indigo-950/60"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />

                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h4
                            className={`text-xs sm:text-sm font-semibold ${
                              event.completed
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {event.title}
                          </h4>
                          <span className="text-[11px] text-gray-400 font-mono">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {event.desc}
                        </p>
                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium flex items-center space-x-1 pt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Order Items & Shipping Address (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Shipping Destination */}
                <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center space-x-2 pb-2 border-b border-gray-100 dark:border-gray-700/60">
                    <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-poppins text-sm font-bold text-gray-900 dark:text-white">
                      Delivery Address
                    </h3>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {activeOrder.shippingAddress?.recipient || "John Doe"}
                    </p>
                    <p>{activeOrder.shippingAddress?.street}</p>
                    <p>
                      {activeOrder.shippingAddress?.city},{" "}
                      {activeOrder.shippingAddress?.state}{" "}
                      {activeOrder.shippingAddress?.zipCode},{" "}
                      {activeOrder.shippingAddress?.country}
                    </p>
                  </div>
                </div>

                {/* Items in this Package */}
                <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-700/60">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="font-poppins text-sm font-bold text-gray-900 dark:text-white">
                        Items in Package
                      </h3>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">
                      {activeOrder.items?.length || 1} Item(s)
                    </span>
                  </div>

                  <div className="space-y-3 divide-y divide-gray-100 dark:divide-gray-700/60">
                    {activeOrder.items?.map((item) => (
                      <div
                        key={item.id}
                        className="pt-3 first:pt-0 flex items-center space-x-3.5"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200/80 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shrink-0">
                          <img
                            src={item.image || DEFAULT_FALLBACK_IMAGE}
                            alt={item.name || "Product Item"}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {item.name || "Marketplace Product"}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-poppins text-xs sm:text-sm font-bold text-gray-900 dark:text-white shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-gray-600 dark:text-gray-400">
                      Total Package Value
                    </span>
                    <span className="font-poppins font-bold text-gray-900 dark:text-white">
                      $
                      {activeOrder.items
                        ?.reduce(
                          (acc, curr) => acc + curr.price * curr.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Need Help Box */}
                <div className="bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl p-4 sm:p-5 text-xs space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Guaranteed Safe Delivery</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    If your shipment is delayed or you need to reschedule delivery, our 24/7 customer support team is here to assist.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline pt-1"
                  >
                    <span>Contact Support</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

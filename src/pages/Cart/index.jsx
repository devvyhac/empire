import React, { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

import { CartContext } from "../../context/CartContext.jsx";
import { ProductContext } from "../../context/ProductContext.jsx";
import { ProductCard } from "../../components/common/Card.jsx";

import CartItem from "./components/CartItem.jsx";
import FreeShippingBar, { FREE_SHIPPING_THRESHOLD } from "./components/FreeShippingBar.jsx";
import CartSummaryCard from "./components/CartSummaryCard.jsx";
import EmptyCartState from "./components/EmptyCartState.jsx";
import ClearCartModal from "./components/ClearCartModal.jsx";

const STEPS = [
  { id: 1, name: "Cart", path: "/cart", active: true },
  { id: 2, name: "Checkout", path: "/checkout", active: false },
  { id: 3, name: "Confirmation", path: "/confirm-order", active: false },
];

const Cart = () => {
  const { cartItems = [], clearCart } = useContext(CartContext);
  const { products = [] } = useContext(ProductContext) || {};

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Calculate financial figures
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = Number(
        item.discountPrice ?? item.discountedPrice ?? item.originalPrice ?? item.price ?? 0
      );
      const qty = Number(item.quantity) || 1;
      return acc + price * qty;
    }, 0);
  }, [cartItems]);

  // Total quantity of items
  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  }, [cartItems]);

  // Shipping calculation (Base rate $5.00, Free over threshold or with FREESHIP promo)
  const baseShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5.0;
  const shipping = appliedPromo?.type === "shipping" ? 0 : baseShipping;

  // Tax calculation (8%)
  const tax = subtotal * 0.08;

  // Discount calculation based on promo code
  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === "percent") {
      return (subtotal * appliedPromo.value) / 100;
    }
    if (appliedPromo.type === "fixed") {
      return Math.min(subtotal, appliedPromo.value);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  // Final Total
  const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

  // Promo Code Validation handler
  const handleApplyPromo = (code) => {
    const normalized = code.trim().toUpperCase();

    if (normalized === "SAVE10") {
      const promoObj = {
        code: "SAVE10",
        type: "percent",
        value: 10,
        description: "10% off your entire order",
      };
      setAppliedPromo(promoObj);
      toast.success("Promo code applied: 10% OFF!");
      return { success: true };
    }

    if (normalized === "EMPIRE20") {
      const promoObj = {
        code: "EMPIRE20",
        type: "percent",
        value: 20,
        description: "20% VIP discount applied",
      };
      setAppliedPromo(promoObj);
      toast.success("VIP Promo applied: 20% OFF!");
      return { success: true };
    }

    if (normalized === "FREESHIP") {
      const promoObj = {
        code: "FREESHIP",
        type: "shipping",
        value: 100,
        description: "Free standard shipping unlocked",
      };
      setAppliedPromo(promoObj);
      toast.success("Promo applied: Free Shipping unlocked!");
      return { success: true };
    }

    if (normalized === "WELCOME5") {
      const promoObj = {
        code: "WELCOME5",
        type: "fixed",
        value: 5,
        description: "$5.00 Welcome credit",
      };
      setAppliedPromo(promoObj);
      toast.success("Promo applied: $5.00 off!");
      return { success: true };
    }

    return {
      success: false,
      message: "Invalid promo code. Try SAVE10 or EMPIRE20.",
    };
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    toast.info("Promo code removed");
  };

  // Recommended products (excluding items in the current cart)
  const recommendedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const cartIds = new Set(cartItems.map((item) => item._id || item.id));
    return products.filter((p) => !cartIds.has(p._id || p.id)).slice(0, 4);
  }, [products, cartItems]);

  const isCartEmpty = cartItems.length === 0;

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 font-inter py-4 sm:py-8 lg:py-10 px-3.5 sm:px-6 lg:px-8 pb-28 lg:pb-12">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-8">
        {/* Step Progress Bar */}
        <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-3.5 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {STEPS.map((step, index) => {
              const isCurrent = step.id === 1;
              const isPassed = step.id < 1;
              const isAccessible = step.id === 2 && !isCartEmpty;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Item */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-poppins font-bold text-xs sm:text-sm transition-all duration-200 ${
                        isCurrent
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105 ring-4 ring-indigo-50 dark:ring-indigo-950/60"
                          : isPassed
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : step.id}
                    </div>

                    <div className="hidden sm:block">
                      <p
                        className={`text-xs sm:text-sm font-semibold ${
                          isCurrent
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step.name}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < STEPS.length - 1 && (
                    <div className="flex-1 mx-2 sm:mx-4 h-0.5 bg-gray-200 dark:bg-gray-700/80 rounded-full" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Page Header (When cart has items) */}
        {!isCartEmpty && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <h1 className="font-poppins text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                  Shopping Cart
                </h1>
                <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                  {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
                </span>
              </div>
              <p className="font-inter text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                Review your items and proceed to secure checkout
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
              <Link
                to="/shop"
                className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                <span>Continue Shopping</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsClearModalOpen(true)}
                className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                <span>Clear Cart</span>
              </button>
            </div>
          </div>
        )}

        {/* Free Shipping Dynamic Progress Meter */}
        {!isCartEmpty && <FreeShippingBar subtotal={subtotal} />}

        {/* Main Cart Content / Empty State */}
        {isCartEmpty ? (
          <EmptyCartState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <CartItem key={item._id || item.id} item={item} />
                ))}
              </AnimatePresence>

              {/* Bottom Support & Security Banner */}
              <div className="bg-white dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>
                    Safe & Secure: All transactions are 256-bit encrypted.
                  </span>
                </div>
                <Link
                  to="/contact"
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
                >
                  Need assistance? Contact Support
                </Link>
              </div>
            </div>

            {/* Right Column: Sticky Order Summary */}
            <div className="lg:col-span-4">
              <CartSummaryCard
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={grandTotal}
                appliedPromo={appliedPromo}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
                itemCount={totalItemCount}
              />
            </div>
          </div>
        )}

        {/* Recommended Products Cross-Sell Section */}
        {recommendedProducts.length > 0 && (
          <section className="pt-6 sm:pt-12 border-t border-gray-200/80 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="font-poppins text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                  Recommended For You
                </h3>
                <p className="font-inter text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                  Discover popular picks and complementary accessories
                </p>
              </div>
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>

            <div className="text-center sm:hidden mt-5">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Bottom Checkout Bar (Hidden on lg+ screens) */}
      {!isCartEmpty && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/80 dark:border-gray-800 px-4 py-3 shadow-2xl safe-area-pb">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 block uppercase tracking-wider">
                Total ({totalItemCount} {totalItemCount === 1 ? "item" : "items"})
              </span>
              <span className="font-poppins font-extrabold text-base sm:text-lg text-indigo-600 dark:text-indigo-400">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            <Link to="/checkout" className="flex-1 max-w-[200px]">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-poppins font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-1.5 transition-all"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </Link>
          </div>
        </div>
      )}

      {/* Clear Cart Confirmation Modal */}
      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={() => {
          clearCart();
          toast.info("Your shopping cart has been cleared");
        }}
        itemCount={totalItemCount}
      />
    </main>
  );
};

export default Cart;

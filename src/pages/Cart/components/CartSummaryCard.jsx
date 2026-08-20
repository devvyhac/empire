import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Tag,
  ShieldCheck,
  RefreshCw,
  Truck,
  Check,
  X,
  Sparkles,
} from "lucide-react";

const POPULAR_PROMOS = [
  { code: "SAVE10", label: "10% OFF" },
  { code: "EMPIRE20", label: "20% OFF" },
  { code: "FREESHIP", label: "Free Shipping" },
];

export const CartSummaryCard = ({
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  total = 0,
  appliedPromo = null,
  onApplyPromo,
  onRemovePromo,
  itemCount = 0,
}) => {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApply = (e) => {
    e?.preventDefault?.();
    setPromoError("");
    if (!promoInput.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    const result = onApplyPromo(promoInput.trim());
    if (result && !result.success) {
      setPromoError(result.message || "Invalid coupon code");
    } else {
      setPromoInput("");
      setPromoError("");
    }
  };

  const handleQuickApply = (code) => {
    setPromoError("");
    const result = onApplyPromo(code);
    if (result && !result.success) {
      setPromoError(result.message || "Invalid coupon code");
    } else {
      setPromoInput("");
      setPromoError("");
    }
  };

  return (
    <div className="relative lg:sticky lg:top-24">
      <div className="bg-white dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300">
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-gray-100 dark:border-gray-700/80">
          <h2 className="font-poppins text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Order Summary
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Promo Code Input & Badges */}
        <div className="py-3.5 sm:py-4 border-b border-gray-100 dark:border-gray-700/80">
          <label
            htmlFor="cart-promo-code"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Promo Code / Coupon
          </label>

          {appliedPromo ? (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider">
                    {appliedPromo.code}
                  </p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    {appliedPromo.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onRemovePromo}
                className="p-1 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 transition-colors"
                aria-label="Remove promo code"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="cart-promo-code"
                    placeholder="Enter promo code"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      if (promoError) setPromoError("");
                    }}
                    className="w-full pl-3 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors uppercase font-mono"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-2 px-3.5 sm:px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors shrink-0 flex items-center justify-center"
                >
                  Apply
                </motion.button>
              </form>

              {promoError && (
                <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                  {promoError}
                </p>
              )}

              {/* Quick Suggestion Chips */}
              <div className="flex items-center flex-wrap gap-1.5 mt-2.5">
                <span className="text-[11px] text-gray-400 dark:text-gray-500 mr-1">
                  Try:
                </span>
                {POPULAR_PROMOS.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => handleQuickApply(p.code)}
                    className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-700/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200/60 dark:border-gray-600/40 transition-colors"
                  >
                    {p.code}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Cost Breakdown */}
        <div className="py-3.5 sm:py-4 space-y-2 sm:space-y-2.5 text-xs sm:text-sm border-b border-gray-100 dark:border-gray-700/80">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              Estimated Shipping
            </span>
            <span>
              {shipping === 0 ? (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  FREE
                </span>
              ) : (
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ${shipping.toFixed(2)}
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Estimated Tax (8%)</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ${tax.toFixed(2)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5 inline" />
                Discount ({appliedPromo?.code || "Promo"})
              </span>
              <span className="font-bold">-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Grand Total */}
        <div className="pt-3.5 sm:pt-4 pb-2 flex items-baseline justify-between gap-2">
          <div>
            <span className="font-poppins font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100 block">
              Total Amount
            </span>
            <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500">
              Including VAT & shipping
            </span>
          </div>
          <span className="font-poppins font-extrabold text-xl sm:text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400 shrink-0">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Primary Checkout Button */}
        <Link to="/checkout" className="block mt-3.5 sm:mt-4">
          <motion.button
            type="button"
            className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-poppins font-semibold text-sm sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center space-x-2 transition-all duration-200 group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </Link>

        {/* Trust Badges */}
        <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-gray-100 dark:border-gray-700/80 space-y-2">
          <div className="flex items-center space-x-2 sm:space-x-2.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
            <span>256-Bit SSL Encrypted Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-2.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
            <span>30-Day Hassle-Free Money-Back Guarantee</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-2.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0" />
            <span>Free Express Delivery on orders over $100</span>
          </div>
        </div>

        {/* Payment Icons Bar */}
        <div className="mt-3.5 sm:mt-4 pt-3 flex flex-wrap items-center justify-center gap-2 text-gray-400 dark:text-gray-500 text-[11px] sm:text-xs border-t border-gray-100 dark:border-gray-700/50">
          <span className="font-medium">Accepted:</span>
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700/70 font-semibold text-[10px] text-gray-700 dark:text-gray-300">
              VISA
            </span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700/70 font-semibold text-[10px] text-gray-700 dark:text-gray-300">
              MasterCard
            </span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700/70 font-semibold text-[10px] text-gray-700 dark:text-gray-300">
              Paystack
            </span>
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700/70 font-semibold text-[10px] text-gray-700 dark:text-gray-300">
              Apple Pay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryCard;

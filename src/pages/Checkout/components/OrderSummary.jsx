import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Check,
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-toastify";
import { getProductPrices, getProductImage } from "../../../utils/productUtils.js";

const OrderSummary = ({
  cartItems = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  appliedPromo = null,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) {
      toast.info("Please enter a promo code");
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      if (onApplyPromo) {
        onApplyPromo(promoInput);
      }
      setPromoInput("");
      setIsApplying(false);
    }, 200);
  };

  const totalItemCount = cartItems.reduce(
    (acc, item) => acc + (Number(item.quantity) || 1),
    0
  );

  return (
    <div className="relative lg:sticky lg:top-8 h-full">
      <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center space-x-2">
            <h2 className="font-poppins text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Order Summary
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700/60 pr-1 space-y-1">
          {cartItems.map((item, idx) => {
            const { unitPrice } = getProductPrices(item);
            const qty = Number(item.quantity) || 1;
            const lineTotal = unitPrice * qty;

            return (
              <div
                key={item._id || item.id || idx}
                className="py-3 flex items-center justify-between first:pt-0 last:pb-0"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-900 overflow-hidden shrink-0 border border-gray-200/60 dark:border-gray-700/60">
                    <img
                      src={getProductImage(item)}
                      alt={item.name || "Product"}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold flex items-center justify-center shadow">
                      {qty}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-poppins text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.name}
                    </p>
                    <p className="font-inter text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      ${unitPrice.toFixed(2)} &times; {qty}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <p className="font-poppins text-sm font-bold text-gray-900 dark:text-gray-100">
                    ${lineTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo Code Input / Applied Badge */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60">
          {appliedPromo ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {appliedPromo.code}
                  </span>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    {appliedPromo.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onRemovePromo}
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                title="Remove promo code"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Tag className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  placeholder="Promo code (e.g. SAVE10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 uppercase tracking-wider placeholder-normal placeholder-gray-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isApplying || !promoInput.trim()}
                className="py-2 px-3.5 rounded-xl bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 active:scale-95 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-sm"
              >
                Apply
              </button>
            </form>
          )}
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-2.5 pt-3 border-t border-gray-100 dark:border-gray-700/60 text-xs sm:text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
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
            <span>Estimated Taxes (8%)</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ${tax.toFixed(2)}
            </span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>Promo Discount</span>
              <span>- ${(subtotal * (appliedPromo.value / 100)).toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t-2 border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-baseline">
          <div>
            <span className="font-poppins text-base font-bold text-gray-900 dark:text-gray-100">
              Total
            </span>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">
              Includes taxes & shipping
            </p>
          </div>
          <span className="font-poppins text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Trust Badges Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 space-y-2">
          <div className="flex items-center space-x-2 text-[11px] text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-gray-500 dark:text-gray-400">
            <RotateCcw className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>30-Day Hassle-Free Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

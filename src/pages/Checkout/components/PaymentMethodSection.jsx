import React from "react";
import { CreditCard, ShieldCheck, Lock, CheckCircle2, Building, Smartphone } from "lucide-react";

export const PaymentMethodSection = ({ selectedPayment = "paystack", onSelectPayment }) => {
  return (
    <div className="space-y-4 pt-4">
      {/* Paystack Card / Online Payment */}
      <div
        onClick={() => onSelectPayment("paystack")}
        className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
          selectedPayment === "paystack"
            ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-sm"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                selectedPayment === "paystack"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500"
              }`}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-poppins text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                  Paystack Secure Checkout
                </p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                  Recommended
                </span>
              </div>
              <p className="font-inter text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Pay securely with Debit/Credit Card (Visa, Mastercard, Verve), Bank Transfer, or USSD.
              </p>
            </div>
          </div>

          <div className="shrink-0 ml-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPayment === "paystack"
                  ? "border-indigo-600 bg-indigo-600"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {selectedPayment === "paystack" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
        </div>

        {/* Supported Card Badges */}
        <div className="mt-4 pt-3 border-t border-gray-200/70 dark:border-gray-700/60 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium text-[11px] uppercase tracking-wider text-gray-400">
            Accepted:
          </span>
          <span className="px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono font-bold text-gray-700 dark:text-gray-300 text-[11px]">
            VISA
          </span>
          <span className="px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono font-bold text-gray-700 dark:text-gray-300 text-[11px]">
            Mastercard
          </span>
          <span className="px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono font-bold text-gray-700 dark:text-gray-300 text-[11px]">
            Verve
          </span>
          <span className="px-2 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono font-bold text-gray-700 dark:text-gray-300 text-[11px]">
            Bank Transfer
          </span>
        </div>
      </div>

      {/* Security Assurance Card */}
      <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 rounded-xl p-3.5 flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>
          Your transaction is processed via an encrypted 256-bit SSL gateway. We never store your card details.
        </span>
      </div>
    </div>
  );
};

export default PaymentMethodSection;

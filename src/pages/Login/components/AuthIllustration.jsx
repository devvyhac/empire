import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  Zap,
  CreditCard,
  Package,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export const AuthIllustration = ({ mode = "login" }) => {
  const isSignUp = mode === "signup";

  return (
    <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-8 xl:p-10 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white overflow-hidden select-none">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Branding */}
      <div className="relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200 mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span>{isSignUp ? "Join 50,000+ Smart Shoppers" : "Welcome to Empire Global Trade"}</span>
        </div>
        <h2 className="font-poppins text-2xl xl:text-3xl font-extrabold tracking-tight text-white leading-tight">
          {isSignUp
            ? "Trade, Shop & Grow Your Commerce Empire"
            : "Seamless Shopping, Trusted Global Delivery"}
        </h2>
      </div>

      {/* Central Interactive / Animated Illustration Stage */}
      <div className="relative z-10 my-8 flex items-center justify-center">
        {/* Main Central Card Mockup */}
        <motion.div
          className="relative w-64 xl:w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Header of Central Card */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Empire Marketplace</p>
                <p className="text-[10px] text-indigo-200">Verified Merchant</p>
              </div>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          {/* Mini Chart / Metrics */}
          <div className="py-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-indigo-200 text-[11px]">Monthly Volume</span>
              <span className="text-emerald-400 font-bold flex items-center text-[11px]">
                +28.4% <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
            {/* Animated Progress Bars */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 rounded-full"
                initial={{ width: "20%" }}
                animate={{ width: ["30%", "85%", "65%", "85%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Mini Recent Transaction item */}
          <div className="mt-1 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                <Package className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-white">Premium Electronics</p>
                <p className="text-[9px] text-indigo-300">Dispatched &bull; Tracking #4892</p>
              </div>
            </div>
            <span className="font-bold text-white">$249.99</span>
          </div>
        </motion.div>

        {/* Floating Badge 1: Top Right */}
        <motion.div
          className="absolute -top-4 -right-2 xl:-right-4 bg-slate-800/90 backdrop-blur-lg border border-white/15 px-3 py-2 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-semibold text-white"
          animate={{ y: [0, 8, 0], x: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="p-1 rounded-lg bg-indigo-500 text-white">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px]">Instant Checkout</span>
        </motion.div>

        {/* Floating Badge 2: Bottom Left */}
        <motion.div
          className="absolute -bottom-4 -left-2 xl:-left-4 bg-slate-800/90 backdrop-blur-lg border border-white/15 px-3 py-2 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-semibold text-white"
          animate={{ y: [0, -8, 0], x: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="p-1 rounded-lg bg-emerald-500 text-white">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px]">256-Bit SSL Encrypted</span>
        </motion.div>
      </div>

      {/* Bottom Features Footer */}
      <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-indigo-200">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="text-[11px]">Live Global Inventory</span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-[11px]">Secure Card & Transfers</span>
        </div>
      </div>
    </div>
  );
};

export default AuthIllustration;

import React from "react";
import {
  Mail,
  MapPin,
  Globe,
  Building2,
  Map,
  Hash,
  Truck,
  Zap,
  CheckCircle,
} from "lucide-react";

const ShippingSectionForm = ({
  formData,
  handleInputChange,
  errors = {},
  selectedShippingMethod = "standard",
  onSelectShippingMethod,
  subtotal = 0,
}) => {
  const isFreeStandard = subtotal >= 100;

  return (
    <div className="space-y-6 pt-4">
      {/* Contact Email Field */}
      <div>
        <label
          htmlFor="shipping-email"
          className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
        >
          Contact Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            id="shipping-email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email || ""}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150 ${
              errors.email
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
            {errors.email}
          </p>
        )}
      </div>

      {/* Street Address & Country */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="shipping-address"
            className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Street Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="shipping-address"
              name="address"
              placeholder="123 Empire Boulevard, Apt 4B"
              value={formData.address || ""}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150 ${
                errors.address
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            />
          </div>
          {errors.address && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.address}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="shipping-country"
            className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="shipping-country"
              name="country"
              placeholder="United States"
              value={formData.country || ""}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150 ${
                errors.country
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            />
          </div>
          {errors.country && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.country}
            </p>
          )}
        </div>
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="shipping-city"
            className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="shipping-city"
              name="city"
              placeholder="New York"
              value={formData.city || ""}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150 ${
                errors.city
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            />
          </div>
          {errors.city && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="shipping-state"
            className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            State / Province <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Map className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="shipping-state"
              name="state"
              placeholder="NY"
              value={formData.state || ""}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150 ${
                errors.state
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            />
          </div>
          {errors.state && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="shipping-zipCode"
            className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            ZIP / Postal Code <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Hash className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="shipping-zipCode"
              name="zipCode"
              placeholder="10001"
              value={formData.zipCode || ""}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150 ${
                errors.zipCode
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            />
          </div>
          {errors.zipCode && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.zipCode}
            </p>
          )}
        </div>
      </div>

      {/* Shipping Method Selection */}
      <div className="pt-2">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
          Delivery Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Standard Delivery Option */}
          <div
            onClick={() => onSelectShippingMethod && onSelectShippingMethod("standard")}
            className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start justify-between ${
              selectedShippingMethod === "standard"
                ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedShippingMethod === "standard"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                }`}
              >
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-poppins text-sm font-bold text-gray-900 dark:text-gray-100">
                  Standard Delivery
                </p>
                <p className="font-inter text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Delivered in 3-5 business days
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-poppins text-sm font-bold text-gray-900 dark:text-gray-100">
                {isFreeStandard ? (
                  <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                ) : (
                  "$5.00"
                )}
              </span>
            </div>
          </div>

          {/* Express Delivery Option */}
          <div
            onClick={() => onSelectShippingMethod && onSelectShippingMethod("express")}
            className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start justify-between ${
              selectedShippingMethod === "express"
                ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedShippingMethod === "express"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                }`}
              >
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <p className="font-poppins text-sm font-bold text-gray-900 dark:text-gray-100">
                    Express Priority
                  </p>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400">
                    FAST
                  </span>
                </div>
                <p className="font-inter text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Delivered in 1-2 business days
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-poppins text-sm font-bold text-gray-900 dark:text-gray-100">
                $15.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSectionForm;

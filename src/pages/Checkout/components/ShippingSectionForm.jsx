import React from "react";

const ShippingSectionForm = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="shipping-fullName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="shipping-email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange(e)}
          className={`p-2 focus:outline-gray-100 mt-1 block w-full rounded-md shadow-sm sm:text-lg dark:bg-gray-900 dark:text-gray-100 transition-colors ${
            errors.email
              ? "border-error-light dark:border-error-dark"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.email && (
          <p
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <label
            htmlFor="shipping-address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Street Address
          </label>
          <input
            type="text"
            id="shipping-address"
            name="address"
            value={formData.address}
            onChange={(e) => handleInputChange(e)}
            className={`p-2 focus:outline-gray-100 mt-1 block w-full rounded-md shadow-sm sm:text-lg dark:bg-gray-900 dark:text-gray-100 transition-colors ${
              errors.address
                ? "border-error-light dark:border-error-dark"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.address && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.address}
            </p>
          )}
        </div>
        <div className="col-span-1">
          <label
            htmlFor="shipping-country"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Country
          </label>
          <input
            type="text"
            id="shipping-country"
            name="country"
            value={formData.country}
            onChange={(e) => handleInputChange(e)}
            className={`p-2 focus:outline-gray-100 mt-1 block w-full rounded-md shadow-sm sm:text-lg dark:bg-gray-900 dark:text-gray-100 transition-colors ${
              errors.country
                ? "border-error-light dark:border-error-dark"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.country && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.country}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="shipping-city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            City
          </label>
          <input
            type="text"
            id="shipping-city"
            name="city"
            value={formData.city}
            onChange={(e) => handleInputChange(e)}
            className={`p-2 focus:outline-gray-100 mt-1 block w-full rounded-md shadow-sm sm:text-lg dark:bg-gray-900 dark:text-gray-100 transition-colors ${
              errors.city
                ? "border-error-light dark:border-error-dark"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.city && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.city}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="shipping-state"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            State
          </label>
          <input
            type="text"
            id="shipping-state"
            name="state"
            value={formData.state}
            onChange={(e) => handleInputChange(e)}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-lg p-2 focus:outline-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors ${
              errors.state
                ? "border-error-light dark:border-error-dark"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.state && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.state}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="shipping-zipCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            ZIP Code
          </label>
          <input
            type="text"
            id="shipping-zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange(e)}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-lg p-2 focus:outline-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors ${
              errors.zipCode
                ? "border-error-light dark:border-error-dark"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.zipCode && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.zipCode}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingSectionForm;

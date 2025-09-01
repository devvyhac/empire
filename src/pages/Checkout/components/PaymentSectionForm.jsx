import React from "react";

const PaymentSectionForm = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="card-number"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Card Number
        </label>
        <input
          type="text"
          id="card-number"
          name="cardNumber"
          value={formData.payment.cardNumber}
          onChange={(e) => handleInputChange(e, "payment")}
          className={`p-2 focus:outline-gray-100 mt-1 block w-full rounded-md shadow-sm sm:text-lg dark:bg-gray-900 dark:text-gray-100 transition-colors ${
            errors.cardNumber
              ? "border-error-light dark:border-error-dark"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.cardNumber && (
          <p
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errors.cardNumber}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="expiry-date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Expiration Date
          </label>
          <input
            type="text"
            id="expiry-date"
            name="expiryDate"
            value={formData.payment.expiryDate}
            onChange={(e) => handleInputChange(e, "payment")}
            placeholder="MM/YY"
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-lg p-2 focus:outline-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors ${
              errors.expiryDate
                ? "border-error-light dark:border-error-dark"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.expiryDate && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.expiryDate}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={formData.payment.cvc}
            onChange={(e) => handleInputChange(e, "payment")}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-lg p-2 focus:outline-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors ${
              errors.cvc
                ? "border-error-light dark:border-error-dark"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.cvc && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errors.cvc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSectionForm;

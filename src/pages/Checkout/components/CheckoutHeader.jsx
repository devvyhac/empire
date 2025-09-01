import React from "react";

const CheckoutHeader = ({ isLoggedIn }) => {
  return (
    <div className="text-center md:text-left mb-8">
      <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        {!isLoggedIn ? "(Guest)" : "Secure"} Checkout
      </h1>
      <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
        Complete your order in a few steps.
      </p>
    </div>
  );
};

export default CheckoutHeader;

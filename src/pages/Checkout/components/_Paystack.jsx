import React from "react";
import { PaystackConsumer } from "react-paystack";
import { motion } from "framer-motion";

const _Paystack = ({ config, handleSuccess, handleClose }) => {
  return (
    <>
      <PaystackConsumer
        {...config}
        onSuccess={handleSuccess}
        closeWidget={handleClose}
        onClose={handleClose}
      >
        {({ initializePayment }) => (
          <motion.button
            onClick={() => initializePayment()}
            className="mt-6 w-full py-3 px-6 rounded-lg shadow-sm text-base font-inter bg-green-500 text-white bg-success-light dark:bg-success-dark hover:bg-success-dark dark:hover:bg-success-light transition-colors flex items-center justify-center"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Pay Now
          </motion.button>
        )}
      </PaystackConsumer>
    </>
  );
};

export default _Paystack;

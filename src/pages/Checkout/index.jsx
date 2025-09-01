import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  ChevronDown,
  Truck,
  CreditCard,
  ArrowLeft,
  Currency,
} from "lucide-react";

import { Link } from "react-router-dom";

import CollapsibleSection from "./components/CollapsibleSection.jsx";
import ShippingSectionForm from "./components/ShippingSectionForm.jsx";
import PaymentSectionForm from "./components/PaymentSectionForm.jsx";
import OrderSummary from "./components/OrderSummary.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import CheckoutHeader from "./components/CheckoutHeader.jsx";
import _Paystack from "./components/_Paystack.jsx";
import PayOption from "./components/PayOption.jsx";

import { CartContext } from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { validateForm } from "./helper/validateForm.js";

const shippingDetails = localStorage.getItem("shippingDetails");
// let paymentDetails = localStorage.getItem("paymentDetails");

// Custom Tailwind CSS colors from the design brief
const customColors = {
  "primary-light": "#4c51bf",
  "primary-dark": "#3a41a3",
  "success-light": "#10b981",
  "success-dark": "#059669",
  "error-light": "#ef4444",
  "error-dark": "#dc2626",
};

// Checkout progress steps
const progressSteps = ["Cart", "Checkout", "Confirmation"];

export default function Checkout() {
  const { cartItems } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.salePrice !== null ? item.salePrice : item.originalPrice) *
        item.count,
    0
  );
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08; // Example 8% tax rate
  const total = subtotal + shipping + tax;
  const [activeAccordion, setActiveAccordion] = useState("shipping");
  // const [showPayment, setShowPayment] = useState(false);
  // State to track if the 'Place Order' button has been clicked at least once

  const [formData, setFormData] = useState(
    shippingDetails
      ? JSON.parse(shippingDetails)
      : {
          email: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        }
  );

  const paymentMethods = ["paystack", "paypal", "stripe"];
  const [paymentOption, setPaymentOption] = useState("paystack");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Consolidate form data for validation

    const { errors, isValid } = validateForm(formData);
    setErrors(errors);
    setIsFormValid(isValid);

    // If the form is no longer valid, hide the payment button
    // if (!isValid) {
    //   setShowPayment(false);
    // }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    localStorage.setItem("shippingDetails", JSON.stringify(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasAttemptedSubmit(true);
    const { isValid } = validateForm(formData);
    // setErrors(errors);

    if (!isValid) {
      toast.error("Please fill out all required fields.");
      if (
        errors.email ||
        errors.address ||
        errors.city ||
        errors.state ||
        errors.zipCode ||
        errors.country
      ) {
        setActiveAccordion("shipping");
      }
      return;
    }
    if (!isLoggedIn) {
      // Form is not valid, show errors and toast message
      toast.info("Please Login or Register to continue!");
      // Optional: Find the first section with an error and open it

      // setShowPayment(false);
    }
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const publicKey = "pk_test_166aae968eaa714c7de96ba9dabb5d304dbd4643";
  const paystackConfig = {
    email: user.email,
    publicKey,
    reference: `ref_${Math.random().toString(36).substr(2, 20)}`,
    Currency: "USD",
    amount: total * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: user.fullName,
        },
      ],
    },
  };

  

  // Handle successful payment
  const handleSuccess = (paymentData) => {

    
    toast.success(`Payment ${paymentData.status}`);
    // TODO: Verify payment on your backend
  };

  // Handle payment popup closure
  const handleClose = () => {
    toast.error("Payment popup closed");
  };

  const renderButton = () => {
    {
      if (isLoggedIn && isFormValid) {
        return (
          <_Paystack
            config={paystackConfig}
            handleClose={handleClose}
            handleSuccess={handleSuccess}
          />
        );
      } else {
        return (
          <motion.button
            className="mt-6 w-full py-3 px-6 rounded-lg shadow-sm text-base font-inter bg-green-500 text-white bg-success-light dark:bg-success-dark hover:bg-success-dark dark:hover:bg-success-light transition-colors flex items-center justify-center"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Place Order</span>
          </motion.button>
        );
      }
    }
  };

  return (
    <main className="flex items-start justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 font-inter">
      <div className="w-full max-w-6xl">
        {/* Progress Bar */}

        <ProgressBar progressSteps={progressSteps} activeStep={2} />

        <CheckoutHeader isLoggedIn={isLoggedIn} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address Section */}
              <CollapsibleSection
                title="Shipping Details"
                isOpen={activeAccordion === "shipping"}
                onToggle={() => toggleAccordion("shipping")}
                icon={<Truck className="w-5 h-5" />}
              >
                <ShippingSectionForm
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              </CollapsibleSection>

              {/* Payment Method Section */}
              {/* <CollapsibleSection
                title="Payment Method"
                isOpen={activeAccordion === "payment"}
                onToggle={() => toggleAccordion("payment")}
                icon={<CreditCard className="w-5 h-5" />}
              >
                <div className="flex flex-row items-center justify-between space-y-4">
                  {paymentMethods.map((method, index) => {
                    return (
                      <PayOption
                        option={method}
                        key={index}
                        setOption={setPaymentOption}
                      />
                    );
                  })}
                </div>
              </CollapsibleSection> */}

              {/* Conditional rendering of Place Order button or Paystack */}
              {renderButton()}
            </form>
          </div>
          {/* Right Column: Order Summary (Sticky for desktop) */}
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </main>
  );
}

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { ClipLoader } from "react-spinners";

import { Truck } from "lucide-react";

import CollapsibleSection from "./components/CollapsibleSection.jsx";
import ShippingSectionForm from "./components/ShippingSectionForm.jsx";
// import PaymentSectionForm from "./components/PaymentSectionForm.jsx";
import OrderSummary from "./components/OrderSummary.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import CheckoutHeader from "./components/CheckoutHeader.jsx";
import _Paystack from "./components/_Paystack.jsx";

import { CartContext } from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { validateForm } from "./helper/validateForm.js";

const shippingDetails = localStorage.getItem("shippingDetails");
// let paymentDetails = localStorage.getItem("paymentDetails");

const {
  VITE_PLACE_ORDER_URL,
  VITEVITE_PAYSTACK_PUBLIC_KEY,
  VITE_VERIFY_PAYMENT_URL,
} = import.meta.env;

// Checkout progress steps
const progressSteps = ["Cart", "Checkout", "Confirmation"];
const paystack = new PaystackPop();

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.discountPrice ? item.discountPrice : item.originalPrice) *
        item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08; // Example 8% tax rate
  const total = Math.ceil(subtotal + shipping + tax);
  const [activeAccordion, setActiveAccordion] = useState("shipping");
  // const [showPayment, setShowPayment] = useState(false);
  // State to track if the 'Place Order' button has been clicked at least once

  // Handle successful payment
  const handleSuccess = async (paymentData) => {
    const { reference, status } = paymentData;
    try {
      if (reference && status === "success") {
        const response = await axios.post(
          VITE_VERIFY_PAYMENT_URL,
          { reference: reference },
          {
            withCredentials: true,
          }
        );
        if (response.data.status === true) {
          toast.success(response.data.message);
          localStorage.removeItem("shippingDetails");
          localStorage.removeItem("cart");
          clearCart();
          navigate("/shop");
        }
      }
    } catch (error) {
      toast.error(error);
      return error;
    }
  };

  // Handle payment popup closure
  const handleClose = () => {
    toast.error("Payment canceled!");
  };

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

  useEffect(() => {
    if (isLoggedIn) {
      setFormData((prevData) => ({
        ...prevData,
        email: user?.email,
      }));
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.info("Your cart is empty. Redirecting to shop.");
      navigate("/shop");
    }
  }, [cartItems, navigate]);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Consolidate form data for validation
    const { errors, isValid } = validateForm(formData);
    localStorage.setItem("shippingDetails", JSON.stringify(formData));
    // setErrors(errors);
    // setIsFormValid(isValid);
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

  const orderDetails = {
    email: user?.email ? user?.email : formData?.email,
    currency: "USD",
    totalAmount: total,
    order: {
      buyer: user?.id,
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.discountPrice ? item.discountPrice : item.originalPrice,
      })),
      totalAmount: total,
      shippingDetails: (({ email, ...shipping }) => shipping)(formData),
    },
  };

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post(VITE_PLACE_ORDER_URL, orderData, {
        withCredentials: true,
      });

      const { access_code } = response.data;
      paystack.resumeTransaction(access_code, {
        key: VITEVITE_PAYSTACK_PUBLIC_KEY,
        onSuccess: handleSuccess,
        onCancel: handleClose,
      });
    } catch (error) {
      // const { message } = error.response.data;
      // toast.error(message);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      return;
      // Optional: Find the first section with an error and open it

      // setShowPayment(false);
    }

    setIsloading(true);
    await placeOrder(orderDetails);
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
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

              <motion.button
                className="mt-6 w-full py-3 px-6 rounded-lg shadow-sm text-base font-inter bg-green-500 text-white bg-success-light dark:bg-success-dark hover:bg-success-dark dark:hover:bg-success-light transition-colors flex items-center justify-center"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                <span className="flex justify-center items-center">
                  <ClipLoader color="white" loading={isLoading} size={30} />
                  <span className="ml-2 text-lg">Place Order</span>
                </span>
              </motion.button>
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

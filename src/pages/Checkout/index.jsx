import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { ClipLoader } from "react-spinners";
import {
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import CollapsibleSection from "./components/CollapsibleSection.jsx";
import ShippingSectionForm from "./components/ShippingSectionForm.jsx";
import PaymentMethodSection from "./components/PaymentMethodSection.jsx";
import OrderSummary from "./components/OrderSummary.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import CheckoutHeader from "./components/CheckoutHeader.jsx";

import { CartContext } from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { validateForm } from "./helper/validateForm.js";
import { getProductPrices } from "../../utils/productUtils.js";

const {
  VITE_PLACE_ORDER_URL,
  VITEVITE_PAYSTACK_PUBLIC_KEY,
  VITE_VERIFY_PAYMENT_URL,
} = import.meta.env;

const paystack = new PaystackPop();

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("shipping");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Load saved shipping details from localStorage if available
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("shippingDetails");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore parse error
      }
    }
    return {
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    };
  });

  const [errors, setErrors] = useState({});

  // Sync user email if logged in
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || user.email,
      }));
    }
  }, [isLoggedIn, user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast.info("Your cart is empty. Please add items to proceed.");
      navigate("/shop");
    }
  }, [cartItems, navigate]);

  // Financial Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const { unitPrice } = getProductPrices(item);
      const qty = Number(item.quantity) || 1;
      return acc + unitPrice * qty;
    }, 0);
  }, [cartItems]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    if (appliedPromo?.code === "FREESHIP") return 0;
    if (shippingMethod === "express") return 15.0;
    return subtotal >= 100 ? 0 : 5.0;
  }, [subtotal, shippingMethod, appliedPromo]);

  const tax = useMemo(() => {
    return subtotal * 0.08;
  }, [subtotal]);

  const promoDiscount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === "percent") {
      return (subtotal * appliedPromo.value) / 100;
    }
    if (appliedPromo.type === "fixed") {
      return Math.min(subtotal, appliedPromo.value);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - promoDiscount + shippingCost + tax);
  }, [subtotal, promoDiscount, shippingCost, tax]);

  // Promo Code Handlers
  const handleApplyPromo = (code) => {
    const normalized = code.trim().toUpperCase();

    if (normalized === "SAVE10") {
      setAppliedPromo({
        code: "SAVE10",
        type: "percent",
        value: 10,
        description: "10% off entire order",
      });
      toast.success("Promo applied: 10% OFF!");
      return;
    }

    if (normalized === "EMPIRE20") {
      setAppliedPromo({
        code: "EMPIRE20",
        type: "percent",
        value: 20,
        description: "20% VIP discount applied",
      });
      toast.success("VIP Promo applied: 20% OFF!");
      return;
    }

    if (normalized === "FREESHIP") {
      setAppliedPromo({
        code: "FREESHIP",
        type: "shipping",
        value: 100,
        description: "Free shipping unlocked",
      });
      toast.success("Promo applied: Free shipping!");
      return;
    }

    if (normalized === "WELCOME5") {
      setAppliedPromo({
        code: "WELCOME5",
        type: "fixed",
        value: 5,
        description: "$5.00 Welcome discount",
      });
      toast.success("Promo applied: $5.00 off!");
      return;
    }

    toast.error("Invalid promo code. Try SAVE10 or EMPIRE20.");
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    toast.info("Promo code removed");
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem("shippingDetails", JSON.stringify(updated));
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Successful payment callback
  const handleSuccess = async (paymentData) => {
    const { reference, status } = paymentData;
    try {
      if (reference && status === "success") {
        const response = await axios.post(
          VITE_VERIFY_PAYMENT_URL,
          { reference },
          { withCredentials: true }
        );
        if (response.data.status === true) {
          toast.success(response.data.message || "Payment verified successfully!");
          localStorage.removeItem("shippingDetails");
          localStorage.removeItem("cart");
          clearCart();
          navigate("/shop");
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Payment verification failed. Please contact support."
      );
    }
  };

  const handleClose = () => {
    toast.info("Payment window closed.");
    setIsLoading(false);
  };

  // Payload for placing order
  const orderDetails = {
    email: formData.email,
    currency: "USD",
    totalAmount: Math.ceil(total),
    order: {
      buyer: user?.id || user?._id || "guest",
      items: cartItems.map((item) => ({
        product: item._id || item.id,
        quantity: Number(item.quantity) || 1,
        price: getProductPrices(item).unitPrice,
      })),
      totalAmount: Math.ceil(total),
      shippingDetails: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        shippingMethod,
      },
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
      const message =
        error?.response?.data?.message ||
        "An error occurred while initiating checkout. Please try again.";
      toast.error(message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: validationErrors, isValid } = validateForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please fill in all required shipping fields.");
      setActiveAccordion("shipping");
      return;
    }

    if (!isLoggedIn) {
      toast.info("Please log in to complete your checkout.");
      navigate(`/login?redirect=/checkout`);
      return;
    }

    setIsLoading(true);
    await placeOrder(orderDetails);
  };

  const isShippingValid =
    formData.email &&
    formData.address &&
    formData.city &&
    formData.state &&
    formData.zipCode &&
    formData.country;

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 font-inter py-4 sm:py-8 lg:py-10 px-3.5 sm:px-6 lg:px-8 pb-28 lg:pb-12">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-8">
        {/* Step Progress Stepper */}
        <ProgressBar activeStep={2} />

        {/* Page Header */}
        <CheckoutHeader
          isLoggedIn={isLoggedIn}
          userEmail={user?.email || formData.email}
        />

        {/* 2-Column Main Layout (8 cols left / 4 cols right, matching Cart) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form & Accordions (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Shipping Details */}
              <CollapsibleSection
                stepNumber={1}
                title="Shipping Details"
                subtitle="Where should we deliver your order?"
                isOpen={activeAccordion === "shipping"}
                onToggle={() =>
                  setActiveAccordion((prev) =>
                    prev === "shipping" ? null : "shipping"
                  )
                }
                icon={<Truck className="w-4 h-4" />}
                isComplete={Boolean(isShippingValid)}
              >
                <ShippingSectionForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  selectedShippingMethod={shippingMethod}
                  onSelectShippingMethod={setShippingMethod}
                  subtotal={subtotal}
                />
              </CollapsibleSection>

              {/* Step 2: Payment Method */}
              <CollapsibleSection
                stepNumber={2}
                title="Payment Method"
                subtitle="Secure payment via encrypted Paystack gateway"
                isOpen={activeAccordion === "payment"}
                onToggle={() =>
                  setActiveAccordion((prev) =>
                    prev === "payment" ? null : "payment"
                  )
                }
                icon={<CreditCard className="w-4 h-4" />}
                isComplete={paymentMethod === "paystack"}
              >
                <PaymentMethodSection
                  selectedPayment={paymentMethod}
                  onSelectPayment={setPaymentMethod}
                />
              </CollapsibleSection>

              {/* Desktop Place Order CTA Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-60 text-white font-poppins font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2.5 transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <ClipLoader color="white" loading={isLoading} size={20} />
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Order &bull; ${total.toFixed(2)}</span>
                    </>
                  )}
                </motion.button>
                <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2.5">
                  By clicking &ldquo;Place Order&rdquo;, you agree to our Terms of Service & Privacy Policy.
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary (4 cols) */}
          <div className="lg:col-span-4">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shippingCost}
              tax={tax}
              total={total}
              appliedPromo={appliedPromo}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
            />
          </div>
        </div>
      </div>

      {/* Floating Mobile Sticky Checkout Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
            <p className="font-poppins text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
              ${total.toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-60 text-white font-poppins font-semibold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all duration-150"
          >
            {isLoading ? (
              <ClipLoader color="white" loading={isLoading} size={18} />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Place Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

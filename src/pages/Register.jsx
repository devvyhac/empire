import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext.jsx";
import { SocialSignIn } from "./Login/components/SocialSignIn.jsx";
import { AuthIllustration } from "./Login/components/AuthIllustration.jsx";

const { VITE_REGISTER_URL } = import.meta.env;

export default function SignUpPage() {
  const navigate = useNavigate();
  const { isLoggedIn, setUserData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn, navigate]);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(VITE_REGISTER_URL, formData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message || "Account created successfully!");
        setUserData(data.user);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        localStorage.removeItem("shippingDetails");
        localStorage.removeItem("cart");
        navigate(-1);
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[85vh] bg-gray-50/50 dark:bg-gray-900 px-4 py-8 sm:py-12">
      <div className="w-full max-w-4xl xl:max-w-5xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors duration-200">
        {/* Left Side: Animated Illustration Banner */}
        <AuthIllustration mode="signup" />

        {/* Right Side: Sign-Up Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          {/* Header */}
          <div className="text-left mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-100 dark:border-indigo-900/40">
              <UserPlus className="w-5 h-5" />
            </div>
            <h1 className="font-poppins text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Create Account
            </h1>
            <p className="font-inter text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Join Empire to start shopping and tracking your orders.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all`}
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all`}
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all`}
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-60 text-white font-poppins font-semibold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all duration-150"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <ClipLoader color="white" loading={isSubmitting} size={18} />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <span>Create Account</span>
                )}
              </motion.button>
            </div>
          </form>

          {/* Social Sign-In Component */}
          <SocialSignIn mode="signup" />

          {/* Switch to Login */}
          <div className="mt-6 text-center pt-4 border-t border-gray-100 dark:border-gray-700/60">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

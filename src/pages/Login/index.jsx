import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext.jsx";
import { SocialSignIn } from "./components/SocialSignIn.jsx";
import { AuthIllustration } from "./components/AuthIllustration.jsx";

const { VITE_LOGIN_URL } = import.meta.env;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUserData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/shop";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Pre-fill remembered email if saved
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberMeEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { rememberMe, ...loginData } = formData;
      if (formData.rememberMe) {
        localStorage.setItem("rememberMeEmail", formData.email);
      } else {
        localStorage.removeItem("rememberMeEmail");
      }

      const { data } = await axios.post(VITE_LOGIN_URL, loginData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message || "Signed in successfully!");
        setUserData(data.user);
        setFormData({
          email: "",
          password: "",
          rememberMe: false,
        });
        navigate(from, { replace: true });
      } else {
        toast.error(data.message || "Failed to sign in.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred during login.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[85vh] bg-gray-50/50 dark:bg-gray-900 px-4 py-8 sm:py-12">
      <div className="w-full max-w-4xl xl:max-w-5xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors duration-200">
        {/* Left Side: Animated Illustration Banner */}
        <AuthIllustration mode="login" />

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          {/* Header */}
          <div className="text-left mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-100 dark:border-indigo-900/40">
              <LogIn className="w-5 h-5" />
            </div>
            <h1 className="font-poppins text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Welcome Back
            </h1>
            <p className="font-inter text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sign in to access your account and orders.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
                  placeholder="••••••••"
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Remember me
                </span>
              </label>

              <Link
                to="/contact"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit CTA Button */}
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </motion.button>
            </div>
          </form>

          {/* Social Sign-In Component */}
          <SocialSignIn mode="signin" />

          {/* Switch to Register */}
          <div className="mt-6 text-center pt-4 border-t border-gray-100 dark:border-gray-700/60">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

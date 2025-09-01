import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Facebook, Apple } from "lucide-react";

// Custom Google Icon component to handle the specific SVG
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5 20H24V28.5H35.2536C34.6291 32.3274 32.2533 35.5348 28.8475 37.6698V44.1565H37.893C42.923 40.5925 45.9999 34.0457 46 26.5C45.9999 25.1098 45.8999 23.7314 45.7003 22.3788C45.5006 21.0261 45.1011 19.6976 44.5 18.3986V20Z"
      fill="#4285F4"
    />
    <path
      d="M24.0001 46C18.1001 46 12.9801 44.0201 8.89988 40.8599L18.0601 33.7299C19.7899 34.7899 21.82 35.3399 24.0001 35.3399C28.8475 35.3399 32.8599 32.2199 34.6999 28.5299L44.5 35.2999C41.7201 40.45 37.2301 44.33 31.8401 46L24.0001 46Z"
      fill="#34A853"
    />
    <path
      d="M8.89988 40.86C5.55988 37.76 3.19999 33.7 3.01999 28.94L12.18 21.81C13.91 22.87 15.94 23.42 18.12 23.42C23.23 23.42 27.24 20.2 29.07 16.51L38.88 23.28C36.1 28.43 31.61 32.31 26.22 34.07L16.42 40.84C13.63 42.6 11.2 44.2 8.89988 40.86Z"
      fill="#FBBC04"
    />
    <path
      d="M45.7003 22.3788C45.5006 21.0261 45.1011 19.6976 44.5 18.3986V20L34.6999 26.5299C32.8599 22.8399 28.8475 19.7199 24.0001 19.7199C19.8299 19.7199 15.7999 20.8999 12.18 23.42L3.01999 16.29C5.55988 12.23 8.89988 8.17 12.1999 4.95L24.0001 12.75L35.8001 4.95C33.0201 1.85 28.5301 -0.000121175 24.0001 -0.000121175C16.9401 -0.000121175 10.3701 2.81988 5.4901 8.24988L15.3001 14.9999C17.1301 17.5899 19.3401 19.2999 21.7201 20.4899L32.1801 13.91C34.4601 15.7 36.3101 17.7 37.8901 19.71L45.7003 22.3788Z"
      fill="#EA4335"
    />
  </svg>
);

// A reusable component for social sign-up/login buttons
const SocialButton = ({
  icon: Icon,
  label,
  bgColor,
  textColor,
  hoverColor,
}) => (
  <motion.button
    type="button"
    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium ${bgColor} ${textColor} transition-colors ${hoverColor}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </motion.button>
);

// Reusable Social Sign-in component, now with only Google and Facebook
const SocialSignIn = () => (
  <div className="flex flex-col justify-center items-center">
    <div className="flex items-center w-full my-6">
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
        OR
      </span>
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
    </div>
    <div className="w-full space-y-4">
      <SocialButton
        icon={GoogleIcon}
        label="Sign up with Google"
        bgColor="bg-gray-100 dark:bg-gray-800"
        textColor="text-gray-700 dark:text-gray-300"
        hoverColor="hover:bg-gray-200 dark:hover:bg-gray-700"
      />
      <SocialButton
        icon={Facebook}
        label="Sign up with Facebook"
        bgColor="bg-gray-100 dark:bg-gray-800"
        textColor="text-gray-700 dark:text-gray-300"
        hoverColor="hover:bg-gray-200 dark:hover:bg-gray-700"
      />
    </div>
  </div>
);

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // Simulating analytics and SEO on component mount
  useEffect(() => {
    console.log("Analytics event tracked: register");
    const metaTitle = "Sign Up - Create an Account";
    const metaDescription =
      "Join us today! Create your account to start shopping and get access to exclusive offers.";
    console.log(`SEO Title: ${metaTitle}`);
    console.log(`SEO Description: ${metaDescription}`);
  }, []);

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
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
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setStatus("submitting");
    setMessage("");

    // Express backend API call would go here
    // Express API: /api/auth/register
    // This is a placeholder for a real API call.
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Registration data:", formData);
      setStatus("success");
      setMessage("Registration successful! You can now sign in.");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        newsletter: false,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setStatus("error");
      setMessage(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 md:p-10 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Join Us Today
          </h1>
          <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
            Create your account.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Main Sign Up Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {status === "success" && (
                <div className="text-center text-green-500 font-semibold">
                  {message}
                </div>
              )}
              {status === "error" && (
                <div className="text-center text-red-500 font-semibold">
                  {message}
                </div>
              )}

              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "submitting" ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    "Register"
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Social Sign-In Component */}
          <SocialSignIn />

          <div className="mt-6 text-center">
            <p className="text-sm font-inter text-gray-700 dark:text-gray-300">
              Already a member?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign in.
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

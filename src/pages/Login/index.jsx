import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { SocialSignIn } from "./components/SocialSignIn.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  const { server, isLoggedIn, setIsLoggedIn, userData, setUserData } =
    useContext(AuthContext);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // const validate = () => {
  //   if (!formData.email) {
  //     setError("Enter an email address");
  //     return false;
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     setError("Email address is invalid.");
  //     return false;
  //   }
  //   if (!formData.password) {
  //     setError("Password is required.");
  //     return false;
  //   }

  //   if (formData.password.length < 8) {
  //     setError("Password must be at least 8 characters long!");
  //     return false;
  //   }

  //   return true;
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    // Express backend API call would go here
    // Express API: /api/auth/login
    // This is a placeholder for a real API call.
    try {
      e.preventDefault();
      const { rememberMe, ...userData } = formData;

      const { data } = await axios.post(`${server}/api/auth/login`, userData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(true);
        setUserData(data.user);
        navigate(-1);
        return;
      } else {
        toast.error(data.message);
        return;
      }

      // Handle "remember me" state
      if (formData.rememberMe) {
        localStorage.setItem("rememberMeEmail", formData.email);
      } else {
        localStorage.removeItem("rememberMeEmail");
      }

      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 md:p-10 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
            Sign in to your account.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Main Login Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`mt-1  block w-full p-3 text-xl rounded-md shadow-sm sm:text-lg dark:bg-gray-900 dark:text-gray-100 transition-colors`}
                />
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
                  className={`mt-1  block w-full p-3 text-lg rounded-md shadow-sm sm:text-lg dark:bg-gray-900 dark:text-gray-100 transition-colors`}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700 rounded transition-colors"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
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
                    "Login"
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Social Sign-In Component */}
          <SocialSignIn />

          <div className="mt-6 text-center">
            <p className="text-sm font-inter text-gray-700 dark:text-gray-300">
              New here?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Create an account.
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'
  const [message, setMessage] = useState("");

  // Simulating analytics and SEO data from Strapi on component mount.
  useEffect(() => {
    console.log("Analytics event tracked: view_contact_page");

    const metaTitle = "Contact Us - We're here to help!";
    const metaDescription =
      "Get in touch with us. Send a message, or find our contact details and location on the map.";
    console.log(`SEO Title: ${metaTitle}`);
    console.log(`SEO Description: ${metaDescription}`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    console.log("Analytics event tracked: submit_contact");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted with data:", formData);
      setStatus("success");
      setMessage(
        "Thank you for your message! We will get back to you within 24 hours."
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <div className="text-center mb-12">
        <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Get in Touch
        </h1>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
          We’re here to help!
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Contact Form */}
        <div className="md:w-1/2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
              Send a Message
            </h2>
            <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-1 mb-6">
              We’ll respond within 24 hours.
            </p>
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
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors"
                />
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
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors"
                ></textarea>
              </div>
              {status === "submitting" && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
                </div>
              )}
              {status === "success" && (
                <div className="text-center text-green-600 dark:text-green-400 font-semibold">
                  {message}
                </div>
              )}
              {status === "error" && (
                <div className="text-center text-red-600 dark:text-red-400 font-semibold">
                  {message}
                </div>
              )}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                  disabled={status === "submitting"}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Contact Details and Map */}
        <div className="md:w-1/2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Contact Details
            </h2>
            <div className="space-y-4 font-inter text-gray-700 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <Mail className="text-indigo-500" />
                </div>
                <span className="text-lg">realdevvyhac@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <Phone className="text-indigo-500" />
                </div>
                <span className="text-lg">+234 (806) 983-3426</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <MapPin className="text-indigo-500" />
                </div>
                <span className="text-lg">123 Main St, Anytown, USA 12345</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hidden md:block">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.206497745778!2d-73.9878536845946!3d40.74844007932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25983756a1b2b%3A0x7d25e01b4c3e8a4a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628105658902!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our location on Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Rss,
  ArrowRight,
  Banknote,
  CreditCard,
  Apple,
  Lock,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log(`Subscribed with email: ${email}`);
    alert(`Thank you for subscribing! We'll send updates to ${email}.`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 font-sans py-12 lg:py-16">
      <div className="container mx-auto px-6">
        {/* Main grid for footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-x-8">
          {/* Branding Section */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-4">
              {/* This is a placeholder logo. You can replace this with an SVG or image */}
              <span className="text-3xl font-extrabold text-white tracking-wide">
                Store Name
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-4">
              Your one-stop shop for quality products.
            </p>
            <p className="text-xs text-gray-500">
              Store Name Inc.
              <br />
              123 E-commerce Blvd, Suite 400
              <br />
              Commerce City, CA 90210
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                aria-label="Follow us on X"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                aria-label="Follow us on Instagram"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                aria-label="Follow us on Facebook"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                aria-label="Subscribe to our blog via RSS"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Rss size={24} />
              </a>
            </div>
          </div>

          {/* Navigation Links - Shop */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Laptops
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Phones
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links - Customer Service */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/faqs"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="contact"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="track-order"
                  className="hover:text-white transition-colors duration-300 text-sm"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* CTA & Trust Signals */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg text-white mb-4">
              Join Our Newsletter
            </h3>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col space-y-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Subscribe <ArrowRight size={18} className="ml-2" />
              </button>
            </form>

            <div className="mt-8">
              <h4 className="font-semibold text-sm text-white mb-2">
                Secure & Trusted
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                {/* Trust Signals (Payment & Security) */}
                <Banknote
                  size={32}
                  className="text-gray-500"
                  aria-label="Visa, Mastercard, PayPal accepted"
                />
                <CreditCard size={32} className="text-gray-500" />
                <Apple size={32} className="text-gray-500" />
                <Lock
                  size={32}
                  className="text-green-500"
                  aria-label="Secure Checkout"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-700" />

        {/* Bottom Bar: Legal & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <div className="space-x-4">
            <a
              href="privacy-policy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="terms"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Accessibility
            </a>
          </div>
          <p className="text-center md:text-right">
            &copy; 2025 Store Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// A parent component to make the footer runnable
const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-white p-6 text-gray-800">
        <h1 className="text-3xl font-bold">Main Website Content</h1>
        <p className="mt-4">Scroll down to see the footer.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Footer;

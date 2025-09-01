import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Blogs from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import ContactPage from "./pages/Contact";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackYourOrder from "./pages/TrackYourOrder";
import Footer from "./components/layout/Footer";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Faqs from "./pages/Faqs";
import PrivacyPolicy from "./pages/Privacy";
import Protected from "./pages/Protected";
import ProfileProtected from "./pages/Protected/ProtectedProfile.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Shipping from "./pages/Shipping";
// import CookiePolicy from "./pages/CookiePolicy";
// import Accessibility from "./pages/Accessibility";

function App() {
  return (
    <div className="App bg-white min-h-screen">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route element={<ProfileProtected />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/confirm-order" element={<OrderConfirmation />} />
        <Route path="/track-order" element={<TrackYourOrder />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;

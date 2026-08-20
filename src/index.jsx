import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { WishlistContextProvider } from "./context/WishlistContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <WishlistContextProvider>
              <App />
            </WishlistContextProvider>
          </ProductContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);

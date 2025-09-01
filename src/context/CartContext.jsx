import { createContext, useEffect, useRef, useState } from "react";

const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(cart ? JSON.parse(cart) : []);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // const count = cartItems.reduce((total, item) => total + item.count, 0);
    setCartCount(cartItems.length);
  }, [cartItems]);

  const addToCart = async (item) => {
    if (!item || !item.id) {
      console.log("Invalid item! Must provide an item.");
      return;
    }

    let itemExists = cartItems.find((cartItem) => cartItem.id === item.id);

    if (itemExists) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      const newItem = { ...structuredClone(item), count: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const updateItemQuantity = async (item, newQuantity) => {
    if (!item || !item.id) {
      console.log("Invalid item! Must provide an item.");
      return;
    }

    let itemExists = cartItems.find((cartItem) => cartItem.id === item.id);

    if (itemExists) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: newQuantity }
            : cartItem
        )
      );
    }
  };

  const deleteFromCart = async (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));
  };

  const removeFromCart = async (item) => {
    if (item.count === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem !== item));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        updateItemQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

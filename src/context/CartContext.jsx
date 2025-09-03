import { createContext, useEffect, useRef, useState } from "react";

const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(cart ? JSON.parse(cart) : []);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(cartItems.length);
  }, [cartItems]);

  const addToCart = async (item) => {
    if (!item || !item._id) {
      console.log("Invalid item! Must provide an item.");
      return;
    }

    let itemExists = cartItems.find((cartItem) => cartItem._id === item._id);

    if (itemExists) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      const newItem = { ...structuredClone(item), quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const updateItemQuantity = async (item, newQuantity) => {
    if (!item || !item._id) {
      console.log("Invalid item! Must provide an item.");
      return;
    }

    let itemExists = cartItems.find((cartItem) => cartItem._id === item._id);

    if (itemExists) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    }
  };

  const deleteFromCart = async (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));
  };

  const clearCart = async () => {
    setCartItems([]);
  };

  const removeFromCart = async (item) => {
    if (item.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem !== item));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
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
        cartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

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
    const totalQty = cartItems.reduce(
      (total, item) => total + (Number(item.quantity) || 1),
      0
    );
    setCartQuantity(totalQty);
  }, [cartItems]);

  const addToCart = async (item) => {
    if (!item) {
      console.log("Invalid item! Must provide an item.");
      return;
    }
    const itemId = item._id || item.id;
    if (!itemId) {
      console.log("Invalid item! Item must have an ID.");
      return;
    }

    const itemExists = cartItems.find(
      (cartItem) => (cartItem._id || cartItem.id) === itemId
    );

    if (itemExists) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          (cartItem._id || cartItem.id) === itemId
            ? { ...cartItem, quantity: (Number(cartItem.quantity) || 1) + 1 }
            : cartItem
        )
      );
    } else {
      const newItem = { ...structuredClone(item), quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const updateItemQuantity = async (item, newQuantity) => {
    if (!item) return;
    const itemId = item._id || item.id;
    if (!itemId) return;

    const parsedQty = parseInt(newQuantity, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
      deleteFromCart(item);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        (cartItem._id || cartItem.id) === itemId
          ? { ...cartItem, quantity: Math.min(parsedQty, 99) }
          : cartItem
      )
    );
  };

  const deleteFromCart = async (item) => {
    if (!item) return;
    const itemId = item._id || item.id;
    setCartItems((prevItems) =>
      prevItems.filter(
        (cartItem) =>
          (itemId ? (cartItem._id || cartItem.id) !== itemId : true) &&
          cartItem !== item
      )
    );
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const removeFromCart = async (item) => {
    if (!item) return;
    const itemId = item._id || item.id;
    const existing = cartItems.find(
      (cartItem) =>
        (itemId ? (cartItem._id || cartItem.id) === itemId : false) ||
        cartItem === item
    );

    if (!existing) return;

    if ((Number(existing.quantity) || 1) <= 1) {
      deleteFromCart(item);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          (itemId ? (cartItem._id || cartItem.id) === itemId : false) ||
          cartItem === item
            ? { ...cartItem, quantity: (Number(cartItem.quantity) || 1) - 1 }
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

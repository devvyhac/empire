import { createContext, useEffect, useState } from "react";

const wishlist = localStorage.getItem("wishlist");
if (!wishlist) {
  localStorage.setItem("wishlist", JSON.stringify([]));
}

export const WishlistContext = createContext();

export const WishlistContextProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(
    wishlist ? JSON.parse(wishlist) : []
  );
  const [wishListQuantity, setWishlistQuatity] = useState(0);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    // const quantity = wishlistItems.reduce((total, item) => total + item.quantity, 0);
    setWishlistQuatity(wishlistItems.length);
  }, [wishlistItems]);

  const addToWishlist = async (item) => {
    if (!item || !item._id) {
      console.log("Invalid item! Must provide an item.");
      return;
    }

    let itemExists = wishlistItems.find(
      (wishlistItem) => wishlistItem._id === item._id
    );

    if (!itemExists) {
      setWishlistItems((prevItems) => [...prevItems, item]);
    }
  };

  const updateItemQuantity = async (item, newQuantity) => {
    if (!item || !item._id) {
      console.log("Invalid item! Must provide an item.");
      return;
    }

    let itemExists = wishlistItems.find(
      (wishlistItem) => wishlistItem._id === item._id
    );

    if (itemExists) {
      setWishlistItems((prevItems) =>
        prevItems.map((wishlistItem) =>
          wishlistItem._id === item._id
            ? { ...wishlistItem, quantity: newQuantity }
            : wishlistItem
        )
      );
    }
  };

  const deleteFromWishlist = async (item) => {
    setWishlistItems(
      wishlistItems.filter((wishlistItem) => wishlistItem !== item)
    );
  };

  const clearWishlist = async () => {
    setWishlistItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const removeFromWishlist = async (item) => {
    setWishlistItems(
      wishlistItems.filter((wishlistItem) => wishlistItem !== item)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        deleteFromWishlist,
        updateItemQuantity,
        wishListQuantity,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

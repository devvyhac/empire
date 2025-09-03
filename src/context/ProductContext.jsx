import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();
const getProductsUrl = import.meta.env.VITE_GET_PRODUCTS_URL;

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const fetchProductsData = async () => {
    try {
      const {
        data: { products },
      } = await axios.get(getProductsUrl);
      setProducts(products);
      setProductLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

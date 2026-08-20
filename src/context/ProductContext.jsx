import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { allProducts } from "./mockData.jsx";

export const ProductContext = createContext({
  products: allProducts,
  productLoading: false,
  setProducts: () => {},
});

const getProductsUrl = import.meta.env.VITE_GET_PRODUCTS_URL;

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState(allProducts);
  const [productLoading, setProductLoading] = useState(false);

  const fetchProductsData = async () => {
    if (!getProductsUrl) {
      setProducts(allProducts);
      setProductLoading(false);
      return;
    }

    try {
      setProductLoading(true);
      const res = await axios.get(getProductsUrl);
      if (res.data && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else if (res.data && Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts(allProducts);
      }
    } catch (error) {
      console.warn("Could not fetch products from backend, using fallback data:", error?.message);
      setProducts(allProducts);
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products: products || allProducts,
        productLoading,
        setProducts,
        fetchProductsData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

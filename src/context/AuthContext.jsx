import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const {
    VITE_REFRESH_TOKEN_URL,
    VITE_GET_USER_URL,
    VITE_LOGOUT_URL,
    VITE_PLACE_ORDER_URL,
  } = import.meta.env;
  const server = import.meta.env.VITE_BACKEND_URL;
  const [user, setUserData] = useState(null);
  const [orders, setOrders] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get(VITE_GET_USER_URL, {
        withCredentials: true,
      });

      setUserData(res.data.user);
    } catch (error) {
      if (error.response.status === 401) {
        try {
          const refreshRes = await axios.post(
            VITE_REFRESH_TOKEN_URL,
            {},
            {
              withCredentials: true,
            }
          );
          console.log(refreshRes);
          setUserData(refreshRes);
        } catch (refreshError) {
          setUserData(null);
        }
      }
    }
  };

  const isLoggedIn = !!user;
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const res = await axios.get(`${VITE_PLACE_ORDER_URL}/me`, {
            withCredentials: true,
          });

          setOrders(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchOrders();
  }, [user]);

  const payload = {
    server,
    isLoggedIn,
    user,
    orders,
    setUserData,
    VITE_LOGOUT_URL,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

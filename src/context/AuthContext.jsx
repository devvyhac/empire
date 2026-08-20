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
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = async () => {
    setAuthLoading(true);
    if (!VITE_GET_USER_URL) {
      setUserData(null);
      setAuthLoading(false);
      return;
    }

    try {
      const res = await axios.get(VITE_GET_USER_URL, {
        withCredentials: true,
      });

      if (res.data && res.data.user) {
        setUserData(res.data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      if (error?.response?.status === 401 && VITE_REFRESH_TOKEN_URL) {
        try {
          const refreshRes = await axios.post(
            VITE_REFRESH_TOKEN_URL,
            {},
            {
              withCredentials: true,
            }
          );
          setUserData(refreshRes.data?.user || null);
        } catch (refreshError) {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const isLoggedIn = !!user;

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !VITE_PLACE_ORDER_URL) return;
      try {
        const res = await axios.get(`${VITE_PLACE_ORDER_URL}/me`, {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (error) {
        console.warn("Could not fetch user orders:", error?.message);
      }
    };

    fetchOrders();
  }, [user]);

  const payload = {
    server,
    isLoggedIn,
    authLoading,
    user,
    orders,
    setUserData,
    VITE_LOGOUT_URL,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

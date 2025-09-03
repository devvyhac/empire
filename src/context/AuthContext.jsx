import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { VITE_REFRESH_TOKEN_URL, VITE_GET_USER_URL } = import.meta.env;
  const server = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserData] = useState([]);

  const checkAuth = async () => {
    try {
      const res = await axios.get(VITE_GET_USER_URL, {
        withCredentials: true,
      });

      setUserData(res.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.status === 401) {
        try {
          const refreshRes = await axios.post(
            VITE_REFRESH_TOKEN_URL,
            {},
            {
              withCredentials: true,
            }
          );
          setUserData(refreshRes);
          setIsLoggedIn(true);
        } catch (refreshError) {
          setIsLoggedIn(false);
          setUserData(null);
        }
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const payload = {
    server,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUserData,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

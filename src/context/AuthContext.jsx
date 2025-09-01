import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const server = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserData] = useState([]);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${server}/api/user/me`, {
        withCredentials: true,
      });

      setUserData(res.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.code === 401) {
        try {
          const refreshRes = await axios.post(
            `${server}/api/auth/refresh-token`,
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

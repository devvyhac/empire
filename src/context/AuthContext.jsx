import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { VITE_REFRESH_TOKEN_URL, VITE_GET_USER_URL, VITE_LOGOUT_URL } =
    import.meta.env;
  const server = import.meta.env.VITE_BACKEND_URL;
  const [user, setUserData] = useState(null);

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

  const payload = {
    server,
    isLoggedIn,
    user,
    setUserData,
    VITE_LOGOUT_URL,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

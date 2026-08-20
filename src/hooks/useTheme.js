import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};

export default useTheme;

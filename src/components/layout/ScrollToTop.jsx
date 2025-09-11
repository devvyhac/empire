import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "window.scrollTo(0, 0)" is the standard way to scroll to the top
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs whenever the "pathname" changes

  return null; // This component doesn't render any visible UI
};

export default ScrollToTop;

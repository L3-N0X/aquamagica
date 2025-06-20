import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTopInstant = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

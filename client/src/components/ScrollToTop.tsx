import { useEffect } from "react";
import { useLocation } from "wouter"; // Eğer react-router-dom kullanıyorsan oradan çek

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
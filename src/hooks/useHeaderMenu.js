import { useEffect, useState } from "react";

const MENU_CLOSE_BREAKPOINT = 640;

export default function useHeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= MENU_CLOSE_BREAKPOINT) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return { isMenuOpen, toggleMenu, closeMenu };
}

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

export default function HeaderCartLink({ onClick }) {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Link
      to="/cart"
      onClick={onClick}
      className="relative inline-flex h-[2.85rem] w-[2.85rem] items-center justify-center rounded-full border border-[rgba(92,82,76,0.28)] bg-[var(--color-white)] text-[var(--color-green)] shadow-[0_2px_6px_rgba(92,82,76,0.18)] transition-colors hover:text-[var(--color-brown)]"
      aria-label="Vai al carrello"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6.5 7.5h13l-1.4 7.2a2 2 0 0 1-2 1.6H9a2 2 0 0 1-2-1.6L5.4 4.8H3" />
        <circle cx="9.5" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
      </svg>

      {cartCount > 0 && (
        <span
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-brown)] px-1 text-[0.68rem] leading-none text-[var(--color-white)]"
          aria-hidden="true"
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}

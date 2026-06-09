import { NavLink } from "react-router-dom";

import { useCart } from "../../context/CartContext";

export default function HeaderMobileMenu({ links, closeMenu }) {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="mobile-menu md:hidden">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={closeMenu}
          className="mobile-menu-link"
        >
          {link.label}
        </NavLink>
      ))}

      <NavLink
        to="/products"
        onClick={closeMenu}
        className="mobile-menu-link mobile-menu-link-green"
      >
        Tutti i prodotti
      </NavLink>

      <NavLink
        to="/cart"
        onClick={closeMenu}
        className="mobile-menu-link mobile-menu-link-brown"
      >
        Carrello{cartCount > 0 ? ` (${cartCount})` : ""}
      </NavLink>
    </nav>
  );
}

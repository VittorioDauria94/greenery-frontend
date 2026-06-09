import { Link } from "react-router-dom";

export default function HeaderCategoryNav({ links }) {
  return (
    <nav className="category-nav hidden md:flex md:items-center md:justify-center md:gap-3 lg:gap-4">
      {links.map((link) => (
        <Link key={link.path} to={link.path} className="category-nav-link">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

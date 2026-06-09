import { Link } from "react-router-dom";

export default function HeaderLogo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="logo-pill shrink-0"
      aria-label="Greenery home"
    >
      <img
        src="/images/greenery-logo.png"
        alt=""
        className="logo-image"
        aria-hidden="true"
      />
    </Link>
  );
}

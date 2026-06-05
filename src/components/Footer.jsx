import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-compact">
      <div className="container-custom py-4 md:py-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[0.68rem] md:grid-cols-[1fr_1fr_1fr_auto] md:items-start">
          <div className="order-first col-span-2 flex gap-2 md:order-last md:col-auto md:justify-self-end">
            <span className="social-placeholder" aria-label="Instagram">
              IG
            </span>
            <span className="social-placeholder" aria-label="Twitter">
              TW
            </span>
            <span className="social-placeholder" aria-label="YouTube">
              YT
            </span>
            <span className="social-placeholder" aria-label="Facebook">
              FB
            </span>
          </div>

          <div>
            <h3 className="footer-heading">Chi siamo</h3>
            <ul className="footer-list">
              <li>
                <Link className="footer-link" to="/about">
                  La nostra storia
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/about">
                  La nostra mission
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/about">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Unisciti a noi</h3>
            <ul className="footer-list">
              <li>
                <Link className="footer-link" to="/partners">
                  Diventa nostro partner
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/about">
                  Lavora con noi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Informativa</h3>
            <ul className="footer-list">
              <li>Termini d'uso</li>
              <li>Privacy policy</li>
              <li>Cookie policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 border-t border-white/35 pt-2 text-center text-[0.58rem] text-white/85">
          © 2026 Greenery S.r.l. Tutti i diritti riservati
        </div>
      </div>
    </footer>
  );
}

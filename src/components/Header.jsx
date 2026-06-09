import HeaderCartLink from "./header/HeaderCartLink";
import HeaderCategoryNav from "./header/HeaderCategoryNav";
import HeaderLogo from "./header/HeaderLogo";
import HeaderMobileMenu from "./header/HeaderMobileMenu";
import HeaderSearch from "./header/HeaderSearch";
import { categoryLinks } from "../data/headerLinks";
import useHeaderMenu from "../hooks/useHeaderMenu";

export default function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useHeaderMenu();

  return (
    <header className="header-pattern">
      <div className="container-custom py-4 md:py-5">
        <div className="mx-auto flex max-w-[980px] items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-3 md:gap-5 lg:gap-16">
            <HeaderLogo onClick={closeMenu} />
            <HeaderCategoryNav links={categoryLinks} />
          </div>

          <div className="flex items-center gap-2">
            <HeaderCartLink onClick={closeMenu} />

            <button
              type="button"
              className="menu-button md:hidden"
              onClick={toggleMenu}
              aria-label="Apri menu"
              aria-expanded={isMenuOpen}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>

        <HeaderSearch closeMenu={closeMenu} />

        {isMenuOpen && (
          <HeaderMobileMenu links={categoryLinks} closeMenu={closeMenu} />
        )}
      </div>
    </header>
  );
}

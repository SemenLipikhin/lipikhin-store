import { Link, NavLink } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { navigationItems } from "../data/navigation.js";
import { useStore } from "../store/useStore.js";
import SearchForm from "./SearchForm.jsx";

function Header() {
  const { cart, favorites } = useStore();
  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((total, row) => total + row.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
    document.querySelector("main")?.focus({ preventScroll: true });
  }

  return (
    <header
      className="header"
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsMenuOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMenuOpen) {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <div className="container header__inner">
        <div className="header__mobile-bar">
          <button
            className={`header__hamburger ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            ref={menuButtonRef}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link className="header__logo" to="/">
            LIPIKHIN
          </Link>

          <Link
            className="header__action"
            to="/cart"
            aria-label={`Корзина${cartCount ? `, товаров: ${cartCount}` : ""}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14l1 14H4L5 7Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span className="header__badge" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <Link className="header__logo header__desktop-logo" to="/">
          LIPIKHIN
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          {navigationItems.map(({ href, label }) => (
            <NavLink className="header__link" to={href} key={href}>
              {label}
            </NavLink>
          ))}
        </nav>
        <SearchForm />
        <div className="header__actions">
          <Link
            className="header__action"
            to="/favorites"
            aria-label={`Избранное, товаров: ${favoritesCount}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="header__badge" aria-hidden="true">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            className="header__action"
            to="/cart"
            aria-label={`Корзина${cartCount ? `, товаров: ${cartCount}` : ""}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14l1 14H4L5 7Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span className="header__badge" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            className="header__action"
            to="/account"
            aria-label="Личный кабинет"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="9" r="3" />
              <path d="M5.5 18a7 7 0 0 1 13 0" />
            </svg>
          </Link>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className={`header__mobile-menu ${isMenuOpen ? "is-open" : ""}`}
        aria-label="Меню подразделов"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        {navigationItems.map(({ href, label }) => (
          <Link to={href} key={href} onClick={closeMenu}>
            {label}
          </Link>
        ))}
        <Link to="/favorites" onClick={closeMenu}>
          Избранное{favoritesCount > 0 ? ` (${favoritesCount})` : ""}
        </Link>
        <Link to="/account" onClick={closeMenu}>
          Личный кабинет
        </Link>
        <SearchForm mobile onSearch={closeMenu} />
      </nav>
    </header>
  );
}

export default Header;

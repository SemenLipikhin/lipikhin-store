import { useState } from "react";
import "./Header.css";
const navigationItems = [
  { href: `${import.meta.env.BASE_URL}collections`, label: "Коллекции" },
  { href: `${import.meta.env.BASE_URL}catalog/men`, label: "Мужское" },
  { href: `${import.meta.env.BASE_URL}catalog/women`, label: "Женское" },
  { href: `${import.meta.env.BASE_URL}catalog/accessories`, label: "Аксессуары" },
  { href: `${import.meta.env.BASE_URL}catalog/sale`, label: "Распродажа" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="header"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsMenuOpen(false);
      }}
    >
      <div className="container header__inner">
        <div className="header__mobile-bar">
          <button
            className={`header__hamburger ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <a className="header__logo" href={`${import.meta.env.BASE_URL}`}>
            LIPIKHIN
          </a>

          <a
            className="header__action header__action--account"
            href={`${import.meta.env.BASE_URL}account`}
            aria-label="Личный кабинет"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="9" r="3" />
              <path d="M5.5 18a7 7 0 0 1 13 0" />
            </svg>
          </a>
        </div>

        <a className="header__logo header__desktop-logo" href={`${import.meta.env.BASE_URL}`}>
          LIPIKHIN
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {navigationItems.map(({ href, label }) => (
            <a className="header__link" href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <input
          type="search"
          className="header__search"
          placeholder="Поиск..."
          aria-label="Поиск товаров"
        />
        <div className="header__actions">
          <a
            className="header__action"
            href={`${import.meta.env.BASE_URL}favorites`}
            aria-label="Избранное"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
          </a>

          <a className="header__action" href={`${import.meta.env.BASE_URL}cart`} aria-label="Корзина">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14l1 14H4L5 7Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </a>

          <a
            className="header__action"
            href={`${import.meta.env.BASE_URL}account`}
            aria-label="Личный кабинет"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="9" r="3" />
              <path d="M5.5 18a7 7 0 0 1 13 0" />
            </svg>
          </a>
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
          <a href={href} key={href} onClick={() => setIsMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;

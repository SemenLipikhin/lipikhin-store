import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router";
import CatalogPage from "./pages/CatalogPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import { catalogSections } from "./data/navigation.js";
import { products } from "./data/products.js";

export default function App() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector("main")?.focus({ preventScroll: true });
    const section = catalogSections[pathname.split("/")[2]];
    const product = products.find((p) => `/product/${p.id}` === pathname);
    const title =
      product?.name ||
      section?.title ||
      {
        "/": "Стиль в каждой детали",
        "/collections": "Коллекции",
        "/cart": "Корзина",
        "/favorites": "Избранное",
        "/account": "Личный кабинет",
      }[pathname] ||
      "LIPIKHIN";
    document.title = `${title} — LIPIKHIN`;
  }, [pathname, search]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.querySelector("main")?.focus();
        }}
      >
        К содержимому
      </a>
      <div className="home-screen">
        <Header key={pathname} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CatalogPage />} />
          <Route path="/catalog/:category" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="*"
            element={
              <main id="main-content" className="catalog container" tabIndex={-1}>
                <section className="catalog__empty">
                  <h1>Страница недоступна</h1>
                  <p>Перейдите в каталог, чтобы посмотреть товары.</p>
                  <Link className="catalog__back" to="/collections">
                    Все коллекции
                  </Link>
                </section>
              </main>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

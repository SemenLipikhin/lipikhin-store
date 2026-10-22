import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Link className="footer__brand" to="/">
          LIPIKHIN
        </Link>

        <nav className="footer__nav" aria-label="Магазин">
          <p className="footer__heading">Магазин</p>
          <Link className="footer__link" to="/catalog/men">
            Мужское
          </Link>
          <Link className="footer__link" to="/catalog/women">
            Женское
          </Link>
          <Link className="footer__link" to="/catalog/sale">
            Распродажа
          </Link>
        </nav>

        <nav className="footer__nav" aria-label="Ваши товары">
          <p className="footer__heading">Ваши товары</p>
          <Link className="footer__link" to="/favorites">Избранное</Link>
          <Link className="footer__link" to="/cart">Корзина</Link>
          <Link className="footer__link" to="/account">Личный кабинет</Link>
        </nav>

        <div className="footer__about">
          <p className="footer__heading">О проекте</p>
          <p className="footer__description">
            Каталог демонстрационный. Оформление заказов и оплата не подключены.
          </p>
        </div>
      </div>

      <div className="container footer__bottom">
        <small>© {new Date().getFullYear()} LIPIKHIN</small>
      </div>
    </footer>
  );
}

export default Footer;

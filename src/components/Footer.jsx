import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="footer__brand" href={`${import.meta.env.BASE_URL}`}>
          LIPIKHIN
        </a>

        <nav className="footer__nav" aria-label="Магазин">
          <p className="footer__heading">Магазин</p>
          <a className="footer__link" href={`${import.meta.env.BASE_URL}catalog/men`}>
            Мужское
          </a>
          <a className="footer__link" href={`${import.meta.env.BASE_URL}catalog/women`}>
            Женское
          </a>
        </nav>

        <nav className="footer__nav" aria-label="Помощь">
          <p className="footer__heading">Помощь</p>
          <a className="footer__link" href={`${import.meta.env.BASE_URL}delivery`}>
            Доставка
          </a>
          <a className="footer__link" href={`${import.meta.env.BASE_URL}returns`}>
            Возврат
          </a>
          <a className="footer__link" href={`${import.meta.env.BASE_URL}size-guide`}>
            Размеры
          </a>
          <a className="footer__link" href={`${import.meta.env.BASE_URL}contacts`}>
            Контакты
          </a>
        </nav>

        <div className="footer__subscribe">
          <p className="footer__heading">Подпишитесь на новости</p>
          <p className="footer__description">
            Новые коллекции, закрытые продажи и истории бренда.
          </p>

          <label className="footer__label" htmlFor="newsletter-email">
            Email
          </label>
          <input
            className="footer__input"
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Ваш email"
            disabled
          />
          <p className="footer__note">Подписка скоро появится.</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <small>© {new Date().getFullYear()} LIPIKHIN</small>
      </div>
    </footer>
  );
}

export default Footer;

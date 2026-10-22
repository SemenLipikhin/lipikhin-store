import { Link } from "react-router";
import "./HomePage.css";

function HomePage() {
  return (
    <main id="main-content" className="home container" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="hero__eyebrow">Мужская и женская коллекции</p>
          <h1 id="hero-title" className="hero__title">
            Стиль в каждой детали
          </h1>
          <p className="hero__text">
            Продуманные образы для него и для неё. Лаконичный крой,
            спокойные оттенки и внимание к деталям.
          </p>
          <nav className="hero__actions" aria-label="Выбор коллекции">
            <Link
              to="/catalog/men"
              className="hero__collection-link"
            >
              Мужское
            </Link>
            <Link
              to="/catalog/women"
              className="hero__collection-link"
            >
              Женское
            </Link>
          </nav>
        </div>

        <div className="hero__visual">
          <div className="hero__photo hero__photo--men">
            <img
              src={`${import.meta.env.BASE_URL}images/categories/men.jpg`}
              alt="Модель в одежде мужской коллекции LIPIKHIN"
              width="1640"
              height="2159"
              decoding="async"
            />
          </div>
          <div className="hero__photo hero__photo--women">
            <img
              src={`${import.meta.env.BASE_URL}images/categories/women.jpg`}
              alt="Модель в одежде женской коллекции LIPIKHIN"
              width="1024"
              height="1280"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <p className="hero__caption">Осень 2026 <span>Коллекция</span></p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

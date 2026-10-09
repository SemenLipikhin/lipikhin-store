import "./HomePage.css";

function HomePage() {
  return (
    <main className="home container">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Curated essentials</p>
          <h1 className="hero__title">Luxury in every line.</h1>
          <p className="hero__text">
            Классическая элегантность, современная форма и материалы, которые
            говорят без лишних слов.
          </p>
          <div className="hero__actions">
            <a href="/collections" className="button button--primary">
              Смотреть коллекции
            </a>
            <a href="/catalog/women" className="button button--secondary">
              Женская линия
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="/images/categories/women.jpg"
            alt="Модель в премиальном образе"
          />
          <div className="hero__badge">
            <span>Autumn 2026</span>
            <strong>Collection</strong>
          </div>
        </div>
      </section>

      <section className="home__categories" aria-label="Коллекции магазина">
        <a href="/catalog/men" className="category-card">
          <img
            src="/images/categories/men.jpg"
            alt="Модель в одежде мужской коллекции"
            className="category-card__image"
          />
          <div className="category-card__content">
            <span className="category-card__title">Мужское</span>
            <span className="category-card__action">Смотреть коллекцию →</span>
          </div>
        </a>

        <a href="/catalog/women" className="category-card">
          <img
            src="/images/categories/women.jpg"
            alt="Модель в одежде женской коллекции"
            className="category-card__image"
          />
          <div className="category-card__content">
            <span className="category-card__title">Женское</span>
            <span className="category-card__action">Смотреть коллекцию →</span>
          </div>
        </a>
      </section>

      <section className="home__notes" aria-label="Преимущества бренда">
        <article className="note-card">
          <span className="note-card__index">01</span>
          <h2>Ткань и посадка</h2>
          <p>
            Натуральные материалы и продуманный крой для безупречного силуэта.
          </p>
        </article>

        <article className="note-card">
          <span className="note-card__index">02</span>
          <h2>Лимитированные партии</h2>
          <p>
            Отобранные коллекции в небольших тиражах для более редкого образа.
          </p>
        </article>

        <article className="note-card">
          <span className="note-card__index">03</span>
          <h2>Немного роскоши</h2>
          <p>
            Минималистичный дизайн, который выглядит дорого в любой обстановке.
          </p>
        </article>
      </section>
    </main>
  );
}

export default HomePage;

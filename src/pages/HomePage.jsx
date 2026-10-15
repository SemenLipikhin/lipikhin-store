import "./HomePage.css";

function HomePage() {
  return (
    <main className="home container">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="hero__eyebrow">Curated essentials</p>
          <h1 id="hero-title" className="hero__title">
            Luxury in every line.
          </h1>
          <p className="hero__text">
            Классическая элегантность, современная форма и материалы, которые
            говорят без лишних слов.
          </p>
          <nav className="hero__actions" aria-label="Выбор коллекции">
            <a
              href={`${import.meta.env.BASE_URL}catalog/men`}
              className="hero__collection-link"
            >
              Мужское
            </a>
            <a
              href={`${import.meta.env.BASE_URL}catalog/women`}
              className="hero__collection-link"
            >
              Женское
            </a>
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
          <p className="hero__caption">Autumn 2026 <span>Collection</span></p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;

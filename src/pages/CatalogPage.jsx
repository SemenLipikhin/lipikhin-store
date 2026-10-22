import { Link, useParams, useSearchParams } from "react-router";
import { products } from "../data/products.js";
import { catalogSections, navigationItems } from "../data/navigation.js";
import ProductCard from "../components/ProductCard.jsx";
import { isOnSale } from "../utils/commerce.js";
import { cleanSearchQuery, matchesProductQuery } from "../utils/search.js";
import "./CatalogPage.css";

export default function CatalogPage() {
  const { category = "all" } = useParams();
  const [params] = useSearchParams();
  const section = catalogSections[category];
  if (!Object.hasOwn(catalogSections, category)) return <main id="main-content" className="catalog container" tabIndex={-1}><div className="catalog__empty"><h1>Раздел не найден</h1><Link className="catalog__back" to="/collections">Все коллекции</Link></div></main>;
  const query = cleanSearchQuery(params.get("q"));
  const selectedProducts = products.filter((p) => (category === "all" || (category === "sale" ? isOnSale(p) : p.category === category)) && matchesProductQuery(p, query));
  return (
    <main id="main-content" className="catalog container" tabIndex={-1}>
      <div className="catalog__topline"><h1 className="catalog__title">{section.title}</h1><p className="catalog__count" role="status">Моделей: {selectedProducts.length}</p></div>
      {section.description && <p className="catalog__description">{section.description}</p>}
      <nav className="catalog__tabs" aria-label="Разделы магазина">{navigationItems.map((item) => <Link key={item.href} to={item.href} aria-current={category === item.section ? "page" : undefined}>{item.label}</Link>)}</nav>
      {query && <p className="catalog__search-result">Поиск: «{query}» <Link to={category === "all" ? "/collections" : `/catalog/${category}`}>Сбросить поиск</Link></p>}
      {selectedProducts.length ? <div className="catalog__list">{selectedProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <section className="catalog__empty"><h2>{query ? "Ничего не найдено" : "В этом разделе пока нет товаров"}</h2><p>{query ? "Попробуйте другое название." : "Посмотрите модели в других коллекциях."}</p><Link className="catalog__back" to="/collections">Все коллекции</Link></section>}
    </main>
  );
}

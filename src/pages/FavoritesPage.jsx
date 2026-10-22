import { useRef } from "react";
import { Link } from "react-router";
import { products } from "../data/products.js";
import { useStore } from "../store/useStore.js";
import { imageUrl } from "../utils/commerce.js";
import PriceDisplay from "../components/PriceDisplay.jsx";
import "./ProductPage.css";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useStore();
  const items = favorites.map((row) => ({
    product: products.find((product) => product.id === row.productId),
    size: row.size,
  }));
  const pageRef = useRef(null);

  function removeFavorite(event, id) {
    const item = event.currentTarget.closest("article");
    const nextButton = (
      item.nextElementSibling || item.previousElementSibling
    )?.querySelector("button");
    toggleFavorite(id);
    (nextButton || pageRef.current)?.focus({ preventScroll: true });
  }

  return (
    <main id="main-content" className="shopping-page container" tabIndex={-1} ref={pageRef}>
      <div className="shopping-page__heading">
        <h1>Избранное</h1>
        <Link className="text-link" to="/collections">
          Все коллекции
        </Link>
      </div>

      {items.length ? (
        <div className="favorite-items">
          {items.map(({ product, size }) => (
            <article className="cart-item favorite-item" key={product.id}>
              <Link to={`/product/${product.id}`} className="cart-item__photo">
                {product.images?.length ? (
                  <img
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    width="1000"
                    height="1250"
                    loading="lazy"
                  />
                ) : (
                  <span>Без фото</span>
                )}
              </Link>
              <div className="cart-item__info">
                <Link to={`/product/${product.id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <p>Цвет — {product.color}</p>
                <p>{size ? `Размер — ${size}` : "Размер не выбран"}</p>
                <p><PriceDisplay product={product} /></p>
                <div className="favorite-item__actions">
                  <Link className="text-link" to={`/product/${product.id}`}>
                    {size ? "Изменить размер" : "Выбрать размер"}
                  </Link>
                  <button
                    className="text-link"
                    type="button"
                    onClick={(event) => removeFavorite(event, product.id)}
                  >
                    Удалить{" "}
                    <span className="visually-hidden">
                      из избранного: {product.name}
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="catalog__empty">
          <h2>Сохраните то, что нравится</h2>
          <p>Добавляйте модели в избранное на странице товара.</p>
          <Link className="shop-button" to="/collections">
            Смотреть коллекции
          </Link>
        </section>
      )}
    </main>
  );
}

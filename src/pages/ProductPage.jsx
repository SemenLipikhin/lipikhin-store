import { useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { products } from "../data/products.js";
import { imageUrl } from "../utils/commerce.js";
import PriceDisplay from "../components/PriceDisplay.jsx";
import { useStore } from "../store/useStore.js";
import "./ProductPage.css";

function ProductDetails({ product }) {
  const { cart, addToCart, favorites, toggleFavorite, updateFavoriteSize } = useStore();
  const favorite = favorites.find((row) => row.productId === product.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState(() => favorite?.size || "");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(null);
  const sizeGroup = useRef(null);
  const photos = product.images || [];
  const previewIndexes = photos.map((_, index) => index).filter((index) => index !== selectedImage).slice(0, 2);
  const isFavorite = Boolean(favorite);

  function handleAddToCart(event) {
    event.preventDefault();
    if (!size) { setError("Выберите размер"); sizeGroup.current?.querySelector("input")?.focus(); return; }
    if (cart.some((row) => row.productId === product.id && row.size === size && row.quantity >= 99)) {
      setError("В корзине уже 99 единиц этого товара выбранного размера.");
      setAdded(null);
      return;
    }
    setError("");
    addToCart(product.id, size);
    setAdded((previous) => ({ size, count: (previous?.count || 0) + 1 }));
  }

  return (
    <main id="main-content" className="product-page" tabIndex={-1}>
      <div className="product-layout">
        <section className="product-gallery" aria-label={`Фотографии: ${product.name}`}>
          {photos.length ? <>
            <div className="product-gallery__thumbnails" aria-label="Все ракурсы">{photos.map((photo, index) => <button type="button" key={photo} aria-label={`Ракурс ${index + 1}`} aria-pressed={selectedImage === index} onClick={() => setSelectedImage(index)}><img src={imageUrl(photo)} alt="" width="1000" height="1250" loading="lazy" /></button>)}</div>
            <div className="product-gallery__feature">
              <div className="product-gallery__main"><img src={imageUrl(photos[selectedImage])} alt={`${product.name}, ракурс ${selectedImage + 1}`} width="1000" height="1250" fetchPriority="high" /></div>
              <div className="product-gallery__previews">{previewIndexes.map((index) => <button type="button" key={photos[index]} onClick={() => setSelectedImage(index)} aria-label={`Показать фото ${index + 1}`}><img src={imageUrl(photos[index])} alt="" width="1000" height="1250" /></button>)}</div>
            </div>
            <p className="product-gallery__counter" aria-live="polite">Фото {selectedImage + 1} из {photos.length}</p>
          </> : <div className="product-gallery__placeholder">Фото скоро появится</div>}
        </section>

        <section className="product-info" aria-labelledby="product-title">
          <nav className="product-info__breadcrumbs" aria-label="Хлебные крошки"><Link to={product.category === "men" ? "/catalog/men" : "/catalog/women"}>{product.category === "men" ? "Мужское" : "Женское"}</Link><span aria-hidden="true">/</span><span>{product.type}</span></nav>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-info__price"><PriceDisplay product={product} /></p>
          <p className="product-info__color">Цвет — <strong>{product.color}</strong></p>
          <form onSubmit={handleAddToCart} className="product-info__order" noValidate>
            <fieldset ref={sizeGroup} aria-describedby={error ? "size-error" : undefined}><legend>Размер</legend><div className="size-options">{product.sizes.map((value) => <label key={value}><input type="radio" name="size" value={value} checked={size === value} onChange={() => { setSize(value); if (isFavorite) updateFavoriteSize(product.id, value); setError(""); setAdded(null); }} /><span>{value}</span></label>)}</div></fieldset>
            {error && <p id="size-error" className="form-error" role="alert">{error}</p>}
            <button className="shop-button" type="submit">Добавить в корзину</button>
            <div className="product-info__cart-feedback" role="status" aria-live="polite" aria-atomic="true">
              {added && <p key={added.count}>Добавлено в корзину · Размер {added.size}</p>}
            </div>
            {added ? <Link className="text-link" to="/cart">Перейти в корзину</Link> : <p className="product-info__hint">Товар с выбранным размером будет добавлен в корзину.</p>}
          </form>
          <button className="favorite-toggle" type="button" onClick={() => toggleFavorite(product.id, size)}>{isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</button>
          <div className="product-info__details"><details><summary>Описание</summary><p>{product.description}</p></details><details><summary>Уход</summary><p>Следуйте указаниям на вшивной этикетке изделия: они учитывают материал и особенности конкретной модели.</p></details></div>
        </section>
      </div>
      <Link to={product.category === "men" ? "/catalog/men" : "/catalog/women"} className="text-link product-page__back">Смотреть {product.category === "men" ? "мужскую" : "женскую"} коллекцию</Link>
    </main>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  if (!product) return <main id="main-content" className="catalog container" tabIndex={-1}><div className="catalog__empty"><h1>Товар не найден</h1><Link className="catalog__back" to="/collections">Все коллекции</Link></div></main>;
  return <ProductDetails key={product.id} product={product} />;
}

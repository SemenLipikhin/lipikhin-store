import { Link } from "react-router";
import { products } from "../data/products.js";
import { useStore } from "../store/useStore.js";
import { cartTotal, imageUrl, priceFormatter } from "../utils/commerce.js";
import PriceDisplay from "../components/PriceDisplay.jsx";
import "./ProductPage.css";

export default function CartPage() {
  const { cart, changeQuantity, removeFromCart } = useStore();
  return <main id="main-content" className="shopping-page container" tabIndex={-1}>
    <div className="shopping-page__heading"><h1>Корзина</h1><Link className="text-link" to="/collections">Смотреть коллекции</Link></div>
    {cart.length ? <div className="cart-layout"><div className="cart-items">{cart.map((row) => {
      const product = products.find((p) => p.id === row.productId);
      return <article className="cart-item" key={`${row.productId}-${row.size}`}>
        <Link to={`/product/${product.id}`} className="cart-item__photo">{product.images?.length ? <img src={imageUrl(product.images[0])} alt={product.name} width="1000" height="1250" /> : <span>Без фото</span>}</Link>
        <div className="cart-item__info"><Link to={`/product/${product.id}`}><h2>{product.name}</h2></Link><p>{product.color} · Размер {row.size}</p><p><PriceDisplay product={product} /></p>
          <div className="quantity-control"><button type="button" disabled={row.quantity === 1} onClick={() => changeQuantity(product.id, row.size, row.quantity - 1)} aria-label={`Уменьшить количество: ${product.name}, размер ${row.size}`}>−</button><span aria-live="polite">{row.quantity}</span><button type="button" disabled={row.quantity === 99} onClick={() => changeQuantity(product.id, row.size, row.quantity + 1)} aria-label={`Увеличить количество: ${product.name}, размер ${row.size}`}>+</button></div>
          <button className="text-link" type="button" onClick={() => removeFromCart(product.id, row.size)}>Удалить <span className="visually-hidden">{product.name}, размер {row.size}</span></button>
        </div><p className="cart-item__total">{priceFormatter.format(product.price * row.quantity)}</p>
      </article>;
    })}</div><aside className="cart-summary" aria-label="Итог корзины"><h2>Ваш выбор</h2><div><span>Товары</span><strong>{priceFormatter.format(cartTotal(cart, products))}</strong></div><p>Это учебная корзина. Выбранные товары сохраняются в этом браузере; заказы и оплата не принимаются.</p></aside></div> : <section className="catalog__empty"><h2>Корзина пока пуста</h2><p>Выберите модель и размер на странице товара.</p><Link className="shop-button" to="/collections">Смотреть коллекции</Link></section>}
  </main>;
}

import { isOnSale, priceFormatter } from "../utils/commerce.js";
import "./PriceDisplay.css";

export default function PriceDisplay({ product }) {
  const onSale = isOnSale(product);

  return (
    <span className="price-display">
      <span>{priceFormatter.format(product.price)}</span>
      {onSale && <del className="price-display__old">{priceFormatter.format(product.oldPrice)}</del>}
    </span>
  );
}

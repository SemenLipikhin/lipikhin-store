import { useState } from "react";
import { Link } from "react-router";
import { imageUrl } from "../utils/commerce.js";
import PriceDisplay from "./PriceDisplay.jsx";

export default function ProductCard({ product }) {
  const [isModelReady, setIsModelReady] = useState(false);
  const cover = product.catalogImage || product.images?.[0];
  const model = product.modelImage;
  const hasPreview = Boolean(model && model !== cover);
  return (
    <article className="catalog-product">
      <Link className="catalog-product__link" to={`/product/${product.id}`} data-preview-ready={hasPreview && isModelReady}>
        <div className={`catalog-product__photo${cover ? " catalog-product__photo--loaded" : ""}`}>
          {cover ? <>
            <img className="catalog-product__image" src={imageUrl(cover)} alt={product.name} width="1000" height="1250" loading="lazy" decoding="async" />
            {hasPreview && <img className="catalog-product__model" src={imageUrl(model)} alt="" aria-hidden="true" width="1000" height="1250" loading="lazy" decoding="async" onLoad={() => setIsModelReady(true)} />}
          </> : <span>Фото скоро появится</span>}
        </div>
        <div className="catalog-product__info"><h2>{product.name}</h2><p className="catalog-product__price"><PriceDisplay product={product} /></p></div>
      </Link>
    </article>
  );
}

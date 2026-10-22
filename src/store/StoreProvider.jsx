import { useEffect, useState } from "react";
import { products } from "../data/products.js";
import { addCartItem, sanitizeCart, sanitizeFavorites } from "../utils/commerce.js";
import { StoreContext } from "./StoreContext.js";

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

export default function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => sanitizeCart(readStorage("lipikhin-cart-v1", []), products));
  const [favorites, setFavorites] = useState(() => sanitizeFavorites(
    readStorage("lipikhin-favorites-v2", null) ?? readStorage("lipikhin-favorites-v1", []), products,
  ));
  useEffect(() => { try { localStorage.setItem("lipikhin-cart-v1", JSON.stringify(cart)); } catch { /* Keep the in-memory cart if storage is unavailable. */ } }, [cart]);
  useEffect(() => { try { localStorage.setItem("lipikhin-favorites-v2", JSON.stringify(favorites)); } catch { /* Keep the in-memory selection. */ } }, [favorites]);
  const value = {
    cart, favorites,
    addToCart(productId, size) {
      if (products.some((p) => p.id === productId && p.sizes.includes(size))) setCart((rows) => addCartItem(rows, productId, size));
    },
    changeQuantity(productId, size, quantity) {
      if (Number.isInteger(quantity) && quantity >= 1 && quantity <= 99) setCart((rows) => rows.map((row) => row.productId === productId && row.size === size ? { ...row, quantity } : row));
    },
    removeFromCart(productId, size) { setCart((rows) => rows.filter((row) => row.productId !== productId || row.size !== size)); },
    toggleFavorite(id, size = "") {
      const product = products.find((p) => p.id === id);
      if (product) setFavorites((rows) => rows.some((row) => row.productId === id)
        ? rows.filter((row) => row.productId !== id)
        : [...rows, { productId: id, size: product.sizes.includes(size) ? size : "" }]);
    },
    updateFavoriteSize(id, size) {
      if (products.some((p) => p.id === id && p.sizes.includes(size))) {
        setFavorites((rows) => rows.map((row) => row.productId === id ? { ...row, size } : row));
      }
    },
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

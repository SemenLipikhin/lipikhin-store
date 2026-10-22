export const priceFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
export const imageUrl = (path) => `${import.meta.env?.BASE_URL || "/"}${path}`;
export const isOnSale = (product) => Number.isFinite(product?.oldPrice) && product.oldPrice > product.price;

export function sanitizeCart(value, products) {
  if (!Array.isArray(value)) return [];
  const result = [];
  for (const row of value) {
    const product = products.find((p) => p.id === row?.productId);
    if (!product || !product.sizes?.includes(row.size) || !Number.isInteger(row.quantity) || row.quantity < 1) continue;
    const existing = result.find((item) => item.productId === row.productId && item.size === row.size);
    if (existing) existing.quantity = Math.min(99, existing.quantity + row.quantity);
    else result.push({ productId: row.productId, size: row.size, quantity: Math.min(row.quantity, 99) });
  }
  return result;
}

export function addCartItem(cart, productId, size) {
  const existing = cart.find((row) => row.productId === productId && row.size === size);
  return existing ? cart.map((row) => row === existing ? { ...row, quantity: Math.min(99, row.quantity + 1) } : row) : [...cart, { productId, size, quantity: 1 }];
}

export function cartTotal(cart, products) {
  return cart.reduce((total, row) => total + (products.find((p) => p.id === row.productId)?.price || 0) * row.quantity, 0);
}

export function sanitizeFavorites(value, products) {
  if (!Array.isArray(value)) return [];
  const result = [];
  for (const row of value) {
    const productId = typeof row === "string" ? row : row?.productId;
    const product = products.find((item) => item.id === productId);
    if (!product) continue;
    const size = typeof row === "object" && product.sizes.includes(row?.size) ? row.size : "";
    const existing = result.find((item) => item.productId === productId);
    if (!existing) result.push({ productId, size });
    else if (!existing.size && size) existing.size = size;
  }
  return result;
}

export function cleanSearchQuery(value) {
  return String(value ?? "").replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 120).trim();
}

export function normalizeSearch(value) {
  return cleanSearchQuery(value).toLocaleLowerCase("ru").replaceAll("ё", "е");
}

export function matchesProductQuery(product, query) {
  const normalized = normalizeSearch(query);
  if (!normalized) return true;
  return normalizeSearch(`${product.name} ${product.type} ${product.color}`).includes(normalized);
}

export function getProductSuggestions(query, products, limit = 5) {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  return products.filter((product) => {
    const name = normalizeSearch(product.name);
    const words = normalizeSearch(`${product.name} ${product.type}`).split(/[\s-]+/);
    return name.startsWith(normalized) || words.some((word) => word.startsWith(normalized));
  }).slice(0, limit);
}

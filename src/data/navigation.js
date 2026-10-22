export const catalogSections = {
  all: { title: "Коллекции", description: "Все модели LIPIKHIN" },
  men: { title: "Мужская коллекция" },
  women: { title: "Женская коллекция" },
  sale: { title: "Распродажа", description: "Выбранные модели по сниженной цене." },
};
export const navigationItems = [
  { href: "/collections", label: "Коллекции", section: "all" },
  { href: "/catalog/men", label: "Мужское", section: "men" },
  { href: "/catalog/women", label: "Женское", section: "women" },
  { href: "/catalog/sale", label: "Распродажа", section: "sale" },
];

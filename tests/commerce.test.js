import test from "node:test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import { addCartItem, cartTotal, isOnSale, sanitizeCart, sanitizeFavorites } from "../src/utils/commerce.js";
import { products } from "../src/data/products.js";

test("same model and size merge; another size stays separate", () => {
  let cart = addCartItem([], products[0].id, "M");
  cart = addCartItem(cart, products[0].id, "M");
  cart = addCartItem(cart, products[0].id, "L");
  assert.deepEqual(cart.map((row) => [row.size, row.quantity]), [["M", 2], ["L", 1]]);
  assert.equal(cartTotal(cart, products), products[0].price * 3);
});
test("sale contains the two reduced models and cart uses their current prices", () => {
  const sale = products.filter(isOnSale);
  assert.deepEqual(sale.map((product) => [product.id, product.oldPrice, product.price]), [
    ["men-blouson", 12900, 9900],
    ["women-blue-sweater", 11900, 8900],
  ]);
  assert.equal(cartTotal([
    { productId: sale[0].id, size: "M", quantity: 2 },
    { productId: sale[1].id, size: "S", quantity: 1 },
  ], products), 28700);
});
test("corrupt, obsolete and invalid persisted entries are discarded", () => {
  assert.deepEqual(sanitizeCart(null, products), []);
  assert.deepEqual(sanitizeCart([null, { productId: "missing", size: "M", quantity: 1 }, { productId: products[0].id, size: "XXXL", quantity: 1 }, { productId: products[0].id, size: "M", quantity: -2 }], products), []);
});
test("persisted duplicate rows merge and quantity is capped", () => {
  const row = { productId: products[0].id, size: "M", quantity: 60 };
  assert.deepEqual(sanitizeCart([row, row], products), [{ ...row, quantity: 99 }]);
});
test("all supplied photo paths resolve to existing public assets", () => {
  const images = products.flatMap((p) => [
    ...(p.images || []),
    ...(p.catalogImage ? [p.catalogImage] : []),
    ...(p.modelImage ? [p.modelImage] : []),
  ]);
  assert.equal(products.filter((p) => p.category === "women").length, 5);
  assert.equal(products.filter((p) => p.category === "women").every((p) => p.images.length >= 3 && (p.catalogImage || p.images[0]) && p.modelImage), true);
  assert.ok(images.every((image) => existsSync(resolve("public", image))));
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
});

test("legacy favorites migrate without losing saved products", () => {
  assert.deepEqual(sanitizeFavorites([products[0].id, products[0].id, products[1].id, "missing", null], products), [
    { productId: products[0].id, size: "" }, { productId: products[1].id, size: "" },
  ]);
});
test("favorite sizes survive storage round trips and invalid sizes are cleared", () => {
  const saved = [{ productId: products[0].id, size: "M" }, { productId: products[1].id, size: "XXXL" }];
  assert.deepEqual(sanitizeFavorites(JSON.parse(JSON.stringify(saved)), products), [
    { productId: products[0].id, size: "M" }, { productId: products[1].id, size: "" },
  ]);
  assert.deepEqual(sanitizeFavorites(null, products), []);
  assert.deepEqual(sanitizeFavorites({}, products), []);
  assert.deepEqual(sanitizeFavorites([products[0].id, saved[0]], products), [saved[0]]);
});

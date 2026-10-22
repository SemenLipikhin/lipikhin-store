import test from "node:test";
import assert from "node:assert/strict";
import { products } from "../src/data/products.js";
import { cleanSearchQuery, getProductSuggestions, matchesProductQuery } from "../src/utils/search.js";
import { sanitizeProfile, validateProfile } from "../src/utils/profile.js";

test("suggestions find the beginning of any product-name word or type", () => {
  assert.deepEqual(getProductSuggestions("пух", products).map((item) => item.id), ["men-puffer", "women-puffer"]);
  assert.deepEqual(getProductSuggestions("руб", products).map((item) => item.id), ["men-denim-shirt"]);
  assert.deepEqual(getProductSuggestions("РУБ", products).map((item) => item.id), ["men-denim-shirt"]);
  assert.deepEqual(getProductSuggestions("джинсовая ру", products).map((item) => item.id), ["men-denim-shirt"]);
  assert.deepEqual(getProductSuggestions("блуз", products).map((item) => item.id), ["men-blouson"]);
  assert.deepEqual(getProductSuggestions("  ", products), []);
});

test("catalog search includes product type and normalizes case", () => {
  assert.equal(matchesProductQuery(products[0], "РУБАШКИ"), true);
  assert.equal(matchesProductQuery(products[0], "джемпер"), false);
  assert.equal(cleanSearchQuery("  Джинсовая\n рубашка  "), "Джинсовая рубашка");
  assert.equal(cleanSearchQuery("x".repeat(500)).length, 120);
});

test("local profile accepts valid data and rejects damaged storage", () => {
  assert.deepEqual(sanitizeProfile({ name: "  Анна  ", email: "  ANNA@example.com " }), { name: "Анна", email: "anna@example.com" });
  assert.equal(sanitizeProfile({ name: "А", email: "anna@example.com" }), null);
  assert.equal(sanitizeProfile({ name: "Анна", email: "не почта" }), null);
  assert.equal(sanitizeProfile(null), null);
});

test("invalid and suspicious profile input gets a field error instead of silent failure", () => {
  assert.equal(validateProfile({ name: "   ", email: "anna@example.com" }).errors.name.length > 0, true);
  assert.equal(validateProfile({ name: "Анна", email: "not-an-email" }).errors.email.length > 0, true);
  assert.equal(sanitizeProfile({ name: "<script>alert(1)</script>", email: "anna@example.com" }), null);
  assert.equal(sanitizeProfile({ name: "Анна", email: "<img>@example.com" }), null);
});

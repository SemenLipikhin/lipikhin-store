import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { products } from "../data/products.js";
import { cleanSearchQuery, getProductSuggestions } from "../utils/search.js";

function SearchInput({ initialQuery, mobile, onSearch }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestions = getProductSuggestions(value, products);
  const showSuggestions = isOpen && suggestions.length > 0;
  const listId = mobile ? "mobile-search-suggestions" : "desktop-search-suggestions";

  function selectProduct(product) {
    setIsOpen(false);
    onSearch?.();
    navigate(`/product/${product.id}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (showSuggestions && activeIndex >= 0) {
      selectProduct(suggestions[activeIndex]);
      return;
    }
    const query = cleanSearchQuery(value);
    setIsOpen(false);
    onSearch?.();
    navigate(`/collections${query ? `?${new URLSearchParams({ q: query })}` : ""}`);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    } else if (showSuggestions && event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
    } else if (showSuggestions && event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, -1));
    }
  }

  return (
    <form
      className={`header__search-form${mobile ? " header__search-form--mobile" : ""}`}
      role="search"
      aria-label={mobile ? "Поиск в меню" : "Поиск в магазине"}
      onSubmit={handleSubmit}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <input
        className="header__search"
        name="q"
        type="text"
        inputMode="search"
        autoComplete="off"
        spellCheck="false"
        aria-label="Поиск товаров"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        aria-controls={showSuggestions ? listId : undefined}
        aria-activedescendant={showSuggestions && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        placeholder="Поиск товаров"
        value={value}
        maxLength={120}
        enterKeyHint="search"
        onFocus={() => setIsOpen(true)}
        onChange={(event) => {
          setValue(event.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
      />
      {value && <button
        className="header__search-clear"
        type="button"
        aria-label="Очистить поиск"
        onClick={(event) => {
          setValue("");
          setIsOpen(false);
          setActiveIndex(-1);
          event.currentTarget.previousElementSibling?.focus();
        }}
      >×</button>}
      <button type="submit" className="visually-hidden" tabIndex={-1}>Выполнить поиск</button>
      {showSuggestions && <div className="header__suggestions" id={listId} role="listbox" aria-label="Подсказки товаров">
        {suggestions.map((product, index) => <button
          id={`${listId}-${index}`}
          key={product.id}
          type="button"
          role="option"
          aria-selected={activeIndex === index}
          className="header__suggestion"
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => selectProduct(product)}
        >
          <span>{product.name}</span>
          <small>{product.category === "men" ? "Мужское" : "Женское"} · {product.type}</small>
        </button>)}
        <p className="header__suggestions-hint">{activeIndex >= 0 ? "Enter — открыть выбранный товар" : "Enter — показать все результаты"}</p>
      </div>}
    </form>
  );
}

export default function SearchForm({ mobile = false, onSearch }) {
  const { search } = useLocation();
  const query = cleanSearchQuery(new URLSearchParams(search).get("q"));
  return <SearchInput key={`${mobile}-${query}`} initialQuery={query} mobile={mobile} onSearch={onSearch} />;
}

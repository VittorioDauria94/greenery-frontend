import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useProduct from "../../hooks/useProduct";

const LIVE_SEARCH_DEBOUNCE_MS = 500;
const LIVE_SEARCH_LIMIT = 3;
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getApiOrigin() {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "";
  }
}

function getProductImage(product) {
  const image =
    product.image_url ||
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    product.cover_image ||
    product.images?.[0]?.url ||
    product.images?.[0];

  if (!image) {
    return "";
  }

  if (image.startsWith("http") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${getApiOrigin()}${image}`;
  }

  return `${getApiOrigin()}/${image}`;
}

function formatPrice(product) {
  const price =
    product.price ??
    product.min_price ??
    product.starting_price ??
    product.startingPrice;

  if (price === undefined || price === null || price === "") {
    return "";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return `da ${numericPrice.toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}€`;
}

export default function HeaderSearch({ closeMenu }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const trimmedSearch = search.trim();
  const {
    products: liveProducts,
    isLoading: isLiveSearchLoading,
    error: liveSearchError,
    hasLoaded: hasLiveSearchRun,
  } = useProduct({
    filters: { search: trimmedSearch },
    enabled: Boolean(trimmedSearch),
    debounceMs: LIVE_SEARCH_DEBOUNCE_MS,
    limit: LIVE_SEARCH_LIMIT,
  });

  function clearSearchPreview() {
    setSearch("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (trimmedSearch) {
      navigate(`/products?search=${encodeURIComponent(trimmedSearch)}`);
      clearSearchPreview();
      closeMenu?.();
    }
  }

  const shouldShowLiveSearch =
    trimmedSearch &&
    (isLiveSearchLoading ||
      hasLiveSearchRun ||
      liveProducts.length > 0 ||
      liveSearchError);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-5 max-w-[620px] md:mt-5"
    >
      <div className="relative">
        <input
          type="search"
          className="search-pill"
          placeholder="Cerca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="submit"
          className="search-button"
          aria-label="Cerca prodotto"
        >
          <span className="search-icon" aria-hidden="true" />
        </button>

        {shouldShowLiveSearch && (
          <div className="live-search-panel" aria-live="polite">
            {isLiveSearchLoading && (
              <div className="live-search-state">Ricerca in corso...</div>
            )}

            {!isLiveSearchLoading && liveSearchError && (
              <div className="live-search-state">{liveSearchError}</div>
            )}

            {!isLiveSearchLoading &&
              !liveSearchError &&
              hasLiveSearchRun &&
              liveProducts.length === 0 && (
                <div className="live-search-state">
                  Nessun prodotto trovato.
                </div>
              )}

            {!isLiveSearchLoading &&
              !liveSearchError &&
              liveProducts.map((product) => {
                const name = product.name || product.title || "Prodotto Greenery";
                const slug = product.slug || product.id;
                const image = getProductImage(product);
                const price = formatPrice(product);

                return (
                  <Link
                    key={product.id || product.slug}
                    to={`/products/${slug}`}
                    className="live-search-row"
                    onClick={() => {
                      clearSearchPreview();
                      closeMenu?.();
                    }}
                  >
                    <div className="live-search-image-wrap">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="live-search-image"
                        />
                      ) : (
                        <span className="live-search-placeholder" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="live-search-name">{name}</p>
                      {price && <p className="live-search-price">{price}</p>}
                    </div>

                    <span className="live-search-offer">Vedi offerta</span>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </form>
  );
}

import { useEffect, useState } from "react";

import {
  getFeaturedProducts,
  getProductBySlug,
  getProducts,
} from "../api/productApi";

const initialState = {
  product: null,
  products: [],
  isLoading: false,
  error: "",
  hasLoaded: false,
};

export default function useProduct({
  filters = {},
  featured = false,
  slug = "",
  enabled = true,
  debounceMs = 0,
  limit,
} = {}) {
  const [state, setState] = useState(() => ({
    ...initialState,
    isLoading: enabled,
  }));
  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    let ignore = false;

    if (!enabled) {
      setState(initialState);
      return undefined;
    }

    setState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: "",
      hasLoaded: false,
    }));

    const timeoutId = window.setTimeout(async () => {
      try {
        if (slug) {
          const product = await getProductBySlug(slug);

          if (!ignore) {
            setState({
              product,
              products: product ? [product] : [],
              isLoading: false,
              error: "",
              hasLoaded: true,
            });
          }

          return;
        }

        const parsedFilters = JSON.parse(filtersKey);
        const products = featured
          ? await getFeaturedProducts()
          : await getProducts(parsedFilters);
        const limitedProducts =
          typeof limit === "number" ? products.slice(0, limit) : products;

        if (!ignore) {
          setState({
            product: null,
            products: limitedProducts,
            isLoading: false,
            error: "",
            hasLoaded: true,
          });
        }
      } catch (err) {
        if (!ignore) {
          const isNotFound = slug && err.status === 404;

          setState({
            product: null,
            products: [],
            isLoading: false,
            error: isNotFound
              ? ""
              : err.message || "Errore durante il caricamento dei prodotti.",
            hasLoaded: true,
          });
        }
      }
    }, debounceMs);

    return () => {
      ignore = true;
      window.clearTimeout(timeoutId);
    };
  }, [debounceMs, enabled, featured, filtersKey, limit, slug]);

  return state;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiRequest(
  path,
  params = {},
  errorMessage = "Impossibile recuperare i prodotti.",
) {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

function unwrapList(payload, key) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key];
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.[key])) {
    return payload.data[key];
  }

  return [];
}

function unwrapItem(payload, key) {
  if (payload && Object.prototype.hasOwnProperty.call(payload, key)) {
    return payload[key];
  }

  if (payload && Object.prototype.hasOwnProperty.call(payload, "data")) {
    return payload.data;
  }

  return payload;
}

export async function getProducts(filters = {}) {
  const payload = await apiRequest("/products", filters);
  return unwrapList(payload, "products");
}

export async function getFeaturedProducts() {
  return getProducts({ featured: true });
}

export async function getProductBySlug(slug) {
  const payload = await apiRequest(
    `/products/${encodeURIComponent(slug)}`,
    {},
    "Impossibile recuperare il prodotto.",
  );
  return unwrapItem(payload, "product");
}

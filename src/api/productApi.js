const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiRequest(path, params = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Impossibile recuperare i prodotti.");
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
  return payload?.[key] || payload?.data || payload;
}

export async function getProducts(filters = {}) {
  const payload = await apiRequest("/products", filters);
  return unwrapList(payload, "products");
}

export async function getFeaturedProducts() {
  return getProducts({ featured: true });
}

export async function getProductBySlug(slug) {
  const payload = await apiRequest(`/products/${slug}`);
  return unwrapItem(payload, "product");
}

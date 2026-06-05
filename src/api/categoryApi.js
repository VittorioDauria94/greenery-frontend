const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiRequest(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error("Impossibile recuperare le categorie.");
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

export async function getCategories() {
  const payload = await apiRequest("/categories");
  return unwrapList(payload, "categories");
}

export async function getCategoryProducts(slug) {
  const payload = await apiRequest(`/categories/${slug}/products`);
  return unwrapList(payload, "products");
}

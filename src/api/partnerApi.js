const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiRequest(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error("Impossibile recuperare i partner.");
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

export async function getPartners() {
  const payload = await apiRequest("/partners");
  return unwrapList(payload, "partners");
}

export async function getPartnerBySlug(slug) {
  const payload = await apiRequest(`/partners/${encodeURIComponent(slug)}`);
  return unwrapItem(payload, "partner");
}

export async function getPartner(slug) {
  return getPartnerBySlug(slug);
}

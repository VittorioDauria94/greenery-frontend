const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BACKEND_URL = API_URL.replace("/api", "");

export function getImageUrl(image) {
  if (!image || typeof image !== "string") {
    return "";
  }

  if (image.startsWith("http") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${BACKEND_URL}${image}`;
  }

  return `${BACKEND_URL}/${image}`;
}

export function getProductImagePath(product) {
  const image =
    product.image_url ||
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    product.cover_image ||
    product.images?.[0]?.url ||
    product.images?.[0];

  return typeof image === "string" ? image : "";
}

export function getProductImageUrl(product) {
  return getImageUrl(getProductImagePath(product));
}

import { Link } from "react-router-dom";

import { formatCurrency, getProductPrice } from "../utils/formatPrice";
import { getProductImageUrl } from "../utils/imageUrl";

function getPrice(product) {
  const price = getProductPrice(product);

  if (price === undefined || price === null || price === "") {
    return "Prezzo non disponibile";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return `A partire da ${formatCurrency(numericPrice)}`;
}

function getName(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.name || value.title || "";
}

export default function ProductCard({ product }) {
  const imageSrc = getProductImageUrl(product);
  const name = product.name || product.title || "Prodotto Greenery";
  const slug = product.slug || product.id;
  const categoryName =
    getName(product.category) || product.category_name || product.categoryName;
  const partnerName =
    getName(product.partner) || product.partner_name || product.partnerName;
  const ecoLabel = product.eco_badge || product.ecoBadge || "Eco";

  return (
    <article className="product-card">
      <Link
        to={`/products/${slug}`}
        className="block"
        aria-label={`Vai al prodotto ${name}`}
      >
        <div className="product-card-image-wrap">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`Immagine di ${name}`}
              className="product-card-image"
            />
          ) : (
            <div
              className="product-card-placeholder"
              role="img"
              aria-label={`Immagine non disponibile per ${name}`}
            >
              Greenery
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="badge-eco">{ecoLabel}</span>
            {categoryName && (
              <span className="text-[0.68rem] text-[var(--color-dark)]/70">
                {categoryName}
              </span>
            )}
          </div>

          <h3 className="line-clamp-2 text-center text-sm text-[var(--color-dark)]">
            {name}
          </h3>

          {partnerName && (
            <p className="text-center text-[0.7rem] text-[var(--color-green)]">
              {partnerName}
            </p>
          )}

          <p className="text-center text-sm font-semibold text-[var(--color-dark)]">
            {getPrice(product)}
          </p>

          <div className="flex justify-center">
            <span className="offer-pill">Vedi offerta</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

import { useParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import useProduct from "../hooks/useProduct";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BACKEND_URL = API_URL.replace("/api", "");

function getName(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.name || value.title || "";
}

function getImageSrc(product) {
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

  if (typeof image !== "string") {
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

function formatPrice(product) {
  const price =
    product.price ??
    product.min_price ??
    product.starting_price ??
    product.startingPrice;

  if (price === undefined || price === null || price === "") {
    return "Prezzo non disponibile";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return numericPrice.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}

function firstAvailable(...values) {
  return values.find(
    (value) => value !== undefined && value !== null && value !== "",
  );
}

function formatStock(stock) {
  if (stock === undefined || stock === null || stock === "") {
    return "Non indicato";
  }

  if (typeof stock === "boolean") {
    return stock ? "Disponibile" : "Non disponibile";
  }

  const numericStock = Number(stock);

  if (Number.isNaN(numericStock)) {
    return stock;
  }

  if (numericStock <= 0) {
    return "Non disponibile";
  }

  if (numericStock === 1) {
    return "1 disponibile";
  }

  return `${numericStock} disponibili`;
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { product, isLoading, error, hasLoaded } = useProduct({
    slug,
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <section className="container-custom page-padding">
        <Loader label="Caricamento prodotto" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-custom page-padding">
        <ErrorMessage title="Prodotto non disponibile" message={error} />
      </section>
    );
  }

  if (hasLoaded && !product) {
    return (
      <section className="container-custom page-padding">
        <div className="mx-auto max-w-md rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
          <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
            Greenery
          </p>
          <h1 className="mt-2 text-2xl text-[var(--color-dark)]">
            Prodotto non trovato
          </h1>
          <p className="mt-3 text-sm text-[var(--color-dark)]/75">
            Il prodotto richiesto non esiste o non e piu disponibile.
          </p>
        </div>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  const imageSrc = getImageSrc(product);
  const name = product.name || product.title || "Prodotto Greenery";
  const description =
    product.description ||
    product.long_description ||
    product.short_description ||
    "Descrizione non disponibile.";
  const ecoLabel =
    product.eco_badge || product.ecoBadge || product.eco_label || "Eco";
  const categoryName =
    getName(product.category) || product.category_name || product.categoryName;
  const partnerName =
    getName(product.partner) || product.partner_name || product.partnerName;
  const sustainabilityNote =
    product.partner?.sustainability_note ||
    product.partner?.sustainabilityNote ||
    product.partner_sustainability_note ||
    product.partnerSustainabilityNote;
  const stock = firstAvailable(
    product.stock,
    product.stock_quantity,
    product.stockQuantity,
    product.quantity,
  );
  const detailItems = [
    {
      label: "Materiale",
      value: firstAvailable(
        product.material,
        product.materiale,
        product.material_name,
        product.materialName,
      ),
    },
    {
      label: "Packaging",
      value: firstAvailable(
        product.packaging,
        product.packaging_type,
        product.packagingType,
      ),
    },
    {
      label: "Certificazione",
      value: firstAvailable(
        product.certification,
        product.certificazione,
        product.certification_name,
        product.certificationName,
      ),
    },
    {
      label: "Origine",
      value: firstAvailable(product.origin, product.origine, product.made_in),
    },
    {
      label: "Stock",
      value: formatStock(stock),
    },
  ];

  return (
    <section className="container-custom page-padding">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="card-custom bg-[var(--color-cream)]/45 p-4 md:p-6">
          <div className="flex min-h-[18rem] items-center justify-center rounded-3xl bg-[var(--color-white)]/75 p-6 md:min-h-[28rem]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={name}
                className="max-h-[20rem] w-full object-contain md:max-h-[30rem]"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-full border border-dashed border-[var(--color-green)]/40 text-sm tracking-[0.14em] text-[var(--color-green)] uppercase">
                Greenery
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-eco">{ecoLabel}</span>
              {categoryName && (
                <span className="badge-brown">{categoryName}</span>
              )}
            </div>

            <div>
              <h1 className="text-3xl leading-tight text-[var(--color-dark)] md:text-4xl">
                {name}
              </h1>
              {partnerName && (
                <p className="mt-2 text-sm tracking-[0.08em] text-[var(--color-green)] uppercase">
                  {partnerName}
                </p>
              )}
            </div>

            <p className="text-2xl text-[var(--color-brown)]">
              {formatPrice(product)}
            </p>

            <p className="max-w-2xl text-base leading-7 text-[var(--color-dark)]/80">
              {description}
            </p>

            {/* TODO: Wire this button to cart logic when cart state is introduced. */}
            <button
              type="button"
              className="btn-primary-custom w-full opacity-80 sm:w-auto"
              disabled
            >
              Aggiungi al carrello
            </button>
          </div>

          <div className="card-custom p-5">
            <h2 className="text-lg text-[var(--color-dark)]">
              Dettagli prodotto
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/35 px-4 py-3"
                >
                  <p className="text-xs tracking-[0.1em] text-[var(--color-green)] uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-dark)]">
                    {item.value || "Non indicato"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {sustainabilityNote && (
            <div className="rounded-3xl bg-[var(--color-green-light)] px-5 py-4">
              <p className="text-xs tracking-[0.12em] text-[var(--color-green)] uppercase">
                Sostenibilita del partner
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-dark)]/80">
                {sustainabilityNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

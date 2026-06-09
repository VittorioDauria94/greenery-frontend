import ProductPurchaseBox from "./ProductPurchaseBox";
import { formatProductPrice } from "../utils/formatPrice";

function getName(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.name || value.title || "";
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

function getProductStock(product) {
  return firstAvailable(
    product.stock,
    product.stock_quantity,
    product.stockQuantity,
    product.quantity,
  );
}

function getDetailItems(product) {
  const stock = getProductStock(product);

  return [
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
}

export default function ProductDetailInfo({ product, name }) {
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
  const detailItems = getDetailItems(product);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-eco">{ecoLabel}</span>
          {categoryName && <span className="badge-brown">{categoryName}</span>}
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
          {formatProductPrice(product)}
        </p>

        <p className="max-w-2xl text-base leading-7 text-[var(--color-dark)]/80">
          {description}
        </p>

        <ProductPurchaseBox product={product} />
      </div>

      <div className="card-custom p-5">
        <h2 className="text-lg text-[var(--color-dark)]">Dettagli prodotto</h2>

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
            Sostenibilità del partner
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-dark)]/80">
            {sustainabilityNote}
          </p>
        </div>
      )}
    </div>
  );
}

function getVerificationLabel(partner) {
  const status =
    partner.verification_status ||
    partner.verificationStatus ||
    partner.status;

  if (partner.verified || partner.is_verified || status === "verified") {
    return "Verificato";
  }

  if (status) {
    return String(status).replaceAll("_", " ");
  }

  return "In verifica";
}

function getProductsCount(partner) {
  return (
    partner.products_count ??
    partner.productsCount ??
    partner.product_count ??
    partner.products?.length
  );
}

function formatProductsCount(count) {
  return Number(count) === 1 ? "1 prodotto" : `${count} prodotti`;
}

export default function PartnerCard({ partner }) {
  const name = partner.name || partner.title || "Partner Greenery";
  const description =
    partner.description ||
    partner.short_description ||
    "Partner selezionato per il catalogo Greenery.";
  const sustainabilityNote =
    partner.sustainability_note ||
    partner.sustainabilityNote ||
    partner.note_sostenibilita;
  const productsCount = getProductsCount(partner);

  return (
    <article className="card-custom flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge-eco">{getVerificationLabel(partner)}</span>
        {productsCount !== undefined && productsCount !== null && (
          <span className="badge-brown">{formatProductsCount(productsCount)}</span>
        )}
      </div>

      <h2 className="mt-4 text-xl text-[var(--color-dark)]">{name}</h2>

      <p className="mt-3 text-sm leading-6 text-[var(--color-dark)]/75">
        {description}
      </p>

      {sustainabilityNote && (
        <div className="mt-5 rounded-3xl bg-[var(--color-cream)]/55 px-4 py-3">
          <p className="text-xs tracking-[0.1em] text-[var(--color-green)] uppercase">
            Sostenibilità
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-dark)]/75">
            {sustainabilityNote}
          </p>
        </div>
      )}
    </article>
  );
}

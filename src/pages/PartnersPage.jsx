import { useEffect, useState } from "react";

import { getPartners } from "../api/partnerApi";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

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

function PartnerCard({ partner }) {
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

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadPartners() {
      try {
        const partnersData = await getPartners();

        if (!ignore) {
          setPartners(partnersData);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Errore durante il caricamento dei partner.");
          setPartners([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPartners();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="container-custom page-padding">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
          Greenery
        </p>
        <h1 className="mt-2 text-2xl text-[var(--color-dark)] md:text-3xl">
          Partner selezionati
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-dark)]/75">
          Collaboriamo con realtà attente a materiali, filiere e pratiche più
          responsabili.
        </p>
      </div>

      <div className="mt-8">
        {isLoading && <Loader label="Caricamento partner" />}

        {!isLoading && error && (
          <ErrorMessage title="Partner non disponibili" message={error} />
        )}

        {!isLoading && !error && partners.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
            <h2 className="text-lg text-[var(--color-dark)]">
              Nessun partner trovato
            </h2>
            <p className="mt-2 text-sm text-[var(--color-dark)]/75">
              I partner saranno disponibili appena il catalogo verrà aggiornato.
            </p>
          </div>
        )}

        {!isLoading && !error && partners.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {partners.map((partner) => (
              <PartnerCard
                key={partner.id || partner.slug || partner.name}
                partner={partner}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

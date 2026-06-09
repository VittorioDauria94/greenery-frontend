import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import PartnerCard from "../components/PartnerCard";
import usePartners from "../hooks/usePartners";

export default function PartnersPage() {
  const { partners, isLoading, error } = usePartners();

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

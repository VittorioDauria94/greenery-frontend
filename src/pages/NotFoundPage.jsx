import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="container-custom page-padding">
      <div className="mx-auto max-w-xl rounded-3xl bg-[var(--color-cream)] px-5 py-8 text-center">
        <p className="text-sm tracking-[0.12em] text-[var(--color-green)] uppercase">
          Greenery
        </p>
        <h1 className="mt-2 text-2xl text-[var(--color-dark)] md:text-3xl">
          Pagina non trovata
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-dark)]/75">
          Il percorso che stai cercando non esiste o non è più disponibile.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="btn-secondary-custom">
            Torna alla home
          </Link>
          <Link to="/products" className="btn-outline-custom">
            Vai ai prodotti
          </Link>
        </div>
      </div>
    </section>
  );
}
